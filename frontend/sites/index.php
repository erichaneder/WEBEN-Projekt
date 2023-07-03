<!DOCTYPE html>
<html>

<?php
session_start();

if(isset($_SESSION['user'])) {
    echo "Eingeloggter User: " . $_SESSION['user'];
} else {
    echo "Kein User eingeloggt.";
}   

?>

<head>
	<title>Das Fechtoutlet</title>
    <meta name="description" content="Das Fechtoutlet">
    <meta name="keywords" content="Das Fechtoutlet">
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="../res/css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/font_awesome.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<body>
	<header>
		<h1>Das Fechtoutlet</h1>
	</header>
	
    <div id="navigation"></div>
    
    <!-- Container Page is here so the website doesn't "shrink" while changing scenes -->
    <div class="page">
        <div id="content"></div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <!-- Toast element to display the error message -->
        <div id="errorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body"></div>
        </div>
    </div>
	
	<footer>
		<p>&copy; 2023 Das Fechtoutlet. All rights reserved.</p>
	</footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script>
        $(document).ready(function() {
            $("#navigation").load("nav.php");
            <?php 
            if (isset($_SESSION['error_message_login'])) {
                // Error in login
                echo "$(\"#content\").load(\"login.php\", function() {";
                echo "showToast('" . $_SESSION["error_message_login"] . "');";
                echo "});";
                unset($_SESSION["error_message_login"]);
            } else if (isset($_SESSION['error_message_register'])) {
                // Error in Registration
                echo "$(\"#content\").load(\"register.html\", function() {";
                echo "showToast('" . $_SESSION["error_message_register"] . "');";
                echo "});";
                unset($_SESSION["error_message_register"]);
            } else if (isset($_SESSION['message'])) {
                // Successful login
                echo "$(\"#content\").load(\"landingpage.html\", loadProducts);";
                echo "showToast('" . $_SESSION["message"] . "');";
                unset($_SESSION["message"]);
            } else {
                // Normal pageload
                echo "$(\"#content\").load(\"landingpage.html\", loadProducts);";
            }
            
            ?>
        });
    </script>
</body>
</html>