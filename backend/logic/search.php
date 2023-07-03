<?php

require_once('../config/dbaccess.php');
$conn = new mysqli($host, $user, $dbpassword, $database);
if($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

// Hole den Suchbegriff aus der POST-Anfrage
$searchTerm = $_POST['searchTerm'];
$category = $_POST['category'];

// Führe die Produktsuche in der Datenbank durch
$sql = "SELECT * FROM articles WHERE name LIKE '%$searchTerm%'";
if ($category != '0') {
    $sql .= " AND category = '" . $category . "'";
}
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
} 

echo json_encode($products);

$conn->close();
?>