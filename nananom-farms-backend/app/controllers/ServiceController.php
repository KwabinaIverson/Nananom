<?php

namespace App\Controllers;

use App\Models\ServiceModel;
use App\Core\AuthManager;

/**
 * ServiceController
 *
 * Handles API requests related to services (e.g., listing, retrieving, creating, updating, deleting).
 * Responses are always JSON.
 */
class ServiceController
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
     * Handles GET /api/services
     * Lists all available services.
     * No authentication required.
     */
    public function getServices(): void
    {
        $services = ServiceModel::all();

        $formattedServices = [];
        foreach ($services as $service) {
            $formattedServices[] = [
                'id' => $service->getId(),
                'serviceName' => $service->getServiceName(),
                'description' => $service->getDescription(),
                'isActive' => (bool)$service->getIsActive(),
                'createdAt' => $service->getCreatedAt(),
                'updatedAt' => $service->getUpdatedAt(),
            ];
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $formattedServices]);
    }

    /**
     * Handles GET /api/services/{id}
     * Retrieves a single service by its UUID.
     * No authentication required.
     *
     * @param string $id The UUID of the service.
     */
    public function getService(string $id): void
    {
        $service = ServiceModel::find($id);

        if ($service) {
            $formattedService = [
                'id' => $service->getId(),
                'serviceName' => $service->getServiceName(),
                'description' => $service->getDescription(),
                'isActive' => (bool)$service->getIsActive(),
                'createdAt' => $service->getCreatedAt(),
                'updatedAt' => $service->getUpdatedAt(),
            ];
            http_response_code(200);
            echo json_encode(['status' => 'success', 'data' => $formattedService]);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Service not found.']);
        }
    }

    /**
     * Handles POST /api/services
     * Creates a new service.
     * Requires 'Administrator' or 'Support Agent' role.
     */
    public function createService(): void
    {
        // Authorization check
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to create a service.']);
            return;
        }
        $userRole = AuthManager::getAuthenticatedRoleName();
        if ($userRole !== 'Administrator' && $userRole !== 'Support Agent') {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. Only administrators and support agents can create services.']);
            return;
        }

        // Get raw POST data (assuming JSON input for API)
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // Basic validation
        if (json_last_error() !== JSON_ERROR_NONE ||
            !isset($data['serviceName'], $data['description'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Service name and description are required.']);
            return;
        }

        $serviceName = trim($data['serviceName']);
        $description = trim($data['description']);
        $isActive = $data['isActive'] ?? true;

        // Further validation (e.g., data types, ranges)
        if (!is_string($serviceName) || empty($serviceName)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Service name is required and must be a string.']);
            return;
        }
        if (!is_string($description) || empty($description)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Description is required and must be a string.']);
            return;
        }
        if (!is_bool($isActive)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'IsActive must be a boolean.']);
            return;
        }


        // Create a new ServiceModel instance
        $newService = new ServiceModel();
        $newService->setServiceName($serviceName);
        $newService->setDescription($description);
        $newService->setIsActive((bool)$isActive);

        if ($newService->save()) {
            http_response_code(201);
            echo json_encode(['status' => 'success', 'message' => 'Service created successfully.', 'data' => [
                'id' => $newService->getId(),
                'serviceName' => $newService->getServiceName(),
                'description' => $newService->getDescription(),
                'isActive' => (bool)$newService->getIsActive(),
                'createdAt' => $newService->getCreatedAt(),
                'updatedAt' => $newService->getUpdatedAt(),
            ]]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to create service.']);
        }
    }

    /**
     * Handles PUT /api/services/{id}
     * Updates an existing service.
     * Requires 'Administrator' or 'Support Agent' role.
     *
     * @param string $id The UUID of the service to update.
     */
    public function updateService(string $id): void
    {
        // Authorization check
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to update a service.']);
            return;
        }
        $userRole = AuthManager::getAuthenticatedRoleName();
        if ($userRole !== 'Administrator' && $userRole !== 'Support Agent') {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. Only administrators and support agents can update services.']);
            return;
        }

        $service = ServiceModel::find($id);
        if (!$service) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Service not found.']);
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
        if (isset($data['serviceName']) && is_string($data['serviceName']) && !empty(trim($data['serviceName']))) {
            $service->setServiceName(trim($data['serviceName']));
        }
        if (isset($data['description']) && is_string($data['description']) && !empty(trim($data['description']))) {
            $service->setDescription(trim($data['description']));
        }
        if (isset($data['isActive'])) {
            if (is_bool($data['isActive'])) {
                $service->setIsActive((bool)$data['isActive']);
            } else {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'IsActive must be a boolean if provided.']);
                return;
            }
        }

        if ($service->update()) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Service updated successfully.', 'data' => [
                'id' => $service->getId(),
                'serviceName' => $service->getServiceName(),
                'description' => $service->getDescription(),
                'isActive' => (bool)$service->getIsActive(),
                'createdAt' => $service->getCreatedAt(),
                'updatedAt' => $service->getUpdatedAt(),
            ]]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to update service.']);
        }
    }

    /**
     * Handles DELETE /api/services/{id}
     * Deletes a service by its UUID.
     * Requires 'Administrator' or 'Support Agent' role.
     *
     * @param string $id The UUID of the service to delete.
     */
    public function deleteService(string $id): void
    {
        // Authorization check
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to delete a service.']);
            return;
        }
        $userRole = AuthManager::getAuthenticatedRoleName();
        if ($userRole !== 'Administrator' && $userRole !== 'Support Agent') {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. Only administrators and support agents can delete services.']);
            return;
        }

        $service = ServiceModel::find($id);
        if (!$service) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Service not found.']);
            return;
        }

        if (ServiceModel::delete($id)) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Service deleted successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete service.']);
        }
    }
}

?>