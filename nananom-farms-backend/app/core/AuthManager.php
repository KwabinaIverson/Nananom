<?php

namespace App\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use UnexpectedValueException;

/**
 * AuthManager Class
 *
 * Provides static helper methods for JWT-based authentication and authorization.
 * Handles JWT generation, validation, and extraction of user data from tokens.
 */
class AuthManager
{
    // Store the authenticated user's payload from the validated JWT
    private static ?array $authenticatedUserPayload = null;

    /**
     * Sets the authenticated user payload after successful JWT validation.
     * This method is typically called by the main application bootstrap (e.g., public/index.php).
     *
     * @param array $payload The decoded JWT payload.
     */
    public static function setAuthenticatedUserPayload(array $payload): void
    {
        self::$authenticatedUserPayload = $payload;
        error_log("DEBUG: AuthManager: Authenticated user payload set: " . json_encode($payload));
    }

    /**
     * Generates a JSON Web Token (JWT) for a given user.
     *
     * @param string $userId The UUID of the user.
     * @param string $roleId The UUID of the user's role.
     * @param string $roleName The name of the user's role (e.g., 'Customer', 'Administrator').
     * @return string The generated JWT.
     */
    public static function generateToken(string $userId, string $roleId, string $roleName): string
    {
        $expirationTime = ($roleName === 'Administrator' || $roleName === 'Support Agent')
            ? JWT_EXPIRATION_ADMIN
            : JWT_EXPIRATION_CUSTOMER;

        $issuedAt = time();
        $expireAt = $issuedAt + $expirationTime;

        $payload = [
            'iss' => BASE_URL,
            'aud' => BASE_URL,
            'iat' => $issuedAt,
            'exp' => $expireAt,
            'data' => [
                'userId' => $userId,
                'roleId' => $roleId,
                'roleName' => $roleName
            ]
        ];

        error_log("DEBUG: AuthManager: Generating JWT with payload: " . json_encode($payload));

        return JWT::encode($payload, JWT_SECRET_KEY, 'HS256');
    }

    /**
     * Validates a given JWT.
     *
     * @param string $jwt The JWT string to validate.
     * @return array|null The decoded JWT payload if valid, null otherwise.
     */
    public static function validateToken(string $jwt): ?array
    {
        try {
            // Decode the JWT
            $decoded = JWT::decode($jwt, new Key(JWT_SECRET_KEY, 'HS256'));

            // Convert object to array for consistent access
            $decoded_array = (array) $decoded;
            $data = (array) $decoded_array['data'];

            // Perform additional checks if necessary (e.g., check 'iss', 'aud')
            if ($decoded_array['iss'] !== BASE_URL || $decoded_array['aud'] !== BASE_URL) {
                error_log("DEBUG: AuthManager: JWT validation failed - Issuer or Audience mismatch.");
                return null;
            }

            error_log("DEBUG: AuthManager: JWT validated successfully. Payload: " . json_encode($data));
            return $data;
        } catch (ExpiredException $e) {
            error_log("DEBUG: AuthManager: JWT validation failed - Token expired: " . $e->getMessage());
            return null;
        } catch (SignatureInvalidException $e) {
            error_log("DEBUG: AuthManager: JWT validation failed - Invalid signature: " . $e->getMessage());
            return null;
        } catch (UnexpectedValueException $e) {
            error_log("DEBUG: AuthManager: JWT validation failed - Unexpected value: " . $e->getMessage());
            return null;
        } catch (\Exception $e) {
            error_log("DEBUG: AuthManager: JWT validation failed - General error: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Checks if a user is currently authenticated based on the validated JWT payload.
     *
     * @return bool True if a user is authenticated, false otherwise.
     */
    public static function isAuthenticated(): bool
    {
        return self::$authenticatedUserPayload !== null && !empty(self::$authenticatedUserPayload['userId']);
    }

    /**
     * Checks if the authenticated user has a specific role based on the JWT payload.
     *
     * @param string $roleName The name of the role to check against.
     * @return bool True if the user is authenticated and has the specified role, false otherwise.
     */
    public static function hasRole(string $roleName): bool
    {
        return self::isAuthenticated() &&
               isset(self::$authenticatedUserPayload['roleName']) &&
               self::$authenticatedUserPayload['roleName'] === $roleName;
    }

    /**
     * Gets the ID of the authenticated user from the JWT payload.
     *
     * @return string|null UserID (UUID) if authenticated, null otherwise.
     */
    public static function getAuthenticatedUserId(): ?string
    {
        return self::isAuthenticated() ? (self::$authenticatedUserPayload['userId'] ?? null) : null;
    }

    /**
     * Gets the RoleID (UUID) of the authenticated user from the JWT payload.
     *
     * @return string|null RoleID (UUID) if authenticated, null otherwise.
     */
    public static function getAuthenticatedRoleId(): ?string
    {
        return self::isAuthenticated() ? (self::$authenticatedUserPayload['roleId'] ?? null) : null;
    }

    /**
     * Gets the Role Name of the authenticated user from the JWT payload.
     *
     * @return string|null Role Name if authenticated, null otherwise.
     */
    public static function getAuthenticatedRoleName(): ?string
    {
        return self::isAuthenticated() ? (self::$authenticatedUserPayload['roleName'] ?? null) : null;
    }
}

?>