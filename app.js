const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');
    const sounds = document.querySelectorAll('.sounds button');
    const timeSelect = document.querySelectorAll('.time button');
    const timeDisplay = document.querySelector('.time-display');

    // get the length of the outline
    const outlineLength = outline.getTotalLength();

    // durations (продолжительность)
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //create function which can stop and play sounds

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './assets/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = "./assets/play.svg"
        }
    }


    //play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });
    
    const addZero = number => number<10? "0"+number : number;


    //select sound time

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${addZero(Math.floor(fakeDuration/60))}:${addZero(Math.floor(fakeDuration%60))}`;
        });
    });

    // Pick different sounds

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });


    // We can animated the circle
    song.ontimeupdate = () => {

        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        const addZero = number => number<10? "0"+number : number;

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src = "./assets/play.svg"
        }
    }

    

}

app();