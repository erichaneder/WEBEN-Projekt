<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the submitted form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];
    $billingName = $_POST['billingName'];

    error_log("Submitted params");

    // Create connection
    require_once('../config/dbaccess.php');
    $conn = new mysqli($host, $user, $dbpassword, $database);
    if ($conn->connect_error) {
        echo "Connection Error: " . $conn->connect_error;
        exit();
    }

    error_log("Established connection");

    // Perform form validation
    if ($password !== $password2) {
        // Passwords do not match, handle the error
        $_SESSION['error_message_register'] = "Passwörter stimmen nicht überein!";
        header('Location: ../../frontend/sites/index.php');
        exit();
    }

    // Perform additional form validation if needed
    $sql = "SELECT user_id FROM users where user_mail = '" . $email ."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['error_message_register'] = "Mailadresse bereits in verwendeung";
        header('Location: ../../frontend/sites/index.php');
        exit();
    }

    //Password hashen
    $hashpw = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Insert the user data into the database
    $sql = "INSERT INTO users (user_name, user_mail, user_password, user_adress, user_city, user_zipcode, user_country, user_phone, user_billingname, user_role, user_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Define the user_role and user_status values
    $userRole = 0; // Non-admin user role (change it to 1 for an admin user if needed)
    $userStatus = 1; // Active user status

    // Bind the form data to the prepared statement
    $stmt->bind_param("sssssssssii", $_POST['username'], $_POST['email'], $hashpw, $_POST['address'], $_POST['city'], $_POST['zip'], $_POST['country'], $_POST['phone'], $_POST['billingName'], $userRole, $userStatus);
    $stmt->execute();

    // Check if the user was successfully inserted
    if ($stmt->affected_rows > 0) {
        // Retrieve the user ID of the inserted user
        $userId = $stmt->insert_id;
        
        session_start();
        // Store the user ID in the session
        $_SESSION['user'] = $userId;
        
        // Close the database connection
        $stmt->close();
        $conn->close();

        // Redirect to the desired page after successful login (checkLogin.php in this case)
        $_SESSION['message'] = "Herzlich willkommen";
        header('Location: ../../frontend/sites/index.php');
        exit();
    } else {
        // Close the database connection
        $stmt->close();
        $conn->close();
        // Failed to insert the user, handle the error accordingly
        echo "User registration failed!";
        exit();
    }

    
}
?>
