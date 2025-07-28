# Nananom Farms Marketing Management System - Backend

This repository contains the backend API for the **Nananom Farms Marketing Management System**. It is built using **PHP** and provides a robust, secure, and modular foundation for managing farm services, user accounts, appointments, and customer enquiries.

> **Note:** This project is strictly for academic purposes only.

---

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Setup Guide (Windows, macOS, Linux)](#setup-guide)
* [API Endpoints](#api-endpoints)
* [Possible Errors & Troubleshooting](#possible-errors--troubleshooting)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* **User Management**: Register, authenticate users (Admin, Support Agent, Customer).
* **RBAC (Role-Based Access Control)**: Secure access to actions based on user roles.
* **Service Management**: Add, view, update, delete farm services.
* **Appointment Booking**: Customers can book/manage appointments.
* **Customer Enquiries**: Submit/view/update/delete enquiries.
* **Authentication**: JWT for APIs, PHP Sessions for admin web login.
* **Modular MVC Structure**: Core, Models, Controllers separation.
* **.env Configuration**: Store sensitive credentials securely.
* **Error Logging**: For debugging.

---

## Technologies Used

* **PHP** >= 8.1
* **Composer**
* **MySQL / MariaDB**
* **Apache / Nginx**

**Libraries:**

* `vlucas/phpdotenv`
* `nikic/fast-route`
* `firebase/php-jwt`
* `ramsey/uuid`

---

## Project Structure

```bash
nananom-farms-backend/
├── app/
│   ├── Controllers/
│   ├── Models/
│   └── Core/
├── config/
│   └── database.php
├── public/
│   ├── index.php
│   └── .htaccess
├── routes/
│   └── web.php
├── .env
├── composer.json
├── create_admin.php
└── README.md
```

---

## Prerequisites

* PHP 8.1+
* Composer
* MySQL/MariaDB
* Apache (mod\_rewrite) or Nginx
* PHP Extensions: `pdo_mysql`, `json`, `mbstring`, `openssl`
* Git

---

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nananom-farms-backend.git
cd nananom-farms-backend
```

### 2. Database Setup

* Create a database named `nananom_farms`.
* Import `nananom_farmdb.sql` using phpMyAdmin or MySQL CLI.

### 3. Configure Environment

* Copy `.env.example` to `.env`
* Update credentials:

```env
DB_HOST=localhost
DB_DATABASE=nananom_farms
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET_KEY=your_strong_key
```

### 4. Install Dependencies

```bash
composer install
```

### 5. Web Server Configuration

#### Windows (XAMPP/WAMP):

* Place the project in `htdocs`
* Start Apache & MySQL

#### macOS:

```bash
brew install php mysql
php -S localhost:8000 -t public
```

#### Linux (Ubuntu):

```bash
sudo apt install php mysql php-mysql composer apache2
php -S localhost:8000 -t public
```

### 6. Create Initial Admin User

```bash
php create_admin.php
# Then DELETE this file immediately
```

---

## API Endpoints

### 🔓 Public Endpoints

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | /api/register      | Register a new customer       |
| POST   | /api/login         | Login and get JWT token       |
| GET    | /api/logout        | Logout (client discard token) |
| GET    | /api/services      | View all services             |
| GET    | /api/services/{id} | Get service details           |
| POST   | /api/enquiries     | Submit a customer enquiry     |

### 🔐 Protected Endpoints (JWT)

| Method | Endpoint               | Access Role(s)       | Description                    |
| ------ | ---------------------- | -------------------- | ------------------------------ |
| POST   | /api/services          | Admin, Support Agent | Create a new service           |
| PUT    | /api/services/{id}     | Admin, Support Agent | Update a service               |
| DELETE | /api/services/{id}     | Admin, Support Agent | Delete a service               |
| GET    | /api/appointments      | All roles            | List appointments (own or all) |
| GET    | /api/appointments/{id} | All roles            | View specific appointment      |
| POST   | /api/appointments      | All roles            | Book a new appointment         |
| PUT    | /api/appointments/{id} | All roles            | Update an appointment          |
| DELETE | /api/appointments/{id} | Admin, Support Agent | Delete an appointment          |
| GET    | /api/enquiries         | Admin, Support Agent | View all enquiries             |
| GET    | /api/enquiries/{id}    | Admin, Support Agent | View a specific enquiry        |
| PUT    | /api/enquiries/{id}    | Admin, Support Agent | Update an enquiry              |
| DELETE | /api/enquiries/{id}    | All roles            | Delete own enquiry             |

### 🧑 Web Admin (PHP Sessions)

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | /admin/login     | Display admin login page   |
| POST   | /admin/login     | Handle admin login         |
| GET    | /admin/logout    | Logout and destroy session |
| GET    | /admin/dashboard | Admin dashboard (HTML)     |
| GET    | /admin/users     | List users                 |
| POST   | /admin/users     | Create new user            |

---

## Possible Errors & Troubleshooting

| Issue                       | Fix                                                             |
| --------------------------- | --------------------------------------------------------------- |
| `500 Internal Server Error` | Ensure `.env` is configured and mod\_rewrite is enabled         |
| `404 Not Found`             | Ensure `.htaccess` exists and Apache routes requests correctly  |
| Composer install fails      | Run `composer self-update` and ensure PHP version is compatible |
| Cannot connect to database  | Check MySQL is running and credentials match in `.env`          |
| JWT token not accepted      | Ensure Authorization header is set correctly: `Bearer <token>`  |

---

## Deployment

* The project can be deployed to services like **Render**, **Vercel (Backend PHP Runtime)**, or VPS.
* Follow standard deployment practices:

  * Set production `.env`
  * Disable `create_admin.php`
  * Configure `public/` as document root
  * Use HTTPS in production

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

**For Academic Use Only** - Developed as part of a school project by Nananom Farms Team.