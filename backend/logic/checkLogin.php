<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the "Remember me" checkbox is selected
    if (isset($_POST['remember']) && $_POST['remember'] == 'on') {
        // Set a cookie with the email value
        $email = $_POST['email'];
        setcookie('remembered_email', $email, time() + (86400 * 365), '/'); // Cookie expires in 365 days
    }

    // Retrieve the submitted email and password
    $email = $_POST['email'];
    $password = $_POST['password'];

    require_once('../config/dbaccess.php');
    $conn = new mysqli($host, $user, $dbpassword, $database);
    if($conn->connect_error) {
        echo "Connection Error: " . $conn->connect_error;
        exit();
    
    }

    //checken ob das pw gleich dem gehashten aus der db ist
    $hashpw = password_hash($password, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM users where user_mail = '" . $email . "'";
    $result = $conn->query($sql);
                
    if ($result->num_rows > 0) {

        $users = $result->fetch_assoc();
        $dbpw = $users['user_password'];
        //verify password
        if(password_verify($password, $dbpw)) {
            $userid = $users['user_id'];
        } else {
            $_SESSION['error_message_login'] = "Zugangsdaten oder Passwort inkorrekt!";
            header('Location: ../../frontend/sites/index.php');
            exit();
        }
    } else {
        // error handling, no user found for these credentials
        $_SESSION['error_message_login'] = "Zugangsdaten oder Passwort inkorrekt!";
        header('Location: ../../frontend/sites/index.php');
        exit();
    }

    $_SESSION['user'] = $userid; //userid von der db setzen

    // Redirect to the desired page after successful login
    $_SESSION['message'] = "Herzlich willkommen";
    header('Location: ../../frontend/sites/index.php');
    exit();
}
?>