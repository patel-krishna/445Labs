<?php

    // TO-DO : CURRENT ISSUES 
    // 1. the couner integer is not being passed properly to php
    // this causes for the IDs in sql to always be 0
    // 2. The blob data is empty, nothing is being printed to the console 
    // being added to the sql database as well. 

    // Read the integer value from the request
    $myInt = intval($_POST["int"]);
    
    // echo ('test'. $myInt);

    // --------OLD--------
    // Read the raw data of the Blob from the php://input stream
    // $blobData = file_get_contents("php://input");
  
    // // Create a new Blob object from the raw data
    // $blob = new Blob([$blobData], ["type" => "video/mp4"]);
    // ----------------------
    
    $blob_file = $_FILES['blob']['tmp_name'];
    $blob_data = file_get_contents($blob_file);
    echo($blob_data);


    // Do something with the integer and the Blob object -- add to sql database

    $user = 'root';
    $password = 'root';
    $db = '445lab2';
    $host = 'localhost';
    $port = 3234;

    // Create connection
    $conn = new mysqli($host, $user, $password, $db, $port);
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }


    
// Prepare the insert statement
$stmt = $conn->prepare("INSERT INTO segments (ID, Segment) VALUES (?, ?)");

// Bind the parameters to the statement
$stmt->bind_param("is", $myInt, $blob_data);

// Execute the statement
if ($stmt->execute() === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();

    // $sql = "INSERT INTO segments (ID, Segment)
    // VALUES ($myInt, $blob_data)";

    // if ($conn->query($sql) === TRUE) {
    //   echo "New record created successfully";
    // } else {
    //   echo "Error: " . $sql . "<br>" . $conn->error;
    // }

    $conn->close();

  
    // Send a response to the client
    echo "Request received successfully";

  

?> 

