$(document).ready(function() {
  let videoFiles = [
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

  // Losowe przemieszanie kolejności filmów
  videoFiles = shuffleArray(videoFiles);

  const videoElement = $('#video-element')[0];
  let currentVideoIndex = 0;
  let loopCurrentVideo = true;

  function playCurrentVideo() {
    videoElement.src = videoFiles[currentVideoIndex];
    videoElement.play();
  }

  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
    loopCurrentVideo = true;
    playCurrentVideo();
  }

  function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
    loopCurrentVideo = true;
    playCurrentVideo();
  }

  function handleVideoEnd() {
    if (loopCurrentVideo) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
  }

  videoElement.addEventListener('ended', handleVideoEnd);

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
      loopCurrentVideo = false;
      nextVideo();
    } else if (distanceY > 50) {
      loopCurrentVideo = false;
      prevVideo();
    }
    distanceY = 0;
  });

  $('#video-container').css('touch-action', 'none');

  // Funkcja do przemieszania tablicy
  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
});