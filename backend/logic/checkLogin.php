<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the submitted email and password
    $email = $_POST['email'];
    $password = $_POST['password'];

    require_once('../config/dbaccess.php');
    $conn = new mysqli($host, $user, $dbpassword, $database);
    if($conn->connect_error) {
        echo "Connection Error: " . $conn->connect_error;
        exit();
    
    }
    $sql = "SELECT user_id FROM users where user_mail = '" . $email . "' and user_password = '" . $password."'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = $result->fetch_assoc();
        $userid = $users['user_id'];
    } else {
        // error handling, no user found for these credentials
        echo "Credentials did not match!";
        exit();
    }

    $_SESSION['user'] = $userid; //userid von der db setzen

    // Redirect to the desired page after successful login
    header('Location: ../../frontend/sites/index.php');
    exit();
}
?>