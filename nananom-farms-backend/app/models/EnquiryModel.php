<?php

namespace App\Models;

use App\Models\BaseModel;
use App\Core\Database;

/**
 * EnquiryModel
 *
 * Represents a customer enquiry or message.
 * Handles data persistence and retrieval for the 'Enquiry' table.
 * Extends BaseModel to inherit UUID generation and timestamp management.
 */
class EnquiryModel extends BaseModel
{
    protected string $tableName = 'Enquiry';

    protected ?string $userId;
    protected string $name;
    protected string $email;
    protected ?string $phoneNumber;
    protected ?string $subject;
    protected string $message;
    protected string $status;

    public function __construct()
    {
        parent::__construct();
    }

    // --- Getters ---
    public function getUserId(): ?string { return $this->userId; } // ADDED
    public function getName(): string { return $this->name; }
    public function getEmail(): string { return $this->email; }
    public function getPhoneNumber(): ?string { return $this->phoneNumber; }
    public function getSubject(): ?string { return $this->subject; }
    public function getMessage(): string { return $this->message; }
    public function getStatus(): string { return $this->status; }

    // --- Setters ---
    public function setUserId(?string $userId): self { $this->userId = $userId; return $this; } // ADDED
    public function setName(string $name): self { $this->name = $name; return $this; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }
    public function setPhoneNumber(?string $phoneNumber): self { $this->phoneNumber = $phoneNumber; return $this; }
    public function setSubject(?string $subject): self { $this->subject = $subject; return $this; }
    public function setMessage(string $message): self { $this->message = $message; return $this; }
    public function setStatus(string $status): self { $this->status = $status; return $this; }

    /**
     * Saves a new enquiry record to the database.
     * @return bool True on success, false on failure.
     */
    public function save(): bool
    {
        $this->id = self::getId();

        $sql = "INSERT INTO {$this->tableName} (EnquiryID, UserID, Name, Email, PhoneNumber, Subject, Message, Status, CreatedAt, UpdatedAt)
                VALUES (:id, :userId, :name, :email, :phoneNumber, :subject, :message, :status, :createdAt, :updatedAt)";

        $params = [
            ':id' => $this->id,
            ':userId' => $this->userId, // ADDED
            ':name' => $this->name,
            ':email' => $this->email,
            ':phoneNumber' => $this->phoneNumber,
            ':subject' => $this->subject,
            ':message' => $this->message,
            ':status' => $this->status,
            ':createdAt' => $this->getCreatedAt(),
            ':updatedAt' => $this->getUpdatedAt()
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Updates an existing enquiry record in the database.
     * @return bool True on success, false on failure.
     */
    public function update(): bool
    {
        $this->setUpdatedAt(date('Y-m-d H:i:s'));

        $sql = "UPDATE {$this->tableName} SET
                    UserID = :userId,
                    Name = :name,
                    Email = :email,
                    PhoneNumber = :phoneNumber,
                    Subject = :subject,
                    Message = :message,
                    Status = :status,
                    UpdatedAt = :updatedAt
                WHERE EnquiryID = :id";

        $params = [
            ':userId' => $this->userId,
            ':name' => $this->name,
            ':email' => $this->email,
            ':phoneNumber' => $this->phoneNumber,
            ':subject' => $this->subject,
            ':message' => $this->message,
            ':status' => $this->status,
            ':updatedAt' => $this->getUpdatedAt(),
            ':id' => $this->id
        ];

        return $this->db->execute($sql, $params);
    }

    /**
     * Finds an enquiry by its EnquiryID (UUID).
     * @param string $id The UUID of the enquiry to find.
     * @return static|null The EnquiryModel instance if found, null otherwise.
     */
    public static function find(string $id): ?static
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName} WHERE EnquiryID = :id LIMIT 1";
        $params = [':id' => $id];
        $result = $instance->db->fetch($sql, $params);

        if ($result) {
            return $instance
                ->setId($result['EnquiryID'])
                ->setUserId($result['UserID'])
                ->setName($result['Name'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setSubject($result['Subject'])
                ->setMessage($result['Message'])
                ->setStatus($result['Status'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return null;
    }

    /**
     * Retrieves all enquiry records from the database.
     *
     * @return array An array of EnquiryModel instances. Returns an empty array if no enquiries are found.
     */
    public static function all(): array
    {
        $instance = new static();
        $sql = "SELECT * FROM {$instance->tableName}";
        $results = $instance->db->fetchAll($sql);

        if (!is_array($results)) {
            $results = [];
        }

        $enquiries = [];
        foreach ($results as $result) {
            $enquiries[] = (new static())
                ->setId($result['EnquiryID'])
                ->setUserId($result['UserID'])
                ->setName($result['Name'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setSubject($result['Subject'])
                ->setMessage($result['Message'])
                ->setStatus($result['Status'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $enquiries;
    }

    /**
     * Finds enquiries by UserID.
     * This method is crucial for allowing customers to see/manage only their own enquiries.
     *
     * @param string $userId The UUID of the user.
     * @return array An array of EnquiryModel instances.
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

        $enquiries = [];
        foreach ($results as $result) {
            $enquiries[] = (new static())
                ->setId($result['EnquiryID'])
                ->setUserId($result['UserID'])
                ->setName($result['Name'])
                ->setEmail($result['Email'])
                ->setPhoneNumber($result['PhoneNumber'])
                ->setSubject($result['Subject'])
                ->setMessage($result['Message'])
                ->setStatus($result['Status'])
                ->setCreatedAt($result['CreatedAt'])
                ->setUpdatedAt($result['UpdatedAt']);
        }
        return $enquiries;
    }

    /**
     * Deletes an enquiry record by its EnquiryID (UUID).
     * @param string $id The UUID of the enquiry to delete.
     * @return bool True on success, false on failure.
     */
    public static function delete(string $id): bool
    {
        $instance = new static();
        $sql = "DELETE FROM {$instance->tableName} WHERE EnquiryID = :id";
        $params = [':id' => $id];
        return $instance->db->execute($sql, $params);
    }
}

?>