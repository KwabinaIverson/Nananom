<?php
/**
 * Database Configuration File
 *
 * Defines constants for database connection parameters.
 * These values are loaded from the .env file using getenv().
 * The .env file is loaded by phpdotenv in public/index.php before this file is included.
 */

// app/config/database.php
return [
    'host'    => 'localhost',
    'port'    => '3306',
    'dbname'  => 'nananom_farm',
    'user'    => 'root',
    'pass'    => '',
    'charset' => 'utf8mb4'
];

?>