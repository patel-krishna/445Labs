<?php
// $servername = "localhost";
// $username = "username";
// $password = "password";
// $dbname = "myDB";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }

// $sql = "INSERT INTO MyGuests (firstname, lastname, email)
// VALUES ('John', 'Doe', 'john@example.com')";

// if ($conn->query($sql) === TRUE) {
//   echo "New record created successfully";
// } else {
//   echo "Error: " . $sql . "<br>" . $conn->error;
// }

// $conn->close();

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read the integer value from the request
    $myInt = $_POST["number"];
    
    // Read the raw data of the Blob from the php://input stream
    $blobData = file_get_contents("php://input");
  
    // Create a new Blob object from the raw data
    $blob = new Blob($blobData, ["type" => "video/mp4"]);
  
    // Do something with the integer and the Blob object
  
    // Send a response to the client
    echo "Request received successfully";
  }

?> 

