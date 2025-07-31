
-----

# Nananom Farms System Updates - Frontend & Backend Integration (July 2025)

This document summarizes the recent frontend updates and outlines the critical backend tasks required to support these changes and ensure full system functionality.

## 1\. Database Schema Update

The core database schema has been updated to use **UUIDs (Universally Unique Identifiers)** as primary keys (`VARCHAR(36)`) for all main tables instead of auto-incrementing integers. This provides greater flexibility and collision avoidance, especially in distributed environments.

**Key Schema Changes:**

  * `Role`: `RoleID` is now `VARCHAR(36)`.
  * `User`: `UserID` is now `VARCHAR(36)`, and a `PhoneNumber` column has been added.
  * `Service`: `ServiceID` is now `VARCHAR(36)`.
  * `Appointment`: `AppointmentID` is now `VARCHAR(36)`, with additional columns like `AppointmentDate`, `AppointmentTime`, `Status`, `Notes`.
  * `Enquiry`: `EnquiryID` is now `VARCHAR(36)`, with new fields for `Subject`, `Message`, `Status`, `Name`, `Email`, `PhoneNumber`, and a nullable `UserID` foreign key.
  * All foreign keys now correctly reference `VARCHAR(36)` UUIDs.
  * Default `Role` data is included with UUID generation (`UUID()`) in the SQL script.

**Backend Guy - Action Required (Database):**

1.  **Drop Existing Database (CAUTION: This deletes all data\!):**
      * If you have an existing `nananom_farms` database from previous setups, you need to drop it first to apply the new schema cleanly.
      * `DROP DATABASE nananom_farms;`
2.  **Create New Database:**
      * `CREATE DATABASE nananom_farms;`
3.  **Import New Schema:**
      * A new SQL dump file, `new_nananom_farmdb.sql` (or similar, containing the schema provided previously), must be imported into the newly created `nananom_farms` database.
      * Example CLI command: `mysql -u your_db_username -p nananom_farms < path/to/new_nananom_farmdb.sql`
      * This will create all tables with the UUID primary keys and insert the initial `Role` data.

## 2\. Frontend Dashboard Implementations

Three main dashboard files (`AdminDashboard.jsx`, `AgentDashboard.jsx`, `CustomerDashboard.jsx`) have been implemented/updated. These dashboards now attempt to fetch real data from the backend.

**Frontend Files Updated/Added:**

  * `src/pages/Dashboard/AdminDashboard.jsx`
  * `src/pages/Dashboard/AgentDashboard.jsx`
  * `src/pages/Dashboard/CustomerDashboard.jsx`
  * `src/services/dashboardService.js` (NEW - for aggregated stats)
  * `src/services/appointmentService.js` (NEW - for Appointment API calls)
  * `src/services/enquiryService.js` (NEW - for Enquiry API calls)
  * `src/services/userService.js` (Previously mentioned, also critical for users)
  * `src/services/serviceService.js` (Previously mentioned, also critical for services)
  * `src/services/api.js` (Existing base API handler)

## 3\. Backend Guy - CRITICAL Action Required (API Endpoints & Code)

The frontend is now expecting specific API responses and handling UUIDs. Your immediate tasks are to implement/update the backend API endpoints to match.

### A. Core UUID Handling Across All Endpoints

  * **UUID Generation:** For *every new record* created in `Role`, `User`, `Service`, `Appointment`, `Enquiry`, your PHP backend must **generate a UUID** (e.g., using `ramsey/uuid` library) *before* inserting the record into the database. You can no longer rely on auto-incrementing IDs.
  * **Database Operations:** All `SELECT`, `UPDATE`, and `DELETE` operations that use primary keys or foreign keys must now correctly handle `VARCHAR(36)` UUID strings as identifiers.
  * **Model/Entity Updates:** Update your PHP models/entities to reflect the new `VARCHAR(36)` data types for primary keys and foreign keys, as well as any new columns (`PhoneNumber`, `AppointmentDate`, `AppointmentTime`, `Subject`, `Message`, etc.).

### B. Specific API Endpoint Implementations/Updates

**1. NEW: Admin Dashboard Statistics Endpoint**

  * **Endpoint:** `GET /api/dashboard/admin-stats`
  * **Purpose:** Provides aggregated counts for the Admin Dashboard.
  * **Authentication/Authorization:** MUST be protected by JWT and only accessible by users with the `Administrator` role.
  * **Expected JSON Response:**
    ```json
    {
        "totalUsers": 120,             // COUNT of all users in the 'User' table
        "activeServices": 30,         // COUNT of services where 'IsActive' is TRUE in the 'Service' table
        "pendingAppointments": 5,    // COUNT of appointments where 'Status' is 'Pending' in the 'Appointment' table
        "newEnquiries": 8            // COUNT of enquiries where 'Status' is 'New' or 'Open' in the 'Enquiry' table
    }
    ```
  * **Conceptual SQL Queries:**
    ```sql
    SELECT COUNT(UserID) FROM `User`;
    SELECT COUNT(ServiceID) FROM `Service` WHERE `IsActive` = TRUE;
    SELECT COUNT(AppointmentID) FROM `Appointment` WHERE `Status` = 'Pending';
    SELECT COUNT(EnquiryID) FROM `Enquiry` WHERE `Status` = 'New' OR `Status` = 'Open';
    ```

**2. UPDATED: Appointment Endpoints**

  * **Endpoints:**
      * `GET /api/appointments`
      * `GET /api/appointments/{uuid}`
      * `POST /api/appointments`
      * `PUT /api/appointments/{uuid}`
      * `DELETE /api/appointments/{uuid}`
  * **Purpose:** Manage service appointments.
  * **Authentication/Authorization:** All should be protected by JWT.
      * `GET /api/appointments`:
          * For `Administrator`/`Support Agent` roles: Should return ALL appointments.
          * For `Customer` role: **MUST filter to return ONLY appointments belonging to the authenticated user (based on `UserID` derived from JWT).**
      * `POST`: Typically customer-facing. `UserID` for the new appointment should be derived from the authenticated user's JWT.
      * `PUT`/`DELETE`: Restricted to `Administrator`/`Support Agent` roles, or possibly allowing a `Customer` to cancel/modify *their own* appointment (requires backend ownership check).
  * **Data Handling:** Ensure all `AppointmentID` and `UserID`/`ServiceID` foreign keys are handled as UUID strings. `AppointmentDate` and `AppointmentTime` should be correctly parsed/formatted.

**3. UPDATED: Enquiry Endpoints**

  * **Endpoints:**
      * `GET /api/enquiries`
      * `GET /api/enquiries/{uuid}`
      * `POST /api/enquiries`
      * `PUT /api/enquiries/{uuid}`
      * `DELETE /api/enquiries/{uuid}`
  * **Purpose:** Manage customer enquiries.
  * **Authentication/Authorization:** All should be protected by JWT.
      * `GET /api/enquiries`:
          * For `Administrator`/`Support Agent` roles: Should return ALL enquiries.
          * For `Customer` role: **MUST filter to return ONLY enquiries belonging to the authenticated user (based on `UserID` derived from JWT, if provided).** Note: `UserID` is nullable for enquiries, allow unauthenticated submission if designed that way.
      * `POST`: Can be public (no JWT required) for general contact forms, or authenticated. If authenticated, `UserID` should be derived from JWT.
      * `PUT`/`DELETE`: Restricted to `Administrator`/`Support Agent` roles, or potentially allowing a `Customer` to delete *their own* enquiry.
  * **Data Handling:** Ensure `EnquiryID` and nullable `UserID` foreign key are handled as UUID strings.

**4. UPDATED: `create_admin.php` Script**

  * This script needs to be modified.
  * It must **generate a UUID** for the `UserID` of the new administrator.
  * It must **fetch the actual UUID of the 'Administrator' role** from the `Role` table (which was inserted with `UUID()` when you ran the new schema SQL). It cannot hardcode `RoleID = 1` or any other integer.

## 4\. General Backend Best Practices:

  * **Error Handling:** Implement robust error handling for database operations and API requests. Return meaningful JSON error responses (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
  * **Input Validation:** Always validate and sanitize all incoming user input (e.g., form data, URL parameters) to prevent security vulnerabilities like SQL injection and XSS.
  * **Password Hashing:** Ensure passwords are securely hashed using strong, modern algorithms (e.g., `password_hash()` in PHP) before storing them.
  * **Database Connectivity:** Verify your PHP application's database connection (e.g., PDO) is correctly configured to connect to the `nananom_farms` database.
  * **CORS:** Ensure your backend has proper Cross-Origin Resource Sharing (CORS) headers configured to allow requests from your React frontend's origin (e.g., `http://localhost:3000`).

-----

**Next Steps:**

Please prioritize updating the database with the new schema, and then focus on implementing/adjusting the API endpoints according to the requirements above.
-----






















Okay, here's a Markdown document detailing the latest updates concerning user authentication (login and registration) and the corresponding backend requirements.

-----

# Nananom Farms System Updates - User Authentication & Routing (July 2025)

This document covers the implementation of core user authentication features (login, registration, and logout) on the frontend, and outlines the critical backend API endpoints required to support them.

## 1\. Frontend Authentication Module (`src/services/auth.js`)

A dedicated authentication service has been created/updated to centralize all logic related to user authentication, token management, and role storage.

  * **File:** `src/services/auth.js`
  * **Purpose:**
      * Handles `loginUser` and `registerUser` calls to the backend.
      * Manages storing and retrieving the JWT token, user role, and user ID in `localStorage`.
      * Provides helper functions for checking authentication status (`isAuthenticated`), getting token (`getToken`), user role (`getUserRole`), and user ID (`getUserId`).
      * Includes `logoutUser` to clear client-side data and optionally inform the backend.
  * **Key Functions & Interaction:**
      * `loginUser(credentials)`: Sends login request to `/api/login`. **Expects backend to return `token`, `role`, and `userId` directly in the response.** Automatically calls `storeAuthData` to save these to `localStorage`.
      * `registerUser(userData)`: Sends registration request to `/api/register`.
      * `logoutUser()`: Clears authentication data from `localStorage`. Optionally sends a request to `/api/logout` (if implemented on the backend for server-side token invalidation).
  * **Important Note:** This service **uses the `post` function from `src/services/api.js`** for all network requests. This ensures consistent header handling (like `Content-Type`, `Accept`) and error processing across the application.

## 2\. Frontend Authentication Pages

Two new pages have been created to provide the user interface for login and registration.

### A. Login Page (`src/pages/Auth/LoginPage.jsx`)

  * **File:** `src/pages/Auth/LoginPage.jsx`
  * **Purpose:** Provides a form for users to enter their email and password to log in.
  * **Interaction:**
      * Calls `loginUser` from `src/services/auth.js` upon form submission.
      * **Does NOT directly interact with `localStorage`**. It relies on `loginUser` to handle the storage of authentication data.
      * Upon successful login, it receives the `role` from the `loginUser`'s response and redirects the user to the appropriate dashboard (`/admin/dashboard`, `/agent/dashboard`, or `/customer/dashboard`).
  * **Role Mapping:**
      * `'Administrator'` role redirects to `/admin/dashboard`.
      * `'Support Agent'` role redirects to `/agent/dashboard`.
      * `'Customer'` role redirects to `/customer/dashboard`.

### B. Register Page (`src/pages/Auth/RegisterPage.jsx`)

  * **File:** `src/pages/Auth/RegisterPage.jsx`
  * **Purpose:** Provides a form for new users to register an account.
  * **Interaction:**
      * Handles client-side password and confirm password validation.
      * Upon form submission, it calls `registerUser` from `src/services/auth.js`.
      * **Defaults the user's `role` to `'Customer'`** when sending registration data to the backend.
      * Displays success or error messages based on the backend response.
      * Automatically redirects to the `/login` page after a successful registration.

-----

## 3\. Backend Guy - CRITICAL Action Required (Authentication Endpoints)

The frontend is now ready to interact with your authentication API endpoints. You must ensure these endpoints are correctly implemented and return the expected data format.

### A. User Login Endpoint

  * **Endpoint:** `POST /api/login`
  * **Purpose:** Authenticates a user based on provided credentials.
  * **Request Body (JSON):**
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```
  * **Success Response (JSON - HTTP Status 200 OK):**
    ```json
    {
        "message": "Login successful!",
        "token": "eyJhbGciOiJIUzI1Ni...", // The generated JWT
        "role": "Customer",              // The exact RoleName from your 'Role' table (e.g., 'Administrator', 'Support Agent', 'Customer')
        "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef" // The UUID of the logged-in user
    }
    ```
  * **Error Responses (JSON):**
      * `HTTP 401 Unauthorized`: For invalid credentials (email/password mismatch).
        ```json
        {
            "message": "Invalid credentials."
        }
        ```
      * `HTTP 400 Bad Request`: For missing fields or invalid format.
        ```json
        {
            "message": "Email and password are required."
        }
        ```
  * **Implementation Notes:**
      * Verify the provided `email` and `password` against the `User` table (after hashing the input password for comparison).
      * On successful authentication, generate a JWT token.
      * Crucially, retrieve the `RoleName` associated with the `UserID` and include it in the response.
      * The `userId` (UUID) from the `User` table must also be included.

### B. User Registration Endpoint

  * **Endpoint:** `POST /api/register`
  * **Purpose:** Allows new users to create an account.
  * **Request Body (JSON):**
    ```json
    {
        "name": "New User",
        "email": "newuser@example.com",
        "password": "securepassword123",
        "confirm_password": "securepassword123", // For server-side validation
        "role": "Customer" // Frontend sends this default role
    }
    ```
  * **Success Response (JSON - HTTP Status 201 Created or 200 OK):**
    ```json
    {
        "message": "Registration successful!",
        "user_id": "uuid-of-newly-created-user" // Optional: can return the new user's ID
    }
    ```
  * **Error Responses (JSON):**
      * `HTTP 400 Bad Request`: For validation errors (e.g., email already exists, passwords don't match, missing fields).
        ```json
        {
            "message": "Validation error: Email already taken.",
            "errors": { "email": ["The email has already been taken."] } // More detailed errors preferred
        }
        ```
      * `HTTP 500 Internal Server Error`: For unexpected server issues.
  * **Implementation Notes:**
      * Validate all incoming data (`name`, `email`, `password`, `confirm_password`).
      * Ensure the `email` is unique.
      * **Hash the password** using a strong algorithm (`password_hash()` in PHP).
      * **Generate a UUID for the new `UserID`** before insertion.
      * **Look up the `RoleID` (UUID)** for the 'Customer' role name from the `Role` table. This `RoleID` (UUID) must be assigned to the new user.
      * Insert the new user into the `User` table with the generated `UserID` and fetched `RoleID`.

### C. User Logout Endpoint (Optional Server-side Invalidation)

  * **Endpoint:** `POST /api/logout` (Recommended `POST` as it's an action, but `GET` is also possible if your current setup requires it)
  * **Purpose:** If your JWT implementation supports server-side token invalidation (e.g., blacklisting tokens), this endpoint would handle it.
  * **Request Headers:**
    ```
    Authorization: Bearer <JWT_TOKEN>
    ```
  * **Success Response (JSON - HTTP Status 200 OK):**
    ```json
    {
        "message": "Logged out successfully."
    }
    ```
  * **Implementation Notes:**
      * If you choose to implement this, extract the JWT token from the `Authorization` header.
      * Add the token's unique ID (JTI) to a blacklist or invalidate it in your token management system.
      * Note: For stateless JWTs, client-side token removal is often considered sufficient as the token will eventually expire.

-----

With these authentication components in place, the next step on the frontend is to set up the main application routing and protect your dashboard routes based on user authentication status and roles.
