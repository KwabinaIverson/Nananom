-- SQL Database Schema for Nananom Farms Marketing Management System
-- Database Name: nananom_farms

-- 1. Table: Role
-- Stores different user roles (e.g., Administrator, Support Agent, Customer).
-- RoleID is now a VARCHAR(36) to store UUIDs as primary keys.
CREATE TABLE IF NOT EXISTS `Role` (
    `RoleID` VARCHAR(36) PRIMARY KEY COMMENT 'Unique identifier for the role (UUID)',
    `RoleName` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Unique name of the role (e.g., Administrator, Customer)',
    `Description` VARCHAR(255) COMMENT 'Brief description of the role''s permissions',
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the role was created',
    `UpdatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the role was last updated'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Defines user roles in the system';

-- 2. Table: User
-- Stores user accounts, including customers, administrators, and support agents.
-- UserID is a VARCHAR(36) to store UUIDs as primary keys.
CREATE TABLE IF NOT EXISTS `User` (
    `UserID` VARCHAR(36) PRIMARY KEY COMMENT 'Unique identifier for the user (UUID)',
    `FirstName` VARCHAR(100) NOT NULL COMMENT 'User''s first name',
    `LastName` VARCHAR(100) NOT NULL COMMENT 'User''s last name',
    `Email` VARCHAR(255) UNIQUE NOT NULL COMMENT 'User''s email address, used for login (must be unique)',
    `PhoneNumber` VARCHAR(20) COMMENT 'User''s phone number',
    `PasswordHash` VARCHAR(255) NOT NULL COMMENT 'Securely hashed password for authentication',
    `RoleID` VARCHAR(36) NOT NULL COMMENT 'Foreign key linking to the Role table to define user type (now UUID)',
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the user account was created',
    `UpdatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the user account was last updated',
    FOREIGN KEY (`RoleID`) REFERENCES `Role`(`RoleID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores user accounts and their associated roles';

-- 3. Table: Service
-- Stores details of services offered by Nananom Farms.
-- ServiceID is a VARCHAR(36) to store UUIDs as primary keys.
CREATE TABLE IF NOT EXISTS `Service` (
    `ServiceID` VARCHAR(36) PRIMARY KEY COMMENT 'Unique identifier for the service (UUID)',
    `ServiceName` VARCHAR(255) NOT NULL COMMENT 'Name of the service (e.g., Palm Oil Delivery, Farm Consultation)',
    `Description` TEXT COMMENT 'Detailed description of the service',
    `IsActive` BOOLEAN DEFAULT TRUE COMMENT 'Flag to indicate if the service is currently offered (TRUE/FALSE)',
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the service was added',
    `UpdatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the service details were last updated'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about services offered by Nananom Farms';

-- 4. Table: Appointment
-- Tracks customer bookings for services.
-- AppointmentID is a VARCHAR(36) to store UUIDs as primary keys.
CREATE TABLE IF NOT EXISTS `Appointment` (
    `AppointmentID` VARCHAR(36) PRIMARY KEY COMMENT 'Unique identifier for the appointment (UUID)',
    `UserID` VARCHAR(36) NOT NULL COMMENT 'Foreign key linking to the User who made the booking',
    `ServiceID` VARCHAR(36) NOT NULL COMMENT 'Foreign key linking to the Service being booked',
    `AppointmentDate` DATE NOT NULL COMMENT 'The date of the scheduled appointment',
    `AppointmentTime` TIME NOT NULL COMMENT 'The time of the scheduled appointment',
    `Status` VARCHAR(50) DEFAULT 'Pending' COMMENT 'Current status of the appointment (e.g., Pending, Confirmed, Completed, Cancelled)',
    `Notes` TEXT COMMENT 'Any additional notes or specific requests from the user for this appointment',
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the appointment was booked',
    `UpdatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the appointment status or details were last updated',
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`ServiceID`) REFERENCES `Service`(`ServiceID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tracks customer appointments and bookings for services';

-- 5. Table: Enquiry
-- Stores customer enquiries or messages.
-- EnquiryID is a VARCHAR(36) to store UUIDs as primary keys.
CREATE TABLE IF NOT EXISTS `Enquiry` (
    `EnquiryID` VARCHAR(36) PRIMARY KEY COMMENT 'Unique identifier for the enquiry (UUID)',
    `UserID` VARCHAR(36) NULL COMMENT 'Foreign key linking to the User who made the enquiry (NULL for unauthenticated enquiries)',
    `Name` VARCHAR(255) NOT NULL COMMENT 'Name of the person making the enquiry',
    `Email` VARCHAR(255) NOT NULL COMMENT 'Email of the person making the enquiry',
    `PhoneNumber` VARCHAR(20) COMMENT 'Phone number of the person making the enquiry',
    `Subject` VARCHAR(255) COMMENT 'Subject line of the enquiry',
    `Message` TEXT NOT NULL COMMENT 'Full message content of the enquiry',
    `Status` VARCHAR(50) DEFAULT 'New' COMMENT 'Current status of the enquiry (e.g., New, In Progress, Resolved, Archived)',
    `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the enquiry was submitted',
    `UpdatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the enquiry status was last updated'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores customer enquiries or messages';


-- Default Role Data (Crucial for initial setup)
-- We use UUID() to generate unique IDs directly in SQL
INSERT INTO `Role` (`RoleID`, `RoleName`, `Description`) VALUES
(UUID(), 'Administrator', 'Has full access and management capabilities over the system.'),
(UUID(), 'Support Agent', 'Can manage services, appointments, and enquiries; limited user management.'),
(UUID(), 'Customer', 'Can view services, book appointments, and submit enquiries.');

