<?php
namespace App\Models;

use App\Models\BaseModel;
use App\Models\Role;

class User extends BaseModel
{
    protected string $tableName = 'User';
    protected string $firstName;
    protected string $lastName;
    protected string $email;
    protected string $phoneNumber;
    protected string $passwordHash;
    protected string $roleId;

    protected ?Role $role = null;

    public function __construct()
    {
        parent::__construct();
    }

    // --- Getters ---

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function getPasswordHash(): string
    {
        return $this->passwordHash;
    }

    /**
     * Get the user's role ID.
     * @return string
     */
    public function getRoleId(): string
    {
        return $this->roleId;
    }

    public function setRole(Role $role): self
    {
        $this->role = $role;
        $this->roleId = $role->getId();
        return $this;
    }

    // --- Setters ---

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        return $this;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;
        return $this;
    }

    public function setPasswordHash(string $passwordHash): self
    {
        $this->passwordHash = $passwordHash;
        return $this;
    }

    /**
     * Set the user's role ID.
     * @param string $roleId
     * @return self
     */
    public function setRoleId(string $roleId): self
    {
        $this->roleId = $roleId;
        return $this;
    }

    /**
     * Get the user's role object.
     * This lazy loads the Role object if it hasn't been set yet.
     * @return Role|null
     */
    public function getRole(): ?Role
    {
        if ($this->role === null && $this->roleId !== null) {
            $this->role = Role::find($this->roleId);
        }
        return $this->role;
    }

    // --- CRUD Operations ---

    /**
     * Saves a new user record to the database.
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
        $this->id = self::getId();

        $sql = "INSERT INTO {$this->tableName} (UserID, FirstName, LastName, Email, PhoneNumber, PasswordHash, RoleID, CreatedAt, UpdatedAt)
                VALUES (:id, :firstName, :lastName, :email, :phoneNumber, :passwordHash, :roleId, :createdAt, :updatedAt)";

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

        return $this->db->execute($sql, $params);
    }

    /**
     * Updates an existing user record in the database.
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        $this->setUpdatedAt(date('Y-m-d H:i:s'));

        $sql = "UPDATE {$this->tableName} SET
                    FirstName = :firstName,
                    LastName = :lastName,
                    Email = :email,
                    PhoneNumber = :phoneNumber,
                    PasswordHash = :passwordHash,
                    RoleID = :roleId,
                    UpdatedAt = :updatedAt
                WHERE UserID = :id";

        $params = [
            ':firstName' => $this->firstName,
            ':lastName' => $this->lastName,
            ':email' => $this->email,
            ':phoneNumber' => $this->phoneNumber,
            ':passwordHash' => $this->passwordHash,
            ':roleId' => $this->roleId,
            ':updatedAt' => $this->getUpdatedAt(),
            ':id' => $this->id
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Finds a user record by their UserID (UUID).
     * @param string $id The UUID of the user to find.
     * @return static|null The User instance if found, null otherwise.
     */
    public static function find(string $id): ?static
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE UserID = :id LIMIT 1";
        $params = [':id' => $id];
        $result = $instance->db->fetch($sql, $params);

        if ($result) {
            return $instance
                ->setId($result['UserID'])
                ->setFirstName($result['FirstName'])
                ->setLastName($result['LastName'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setPasswordHash($result['PasswordHash'])
                ->setRoleId($result['RoleID'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return null;
    }

    /**
     * Retrieves all user records from the database.
     * @return array An array of User instances.
     */
    public static function all(): array
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName}";
        $results = $instance->db->fetchAll($sql);
        $users = [];
        foreach ($results as $result) {
            $users[] = (new static())
                ->setId($result['UserID'])
                ->setFirstName($result['FirstName'])
                ->setLastName($result['LastName'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setPasswordHash($result['PasswordHash'])
                ->setRoleId($result['RoleID'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $users;
    }

    /**
     * Deletes a user record by their UserID (UUID).
     * @param string $id The UUID of the user to delete.
     * @return bool True on success, false on failure.
     */
    public static function delete(string $id): bool
    {
        $instance = new static();
        $sql = "DELETE FROM {$instance->tableName} WHERE UserID = :id";
        $params = [':id' => $id];
        return $instance->db->execute($sql, $params);
    }

    /**
     * Finds a user by their email address.
     * @param string $email The email of the user to find.
     * @return static|null The User instance if found, null otherwise.
     */
    public static function findByEmail(string $email): ?static
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE Email = :email LIMIT 1";
        $params = [':email' => $email];
        $result = $instance->db->fetch($sql, $params);

        if ($result) {
            return $instance
                ->setId($result['UserID'])
                ->setFirstName($result['FirstName'])
                ->setLastName($result['LastName'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setPasswordHash($result['PasswordHash'])
                ->setRoleId($result['RoleID'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return null;
    }

    /**
     * Authenticates a user based on email and password.
     * @param string $email The user's email.
     * @param string $password The plain-text password provided by the user.
     * @return User|null The authenticated User instance if successful, null otherwise.
     */
    public static function authenticate(string $email, string $password): ?User
    {
        $user = self::findByEmail($email);

        if ($user && password_verify($password, $user->getPasswordHash())) {
            return $user;
        }

        return null;
    }
}
?>