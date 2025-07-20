<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Core\Database;

/**
 * ServiceModel
 *
 * Represents a service offered by Nananom Farms.
 * Handles data persistence and retrieval for the 'Service' table.
 * Extends BaseModel to inherit UUID generation and timestamp management.
 */
class ServiceModel extends BaseModel
{
    protected string $tableName = 'Service';

    protected string $serviceName;
    protected string $description;
    protected float $price;
    protected int $durationMinutes;
    protected bool $isActive;

    public function __construct()
    {
        parent::__construct();
    }

    // --- Getters ---
    public function getServiceName(): string { return $this->serviceName; }
    public function getDescription(): string { return $this->description; }
    public function getPrice(): float { return $this->price; }
    public function getDurationMinutes(): int { return $this->durationMinutes; }
    public function getIsActive(): bool { return $this->isActive; }

    // --- Setters ---
    public function setServiceName(string $serviceName): self { $this->serviceName = $serviceName; return $this; }
    public function setDescription(string $description): self { $this->description = $description; return $this; }
    public function setPrice(float $price): self { $this->price = $price; return $this; }
    public function setDurationMinutes(int $durationMinutes): self { $this->durationMinutes = $durationMinutes; return $this; }
    public function setIsActive(bool $isActive): self { $this->isActive = $isActive; return $this; }

    /**
     * Saves a new service record to the database.
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
        $this->id = self::getId();

        $sql = "INSERT INTO {$this->tableName} (ServiceID, ServiceName, Description, Price, DurationMinutes, IsActive, CreatedAt, UpdatedAt)
                VALUES (:id, :serviceName, :description, :price, :durationMinutes, :isActive, :createdAt, :updatedAt)";

        $params = [
            ':id' => $this->id,
            ':serviceName' => $this->serviceName,
            ':description' => $this->description,
            ':price' => $this->price,
            ':durationMinutes' => $this->durationMinutes,
            ':isActive' => $this->isActive,
            ':createdAt' => $this->getCreatedAt(),
            ':updatedAt' => $this->getUpdatedAt()
        ];

        // return $this->db->execute($sql, $params);
        return true;
    }

    /**
     * Updates an existing service record in the database.
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        // $this->updatedAt = date('Y-m-d H:i:s');

        // $sql = "UPDATE {$this->tableName} SET
        //             ServiceName = :serviceName,
        //             Description = :description,
        //             Price = :price,
        //             DurationMinutes = :durationMinutes,
        //             IsActive = :isActive,
        //             UpdatedAt = :updatedAt
        //         WHERE ServiceID = :id";

        // $params = [
        //     ':serviceName' => $this->serviceName,
        //     ':description' => $this->description,
        //     ':price' => $this->price,
        //     ':durationMinutes' => $this->durationMinutes,
        //     ':isActive' => $this->isActive,
        //     ':updatedAt' => $this->getUpdatedAt(),
        //     ':id' => $this->id
        // ];

        // return $this->db->execute($sql, $params);
        return true; // For now, we assume the update operation is successful
    }

    /**
     * Finds a service by its ServiceID (UUID).
     * @param string $id The UUID of the service to find.
     * @return static|null The ServiceModel instance if found, null otherwise.
     */
    // public static function find(string $id): ?static
    // {
    //     $instance = new static();
    //     $sql = "SELECT * FROM {$instance->tableName} WHERE ServiceID = :id LIMIT 1";
    //     $params = [':id' => $id];
    //     $result = $instance->db->fetch($sql, $params);

    //     if ($result) {
    //         return $instance
    //             ->setId($result['ServiceID'])
    //             ->setServiceName($result['ServiceName'])
    //             ->setDescription($result['Description'])
    //             ->setPrice($result['Price'])
    //             ->setDurationMinutes($result['DurationMinutes'])
    //             ->setIsActive($result['IsActive'])
    //             ->setCreatedAt($result['CreatedAt'])
    //             ->setUpdatedAt($result['UpdatedAt']);
    //     }
    //     return null;
    // }

    /**
     * Retrieves all service records from the database.
     * @return array An array of ServiceModel instances.
     */
    public static function all(): void
    {
        var_dump("Fetching all services... This is the all function in ServiceModel.");
    }

    /**
     * Deletes a service record by its ServiceID (UUID).
     * @param string $id The UUID of the service to delete.
     * @return bool True on success, false on failure.
     */
    // public static function delete(string $id): bool
    // {
    //     $instance = new static();
    //     $sql = "DELETE FROM {$instance->tableName} WHERE ServiceID = :id";
    //     $params = [':id' => $id];
    //     return $instance->db->execute($sql, $params);
    // }
}
?>