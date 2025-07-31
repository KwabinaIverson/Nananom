<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Core\Database;

/**
 * Role
 *
 * Represents a user role in the system (e.g., Administrator, Customer, Support Agent).
 * Handles data persistence and retrieval for the 'Role' table.
 * Extends BaseModel to inherit timestamp management and common CRUD method signatures.
 */
class Role extends BaseModel
{
    protected string $tableName = 'Role';
    protected string $roleName;
    protected string $description;

    /**
     * Constructor for Role.
     * Initializes the database connection and sets initial timestamps via the parent BaseModel.
     */
    public function __construct()
    {
        parent::__construct();
    }

    // --- Getters for Role-specific attributes ---

    /**
     * Get the role's name.
     * @return string
     */
    public function getRoleName(): string
    {
        return $this->roleName;
    }

    /**
     * Get the role's description.
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    // --- Setters for Role-specific attributes ---

    /**
     * Set the role's name.
     * @param string $roleName
     * @return self
     */
    public function setRoleName(string $roleName): self
    {
        $this->roleName = $roleName;
        return $this;
    }

    /**
     * Set the role's description.
     * @param string $description
     * @return self
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }


    /**
     * Saves a new role record to the database.
     * Overrides the abstract save method from BaseModel.
     * Note: RoleID is now a UUID, so we generate it here.
     *
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
        $this->id = self::getId();

        $sql = "INSERT INTO {$this->tableName} (RoleID, RoleName, Description, CreatedAt, UpdatedAt)
                VALUES (:id, :roleName, :description, :createdAt, :updatedAt)";

        $params = [
            ':id' => $this->id,
            ':roleName' => $this->roleName,
            ':description' => $this->description,
            ':createdAt' => $this->getCreatedAt(),
            ':updatedAt' => $this->getUpdatedAt(),
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Updates an existing role record in the database.
     * Overrides the abstract update method from BaseModel.
     *
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        $this->setUpdatedAt(date('Y-m-d H:i:s'));

        $sql = "UPDATE {$this->tableName} SET
                    RoleName = :roleName,
                    Description = :description,
                    UpdatedAt = :updatedAt
                WHERE RoleID = :id";

        $params = [
            ':roleName' => $this->roleName,
            ':description' => $this->description,
            ':updatedAt' => $this->getUpdatedAt(),
            ':id' => $this->id
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Finds a role record by its RoleID.
     * Overrides the abstract find method from BaseModel.
     *
     * @param string $id The UUID of the role to find.
     * @return static|null The Role instance if found, null otherwise.
     */
    public static function find(string $id): ?static
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE RoleID = :id LIMIT 1";
        $params = [':id' => $id];
        $result = $instance->db->fetch($sql, $params);

        if ($result) {
            return $instance
                ->setId((string)$result['RoleID'])
                ->setRoleName($result['RoleName'])
                ->setDescription($result['Description'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return null;
    }

    /**
     * Retrieves all role records from the database.
     * Overrides the abstract all method from BaseModel.
     *
     * @return array An array of Role instances.
     */
    public static function all(): array
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName}";
        $results = $instance->db->fetchAll($sql);
        $roles = [];
        foreach ($results as $result) {
            $roles[] = (new static())
                ->setId((string)$result['RoleID'])
                ->setRoleName($result['RoleName'])
                ->setDescription($result['Description'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $roles;
    }

    /**
     * Deletes a role record by its RoleID.
     * Overrides the abstract delete method from BaseModel.
     *
     * @param string $id The ID of the role to delete.
     * @return bool True on success, false on failure.
     */
    public static function delete(string $id): bool
    {
        $instance = new static();
        $sql = "DELETE FROM {$instance->tableName} WHERE RoleID = :id";
        $params = [':id' => $id];
        return $instance->db->execute($sql, $params);
    }

    /**
     * Finds a role by its name.
     *
     * @param string $roleName The name of the role to find.
     * @return static|null The Role instance if found, null otherwise.
     */
    public static function findByName(string $roleName): ?static
    {
        error_log("DEBUG: Role::findByName called for roleName: " . $roleName);

        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE RoleName = :roleName LIMIT 1";
        $params = [':roleName' => $roleName];

        error_log("DEBUG: Role::findByName SQL: " . $sql . " with params: " . json_encode($params));

        $result = $instance->db->fetch($sql, $params);

        error_log("DEBUG: Role::findByName DB fetch result: " . print_r($result, true));

        if ($result) {
            error_log("DEBUG: Role::findByName - Role found! ID: " . $result['RoleID'] . ", Name: " . $result['RoleName']);
            return $instance
                ->setId((string)$result['RoleID'])
                ->setRoleName($result['RoleName'])
                ->setDescription($result['Description'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        error_log("DEBUG: Role::findByName - Role NOT found for name: " . $roleName);
        return null;
    }
}

?>