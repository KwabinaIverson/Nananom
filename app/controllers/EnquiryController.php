<?php

namespace App\Controllers;

use App\Models\EnquiryModel;
use App\Core\AuthManager;

/**
 * EnquiryController
 *
 * Handles API requests related to customer enquiries.
 * Responses are always JSON.
 */
class EnquiryController
{
    /**
     * Constructor.
     * Sets the content type to JSON for all responses from this controller.
     */
    public function __construct()
    {
        header('Content-Type: application/json; charset=UTF-8');
    }

    /**
     * Helper to format enquiry data for consistent API responses.
     *
     * @param EnquiryModel $enquiry
     * @return array
     */
    private function formatEnquiryResponse(EnquiryModel $enquiry): array
    {
        return [
            'id' => $enquiry->getId(),
            'userId' => $enquiry->getUserId(),
            'name' => $enquiry->getName(),
            'email' => $enquiry->getEmail(),
            'phoneNumber' => $enquiry->getPhoneNumber(),
            'subject' => $enquiry->getSubject(),
            'message' => $enquiry->getMessage(),
            'status' => $enquiry->getStatus(),
            'createdAt' => $enquiry->getCreatedAt(),
            'updatedAt' => $enquiry->getUpdatedAt(),
        ];
    }

    /**
     * Handles GET /api/enquiries
     * Lists enquiries.
     * - Administrators/Support Agents can view all enquiries.
     * - Customers can only view their own enquiries.
     * Requires authentication.
     */
    public function getEnquiries(): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to view enquiries.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $enquiries = [];
        if ($authenticatedUserRole === 'Administrator' || $authenticatedUserRole === 'Support Agent') {
            $enquiries = EnquiryModel::all();
        } elseif ($authenticatedUserRole === 'Customer') {
            $enquiries = EnquiryModel::findByUserId($authenticatedUserId);
        } else {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied for your role.']);
            return;
        }

        $formattedEnquiries = [];
        foreach ($enquiries as $enquiry) {
            $formattedEnquiries[] = $this->formatEnquiryResponse($enquiry);
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $formattedEnquiries]);
    }

    /**
     * Handles GET /api/enquiries/{id}
     * Retrieves a single enquiry by its UUID.
     * Requires authentication.
     * - Administrators/Support Agents can view any enquiry.
     * - Customers can only view their own enquiry.
     *
     * @param string $id The UUID of the enquiry.
     */
    public function getEnquiry(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to view an enquiry.']);
            return;
        }

        $enquiry = EnquiryModel::find($id);

        if (!$enquiry) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Enquiry not found.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        // Authorization check: Admin/Support can view any, Customer can only view their own
        if (($authenticatedUserRole === 'Customer') && ($enquiry->getUserId() !== $authenticatedUserId)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. You can only view your own enquiries.']);
            return;
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $this->formatEnquiryResponse($enquiry)]);
    }

    /**
     * Handles POST /api/enquiries
     * Creates a new enquiry.
     * - If authenticated, links to the UserID.
     * - If unauthenticated, UserID is NULL.
     * Publicly accessible (no authentication required for submission).
     */
    public function createEnquiry(): void
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // Basic validation
        if (json_last_error() !== JSON_ERROR_NONE ||
            !isset($data['name'], $data['email'], $data['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Name, email, and message are required.']);
            return;
        }

        $name = trim($data['name']);
        $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
        $message = trim($data['message']);
        $phoneNumber = $data['phoneNumber'] ?? null;
        $subject = $data['subject'] ?? null;
        $status = 'New';

        // Determine UserID: If authenticated, use their ID; otherwise, it's null.
        $userId = AuthManager::isAuthenticated() ? AuthManager::getAuthenticatedUserId() : null;

        // Further validation
        if (!$email) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
            return;
        }
        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Name cannot be empty.']);
            return;
        }
        if (empty($message)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Message cannot be empty.']);
            return;
        }

        $newEnquiry = new EnquiryModel();
        $newEnquiry->setUserId($userId);
        $newEnquiry->setName($name);
        $newEnquiry->setEmail($email);
        $newEnquiry->setPhoneNumber($phoneNumber);
        $newEnquiry->setSubject($subject);
        $newEnquiry->setMessage($message);
        $newEnquiry->setStatus($status);

        if ($newEnquiry->save()) {
            http_response_code(201);
            echo json_encode(['status' => 'success', 'message' => 'Enquiry submitted successfully.', 'data' => $this->formatEnquiryResponse($newEnquiry)]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to submit enquiry.']);
        }
    }

    /**
     * Handles PUT /api/enquiries/{id}
     * Updates an existing enquiry.
     * Requires 'Administrator' or 'Support Agent' role. Customers cannot update.
     *
     * @param string $id The UUID of the enquiry to update.
     */
    public function update(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to update an enquiry.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $enquiry = EnquiryModel::find($id);
        if (!$enquiry) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Enquiry not found.']);
            return;
        }

        // Authorization check: Admin/Support can update any, Customer can only update their own
        if (($authenticatedUserRole === 'Customer') && ($enquiry->getUserId() !== $authenticatedUserId)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. You can only update your own enquiries.']);
            return;
        }

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE || empty($data)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. No data provided for update or JSON is invalid.']);
            return;
        }

        // Apply updates if data is provided and valid
        if (isset($data['name']) && is_string($data['name']) && !empty(trim($data['name']))) {
            $enquiry->setName(trim($data['name']));
        }
        if (isset($data['email']) && filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL)) {
            $enquiry->setEmail(trim($data['email']));
        } elseif (isset($data['email']) && !filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid email format provided.']);
            return;
        }
        if (isset($data['phoneNumber'])) {
            $enquiry->setPhoneNumber($data['phoneNumber']);
        }
        if (isset($data['subject'])) {
            $enquiry->setSubject($data['subject']);
        }
        if (isset($data['message']) && is_string($data['message']) && !empty(trim($data['message']))) {
            $enquiry->setMessage(trim($data['message']));
        }

        // Status update validation
        if (isset($data['status'])) {
            $allowedStatuses = ['New', 'In Progress', 'Resolved', 'Archived'];
            if (in_array($data['status'], $allowedStatuses)) {
                $enquiry->setStatus($data['status']);
            } else {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid status provided. Allowed: New, In Progress, Resolved, Archived.']);
                return;
            }
        }

        if ($enquiry->update()) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Enquiry updated successfully.', 'data' => $this->formatEnquiryResponse($enquiry)]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to update enquiry.']);
        }
    }

    /**
     * Handles DELETE /api/enquiries/{id}
     * Deletes an enquiry by its UUID.
     * Requires authentication.
     * - Administrators/Support Agents can delete any enquiry.
     * - Customers can only delete their own enquiries.
     *
     * @param string $id The UUID of the enquiry to delete.
     */
    public function delete(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to delete an enquiry.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $enquiry = EnquiryModel::find($id);
        if (!$enquiry) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Enquiry not found.']);
            return;
        }

        // Authorization check: Admin/Support can delete any, Customer can only delete their own
        if (($authenticatedUserRole === 'Customer') && ($enquiry->getUserId() !== $authenticatedUserId)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. You can only delete your own enquiries.']);
            return;
        }

        if (EnquiryModel::delete($id)) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Enquiry deleted successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete enquiry.']);
        }
    }
}

?>