<?php
require_once('../config/dbaccess.php');

// Retrieve the order data from the AJAX request
$orderData = $_POST['products'];

// Perform necessary validation and processing of the order data

// Example: Store the order data in the database
$conn = new mysqli($host, $user, $dbpassword, $database);
if ($conn->connect_error) {
    echo "Connection Error: " . $conn->connect_error;
    exit();
}

// Prepare the SQL statement
$sql = "INSERT INTO orders (customer_id, order_date, product_name, total_cost, quantity) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Bind the parameters
$stmt->bind_param("issii", $customerId, $orderDate, $productName, $price, $quantity);

// Insert each product into the database
foreach ($orderData as $product) {      
    $customerId = 1;                        // --> here insert customerId dynamically with session
    $orderDate = date('Y-m-d');
    $productName = $product['name'];
    $price = $product['price'];
    //$size = $product['size']; --maybe implement this if time
    $quantity = $product['quantity'];

    $stmt->execute();
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();

// Return a success response
$response = array('message' => 'Order submitted successfully');
echo json_encode($response);
?>