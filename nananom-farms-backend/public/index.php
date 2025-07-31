<?php

declare(strict_types=1);

// Define the root directory of the application.
// This ensures paths are correct regardless of where index.php is executed.
define('APP_ROOT', dirname(__DIR__));

// Autoload Composer dependencies.
// This loads classes from your 'vendor' directory (e.g., FastRoute, Firebase/JWT).
require_once APP_ROOT . '/vendor/autoload.php';

// Load application configuration files.
// These files typically contain constants like database credentials and base URLs.
require_once APP_ROOT . '/app/config/database.php';
require_once APP_ROOT . '/app/config/app.php';

// Use the AuthManager for handling JWT validation.
use App\Core\AuthManager;
use App\Core\Database; // Use the Database class

// --- JWT Authentication Handling (before routing) ---
// This block attempts to validate a JWT from the Authorization header
// for every incoming request. If valid, the user's payload is stored.

// Get the Authorization header from the request.
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

// Check if the header exists and starts with "Bearer ".
// The regular expression extracts the actual token string.
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $jwt = $matches[1]; // The captured JWT token
   // Log for debugging purposes: token found.
   // Consider using a proper logger with configurable levels
   if (defined('APP_DEBUG') && APP_DEBUG) {
       error_log("DEBUG: " . date('Y-m-d H:i:s') . " JWT found in Authorization header. Attempting validation.");
   }

    // Validate the token using the AuthManager.
    $payload = AuthManager::validateToken($jwt);

    if ($payload) {
        // If the token is valid, store the decoded payload in AuthManager.
        // This payload can then be accessed by controllers for authenticated requests.
        AuthManager::setAuthenticatedUserPayload($payload);
        // Log for debugging purposes: token validated.
        error_log("DEBUG: " . date('Y-m-d H:i:s') . " JWT successfully validated and user payload set.");
    } else {
        // Log for debugging purposes: token invalid.
        error_log("DEBUG: " . date('Y-m-d H:i:s') . " JWT validation failed or token is invalid.");
    }
} else {
    // Log for debugging purposes: no token found.
    error_log("DEBUG: " . date('Y-m-d H:i:s') . " No Bearer token found in Authorization header.");
}

// --- Global HTTP Headers ---
// Set Content-Type header to JSON for all responses.
// This tells the client that the server will respond with JSON data.
header("Content-type: application/json; charset=UTF-8");

// Set CORS headers based on environment
$allowedOrigins = defined('ALLOWED_ORIGINS') ? ALLOWED_ORIGINS : ['http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// Handle OPTIONS requests (pre-flight for CORS).
// Browsers send an OPTIONS request before actual PUT/POST/DELETE requests.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // Exit immediately for OPTIONS requests
}

// --- Database Connection Initialization ---
// Initialize the database connection and store it in a global variable.
// This makes the database instance accessible throughout the application.
$GLOBALS['db'] = new Database();

// --- FastRoute Setup ---
// Define application routes using FastRoute's simpleDispatcher.
// Each route maps an HTTP method and URI pattern to a controller method.
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    // User Authentication Routes
    $r->addRoute('POST', '/api/register', 'AuthController@register');
    $r->addRoute('POST', '/api/login', 'AuthController@login');
    $r->addRoute('GET', '/api/logout', 'AuthController@logout');

    // API Routes for Appointments (assuming UUIDs for IDs)
    $r->addRoute('GET', '/api/appointments', 'AppointmentController@getAppointments');
    $r->addRoute('GET', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@getAppointment');
    $r->addRoute('POST', '/api/appointments', 'AppointmentController@createAppointment');
    $r->addRoute('PUT', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@updateAppointment');
    $r->addRoute('DELETE', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@deleteAppointment');

    // API Routes for Services (assuming UUIDs for IDs)
    $r->addRoute('GET', '/api/services', 'ServiceController@getServices');
    $r->addRoute('GET', '/api/services/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'ServiceController@getService');
    // Admin-specific service routes (might require authentication/authorization checks in controller)
    $r->addRoute('POST', '/api/admin/services', 'ServiceController@createService');
    $r->addRoute('PUT', '/api/admin/services/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'ServiceController@updateService');
    $r->addRoute('POST', '/api/enquiries', 'EnquiryController@createEnquiry');
    // API Routes for Enquiries (assuming UUIDs for IDs)
    $r->addRoute('GET', '/api/enquiries', 'EnquiryController@getEnquiries');
    $r->addRoute('GET', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@getEnquiry');
    $r->addRoute('POST', '/api/enquiries', 'EnquiryController@createEnquiry');
    $r->addRoute('PUT', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@update');
    $r->addRoute('DELETE', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@delete');

    // Admin Panel Routes (Example: routes specific to an admin dashboard)
    $r->addRoute('GET', '/admin/dashboard', 'AdminController@dashboard');
    $r->addRoute('POST', '/api/admin/register', 'AdminController@register'); // Admin-specific registration
    $r->addRoute('POST', '/api/admin/login', 'AuthController@login'); // Admin login (can reuse AuthController)
    $r->addRoute('GET', '/api/admin/logout', 'AuthController@logout'); // Admin logout (can reuse AuthController)

    // Example of a catch-all route (optional, for debugging or simple page serving)
    // $r->addRoute('GET', '/', function() { echo json_encode(['message' => 'Welcome to Nananom Farms API!']); });
});

// --- Request URI Processing ---
// Fetch the current request URI and HTTP method.
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Remove query string parameters (e.g., ?param=value) from the URI.
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}

// Normalize the URI: remove the base path if the application is in a subdirectory.
// This is crucial for FastRoute to match routes correctly when the app isn't at the domain root.
$basePath = parse_url(BASE_URL, PHP_URL_PATH); // Gets '/Nananom/public/' from BASE_URL
if (str_starts_with($uri, $basePath)) {
    $uri = substr($uri, strlen($basePath)); // E.g., '/api/login' remains from '/Nananom/public/api/login'
}

// Ensure the URI always starts with a slash, as FastRoute expects this.
if (empty($uri)) {
    $uri = '/'; // If stripping results in empty string, default to root.
}


// --- Request Dispatching ---
// Dispatch the processed URI and HTTP method to FastRoute.
// This determines if a matching route exists and extracts variables if any.
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

// Handle the dispatching result.
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // No route matched the URI.
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Resource not found.']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        // A route matched the URI, but not the HTTP method (e.g., GET on a POST-only route).
        $allowedMethods = $routeInfo[1];
        http_response_code(405);
        header('Allow: ' . implode(', ', $allowedMethods)); // Inform client about allowed methods
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed.', 'allowed_methods' => $allowedMethods]);
        break;
    case FastRoute\Dispatcher::FOUND:
        // A route was found and matched.
        $handler = $routeInfo[1]; // e.g., 'AuthController@login'
        $vars = $routeInfo[2];   // e.g., ['id' => '123e4567-e89b-12d3-a456-426614174000']

        // Split the handler string into controller class name and method name.
        list($controllerName, $methodName) = explode('@', $handler);

        // Prepend the full namespace for the controller.
        $controllerClass = 'App\\Controllers\\' . $controllerName;

        // Check if the controller class exists.
        if (class_exists($controllerClass)) {
            // Instantiate the controller.
            $controller = new $controllerClass();

            // Check if the method exists on the controller.
            if (method_exists($controller, $methodName)) {
                // Call the controller method with extracted route variables.
                // This is where your actual API logic in the controller gets executed.
                try {
                // Instantiate the controller.
                $controller = new $controllerClass();
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Controller instantiation failed.']);
                break;
            }

            // Call the controller method with extracted route variables.
            call_user_func_array([$controller, $methodName], $vars);
        } else {
            // Controller method not found (shouldn't happen if routes are correct).
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Controller method not found.']);
        }
    } else {
        // Controller class not found (typo in route definition or class name).
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Controller class not found.']);
    }
    break;
}

?>