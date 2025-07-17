<?php
namespace App\Models;

// Import necessary classes
require 'vendor/autoload.php';

use Ramsey\Uuid\Uuid;

/**
 * Abstract BaseModel
 *
 * Provides common functionalities for all application models, including:
 * - UUID generation for primary keys.
 * - Automatic management of 'created_at' and 'updated_at' timestamps.
 * - Basic getter/setter methods for these common attributes.
 * - Abstract methods for 'save' and 'update' that child classes must implement.
 */
abstract class BaseModel implements \JsonSerializable
{
    protected $id;
    protected $created_at;
    protected $updated_at;

    /**
     * Constructor for BaseModel.
     * Initializes the database connection and sets initial timestamps.
     * For new records, the ID will be generated upon saving.
     * For existing records, the ID and timestamps would be loaded from the database.
     */
    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
    }

    /**
     * Get the model's unique ID.
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the creation timestamp.
     *
     * @return string
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Get the last update timestamp.
     *
     * @return string
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Abstract method to save a new record to the database.
     * Child classes must implement this method.
     *
     * @return bool True on success, false on failure.
     */
    abstract public function save(): bool;

    /**
     * Abstract method to update an existing record in the database.
     * Child classes must implement this method.
     *
     * @return bool True on success, false on failure.
     */
    abstract public function update(): bool;

    public function jsonSerialize(): array
    {
        // Get all properties dynamically
        $properties = get_object_vars($this);

        return [
            'id' => $this->id,
            'class' => (new \ReflectionClass($this))->getShortName(),
            'attributes' => $properties
        ];
    }

    public function __toString(): string
    {
        return json_encode($this->jsonSerialize(), JSON_PRETTY_PRINT);
    }
}
?>