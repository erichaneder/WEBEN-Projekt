<?php
require_once('../config/dbaccess.php');

// Retrieve the message data from the AJAX request
$userid = $_POST['userid'];
$content = $_POST['content'];
$date = $_POST['date'];

// Store the message data in the database
$conn = new mysqli($host, $user, $dbpassword, $database);
if ($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

// Prepare the SQL statement
$sql = "INSERT INTO messages (userid, content, date) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

// Bind the parameters
$stmt->bind_param("iss", $userid, $content, $date);

// Execute the statement
$stmt->execute();

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

// Return a success response
$response = array('message' => 'Message submitted successfully');
echo json_encode($response);
?>
