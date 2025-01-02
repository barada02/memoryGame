<?php
include("database.php");

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method not allowed";
    exit;
}

// Get POST data
$UserName = isset($_POST['UserName']) ? trim($_POST['UserName']) : '';
$Level = isset($_POST['Level']) ? trim($_POST['Level']) : '';
$Time = isset($_POST['Time']) ? intval($_POST['Time']) : 0;
$Score = isset($_POST['Score']) ? intval($_POST['Score']) : 0;

// Validate data
if (empty($UserName) || empty($Level)) {
    http_response_code(400);
    echo "Missing required fields";
    exit;
}

// Get Database Connection
$conn = getDatabaseConnection();

if ($conn === null) {
    http_response_code(500);
    echo "Database connection failed";
    exit;
}

// SQL Query with Prepared Statement
$sql = "INSERT INTO scores (username, level, time, score, date_created) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    // Bind Parameters
    $stmt->bind_param("ssii", $UserName, $Level, $Time, $Score);

    // Execute Query
    if ($stmt->execute()) {
        http_response_code(200);
        echo "Score submitted successfully";
    } else {
        http_response_code(500);
        echo "Database error: " . $stmt->error;
    }

    // Close Statement
    $stmt->close();
} else {
    http_response_code(500);
    echo "Failed to prepare statement: " . $conn->error;
}

// Close Connection
$conn->close();
?>
