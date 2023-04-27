$(document).ready(function() {
  const videoFiles = [
    'film1.mp4',
    'film2.mp4',
    'film3.mp4',
    'film4.mp4',
    'film5.mp4',
    'film6.mp4',
    'film7.mp4',
    'film8.mp4',
    'film9.mp4'
  ];

  const videoElement = $('#video-element')[0];
  let currentVideoIndex = 0;

  function playCurrentVideo() {
    videoElement.src = videoFiles[currentVideoIndex];
    videoElement.play();
    videoElement.addEventListener('ended', nextVideo);
  }

  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
    playCurrentVideo();
  }

  function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
    playCurrentVideo();
  }

  playCurrentVideo();

  let startY, currentY, endY, distanceY = 0;

  $('#video-container').on('touchstart', function(e) {
    startY = e.originalEvent.touches[0].clientY;
    currentY = startY;
  });

  $('#video-container').on('touchmove', function(e) {
    currentY = e.originalEvent.touches[0].clientY;
    distanceY = currentY - startY;
  });

  $('#video-container').on('touchend', function() {
    if (distanceY < -50) {
      nextVideo();
    } else if (distanceY > 50) {
      prevVideo();
    }
    distanceY = 0;
  });

  $('#video-container').css('touch-action', 'none');
});