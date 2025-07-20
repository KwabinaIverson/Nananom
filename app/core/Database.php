<?php

namespace App\Core;

use PDO;
use PDOException;

/**
 * Database Class
 *
 * A simple wrapper for PDO to handle database connections and queries.
 * It uses configuration constants from app/config/database.php.
 * Provides methods for executing SQL statements securely using prepared statements.
 */
class Database
{
    private PDO $pdo;
    private \PDOStatement $stmt;

    /**
     * Constructor: Establishes a database connection using PDO.
     * Throws PDOException if the connection fails.
     */
    public function __construct()
    {
        $config = require APP_ROOT . '/app/config/database.php';

        $dbHost    = $config['host'];
        $dbName    = $config['dbname'];
        $dbUser    = $config['user'];
        $dbPass    = $config['pass'];
        $dbCharset = $config['charset'];
        $dbPort    = $config['port'];

        // Data Source Name string for MySQL
        $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset={$dbCharset}";

        // PDO options for error handling, fetch mode, and prepared statement emulation
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            // Create a new PDO instance
            $this->pdo = new PDO($dsn, $dbUser, $dbPass, $options);
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            die("Database connection failed. Please check your database configuration and server status. Error: " . $e->getMessage());
        }
    }

    /**
     * Prepares an SQL query.
     *
     * @param string $sql The SQL query string.
     * @return self Returns the current Database instance for method chaining.
     */
    public function query(string $sql): self
    {
        $this->stmt = $this->pdo->prepare($sql);
        return $this;
    }

    /**
     * Binds parameters to the prepared statement.
     * Automatically determines the PDO parameter type based on the value's type.
     *
     * @param array $params An associative array of parameters (e.g., [':name' => 'John Doe', ':age' => 30]).
     * @return self Returns the current Database instance for method chaining.
     */
    public function bind(array $params): self
    {
        foreach ($params as $param => $value) {
            // Determine the PDO parameter type
            $type = match (true) {
                is_int($value) => PDO::PARAM_INT,
                is_bool($value) => PDO::PARAM_BOOL,
                is_null($value) => PDO::PARAM_NULL,
                default => PDO::PARAM_STR,
            };
            $this->stmt->bindValue($param, $value, $type);
        }
        return $this;
    }

    /**
     * Executes the prepared statement.
     * This method is suitable for INSERT, UPDATE, DELETE queries where you don't expect a result set.
     *
     * @param string $sql The SQL query string.
     * @param array $params An optional associative array of parameters to bind.
     * @return bool True on successful execution, false on failure.
     */
    public function execute(string $sql, array $params = []): bool
    {
        $this->query($sql);
        $this->bind($params);
        try {
            return $this->stmt->execute();
        } catch (PDOException $e) {
            error_log("Database Execution Error: " . $e->getMessage() . " in SQL: " . $sql . " with params: " . json_encode($params));
            return false;
        }
    }

    /**
     * Fetches a single row from the database as an associative array.
     * Suitable for SELECT queries expecting one result.
     *
     * @param string $sql The SQL query string.
     * @param array $params An optional associative array of parameters to bind.
     * @return array|false The fetched row as an associative array, or false if no row is found.
     */
    public function fetch(string $sql, array $params = []): array|false
    {
        $this->query($sql);
        $this->bind($params);
        if ($this->stmt->execute()) {
            return $this->stmt->fetch(PDO::FETCH_ASSOC);
        }
        return false;
    }

    /**
     * Fetches all rows from the database as an array of associative arrays.
     * Suitable for SELECT queries expecting multiple results.
     *
     * @param string $sql The SQL query string.
     * @param array $params An optional associative array of parameters to bind.
     * @return array An array of fetched rows. Returns an empty array if no results or on failure.
     */
    public function fetchAll(string $sql, array $params = []): array
    {
        $this->query($sql);
        $this->bind($params);
        if ($this->stmt->execute()) {
            return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return [];
    }

    /**
     * Returns the number of rows affected by the last DELETE, INSERT, or UPDATE statement.
     *
     * @return int The number of affected rows.
     */
    public function rowCount(): int
    {
        return $this->stmt->rowCount();
    }

    /**
     * Returns the ID of the last inserted row or sequence value.
     * Useful for retrieving auto-incrementing IDs after an INSERT operation.
     *
     * @return string|false The ID of the last inserted row, or false on failure.
     */
    public function lastInsertId(): string|false
    {
        return $this->pdo->lastInsertId();
    }
}

?>