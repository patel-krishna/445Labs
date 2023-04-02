async function startVideoCapture() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { exact: 1280 },
          height: { exact: 720 },
          frameRate: { exact: 30 },
        },
        audio: false,
      });
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();
      document.body.appendChild(videoElement);
    } catch (error) {
      console.error('Error starting video capture:', error);
    }
  }
  
  startVideoCapture();