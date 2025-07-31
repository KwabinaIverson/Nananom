<?php

namespace App\Controllers;

use App\Models\AppointmentModel;
use App\Models\User;
use App\Models\ServiceModel;
use App\Core\AuthManager;

/**
 * AppointmentController
 *
 * Handles API requests related to customer appointments.
 * Responses are always JSON.
 */
class AppointmentController
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
     * Helper to format appointment data for consistent API responses.
     *
     * @param AppointmentModel $appointment
     * @return array
     */
    private function formatAppointmentResponse(AppointmentModel $appointment): array
    {
        // Optionally fetch related user and service names for richer response
        $user = User::find($appointment->getUserId());
        $service = ServiceModel::find($appointment->getServiceId());

        return [
            'id' => $appointment->getId(),
            'userId' => $appointment->getUserId(),
            'userName' => $user ? $user->getFirstName() . ' ' . $user->getLastName() : 'N/A',
            'userEmail' => $user ? $user->getEmail() : 'N/A',
            'serviceId' => $appointment->getServiceId(),
            'serviceName' => $service ? $service->getServiceName() : 'N/A',
            'appointmentDate' => $appointment->getAppointmentDate(),
            'appointmentTime' => $appointment->getAppointmentTime(),
            'status' => $appointment->getStatus(),
            'notes' => $appointment->getNotes(),
            'createdAt' => $appointment->getCreatedAt(),
            'updatedAt' => $appointment->getUpdatedAt(),
        ];
    }

    /**
     * Handles GET /api/appointments
     * Lists appointments.
     * - Administrators/Support Agents can view all appointments.
     * - Customers can only view their own appointments.
     * Requires authentication.
     */
    public function getAppointments(): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to view appointments.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $appointments = [];
        if ($authenticatedUserRole === 'Administrator' || $authenticatedUserRole === 'Support Agent') {
            $appointments = AppointmentModel::all();
        } elseif ($authenticatedUserRole === 'Customer') {
            $appointments = AppointmentModel::findByUserId($authenticatedUserId);
        } else {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied for your role.']);
            return;
        }

        $formattedAppointments = [];
        foreach ($appointments as $appointment) {
            $formattedAppointments[] = $this->formatAppointmentResponse($appointment);
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $formattedAppointments]);
    }

    /**
     * Handles GET /api/appointments/{id}
     * Retrieves a single appointment by its UUID.
     * Requires authentication.
     * - Administrators/Support Agents can view any appointment.
     * - Customers can only view their own appointment.
     *
     * @param string $id The UUID of the appointment.
     */
    public function getAppointment(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to view an appointment.']);
            return;
        }

        $appointment = AppointmentModel::find($id);

        if (!$appointment) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Appointment not found.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        // Authorization check: Admin/Support can view any, Customer can only view their own
        if (($authenticatedUserRole === 'Customer') && ($appointment->getUserId() !== $authenticatedUserId)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. You can only view your own appointments.']);
            return;
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $this->formatAppointmentResponse($appointment)]);
    }

    /**
     * Handles POST /api/appointments
     * Creates a new appointment.
     * Requires authentication (Customer, Administrator, Support Agent).
     * - Customers can only book appointments for themselves.
     * - Administrators/Support Agents can book for any user (if userID is specified).
     */
    public function createAppointment(): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to book an appointment.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // Basic validation
        if (json_last_error() !== JSON_ERROR_NONE ||
            !isset($data['serviceId'], $data['appointmentDate'], $data['appointmentTime'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Service ID, date, and time are required.']);
            return;
        }

        $serviceId = trim($data['serviceId']);
        $appointmentDate = trim($data['appointmentDate']);
        $appointmentTime = trim($data['appointmentTime']);
        $notes = $data['notes'] ?? null;
        $status = $data['status'] ?? 'Pending';

        // Determine the UserID for the appointment
        $targetUserId = $data['userId'] ?? $authenticatedUserId;

        // Authorization for userId: Customers can only book for themselves
        if ($authenticatedUserRole === 'Customer' && $targetUserId !== $authenticatedUserId) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Customers can only book appointments for themselves.']);
            return;
        }
        // Validate targetUserId exists if provided by Admin/Support
        if (($authenticatedUserRole === 'Administrator' || $authenticatedUserRole === 'Support Agent') && $targetUserId !== $authenticatedUserId) {
            if (!User::find($targetUserId)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Provided UserID for booking does not exist.']);
                return;
            }
        }

        // Validate ServiceID exists
        if (!ServiceModel::find($serviceId)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid Service ID provided.']);
            return;
        }

        // Validate date and time formats
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $appointmentDate) || !strtotime($appointmentDate)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid appointment date format. Use YYYY-MM-DD.']);
            return;
        }
        if (!preg_match('/^\d{2}:\d{2}(:\d{2})?$/', $appointmentTime) || !strtotime($appointmentTime)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid appointment time format. Use HH:MM or HH:MM:SS.']);
            return;
        }
        // Optional: Validate status if provided by Admin/Support
        $allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
        if (!in_array($status, $allowedStatuses)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid status provided.']);
            return;
        }


        $newAppointment = new AppointmentModel();
        $newAppointment->setUserId($targetUserId);
        $newAppointment->setServiceId($serviceId);
        $newAppointment->setAppointmentDate($appointmentDate);
        $newAppointment->setAppointmentTime($appointmentTime);
        $newAppointment->setStatus($status);
        $newAppointment->setNotes($notes);

        if ($newAppointment->save()) {
            http_response_code(201);
            echo json_encode(['status' => 'success', 'message' => 'Appointment booked successfully.', 'data' => $this->formatAppointmentResponse($newAppointment)]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to book appointment.']);
        }
    }

    /**
     * Handles PUT /api/appointments/{id}
     * Updates an existing appointment.
     * Requires authentication.
     * - Administrators/Support Agents can update any field for any appointment.
     * - Customers can only update their own appointments' notes or status (to 'Cancelled').
     *
     * @param string $id The UUID of the appointment to update.
     */
    public function updateAppointment(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to update an appointment.']);
            return;
        }

        $authenticatedUserId = AuthManager::getAuthenticatedUserId();
        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();

        $appointment = AppointmentModel::find($id);
        if (!$appointment) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Appointment not found.']);
            return;
        }

        // Authorization check: Admin/Support can update any, Customer can only update their own
        if (($authenticatedUserRole === 'Customer') && ($appointment->getUserId() !== $authenticatedUserId)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Access denied. You can only update your own appointments.']);
            return;
        }

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE || empty($data)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. No data provided for update or JSON is invalid.']);
            return;
        }

        $allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

        // Apply updates based on role
        if ($authenticatedUserRole === 'Administrator' || $authenticatedUserRole === 'Support Agent') {
            // Admins/Support Agents can update any field
            if (isset($data['userId']) && User::find($data['userId'])) {
                $appointment->setUserId($data['userId']);
            }
            if (isset($data['serviceId']) && ServiceModel::find($data['serviceId'])) {
                $appointment->setServiceId($data['serviceId']);
            }
            if (isset($data['appointmentDate']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['appointmentDate']) && strtotime($data['appointmentDate'])) {
                $appointment->setAppointmentDate($data['appointmentDate']);
            }
            if (isset($data['appointmentTime']) && preg_match('/^\d{2}:\d{2}(:\d{2})?$/', $data['appointmentTime']) && strtotime($data['appointmentTime'])) {
                $appointment->setAppointmentTime($data['appointmentTime']);
            }
            if (isset($data['status']) && in_array($data['status'], $allowedStatuses)) {
                $appointment->setStatus($data['status']);
            }
            if (isset($data['notes'])) {
                $appointment->setNotes($data['notes']);
            }
        } elseif ($authenticatedUserRole === 'Customer') {
            // Customers can only update notes or change status to 'Cancelled'
            if (isset($data['notes'])) {
                $appointment->setNotes($data['notes']);
            }
            if (isset($data['status'])) {
                if ($data['status'] === 'Cancelled' && $appointment->getStatus() !== 'Completed') { // Prevent cancelling completed appointments
                    $appointment->setStatus('Cancelled');
                } else {
                    http_response_code(403);
                    echo json_encode(['status' => 'error', 'message' => 'Customers can only change appointment status to "Cancelled".']);
                    return;
                }
            }
            // Prevent customers from changing other fields
            $disallowedCustomerFields = ['userId', 'serviceId', 'appointmentDate', 'appointmentTime'];
            foreach ($disallowedCustomerFields as $field) {
                if (isset($data[$field])) {
                    http_response_code(403);
                    echo json_encode(['status' => 'error', 'message' => "Customers cannot update '{$field}'. Only notes or status to 'Cancelled'."]);
                    return;
                }
            }
        }


        if ($appointment->update()) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Appointment updated successfully.', 'data' => $this->formatAppointmentResponse($appointment)]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to update appointment.']);
        }
    }

    /**
     * Handles DELETE /api/appointments/{id}
     * Deletes an appointment by its UUID.
     * Requires 'Administrator' or 'Support Agent' role. Customers cannot delete.
     *
     * @param string $id The UUID of the appointment to delete.
     */
    public function deleteAppointment(string $id): void
    {
        if (!AuthManager::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to delete an appointment.']);
            return;
        }

        $authenticatedUserRole = AuthManager::getAuthenticatedRoleName();
        if ($authenticatedUserRole !== 'Administrator' && $authenticatedUserRole !== 'Support Agent') {
            http_response_code(403); // Forbidden
            echo json_encode(['status' => 'error', 'message' => 'Access denied. Only administrators and support agents can delete appointments.']);
            return;
        }

        $appointment = AppointmentModel::find($id);
        if (!$appointment) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Appointment not found.']);
            return;
        }

        if (AppointmentModel::delete($id)) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Appointment deleted successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete appointment.']);
        }
    }
}

?>