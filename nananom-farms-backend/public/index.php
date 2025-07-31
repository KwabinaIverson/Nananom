<?php

declare(strict_types=1);


// Define the root directory of the application
define('APP_ROOT', dirname(__DIR__));

require_once APP_ROOT . '/vendor/autoload.php';

require_once APP_ROOT . '/app/config/database.php';
require_once APP_ROOT . '/app/config/app.php';


// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


use App\Core\AuthManager;

// Get the Authorization header
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

// Check if the header exists and starts with "Bearer "
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $jwt = $matches[1];
    error_log("DEBUG: JWT found in Authorization header. Attempting validation.");
    $payload = AuthManager::validateToken($jwt);

    if ($payload) {
        // If token is valid, store the payload in AuthManager for later access
        AuthManager::setAuthenticatedUserPayload($payload);
        error_log("DEBUG: JWT successfully validated and user payload set.");
    } else {
        error_log("DEBUG: JWT validation failed or token is invalid.");
    }
} else {
    error_log("DEBUG: No Bearer token found in Authorization header.");
}

// Set JSON header for all responses
header("Content-type: application/json; charset=UTF-8");


// 4. Initialize Database Connection (using the Database class)
use App\Core\Database;
$GLOBALS['db'] = new Database();

// 5. Define Routes using FastRoute
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    // API Routes for Services

    // User Authentication
    $r->addRoute('POST', '/api/register', 'AuthController@register');
    $r->addRoute('POST', '/api/login', 'AuthController@login');
    $r->addRoute('GET', '/api/logout', 'AuthController@logout');

    // --- API Routes for Appointments ---
    $r->addRoute('GET', '/api/appointments', 'AppointmentController@getAppointments');
    $r->addRoute('GET', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@getAppointment');
    $r->addRoute('POST', '/api/appointments', 'AppointmentController@createAppointment');
    $r->addRoute('PUT', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@updateAppointment');
    $r->addRoute('DELETE', '/api/appointments/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'AppointmentController@deleteAppointment');



    // GET /api/services - Lists all services
    $r->addRoute('GET', '/api/services', 'ServiceController@getServices');
    $r->addRoute('GET', '/api/services/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'ServiceController@getService');
    $r->addRoute('POST', '/api/admin/services', 'ServiceController@createService');
    $r->addRoute('PUT', '/api/admin/services/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'ServiceController@updateService');
    $r->addRoute('DELETE', '/api/admin/services/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'ServiceController@deleteService');


    // --- API Routes for Enquiries ---
    $r->addRoute('GET', '/api/enquiries', 'EnquiryController@getEnquiries');
    $r->addRoute('GET', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@getEnquiry');
    $r->addRoute('POST', '/api/create_enquiries', 'EnquiryController@createEnquiry');
    $r->addRoute('PUT', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@update');
    $r->addRoute('DELETE', '/api/enquiries/{id:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}', 'EnquiryController@delete');



    // Admin Panel Routes (Example - you'll add more here)
    $r->addRoute('GET', '/admin/dashboard', 'AdminController@dashboard');
    $r->addRoute('POST', '/api/admin/register', 'AdminController@register');
    $r->addRoute('POST', '/api/admin/login', 'AuthController@login');
    $r->addRoute('GET', '/api/admin/logout', 'AuthController@logout');

});

// 6. Fetch the current URI and HTTP method
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}

// This removes the base path from the URI before dispatching
$basePath = parse_url(BASE_URL, PHP_URL_PATH);
if (str_starts_with($uri, $basePath)) {
    $uri = substr($uri, strlen($basePath));
}
// Ensure URI starts with a slash
if (empty($uri)) {
    $uri = '/';
}


// 7. Dispatch the request
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Resource not found.']);
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        http_response_code(405);
        header('Allow: ' . implode(', ', $allowedMethods));
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed.', 'allowed_methods' => $allowedMethods]);
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];

        // Split handler into controller and method
        list($controllerName, $methodName) = explode('@', $handler);

        // Prepend namespace for controllers
        $controllerClass = 'App\\Controllers\\' . $controllerName;

        if (class_exists($controllerClass)) {
            $controller = new $controllerClass();

            if (method_exists($controller, $methodName)) {
                call_user_func_array([$controller, $methodName], $vars);
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Controller method not found.']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Controller class not found.']);
        }
        break;
}

?>