<?php

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

$category = $_GET['category'];

// Retrieve all products, filter for category if there is one selected
$sql = "SELECT * FROM articles";
if ($category != '0') {
    $sql .= " WHERE category = '" . $category . "'";
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} else {
    echo "No products found";
}

// Close the database connection
$conn->close();

?>