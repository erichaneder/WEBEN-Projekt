<?php
  session_start();
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#" onclick="loadContent('landingpage.html')">FECHTOUTLET</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active home">
        <a class="nav-link" href="#" onclick="loadContent('landingpage.html')">Home</a>
      </li>
      <li class="nav-item users">
        <a class="nav-link" href="#" onclick="loadContent('users.html')">Users</a>
      </li>
      <li class="nav-item about">
        <a class="nav-link" href="#" onclick="loadContent('about.html')">About Us</a>
      </li>
      <li class="nav-item contact">
        <a class="nav-link" href="#" onclick="loadContent('contact.html')">Contact Us</a>
      </li>
      <li class="nav-item addProducts">
        <a class="nav-link" href="#" onclick="loadContent('produktbearbeitung.html')">Add Products</a>
      </li>
      <li class="nav-item orders">
        <a class="nav-link" href="#" onclick="loadContent('orders.html')">Orders</a>
      </li>
    </ul>
    <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
      <li class="nav-item col-6 col-lg-auto basket">
        <a class="nav-link py-3 px-0 px-lg-2" href="#" onclick="loadContent('basket.html')">
          <i class="fas fa-shopping-cart cart-icon"></i>
          <span id="cartCount" class="top-10 translate-middle badge rounded-pill bg-danger">0</span>
        </a>
      </li>
      <li class="nav-item col-6 col-lg-auto">
        <span class="nav-divider"></span> <!-- Divider um den Basket von den Login/Register Buttons zu trennen-->
      </li>
      <?php
        if(isset($_SESSION["user"])) {
          echo '<li class="nav-item col-6 col-lg-auto profil">
              <a class="nav-link py-3 px-0 px-lg-2" href="#" onclick="loadContent(\'profil.html\', '.$_SESSION["user"].')">Mein Konto</a>
            </li>
            <li class="nav-item col-6 col-lg-auto login">
              <a class="nav-link py-3 px-0 px-lg-2" href="#" onclick="logoutUser()">LOGOUT</a>
            </li>';
        }
      ?>
      <?php
        if(!isset($_SESSION["user"])) {
          echo '<li class="nav-item col-6 col-lg-auto register">
          <a class="nav-link py-3 px-0 px-lg-2" href="#" onclick="loadContent(\'register.html\', 0)">REGISTER</a>
        </li>
        <li class="nav-item col-6 col-lg-auto login">
          <a class="nav-link py-3 px-0 px-lg-2" href="#" onclick="loadContent(\'login.html\', 0)">LOGIN</a>
        </li>';
        }
      ?>
    </ul>
  </div>
</nav>
