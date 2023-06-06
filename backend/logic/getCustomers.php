<?php

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

// Retrieve all customers
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customers = array();
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode($customers);
} else {
    echo "No customers found";
}

// Close the database connection
$conn->close();

?>