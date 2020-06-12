const player = document.querySelector('.player');
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const fullScreen = document.getElementById('fullscreen');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const volume = document.querySelector('.volume');
const volumeButton = document.getElementById('volumeBtn');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');

function toggleVideoStatus() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updatePlayIcon(e) {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play"></i>';
        play.attributes[2].value = '재생';
    } else {
        play.innerHTML = '<i class="fas fa-pause"></i>';
        play.attributes[2].value = '일시정지';
    }
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip); 
}

function handleFullScreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function updateTimeStamp() {
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timeElapsed.innerHTML = video.ended ? '00:00' : `${mins}:${secs}`;
}

function videoDuration() {
    const mins = parseInt(video.duration / 60);
    const secs = Math.floor(video.duration % 60);

    duration.textContent = `0${mins}:${secs}`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleVolumeUpdate() {
    video[this.name] = this.value;

    const volumeIcon = video[this.name] === 0 ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    volumeButton.innerHTML = volumeIcon;
}

// Event Listeners
window.addEventListener('load', videoDuration);

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('timeupdate', updateTimeStamp);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
skipButtons.forEach(button => button.addEventListener('click', skip));
fullScreen.addEventListener('click', handleFullScreen);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

volume.addEventListener('change', handleVolumeUpdate);
volume.addEventListener('mousedown', handleVolumeUpdate);