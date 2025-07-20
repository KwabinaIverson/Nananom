<?php

namespace App\Controllers;

use App\Core\AuthManager;
use App\Models\User;
use App\Models\Role;

/**
 * AdminController
 *
 * Handles API requests related to the administration panel.
 * All methods in this controller are protected by JWT authentication
 * and specific role-based authorization (Administrator or Support Agent)
 * performed in the constructor. Responses are always JSON.
 */
class AdminController
{
    /**
     * Constructor.
     * Performs authentication and authorization checks for all admin API routes,
     * except for the login route.
     */
    public function __construct()
    {
        $route = $_SERVER['REQUEST_URI'] ?? '';
        $method = $_SERVER['REQUEST_METHOD'] ?? '';

        // Only skip auth for POST /admin/login
        if (!(preg_match('#/admin/login$#', $route) && strtoupper($method) === 'POST')) {
            header('Content-Type: application/json; charset=UTF-8');
            if (!AuthManager::isAuthenticated()) {
                http_response_code(401);
                echo json_encode(['status' => 'error', 'message' => 'Authentication required. Please provide a valid JWT.']);
                exit();
            }
            $userRole = AuthManager::getAuthenticatedRoleName();
            if ($userRole !== 'Administrator' && $userRole !== 'Support Agent') {
                http_response_code(403);
                echo json_encode(['status' => 'error', 'message' => 'Access denied. You do not have permission to access this resource.']);
                exit();
            }
        }
    }

    /**
     * Handles POST /admin/login
     * Authenticates an admin or support agent and returns a JWT.
     */
    public function login(): void
    {
        header('Content-Type: application/json; charset=UTF-8');
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = User::findByEmail($email);

        if (
            $user &&
            in_array($user->getRole()->getRoleName(), ['Administrator', 'Support Agent']) &&
            password_verify($password, $user->getPasswordHash())
        ) {
            $jwt = AuthManager::generateToken(
                $user->getId(),
                $user->getRoleId(),
                $user->getRole()->getRoleName()
            );
            http_response_code(200);
            echo json_encode([
                'status' => 'success',
                'message' => 'Admin login successful.',
                'token' => $jwt,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()->getRoleName()
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid admin credentials or insufficient privileges.'
            ]);
        }
    }

    /**
     * Shows the admin dashboard data.
     * Handles GET /admin/dashboard (API endpoint)
     * Returns JSON response.
     */
    public function dashboard(): void
    {
        $userId = AuthManager::getAuthenticatedUserId();
        $userRole = AuthManager::getAuthenticatedRoleName();

        $dashboardData = [
            'message' => "Welcome to the Admin Dashboard!",
            'user_id' => $userId,
            'user_role' => $userRole,
            'stats' => [
                'total_users' => 120,
                'pending_appointments' => 15,
                'new_enquiries' => 7,
                'active_services' => 5
            ],
            'recent_activity' => [
                ['type' => 'user_registered', 'details' => 'New customer signed up', 'timestamp' => '2025-07-18 10:00:00'],
                ['type' => 'appointment_booked', 'details' => 'Appointment for Palm Oil Delivery', 'timestamp' => '2025-07-18 09:30:00']
            ]
        ];

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $dashboardData]);
    }

    /**
     * Handles POST /admin/users
     * Creates a new user (admin/support agent/customer) via API.
     * Expects JSON input and returns JSON response.
     */
    public function register(): void
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $requiredFields = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'roleId'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => "Field '{$field}' is required."]);
                return;
            }
        }

        $firstName = trim($data['firstName']);
        $lastName = trim($data['lastName']);
        $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
        $password = $data['password'];
        $phoneNumber = trim($data['phoneNumber']);
        $roleId = trim($data['roleId']);

        if (!$email) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
            return;
        }
        if (strlen($password) < 8) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters long.']);
            return;
        }

        if (User::findByEmail($email)) {
            http_response_code(409);
            echo json_encode(['status' => 'error', 'message' => 'Email already registered.']);
            return;
        }

        $targetRole = Role::find($roleId);
        if (!$targetRole) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid role selected.']);
            return;
        }

        $authenticatedRole = AuthManager::getAuthenticatedRoleName();
        if ($targetRole->getRoleName() === 'Administrator' && $authenticatedRole !== 'Administrator') {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'You do not have permission to create Administrator users.']);
            return;
        }

        $newUser = new User();
        $newUser->setFirstName($firstName);
        $newUser->setLastName($lastName);
        $newUser->setEmail($email);
        $newUser->setPhoneNumber($phoneNumber);
        $newUser->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));
        $newUser->setRoleId($roleId);

        if ($newUser->save()) {
            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'User created successfully.',
                'user_id' => $newUser->getId(),
                'user_email' => $newUser->getEmail(),
                'user_role' => $targetRole->getRoleName()
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to create user.']);
        }
    }

    /**
     * Lists all users in the system.
     * Handles GET /admin/users (API endpoint)
     * Returns JSON response.
     */
    public function listUsers(): void
    {
        $users = User::all();
        $usersWithRoles = [];

        foreach ($users as $user) {
            $role = Role::find($user->getRoleId());
            $usersWithRoles[] = [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'phoneNumber' => $user->getPhoneNumber(),
                'roleName' => $role ? $role->getRoleName() : 'Unknown',
                'createdAt' => $user->getCreatedAt(),
                'updatedAt' => $user->getUpdatedAt(),
            ];
        }

        http_response_code(200);
        echo json_encode(['status' => 'success', 'data' => $usersWithRoles]);
    }
}

?>