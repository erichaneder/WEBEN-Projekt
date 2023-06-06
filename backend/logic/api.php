<?php

function processRequest() {
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            processGet();
            break;
        case "POST":
            processPost();
            break;
        case "POST":
            processDelete();
            break;
        default:
            error(405, ["Allow: GET, POST, DELETE"], "Method not allowed");
    }
}

function processGet() {
    if(isset($_GET["users"])) {
        $users = userService->findAll();
    }
}


?>