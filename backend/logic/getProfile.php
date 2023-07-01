<?php

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

// Retrieve all customers
$sql = "SELECT * FROM users where user_id = 1"; // <---- Here put in userid dinamically
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    echo json_encode($userData);
} else {
    //return empty array
    echo array();
}

// Close the database connection
$conn->close();

?>