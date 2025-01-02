<?php
function getDatabaseConnection() {
    $servername = "localhost"; // Your database server
    $username = "root";        // Your database username
    $password = "";   // Your database password
    $dbname = "memorygame";  // Your database name

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $conn->set_charset("utf8mb4");
        return $conn;
    } catch (Exception $e) {
        error_log("Database Error: " . $e->getMessage());
        return null;
    }
}

// Usage example
$conn = getDatabaseConnection();
if ($conn === null) {
    echo "Failed to connect to the database. Please check the logs.";
} else {
    echo "Connected successfully!";
    // Remember to close the connection when done
    $conn->close();
}
?>
