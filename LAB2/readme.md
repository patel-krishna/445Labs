
# 445 - Lab 2 

Project by Krishna Patel (40176352) and Brianna Malpartida (40045115)

Username on host server: We had to use our own local server. 
MAMP MySQL set-up info:

    `$user = 'root';
    $password = 'root';
    $db = '445lab2';
    $host = 'localhost';
    $port = 3234;`




## Source Files

### index.hmtl
This file contains the front end part of our application. A simple video viewer with a button that starts and stops the stream when clicked. To this page is appended the videos that are streamed in that session. 

### main.js

This file contains all of the main front-end functionalities of the app. We first get access to the webcame feed, and stream is then sliced and the mp4 files generated are stored in a buffer and sent to the php backend using a FormData object. We also generate unique id's for the streams so they can be identifiable in our sql db.

### backend.php 

This code is the backend side of our app. It handles the mp4 files received, and uploads them to the desired directory. Morever, it also stores information in a local MySQL DB for further documentation and tracking. This is currently all done locally as we did not have enough time and resources to properly connect to the school server. 

### Client file

Because we could not connect to the school server, the mp4 files are currently stored locally on our machines. 

### MySQL

The MySQL server contains a table which stores the unique stream id, the video blob as well as a timestamp of the time at which the video was uploaded.

