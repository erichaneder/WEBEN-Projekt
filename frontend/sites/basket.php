<?php
    session_start();
?>

<div class="container my-4">
    <h2>Warenkorb</h2>
    <p>Hier siehst du eine Übersicht über deinen Warenkorb.</p>
</div>

<div class="container">
    <div class="cart">
        <!-- Warenkorb-Div -->
    </div>
    <div class="cart-summary">
        <h4>Gesamtpreis: <span id="totalPrice">€0.00</span></h4>
        <button id="btnClearCart" class="btn btn-danger">Warenkorb leeren</button>
        <?php
        if(isset($_SESSION["user"])) {
            echo '<button id="btnCheckout" class="btn btn-primary" onclick="orderBasket('.$_SESSION["user"].')">Warenkorb bestellen</button>';
        }else{
            echo '<button id="checkOudLogin" class="btn btn-primary" onclick="loadContent(\'login.php\')">Zum Bestellen anmelden</button>';
        }
        ?>
    </div>
</div>

<br>
<br>
<br>
<br>