<?php

function getConnection(){
    $servername = "localhost:3306";
    $username = "root";
    $password = "";
    $databasename = "ticketsplease";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $databasename);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        return $conn;
    }
    echo "Connected successfully";
}

?>
