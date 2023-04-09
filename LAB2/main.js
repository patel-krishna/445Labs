
const videoElement = document.createElement('video');

// prompts user permission to access camera
navigator.mediaDevices.getUserMedia({ 
    video: {
        width: { exact: 1280 },
        height: { exact: 720 },
        frameRate: { exact: 30 }
    }
})
  .then((stream) => {
    videoElement.srcObject = stream;
    videoElement.play();

    setInterval(() => {
      //capture video frames
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const videoSegment = canvas.toDataURL('video/webm'); // Convert frames to video segment
  
      // Save video segment to the server using an HTTP request
      fetch('/saveVideoSegment', {
        method: 'POST',
        body: JSON.stringify({ segmentData: videoSegment }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log('Video segment saved successfully');
        } else {
          console.error('Failed to save video segment:', data.error);
        }
      })
      .catch(error => {
        console.error('Failed to save video segment:', error);
      });
    }, 10000); // Capture video segment every 10 seconds
  })
  .catch(error => {
    console.error('Failed to access camera:', error);
  });