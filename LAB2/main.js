/**
 * To capture a live video feed of 720p resolution at 30 fps from the device camera and encode frames with h.264 encoding with 5 Mbps bitrate levels, you can use WebCodecs API for web applications or MediaCodec API for Android applications.

Here are the general steps for capturing and encoding video frames using these APIs:

Create a canvas element for video rendering and a video element for video capture.

Use the getUserMedia() method to request permission to access the camera and microphone. This method returns a Promise that resolves to a MediaStream object.

Create a MediaRecorder object to record the video stream. Use the MediaRecorder API to specify the desired video format, codec, and bitrate settings. For h.264 encoding with 5 Mbps bitrate levels, you can set the mimeType property to "video/mp4;codecs=avc" and the video bitrate to 5000 kbps.

Add event listeners to the MediaRecorder object to handle the dataavailable and stop events. The dataavailable event fires when new data is available from the recorder, and the stop event fires when recording is complete.

Create a video encoder using the createEncoder() method from the WebCodecs API or MediaCodec API. Set the desired video format, codec, and bitrate settings using the appropriate API.

Create a canvas rendering context and draw the video frames onto the canvas. Use the getImageData() method to retrieve the image data from the canvas.

Use the encode() method of the video encoder to encode the image data as a video frame. This method returns a Promise that resolves to a EncodedVideoChunk object.

Use the appendChunk() method of the MediaRecorder object to append the encoded video chunk to the recording.

Repeat steps 6-8 to continue capturing and encoding video frames.

When finished recording, use the stop() method of the MediaRecorder object to stop recording.

Note that the exact steps may vary depending on the specific API and application you are using. It is recommended to refer to the documentation and examples provided by the API to ensure proper implementation.
 */


const videoElement = document.createElement('video');
const video = document.getElementById('video');
const startButton= document.querySelector('button#start-streaming');
const stopButton = document.querySelector('button#stop-streaming');
const settings = {
  video: { 
    width: { exact: 1280 },
    height: { exact: 720 },
    frameRate: { exact: 30 },
  },
  audio: true
};
let stream = null; 
let recorder = null; 
const buffer = [];
var counter = 0; 


startButton.addEventListener('click', async function startVideoCapture() {
            try {
              stream = await navigator.mediaDevices.getUserMedia(settings);
              console.log("streaming started");
              video.srcObject = stream;
              video.play();
              // document.body.appendChild(video);
            } catch (error) {
              console.error('Error starting video capture:', error);
            }

            console.log("creating recorder");
            recorder = new MediaRecorder(stream, {
              mimeType: "video/webm;codecs=h264",
              videoBitsPerSecond: 5000000
            });
            console.log("recorder created");

            recorder.start(3000);

            recorder.addEventListener('dataavailable', (event) => {
              // handle new data
              console.log("New data");
              buffer.push(event.data);
              console.log("Length of buffer: "+buffer.length);
              sendData(buffer);
            });
            
            recorder.addEventListener('stop', (event) => {
              // handle end of recording
              console.log("Media recorder stopped");

              // Extra-credit
              counter = 0;
              temp_blob = new Blob(buffer, { type: "video/mp4" });
              url = URL.createObjectURL(temp_blob);
              playbackVideo = document.createElement("a");
              document.body.appendChild(playbackVideo);
              playbackVideo.href = url; 
              playbackVideo.download = 'playback-video.mp4';
              replay = document.createElement('video');
              document.body.appendChild(replay);
              replay.src = url;
              replay.play();
            });

  });


  stopButton.addEventListener('click', function stopVideoCapture() {
    if (stream !== null) {
      console.log("streaming stopped");
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
  });

function sendData(buffer){
  
  console.log("-----THE REQUEST-----")
  
  while(counter<buffer.length){
    console.log("COUNTER STATUS: "+ counter)
    console.log("BUFFER STATUS: "+buffer.length)
    
    // setting up xhr request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    // setting up data to send in a form
    var form = new FormData();
    form.append("int", counter.toString());

  
    var blob = buffer[counter];
    var segment = new Blob([blob], { type: "video/webm" });
    form.append("blob", segment, 'tmp_name');
    

    console.log("Form data before sending: ");
      for (let pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }

    // send form
    xhr.send(form);
  
    // wait for response from php server
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("RESPONSE: "+xhr.responseText);
        if (xhr.responseText === "Request received successfully") {
          console.log("Test-Request received successfully");
        } else {
          console.log("Error: Request not received successfully");
        }
      }}
    counter = counter+1;
  }
};








//BRI CODE

// // prompts user permission to access camera
// navigator.mediaDevices.getUserMedia({ 
//     video: {
//         width: { exact: 1280 },
//         height: { exact: 720 },
//         frameRate: { exact: 30 }
//     }
// })
//   .then((stream) => {
//     videoElement.srcObject = stream;
//     videoElement.play();

//     setInterval(() => {
//       //capture video frames
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//       const videoSegment = canvas.toDataURL('video/webm'); // Convert frames to video segment
  
//       // Save video segment to the server using an HTTP request
//       fetch('/saveVideoSegment', {
//         method: 'POST',
//         body: JSON.stringify({ segmentData: videoSegment }),
//         headers: { 'Content-Type': 'application/json' }
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.message) {
//           console.log('Video segment saved successfully');
//         } else {
//           console.error('Failed to save video segment:', data.error);
//         }
//       })
//       .catch(error => {
//         console.error('Failed to save video segment:', error);
//       });
//     }, 10000); // Capture video segment every 10 seconds
//   })
//   .catch(error => {
//     console.error('Failed to access camera:', error);
//   });