<?php
// Retrieve the JSON data from the request body
$jsonData = file_get_contents('php://input');

// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

// Access the data
$email = $data['email'];

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

$sql = "Update users SET user_status = 0 WHERE user_mail = " . $email . ";";

if($conn->query($sql) === TRUE) {
    $response = array('message' => 'Customer set to inactive successfully');
    echo json_encode($response);
} else {
    $response = array('message' => 'Error updating customer: ' . $conn->error);
    echo json_encode($response);
}

// Close the database connection
$conn->close();
?>
