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
    $uploadDir = 'client//';
    $fileName = $_FILES['segment']['name'];
    $fileTmpName = $_FILES['segment']['tmp_name'];

    if (move_uploaded_file($fileTmpName, $uploadDir . $fileName)) {
        echo "File uploaded successfully.";
    } else {
        echo "Error uploading file.";
    }
    
    $uniqueID = $_POST['id']; 
    $date = date('Y-m-d h:i:s');

    // Create a list of the video segments
    $segmentFile = $uploadDir . $uniqueID . '.txt'; // replace with your file name

    // Check if the file exists, if not create it
    if (!file_exists($segmentFile)) {
        file_put_contents($segmentFile, '');
    }

    // Get the list of video segment files
    $segments = file($segmentFile, FILE_IGNORE_NEW_LINES);

    // Add a new segment to the list of files
    $newSegment = $fileTmpName; // replace with the file name of the new segment
    $segments[] = $newSegment;

    // Update the list of files in the text file
    file_put_contents($segmentFile, implode(PHP_EOL, $segments));

    $command = "C:\\ffmpeg\\bin\\ffmpeg -f concat -safe 0 -i $segmentFile -c copy output.mp4";

    exec($command);

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

