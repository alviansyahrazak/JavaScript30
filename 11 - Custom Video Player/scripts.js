const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressFilled = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.player__button[data-skip]');
const playerSliders = player.querySelectorAll('.player__slider');

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  video.paused
    ? (playButton.innerHTML = '<i class="fas fa-play"></i>')
    : (playButton.innerHTML = '<i class="fas fa-pause"></i>');
};

const progressVideo = () => {
  if (video.duration > 0) {
    const percentage = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percentage}%`;
  }
};

const handleProgress = (e) => {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
};

const skipVideo = (e) => {
  const skipTime = parseFloat(e.currentTarget.dataset.skip);
  video.currentTime += skipTime;
};

const handleSliderUpdate = (e) => {
  const { name, value } = e.currentTarget;
  video[name] = parseFloat(value);
};

video.addEventListener('timeupdate', progressVideo);

playButton.addEventListener('click', togglePlay);
skipButtons.forEach((skipButton) =>
  skipButton.addEventListener('click', skipVideo),
);
playerSliders.forEach((slider) =>
  slider.addEventListener('input', handleSliderUpdate),
);

let isHandleProgress = false;
progress.addEventListener('click', handleProgress);
progress.addEventListener('mousemove', (e) => {
  if (isHandleProgress) {
    handleProgress(e);
  }
});
progress.addEventListener('mousedown', () => (isHandleProgress = true));
progress.addEventListener('mouseup', () => (isHandleProgress = false));
