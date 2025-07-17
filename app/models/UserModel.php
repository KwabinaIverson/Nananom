<?php
namespace App\Models;

require 'BaseModel.php';

use App\Models\BaseModel;
// use App\Core\Database;

/**
 * UserModel
 *
 * Represents a user in the system (e.g., customer, administrator, support agent).
 * Handles data persistence and retrieval for the 'User' table.
 * Extends BaseModel to inherit UUID generation and timestamp management.
 */
class User extends BaseModel
{
    // Define the name of the database table this model interacts with
    protected string $tableName = 'User';
    protected string $firstName;
    protected string $lastName;
    protected string $email;
    protected string $phoneNumber;
    protected string $passwordHash;
    protected int $roleId;

    /**
     * Constructor for UserModel.
     * Initializes the database connection and sets initial timestamps via the parent BaseModel.
     */
    public function __construct()
    {
        parent::__construct(); // Call the BaseModel constructor to set up DB and timestamps
    }

    // --- Getters for User-specific attributes ---

    /**
     * Get the user's first name.
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * Get the user's last name.
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * Get the user's email address.
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Get the user's phone number.
     * @return string
     */
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    /**
     * Get the user's hashed password.
     * @return string
     */
    public function getPasswordHash(): string
    {
        return $this->passwordHash;
    }

    /**
     * Get the user's role ID.
     * @return int
     */
    public function getRoleId(): int
    {
        return $this->roleId;
    }

    // --- Setters for User-specific attributes ---

    /**
     * Set the user's first name.
     * @param string $firstName
     * @return self
     */
    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * Set the user's last name.
     * @param string $lastName
     * @return self
     */
    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * Set the user's email address.
     * @param string $email
     * @return self
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Set the user's phone number.
     * @param string $phoneNumber
     * @return self
     */
    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;
        return $this;
    }

    /**
     * Set the user's hashed password.
     * IMPORTANT: Always hash the password BEFORE setting it here (e.g., using password_hash()).
     * @param string $passwordHash
     * @return self
     */
    public function setPasswordHash(string $passwordHash): self
    {
        $this->passwordHash = $passwordHash;
        return $this;
    }

    /**
     * Set the user's role ID.
     * @param int $roleId
     * @return self
     */
    public function setRoleId(int $roleId): self
    {
        $this->roleId = $roleId;
        return $this;
    }

    // --- CRUD Operations (Implementing abstract methods from BaseModel) ---

    /**
     * Saves a new user record to the database.
     * This method is called when creating a new user.
     *
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
        // Generate a UUID for the new record's primary key
        // This method is inherited from BaseModel
        $this->id = self::getId();

        // SQL query to insert a new user record
        $sql = "INSERT INTO {$this->tableName} (UserID, FirstName, LastName, Email, PhoneNumber, PasswordHash, RoleID, CreatedAt, UpdatedAt)
                VALUES (:id, :firstName, :lastName, :email, :phoneNumber, :passwordHash, :roleId, :createdAt, :updatedAt)";

        // Parameters for the prepared statement
        $params = [
            ':id' => $this->id,
            ':firstName' => $this->firstName,
            ':lastName' => $this->lastName,
            ':email' => $this->email,
            ':phoneNumber' => $this->phoneNumber,
            ':passwordHash' => $this->passwordHash,
            ':roleId' => $this->roleId,
            ':createdAt' => $this->getCreatedAt(),
            ':updatedAt' => $this->getUpdatedAt(), 
        ];

        // Execute the query using the Database class
        // return $this->db->execute($sql, $params);
        return false; // Placeholder return, actual implementation should execute the query
    }

    /**
     * Updates an existing user record in the database.
     * This method is called when modifying an existing user's details.
     *
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        // Update the 'updatedAt' timestamp to the current time before saving
        // $this->updatedAt = date('Y-m-d H:i:s');

        // // SQL query to update an existing user record
        // $sql = "UPDATE {$this->tableName} SET
        //             FirstName = :firstName,
        //             LastName = :lastName,
        //             Email = :email,
        //             PhoneNumber = :phoneNumber,
        //             PasswordHash = :passwordHash,
        //             RoleID = :roleId,
        //             UpdatedAt = :updatedAt
        //         WHERE UserID = :id"; // Identify the record by its UserID (UUID)

        // // Parameters for the prepared statement
        // $params = [
        //     ':firstName' => $this->firstName,
        //     ':lastName' => $this->lastName,
        //     ':email' => $this->email,
        //     ':phoneNumber' => $this->phoneNumber,
        //     ':passwordHash' => $this->passwordHash,
        //     ':roleId' => $this->roleId,
        //     ':updatedAt' => $this->updatedAt,
        //     ':id' => $this->id // The ID of the record to update
        // ];

        // // Execute the query
        // return $this->db->execute($sql, $params);
        return false; // Placeholder return, actual implementation should execute the query
    }

    /**
     * Finds a user record by their UserID (UUID).
     * This is a static method as it doesn't operate on an existing instance.
     *
     * @param string $id The UUID of the user to find.
     * @return static|null The UserModel instance if found, null otherwise.
     */
    // public static function find(string $id): ?static
    // {
    //     // Create a temporary instance to access the database connection
    //     $instance = new static();
    //     $sql = "SELECT * FROM {$instance->tableName} WHERE UserID = :id LIMIT 1";
    //     $params = [':id' => $id];
    //     $result = $instance->db->fetch($sql, $params);

    //     if ($result) {
    //         // Populate a new UserModel instance with the fetched data
    //         return $instance
    //             ->setId($result['UserID'])
    //             ->setFirstName($result['FirstName'])
    //             ->setLastName($result['LastName'])
    //             ->setEmail($result['Email'])
    //             ->setPhoneNumber($result['PhoneNumber'])
    //             ->setPasswordHash($result['PasswordHash'])
    //             ->setRoleId($result['RoleID'])
    //             ->setCreatedAt($result['CreatedAt'])
    //             ->setUpdatedAt($result['UpdatedAt']);
    //     }
    //     return null;
    // }

    /**
     * Retrieves all user records from the database.
     * This is a static method.
     *
     * @return array An array of UserModel instances.
     */
    // public static function all(): array
    // {
    //     // Create a temporary instance to access the database connection
    //     $instance = new static();
    //     $sql = "SELECT * FROM {$instance->tableName}";
    //     $results = $instance->db->fetchAll($sql);
    //     $users = [];
    //     foreach ($results as $result) {
    //         // For each row, create a new UserModel instance and populate it
    //         $users[] = (new static()) // Create a new instance for each user
    //             ->setId($result['UserID'])
    //             ->setFirstName($result['FirstName'])
    //             ->setLastName($result['LastName'])
    //             ->setEmail($result['Email'])
    //             ->setPhoneNumber($result['PhoneNumber'])
    //             ->setPasswordHash($result['PasswordHash'])
    //             ->setRoleId($result['RoleID'])
    //             ->setCreatedAt($result['CreatedAt'])
    //             ->setUpdatedAt($result['UpdatedAt']);
    //     }
    //     return $users;
    // }

    /**
     * Deletes a user record by their UserID (UUID).
     * This is a static method.
     *
     * @param string $id The UUID of the user to delete.
     * @return bool True on success, false on failure.
     */
    // public static function delete(string $id): bool
    // {
    //     // Create a temporary instance to access the database connection
    //     $instance = new static();
    //     $sql = "DELETE FROM {$instance->tableName} WHERE UserID = :id";
    //     $params = [':id' => $id];
    //     return $instance->db->execute($sql, $params);
    // }

    // --- Additional User-specific methods ---

    /**
     * Finds a user by their email address.
     * Useful for login authentication.
     *
     * @param string $email The email of the user to find.
     * @return static|null The UserModel instance if found, null otherwise.
     */
    // public static function findByEmail(string $email): ?static
    // {
    //     $instance = new static();
    //     $sql = "SELECT * FROM {$instance->tableName} WHERE Email = :email LIMIT 1";
    //     $params = [':email' => $email];
    //     $result = $instance->db->fetch($sql, $params);

    //     if ($result) {
    //         return $instance
    //             ->setId($result['UserID'])
    //             ->setFirstName($result['FirstName'])
    //             ->setLastName($result['LastName'])
    //             ->setEmail($result['Email'])
    //             ->setPhoneNumber($result['PhoneNumber'])
    //             ->setPasswordHash($result['PasswordHash'])
    //             ->setRoleId($result['RoleID'])
    //             ->setCreatedAt($result['CreatedAt'])
    //             ->setUpdatedAt($result['UpdatedAt']);
    //     }
    //     return null;
    // }

    /**
     * Authenticates a user based on email and password.
     *
     * @param string $email The user's email.
     * @param string $password The plain-text password provided by the user.
     * @return UserModel|null The authenticated UserModel instance if successful, null otherwise.
     */
    // public static function authenticate(string $email, string $password): ?UserModel
    // {
    //     $user = self::findByEmail($email);

    //     if ($user && password_verify($password, $user->getPasswordHash())) {
    //         return $user; // Authentication successful
    //     }

    //     return null; // Authentication failed
    // }
}

$user = new User();
$user->setFirstName('John')
     ->setLastName('Doe')
     ->setEmail('bredrenbonish')
     ->setPhoneNumber('1234567890')
     ->setPasswordHash(password_hash('securepassword', PASSWORD_DEFAULT));

echo $user;
?>