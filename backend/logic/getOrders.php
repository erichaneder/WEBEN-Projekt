<?php

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

$userid = $_GET['userid'];

// Retrieve all products
$sql = "SELECT * FROM orders o join users u on u.user_id = o.customer_id where customer_id = " . $userid;
$result = $conn->query($sql);

$orders = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
} 

echo json_encode($orders);

// Close the database connection
$conn->close();

?>