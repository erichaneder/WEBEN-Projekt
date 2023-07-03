<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the submitted form data
    $userId = $_SESSION['user']; // Assuming you have the user ID stored in the session
    $username = $_POST['username'];
    $address = $_POST['adress'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];
    $billingName = $_POST['billingName'];

    // Create connection
    require_once('../config/dbaccess.php');
    $conn = new mysqli($host, $user, $dbpassword, $database);
    if ($conn->connect_error) {
        echo "Connection Error: " . $conn->connect_error;
        exit();
    }

    // Update the user data in the database
    $sql = "UPDATE users SET user_name = ?, user_adress = ?, user_city = ?, user_zipcode = ?, user_country = ?, user_phone = ?, user_billingname = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);

    // Bind the form data to the prepared statement
    $stmt->bind_param("sssssssi", $username, $adress, $city, $zip, $country, $phone, $billingName, $userId);
    $stmt->execute();

    // Check if the user was successfully updated
    if ($stmt->affected_rows > 0) {
        $_SESSION['message'] = "User information updated successfully";
        header('Location: ../../frontend/sites/index.php');
        exit();
    } else {
        // Failed to update the user, handle the error accordingly
        echo "User update failed!";
        exit();
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
