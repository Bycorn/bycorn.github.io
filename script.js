const video = document.getElementById("video-element");
const playPauseBtn = document.getElementById("play-pause");
const playPauseIcon = document.getElementById("play-pause-icon");
const pauseIcon = document.getElementById("pause-icon");

let videoFiles = [
  'film1.mp4',
  'film2.mp4',
  'film3.mp4',
  'film4.mp4',
  'film5.mp4',
  'film6.mp4',
  'film7.mp4',
  'film8.mp4',
  'film9.mp4',
  'film10.mp4',
  'film11.mp4',
  'film12.mp4'
];

// Losowe przemieszanie kolejności filmów
videoFiles = shuffleArray(videoFiles);

let currentVideoIndex = 0;
let nextVideoIndex = 1;
let loopCurrentVideo = true;
let isPaused = false;
let isSwitchingVideo = false;
let nextVideoLoaded = false;

function playCurrentVideo() {
  video.src = videoFiles[currentVideoIndex];
  video.play();
  preloadNextVideo();
}

function preloadNextVideo() {
  const nextVideo = document.createElement("video");
  nextVideo.src = videoFiles[nextVideoIndex];
  nextVideo.preload = "auto";
  nextVideo.onloadeddata = function() {
    nextVideoLoaded = true;
  };
}

function loadNextVideo() {
  currentVideoIndex = nextVideoIndex;
  nextVideoIndex = (nextVideoIndex + 1) % videoFiles.length;
  nextVideoLoaded = false;
  preloadNextVideo();
}

function switchToNextVideo() {
  loadNextVideo();
  video.src = videoFiles[currentVideoIndex];
  video.play();
}

function handleVideoEnd() {
  if (loopCurrentVideo) {
    video.currentTime = 0;
    video.play();
  } else {
    switchToNextVideo();
  }
}

function togglePlayPause() {
  if (isPaused) {
    video.play();
    isPaused = false;
    playPauseBtn.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  } else {
    video.pause();
    isPaused = true;
    playPauseBtn.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
}

function resetPlayPause() {
  isPaused = false;
  playPauseBtn.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
}

video.addEventListener("ended", handleVideoEnd);

playCurrentVideo();

let startY, currentY, endY, distanceY = 0;

$("#video-container").on("touchstart", function(e) {
  startY = e.originalEvent.touches[0].clientY;
  currentY = startY;
});

$("#video-container").on("touchmove", function(e) {
  currentY = e.originalEvent.touches[0].clientY;
  distanceY = currentY - startY;
});

$("#video-container").on("touchend", function() {
  if (distanceY < -50) {
    loopCurrentVideo = false;
    switchToNextVideo();
  } else if (distanceY > 50) {
    loopCurrentVideo = false;
    currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
    loadNextVideo();
    video.src = videoFiles[currentVideoIndex];
    video.play();
  } else {
    togglePlayPause();
  }
  distanceY = 0;
});

$("#video-container").css("touch-action", "none");

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

// Sprawdza, czy użytkownik zatrzymał film i przełączył się na kolejny film przed wznowieniem poprzedniego filmu
video.addEventListener("pause", function() {
  if (isSwitchingVideo) {
    resetPlayPause();
    isSwitchingVideo = false;
  } else {
    isPaused = true;
    playPauseBtn.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
});

video.addEventListener("play", function() {
  resetPlayPause();
});

video.addEventListener("playing", function() {
  resetPlayPause();
  isPaused = false;
});

video.addEventListener("seeking", function() {
  isSwitchingVideo = true;
});