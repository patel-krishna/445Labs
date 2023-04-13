<?php

    // TO-DO : CURRENT ISSUES 
    // 1. The video segments are not playing 


    // --------OLD--------
    // Read the raw data of the Blob from the php://input stream
    // $blobData = file_get_contents("php://input");
  
    // // Create a new Blob object from the raw data
    // $blob = new Blob([$blobData], ["type" => "video/mp4"]);
    // ----------------------
    

    //uploading files to local directory 
    //were not able to connect to concordia server 
    $uploadDir = 'C:\Users\Krish\.vscode\445Labs\LAB2\client\\';
    $fileName = $_FILES['segment']['name'];
    $fileTmpName = $_FILES['segment']['tmp_name'];

    if (move_uploaded_file($fileTmpName, $uploadDir . $fileName)) {
        echo "File uploaded successfully.";
    } else {
        echo "Error uploading file.";
    }
    
    $uniqueID = $_POST['id']; 
    $date = date('Y-m-d h:i:s');


    //add to sql database
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

  $sql = "INSERT INTO videos (identifier, video, uploadtime)
      VALUES ('$uniqueID', '$fileName', CURRENT_TIMESTAMP())";

      if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }

      $conn->close();
    
// Prepare the insert statement
// $stmt = $conn->prepare("INSERT INTO videos (ID, Segment) VALUES (?, ?)");

// // Bind the parameters to the statement
// $stmt->bind_param("is", $myInt, $blob_data);

// // Execute the statement
// if ($stmt->execute() === TRUE) {
//   echo "New record created successfully";
// } else {
//   echo "Error: " . $stmt->error;
// }

// // Close the statement and connection
// $stmt->close();
// $conn->close();

    
    // Send a response to the client
    // echo "Request received successfully";

  

?> 

