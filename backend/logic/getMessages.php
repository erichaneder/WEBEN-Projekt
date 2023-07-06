<?php
require_once('../config/dbaccess.php');

// Retrieve the user ID from the session or any other means
$userid = 5;  //HARDCODED

// Retrieve the previous messages from the database
$conn = new mysqli($host, $user, $dbpassword, $database);
if ($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

$sql = "SELECT * FROM messages WHERE userid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userid);
$stmt->execute();

$result = $stmt->get_result();
$messages = array();

while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

$stmt->close();
$conn->close();

// Return the messages as JSON response
echo json_encode($messages);
?>