<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Core\Database;

/**
 * AppointmentModel
 *
 * Represents a customer appointment booking.
 * Handles data persistence and retrieval for the 'Appointment' table.
 * Extends BaseModel to inherit UUID generation and timestamp management.
 */
class AppointmentModel extends BaseModel
{
    protected string $tableName = 'Appointment';

    // Properties mapping to database columns
    protected string $userId;
    protected string $serviceId;
    protected string $appointmentDate;
    protected string $appointmentTime;
    protected string $status;
    protected ?string $notes;

    public function __construct()
    {
        parent::__construct();
    }

    // --- Getters ---
    public function getUserId(): string { return $this->userId; }
    public function getServiceId(): string { return $this->serviceId; }
    public function getAppointmentDate(): string { return $this->appointmentDate; }
    public function getAppointmentTime(): string { return $this->appointmentTime; }
    public function getStatus(): string { return $this->status; }
    public function getNotes(): ?string { return $this->notes; }

    // --- Setters ---
    public function setUserId(string $userId): self { $this->userId = $userId; return $this; }
    public function setServiceId(string $serviceId): self { $this->serviceId = $serviceId; return $this; }
    public function setAppointmentDate(string $appointmentDate): self { $this->appointmentDate = $appointmentDate; return $this; }
    public function setAppointmentTime(string $appointmentTime): self { $this->appointmentTime = $appointmentTime; return $this; }
    public function setStatus(string $status): self { $this->status = $status; return $this; }
    public function setNotes(?string $notes): self { $this->notes = $notes; return $this; }

    /**
     * Saves a new appointment record to the database.
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
    $this->id = self::getId();

        $sql = "INSERT INTO {$this->tableName} (AppointmentID, UserID, ServiceID, AppointmentDate, AppointmentTime, Status, Notes, CreatedAt, UpdatedAt)
                VALUES (:id, :userId, :serviceId, :appointmentDate, :appointmentTime, :status, :notes, :createdAt, :updatedAt)";

        $params = [
            ':id' => $this->id,
            ':userId' => $this->userId,
            ':serviceId' => $this->serviceId,
            ':appointmentDate' => $this->appointmentDate,
            ':appointmentTime' => $this->appointmentTime,
            ':status' => $this->status,
            ':notes' => $this->notes,
            ':createdAt' => $this->getCreatedAt(),
            ':updatedAt' => $this->getUpdatedAt()
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Updates an existing appointment record in the database.
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        $this->setUpdatedAt(date('Y-m-d H:i:s'));

        $sql = "UPDATE {$this->tableName} SET
                    UserID = :userId,
                    ServiceID = :serviceId,
                    AppointmentDate = :appointmentDate,
                    AppointmentTime = :appointmentTime,
                    Status = :status,
                    Notes = :notes,
                    UpdatedAt = :updatedAt
                WHERE AppointmentID = :id";

        $params = [
            ':userId' => $this->userId,
            ':serviceId' => $this->serviceId,
            ':appointmentDate' => $this->appointmentDate,
            ':appointmentTime' => $this->appointmentTime,
            ':status' => $this->status,
            ':notes' => $this->notes,
            ':updatedAt' => $this->getUpdatedAt(),
            ':id' => $this->id
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Finds an appointment by its AppointmentID (UUID).
     * @param string $id The UUID of the appointment to find.
     * @return static|null The AppointmentModel instance if found, null otherwise.
     */
    public static function find(string $id): ?static
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE AppointmentID = :id LIMIT 1";
        $params = [':id' => $id];
        $result = $instance->db->fetch($sql, $params);

        if ($result) {
            return $instance
                ->setId($result['AppointmentID'])
                ->setUserId($result['UserID'])
                ->setServiceId($result['ServiceID'])
                ->setAppointmentDate($result['AppointmentDate'])
                ->setAppointmentTime($result['AppointmentTime'])
                ->setStatus($result['Status'])
                ->setNotes($result['Notes'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return null;
    }

    /**
     * Retrieves all appointment records from the database.
     *
     * @return array An array of AppointmentModel instances. Returns an empty array if no appointments are found.
     */
    public static function all(): array
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName}";
        $results = $instance->db->fetchAll($sql);

        if (!is_array($results)) {
            $results = [];
        }

        $appointments = [];
        foreach ($results as $result) {
            $appointments[] = (new static())
                ->setId($result['AppointmentID'])
                ->setUserId($result['UserID'])
                ->setServiceId($result['ServiceID'])
                ->setAppointmentDate($result['AppointmentDate'])
                ->setAppointmentTime($result['AppointmentTime'])
                ->setStatus($result['Status'])
                ->setNotes($result['Notes'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $appointments;
    }

    /**
     * Finds appointments by UserID.
     *
     * @param string $userId The UUID of the user.
     * @return array An array of AppointmentModel instances.
     */
    public static function findByUserId(string $userId): array
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE UserID = :userId";
        $params = [':userId' => $userId];
        $results = $instance->db->fetchAll($sql, $params);

        if (!is_array($results)) {
            $results = [];
        }

        $appointments = [];
        foreach ($results as $result) {
            $appointments[] = (new static())
                ->setId($result['AppointmentID'])
                ->setUserId($result['UserID'])
                ->setServiceId($result['ServiceID'])
                ->setAppointmentDate($result['AppointmentDate'])
                ->setAppointmentTime($result['AppointmentTime'])
                ->setStatus($result['Status'])
                ->setNotes($result['Notes'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $appointments;
    }

    /**
     * Deletes an appointment record by its AppointmentID (UUID).
     * @param string $id The UUID of the appointment to delete.
     * @return bool True on success, false on failure.
     */
    public static function delete(string $id): bool
    {
        $instance = new static();
        $sql = "DELETE FROM {$instance->tableName} WHERE AppointmentID = :id";
        $params = [':id' => $id];
        return $instance->db->execute($sql, $params);
    }
}
?>