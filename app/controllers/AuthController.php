<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Core\AuthManager;
/**
 * AuthController
 *
 * Handles user authentication processes (registration, login, logout)
 * for a pure API backend. All responses are JSON.
 */
class AuthController
{
    /**
     * Constructor.
     * Ensures all responses from this controller are JSON by default.
     */
    public function __construct()
    {
        header('Content-Type: application/json; charset=UTF-8');
    }

    /**
     * Handles POST /api/register
     * Allows new users (customers) to sign up.
     * Assigns the 'Customer' role by default.
     * Returns JSON response.
     */
    public function register(): void
    {
        // 1. Get raw POST data (assuming JSON input)
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        // 2. Basic Validation (add more robust validation using a ValidationHelper)
        if (json_last_error() !== JSON_ERROR_NONE ||
            !isset($data['firstName'], $data['lastName'], $data['email'], $data['password'], $data['phoneNumber'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'All fields (firstName, lastName, email, password, phoneNumber) are required.']);
            return;
        }

        $firstName = trim($data['firstName']);
        $lastName = trim($data['lastName']);
        $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
        $password = $data['password'];
        $phoneNumber = trim($data['phoneNumber']);

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

        // Check if email already exists
        if (User::findByEmail($email)) {
            http_response_code(409);
            echo json_encode(['status' => 'error', 'message' => 'Email already registered.']);
            return;
        }

        // Create a new Role for this user
        $customerRole = Role::findByName('Customer');
        if (!$customerRole) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'System error: Customer role not configured. Please contact support.']);
            return;
        }

        // Create a new UserModel instance
        $newUser = new User();
        $newUser->setFirstName($firstName);
        $newUser->setLastName($lastName);
        $newUser->setEmail($email);
        $newUser->setPhoneNumber($phoneNumber);
        $newUser->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));
        $newUser->setRoleId($customerRole->getId());

        // Save the new user
        if ($newUser->save()) {
            $jwt = AuthManager::generateToken(
                $newUser->getId(),
                $newUser->getRoleId(),
                $customerRole->getRoleName()
            );

            http_response_code(201);
            echo json_encode([
                'status' => 'success',
                'message' => 'User registered successfully.',
                'token' => $jwt
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to register user.']);
        }
    }

    /**
     * Handles POST /api/login
     * Authenticates users (customers, admins, support agents).
     * Always returns JSON response.
     */
    public function login(): void
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email and password are required.']);
            return;
        }

        // Authenticate the user
        $user = User::authenticate($email, $password);

        if ($user) {
            $role = Role::find((string)$user->getRoleId());
            $_SESSION['role_name'] = $role ? $role->getRoleName() : 'Unknown';

            $jwt = AuthManager::generateToken(
                $user->getId(),
                $user->getRoleId(),
                $role->getRoleName()
            );

            // Return success JSON response
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful.',
                'token' => $jwt
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
        }
    }

    /**
     * Handles GET /api/logout
     * Logs out the current user by destroying the session.
     * Always returns JSON response.
     */
    public function logout(): void
    {
        $_SESSION = [];

        session_destroy();

        echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
        exit();
    }
}

?>