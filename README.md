Nananom Farms Marketing Management System - Backend
This repository contains the backend API for the Nananom Farms Marketing Management System. It is built using PHP and provides a robust, secure, and modular foundation for managing farm services, user accounts, appointments, and customer enquiries.

Table of Contents
Features

Technologies Used

Prerequisites

Local Setup

1. Clone the Repository

2. Database Setup

3. Environment Configuration

4. Install Composer Dependencies

5. Web Server Configuration

6. Create Initial Admin User

API Endpoints

Public Endpoints

Protected Endpoints (Requires JWT)

Web-Based Admin Endpoints (PHP Session)

Deployment

Contributing

License

Features
User Management: Register, authenticate (login/logout) users with different roles (Administrator, Support Agent, Customer).

Role-Based Access Control (RBAC): Securely restrict access to API endpoints and actions based on user roles.

Service Management: CRUD operations for farm services (list, view, create, update, delete).

Appointment Management: CRUD operations for customer appointments, with role-based restrictions (customers manage their own, admins/support agents manage all).

Enquiry Management: Submit customer enquiries (publicly), and manage them (view, update, delete) by authorized personnel.

JWT Authentication: Stateless authentication for API endpoints.

PHP Session Authentication: Statefull authentication for the web-based admin login form.

Modular Architecture: Clean separation of concerns using Controllers, Models, and Core services.

Environment Variables: Secure configuration management using .env files.

Error Logging: Basic error logging for debugging.

Technologies Used
PHP: Version 8.1 or higher

Composer: PHP dependency manager

MySQL/MariaDB: Relational database

Apache/Nginx: Web server

Libraries:

vlucas/phpdotenv: Environment variable management

nikic/fast-route: High-performance routing

firebase/php-jwt: JSON Web Token implementation

ramsey/uuid: UUID generation

Prerequisites
Before you begin, ensure you have the following installed on your system:

PHP 8.1+

Composer

MySQL/MariaDB Server

Web Server (Apache with mod_rewrite enabled, or Nginx)

PHP Extensions: pdo_mysql, json, ``mbstring, openssl` (ensure these are enabled in your `php.ini`).

Git

For local development, XAMPP, WAMP, or MAMP are highly recommended as they bundle PHP, MySQL, and Apache.

Local Setup
Follow these steps to get the backend running on your local machine.

1. Clone the Repository
git clone https://github.com/your-username/nananom-farms-backend.git # Replace with your actual repo URL
cd nananom-farms-backend # Navigate into the project directory

2. Database Setup
Start MySQL/MariaDB: Ensure your database server is running (e.g., via XAMPP/WAMP/MAMP control panel).

Create Database:

Access your database management tool (e.g., phpMyAdmin at http://localhost/phpmyadmin).

Create a new database named nananom_farms.

Import Schema:

Select the nananom_farms database.

Go to the "Import" tab.

Choose the nananom_farmdb.sql file located in your project root.

Click "Go" to execute the script. This will create all tables and populate the Role table.

3. Environment Configuration
Create .env file: In the root of your project directory, create a new file named .env.

Add Environment Variables: Copy the following content into your new .env file.

# Application Settings
APP_NAME="Nananom Farms API"
BASE_URL="http://localhost/nananom-farms-backend/public" # Adjust this to your local web server path

# Database Credentials
DB_HOST="localhost"
DB_PORT="3306"
DB_DATABASE="nananom_farms"
DB_USERNAME="root"
DB_PASSWORD="" # Usually empty for XAMPP/WAMP root user, or your MySQL root password
DB_CHARSET="utf8mb4"
DB_CONNECTION_TYPE="mysql" # Or 'pgsql' if you switch to PostgreSQL locally

# JWT Secret Key (Generate a strong, random string)
JWT_SECRET_KEY="your_very_strong_and_random_jwt_secret_key_here_1234567890"

# JWT Expiration Times (in seconds)
JWT_EXPIRATION_CUSTOMER=3600    # 1 hour
JWT_EXPIRATION_ADMIN=86400      # 24 hours (for admin/support agents)

# Frontend URL (for CORS, if frontend is on a different domain/port)
FRONTEND_URL="http://localhost:3000" # Example for a React app on port 3000

Customize: Update BASE_URL, database credentials, JWT_SECRET_KEY, and FRONTEND_URL to match your local setup.

4. Install Composer Dependencies
Open your terminal or command prompt, navigate to the project root (nananom-farms-backend/), and run:

composer install

This will download all required PHP libraries and generate the vendor/autoload.php file.

5. Web Server Configuration
XAMPP/WAMP/MAMP:

Place the nananom-farms-backend folder directly into your web server's document root (e.g., C:\xampp\htdocs\).

Ensure Apache is running.

The .htaccess file in the public/ directory (provided in the project) should handle URL rewriting automatically.

Manual Apache/Nginx:

Configure your web server's virtual host to point its document root to the public/ directory of this project (/path/to/nananom-farms-backend/public).

Ensure mod_rewrite is enabled for Apache.

The .htaccess file in public/ is essential for Apache.

6. Create Initial Admin User
You'll need an initial administrator account to access protected admin endpoints.

Create create_admin.php: In the root of your project (nananom-farms-backend/), create a file named create_admin.php.

Add Content: Copy the content of the create-admin-script-final immersive (from previous discussions) into this file.

Customize (Optional): You can change the default admin email and password within this script.

Run the script:

php create_admin.php

This will insert a default admin user into your database.

CRITICAL: Delete the create_admin.php file immediately after successful execution. Never deploy this script to a production environment.

API Endpoints
The backend exposes the following RESTful API endpoints:

Public Endpoints
These endpoints do not require any authentication.

POST /api/register - Register a new customer user.

POST /api/login - Authenticate a user and receive a JWT.

GET /api/logout - Client-side token discard confirmation.

GET /api/services - List all available services.

GET /api/services/{id} - Retrieve details of a specific service.

POST /api/enquiries - Submit a new customer enquiry.

Protected Endpoints (Requires JWT)
These endpoints require a valid JWT in the Authorization: Bearer <token> header. Access is further restricted by user roles.

Method

Endpoint

Controller Method

Required Role(s)

Description

POST

/api/services

ServiceController@store

Administrator, Support Agent

Create a new service.

PUT

/api/services/{id}

ServiceController@update

Administrator, Support Agent

Update an existing service.

DELETE

/api/services/{id}

ServiceController@delete

Administrator, Support Agent

Delete a service.

GET

/api/appointments

AppointmentController@index

Customer, Administrator, Support Agent

List appointments (customers see own, others see all).

GET

/api/appointments/{id}

AppointmentController@show

Customer, Administrator, Support Agent

Retrieve a specific appointment (customers see own).

POST

/api/appointments

AppointmentController@store

Customer, Administrator, Support Agent

Book a new appointment.

PUT

/api/appointments/{id}

AppointmentController@update

Customer, Administrator, Support Agent

Update an appointment (customers limited to notes/cancel).

DELETE

/api/appointments/{id}

AppointmentController@delete

Administrator, Support Agent

Delete an appointment.

GET

/api/enquiries

EnquiryController@index

Administrator, Support Agent

List all enquiries.

GET

/api/enquiries/{id}

EnquiryController@show

Administrator, Support Agent

Retrieve a specific enquiry.

PUT

/api/enquiries/{id}

EnquiryController@update

Administrator, Support Agent

Update an enquiry (customers cannot update).

DELETE

/api/enquiries/{id}

EnquiryController@delete

Administrator, Support Agent, Customer

Delete an enquiry (customers can delete their own).

GET

/admin/dashboard

AdminController@dashboard

Administrator, Support Agent

Get admin dashboard data.

GET

/admin/users

AdminController@listUsers

Administrator, Support Agent

List all system users.

POST

/admin/users

AdminController@storeUser

Administrator, Support Agent

Create a new user (admin can create other admins).

Web-Based Admin Endpoints (PHP Session)
These are for the traditional web-based admin login form, not direct API calls from a frontend application.

GET /admin/login - Display the admin login form (HTML).

POST /admin/login - Process admin login form submission, set PHP session.

GET /admin/logout - Destroy admin PHP session, redirect to login.

Deployment
The backend is designed for deployment on platforms like Render. Refer to the project's deployment documentation for detailed instructions on hosting on Render, including Dockerfile configuration, environment variables, and database setup for a cloud environment.

Contributing
Contributions are welcome! Please follow standard Git Flow:

Fork the repository.

Create a new branch for your feature or bug fix.

Implement your changes.

Write tests (if applicable).

Ensure all existing tests pass.

Submit a pull request.

License
This project is open-sourced under the MIT License.