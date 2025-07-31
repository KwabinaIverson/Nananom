You're asking for the backend code to create a dedicated API endpoint for fetching dashboard statistics.

**Important Note:** As an AI, I can't directly write and provide runnable PHP code files for your backend project. However, I can provide the **conceptual logic**, **database queries**, and the **expected API response structure** that your backend developer will need to implement. I will also provide the **frontend code** to consume this new, more efficient endpoint.

-----

### Message for the Backend Developer

**To: Nananom Farms Backend Team**

**Subject: New API Endpoint for Admin Dashboard Statistics**

Hello Team,

The frontend is being updated to display key performance indicators (KPIs) on the Admin Dashboard. To optimize performance and reduce unnecessary data transfer, we need a dedicated API endpoint that returns aggregated statistics, rather than fetching full datasets and calculating on the frontend.

**Please implement the following new API endpoint:**

**1. Endpoint Details:**

  * **Method:** `GET`
  * **Path:** `/api/dashboard/admin-stats`
  * **Purpose:** To provide a summary of key metrics for the Admin Dashboard.
  * **Authentication:** This endpoint should be **protected (requires JWT token)** and accessible only by users with the `Administrator` role.

**2. Expected JSON Response Structure:**
The endpoint should return a JSON object with the following keys and their corresponding counts:

```json
{
    "totalUsers": 0,             // COUNT of all users in the 'User' table
    "activeServices": 0,         // COUNT of services where 'IsActive' is TRUE in the 'Service' table
    "pendingAppointments": 0,    // COUNT of appointments where 'Status' is 'Pending' in the 'Appointment' table
    "newEnquiries": 0            // COUNT of enquiries where 'Status' is 'New' or 'Open' in the 'Enquiry' table
}
```

*(The initial values (0) are placeholders; the actual counts should be returned.)*

**3. Backend Logic (Conceptual PHP / SQL):**

You will need to implement a new controller method (e.g., in a `DashboardController` or `AdminController`) that performs these database queries and constructs the JSON response.

```php
<?php
// Example (conceptual) PHP code for a DashboardController method

namespace App\Controllers; // Adjust namespace as per your project structure

use App\Models\User; // Assuming you have models for your tables
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Enquiry;
use PDO; // If using raw PDO

class DashboardController {

    // Assuming you have a database connection available (e.g., passed via constructor or global access)
    protected $db; // PDO instance or ORM connection

    public function __construct(PDO $dbConnection) {
        $this->db = $dbConnection;
    }

    public function getAdminDashboardStats() {
        // --- IMPORTANT: Ensure proper authentication and authorization checks here ---
        // This endpoint should ONLY be accessible by users with the 'Administrator' role.
        // If not authorized, return 403 Forbidden. If no token, 401 Unauthorized.

        try {
            // SQL Queries to get counts
            // Using prepared statements is highly recommended to prevent SQL injection.

            // 1. Total Users
            $stmtUsers = $this->db->prepare("SELECT COUNT(UserID) AS total FROM `User`");
            $stmtUsers->execute();
            $totalUsers = $stmtUsers->fetch(PDO::FETCH_ASSOC)['total'];

            // 2. Active Services
            $stmtServices = $this->db->prepare("SELECT COUNT(ServiceID) AS total FROM `Service` WHERE `IsActive` = TRUE");
            $stmtServices->execute();
            $activeServices = $stmtServices->fetch(PDO::FETCH_ASSOC)['total'];

            // 3. Pending Appointments
            $stmtAppointments = $this->db->prepare("SELECT COUNT(AppointmentID) AS total FROM `Appointment` WHERE `Status` = 'Pending'");
            $stmtAppointments->execute();
            $pendingAppointments = $stmtAppointments->fetch(PDO::FETCH_ASSOC)['total'];

            // 4. New Enquiries
            // Assuming 'New' and 'Open' are considered "new" statuses. Adjust if your statuses differ.
            $stmtEnquiries = $this->db->prepare("SELECT COUNT(EnquiryID) AS total FROM `Enquiry` WHERE `Status` = 'New' OR `Status` = 'Open'");
            $stmtEnquiries->execute();
            $newEnquiries = $stmtEnquiries->fetch(PDO::FETCH_ASSOC)['total'];

            // Construct the response array
            $stats = [
                'totalUsers' => (int)$totalUsers,
                'activeServices' => (int)$activeServices,
                'pendingAppointments' => (int)$pendingAppointments,
                'newEnquiries' => (int)$newEnquiries,
            ];

            // Set Content-Type header and return JSON response
            header('Content-Type: application/json');
            echo json_encode($stats);
            exit; // Stop further execution

        } catch (\PDOException $e) {
            // Log the error and return a generic server error
            error_log("Database error in getAdminDashboardStats: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['message' => 'Internal server error.']);
            exit;
        }
    }
}

// --- Route Definition (conceptual, e.g., in routes.php or web.php) ---
// You will need to define a route that maps GET /api/dashboard/admin-stats
// to the getAdminDashboardStats method of your DashboardController.
// Also, ensure this route is part of your JWT protected group and has an 'admin' middleware.

/*
// Example using a simple router (adjust to your actual routing system)
$router->get('/api/dashboard/admin-stats', 'DashboardController@getAdminDashboardStats')
       ->middleware('auth:api', 'role:admin'); // Assuming you have auth and role middleware
*/
```

**4. Backend Database Considerations:**

  * Ensure your database connection can handle these `SELECT COUNT(*)` queries.
  * The `Status` values (`Pending`, `New`, `Open`) in the SQL queries must exactly match the values used in your database.

-----

### Frontend Code Updates

Once the backend implements the `/api/dashboard/admin-stats` endpoint, your frontend `AdminDashboard.jsx` can be streamlined to fetch these aggregated numbers directly.

**1. Create `src/services/dashboardService.js`**

```javascript
// src/services/dashboardService.js
import { get } from './api';

/**
 * Fetches aggregated statistics for the Admin Dashboard from the backend.
 * This is a protected endpoint.
 * @returns {Promise<Object>} A promise that resolves with an object of dashboard statistics.
 */
export const getAdminDashboardStats = async () => {
  try {
    // Calls the new /api/dashboard/admin-stats endpoint
    const data = await get('/dashboard/admin-stats');
    return data;
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error.message);
    throw error;
  }
};

// You might add similar functions for Agent/Customer dashboards if they get dedicated stats endpoints.
```

**2. Update `src/pages/Dashboard/AdminDashboard.jsx`**

Modify the `useEffect` block to use the new `getAdminDashboardStats` function.

```jsx
// src/pages/Dashboard/AdminDashboard.jsx (Modified useEffect)
import React, { useState, useEffect } from 'react';
import { getUserRole, getToken } from '../../services/auth';
// No longer directly importing getAllServices, getAllUsers, etc. for main stats
import { getAdminDashboardStats } from '../../services/dashboardService'; // Import new stats service

// If you still need recent lists, you would keep these imports and fetch them separately
import { getAllServices } from '../../services/serviceService';
import { getAllUsers } from '../../services/userService';
// ... other imports for recent lists if needed


const AdminDashboard = () => {
  const userId = getToken(); // Use getToken to retrieve the token (often used as user ID representation in UI)
  const roleName = getUserRole(); // Use getUserRole to retrieve the role name

  // State for fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    activeServices: 0,
    pendingAppointments: 0,
    newEnquiries: 0,
  });
  const [recentServices, setRecentServices] = useState([]); // Still need this for recent services list
  const [recentUsers, setRecentUsers] = useState([]);     // Still need this for recent users list


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch aggregated dashboard stats from the new backend endpoint
        const stats = await getAdminDashboardStats();
        setDashboardStats(stats);

        // Fetch recent lists separately if backend doesn't combine them with stats
        // If your backend implements specific endpoints for "recent" items, use those.
        // Otherwise, you can still fetch all and slice, but optimize if possible.
        const [servicesData, usersData] = await Promise.all([
             getAllServices(), // Assuming these still return all services/users
             getAllUsers(),
        ]);
        setRecentServices(servicesData.slice(0, 5)); // Take top 5 for recent display
        setRecentUsers(usersData.slice(0, 5));

      } catch (err) {
        setError("Failed to load dashboard data. Please ensure backend is running and you are authorized.");
        console.error("Dashboard data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... rest of your AdminDashboard component JSX remains the same ...
  // It will now display data from `dashboardStats` directly.
  return (
    // ... JSX ...
  );
};

export default AdminDashboard;
```

-----

By implementing this new dedicated endpoint, your backend can provide aggregated data much more efficiently, and your frontend will be able to display dashboard statistics with minimal processing, leading to a faster and more responsive user experience.