<?php

namespace App\Controllers;

use App\Models\ServiceModel; // Assuming you will create this model
use App\Core\Database; // Assuming you have this for direct DB access if needed (though models should handle it)

/**
 * ServiceController
 *
 * Handles API requests related to services (e.g., listing, retrieving, creating).
 */
class ServiceController
{
    // Constructor (optional, for dependency injection if needed)
    public function __construct()
    {
        // Models are typically instantiated within controller methods or via a factory
    }

    /**
     * Handles GET /api/services
     * Lists all available services.
     */
    public function index(): void
    {
        // In a real app, you'd fetch data from the ServiceModel
        // For now, let's return some mock data or fetch from a simple ServiceModel
        $services = ServiceModel::all();

        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'data' => $services]);
    }

    /**
     * Handles GET /api/services/{id}
     * Retrieves a single service by its UUID.
     *
     * @param string $id The UUID of the service.
     */
    // public function show(string $id): void
    // {
    //     $service = ServiceModel::find($id); // Assuming ServiceModel::find() exists

    //     header('Content-Type: application/json');
    //     if ($service) {
    //         echo json_encode(['status' => 'success', 'data' => $service]);
    //     } else {
    //         http_response_code(404);
    //         echo json_encode(['status' => 'error', 'message' => 'Service not found.']);
    //     }
    // }

    /**
     * Handles POST /api/services
     * Creates a new service.
     */
    public function store(): void
    {
        // Get raw POST data (assuming JSON input for API)
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // Basic validation (add more robust validation in a helper/validation class)
        if (json_last_error() !== JSON_ERROR_NONE || !isset($data['serviceName']) || !isset($data['description'])) {
            http_response_code(400); // Bad Request
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Service name and description are required.']);
            return;
        }

        // Create a new ServiceModel instance
        $newService = new ServiceModel();
        $newService->setServiceName($data['serviceName']);
        $newService->setDescription($data['description']);
        $newService->setPrice($data['price'] ?? 0.0); // Default to 0 if not provided
        $newService->setDurationMinutes($data['durationMinutes'] ?? 0);
        $newService->setIsActive($data['isActive'] ?? true);

        if ($newService->save()) {
            http_response_code(201); // Created
            echo json_encode(['status' => 'success', 'message' => 'Service created successfully.', 'data' => $newService]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Failed to create service.']);
        }
    }

    // Add update() and delete() methods similarly
}

?>