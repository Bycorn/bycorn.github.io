$(document).ready(function() {
  const videoFiles = [
    'film1.mp4',
    'film2.mp4',
    'film3.mp4',
    'film4.mp4'
  ];

  const videoElement = $('#video-element')[0];
  let currentVideoIndex = 0;

  function playCurrentVideo() {
    videoElement.src = 'films/' + videoFiles[currentVideoIndex];
    videoElement.play();
    videoElement.addEventListener('ended', nextVideo);
  }

  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
    playCurrentVideo();
  }

  playCurrentVideo();

  let startY, endY;

  $(document).on('touchstart', function(e) {
    startY = e.originalEvent.touches[0].clientY;
  });

  $(document).on('touchmove', function(e) {
    endY = e.originalEvent.touches[0].clientY;
  });

  $(document).on('touchend', function() {
    if (endY < startY) {
      nextVideo();
    }
  });
});