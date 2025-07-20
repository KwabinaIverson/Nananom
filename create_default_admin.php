<?php

declare(strict_types=1);

// Define the root directory of the application
define('APP_ROOT', __DIR__);

// 1. Autoloading: Automatically load classes
require_once APP_ROOT . '/vendor/autoload.php';

// 2. Load Configuration Files (for DB credentials and role constants)
require_once APP_ROOT . '/app/config/database.php';
require_once APP_ROOT . '/app/config/app.php';

// 3. Initialize Database Connection
use App\Core\Database;
use App\Models\User;
use App\Models\Role;

try {
    $GLOBALS['db'] = new Database();
    echo "Database connection established successfully.\n";

    // --- Default Admin User Configuration ---
    $adminEmail = 'admin@nananom.com';
    $adminPassword = 'password123';
    $adminFirstName = 'Super';
    $adminLastName = 'Admin';
    $adminPhoneNumber = '0123456789';

    echo "Attempting to create admin user: {$adminEmail}\n";

    // Check if admin user already exists
    if (User::findByEmail($adminEmail)) {
        echo "Admin user with email '{$adminEmail}' already exists. Skipping creation.\n";
        exit;
    }

    // Find the 'Administrator' role
    $adminRole = Role::findByName('Administrator');

    if (!$adminRole) {
        echo "Error: 'Administrator' role not found in the database. Please ensure your 'Role' table is seeded correctly.\n";
        echo "You might need to re-run the nananom_farmdb.sql script in phpMyAdmin.\n";
        exit;
    }

    echo "Found 'Administrator' role with ID: " . $adminRole->getId() . "\n";

    // Create a new UserModel instance
    $adminUser = new User();
    $adminUser->setFirstName($adminFirstName);
    $adminUser->setLastName($adminLastName);
    $adminUser->setEmail($adminEmail);
    $adminUser->setPhoneNumber($adminPhoneNumber);
    $adminUser->setPasswordHash(password_hash($adminPassword, PASSWORD_DEFAULT));
    $adminUser->setRoleId($adminRole->getId());

    // Save the new user
    if ($adminUser->save()) {
        echo "Administrator user '{$adminEmail}' created successfully!\n";
        echo "User ID: " . $adminUser->getId() . "\n";
        echo "Password: {$adminPassword} (REMEMBER TO CHANGE THIS!)\n";
        echo "You can now log in with these credentials via POST /api/login or /admin/login.\n";
    } else {
        echo "Failed to create administrator user.\n";
    }

} catch (\PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
} catch (\Exception $e) {
    echo "An unexpected error occurred: " . $e->getMessage() . "\n";
}

?>