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


startButton.addEventListener('click', async function startVideoCapture() {
            try {
              stream = await navigator.mediaDevices.getUserMedia(settings);
              console.log("streaming");
              video.srcObject = stream;
              video.play();
              // document.body.appendChild(video);
            } catch (error) {
              console.error('Error starting video capture:', error);
            }
  });


  stopButton.addEventListener('click', function stopVideoCapture() {
    if (stream !== null) {
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
  });










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