<?php

// app/config/app.php

// Define application constants or settings here
define('APP_NAME', 'Nananom Farms API');
define('BASE_URL', 'http://localhost/Nananom/public');

// Error reporting settings (for development, set to E_ALL)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set default timezone
date_default_timezone_set('Africa/Accra');

// --- JWT Configuration ---
define('JWT_SECRET_KEY', '$2y$12$8mtWikTRybyPcK2tLYpw.OqBj597wykKeP3/nBSijD2gw2b54vsLK');

// JWT Expiration Times (in seconds)
define('JWT_EXPIRATION_CUSTOMER', 3600); // 1 hour for regular users
define('JWT_EXPIRATION_ADMIN', 86400);   // 24 hours for administrators and support agents

?>