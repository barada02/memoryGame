<?php
include("database.php"); // Include the database connection file

// Variables
$UserName = "Divya";
$Level = "1";
$Time = "2:00";
$Score = "60";

// Get Database Connection
$conn = getDatabaseConnection(); // Assuming `getDatabaseConnection()` is defined in `database.php`

if ($conn === null) {
    die("Database connection failed. Please check the logs.");
}

// SQL Query with Prepared Statement
$sql = "INSERT INTO users (UserName, Level, Time, Score) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    // Bind Parameters
    $stmt->bind_param("ssss", $UserName, $Level, $Time, $Score);

    // Execute Query
    if ($stmt->execute()) {
        echo "User is now registered";
    } else {
        echo "Could not register user: " . $stmt->error;
    }

    // Close Statement
    $stmt->close();
} else {
    echo "Failed to prepare the statement: " . $conn->error;
}

// Close Connection
$conn->close();
?>
