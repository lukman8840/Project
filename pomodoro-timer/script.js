    const range = document.querySelector(".range");
    const timerParagraph = document.querySelector(".paragraph");
    const startButton = document.querySelector(".Start");
    const pomodoroButton = document.querySelector("#pomodoro");
    const shortBreakButton = document.querySelector("#short-break");
    const longBreakButton = document.querySelector("#long-break");
    const rowContainer = document.querySelector(".row");



document.addEventListener("DOMContentLoaded", function () {
    
    let timerInterval;
    let currentTime = ""
    if (pomodoroButton && shortBreakButton && longBreakButton && range && startButton && timerParagraph) {
       
        pomodoroButton.addEventListener("click", function () {
            currentTime = "pomodoro"
            updateTimerDisplay(25, 0);
            document.querySelector("body").style.backgroundColor = "#ba4949";
            document.querySelector(".timer").style.backgroundColor = "#ca7171";
            // document.querySelector(".timer").style.boxShadow = "12px 0px 0px #ca7171";
            updateRowContainerStyles("#ffcccb");
        });
        

        shortBreakButton.addEventListener("click", function () {
            currentTime = "short"
            updateTimerDisplay(5, 0);
            updateRowContainerStyles("#ffcccb");
            document.querySelector("body").style.backgroundColor = "#38858A";
            document.querySelector(".timer").style.backgroundColor = "#38858A";
            document.querySelector(".timer").style.boxShadow = "12px 0px 0px #4C9196";
        });

        longBreakButton.addEventListener("click", function () {
            currentTime = "long"

            updateTimerDisplay(15, 0);
            // document.querySelector("body").style.backgroundColor = "#397097";
            // document.querySelector(".timer").style.backgroundColor = "#4D7FA2";
            // document.querySelector(".timer").style.boxShadow = "12px 0px 0px #38858a";
            
        });

        range.addEventListener("input", function () {
            const minutes = this.value;
            updateTimerDisplay(minutes, 0);
        });

        startButton.addEventListener("click", function (props) {
            console.log('curentTime', currentTime)
            // const minutes = range.value;
            if (!timerInterval) {
                startTimer();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.textContent = "Start";
            }
        });

        function startTimer(minutes) {
            let seconds = 0;
              if(currentTime === "pomodoro"){
                   minutes = 25
               }
            if (minutes) {
                seconds = 0; // Set seconds to 0 only when the timer is set to 25 minutes (pomodoro)
            } else if (currentTime === "short") {
                minutes = 5;
                seconds = 0; // Set seconds to 0 only when the timer is set to 5 minutes (short break)
            } else if (currentTime === 'long') {
                minutes = 15
                seconds = 0; // Set seconds to 0 only when the timer is set to 15 minutes (long break)
            }
            timerInterval = setInterval(function () {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startButton.textContent = "Start";
                } else if (seconds === 0) {

                    // minutes = 25;
                    minutes = minutes - 1;
                    seconds = 59;
                    updateTimerDisplay(minutes, seconds);
                } else {
                    seconds = seconds - 1;
                    updateTimerDisplay(minutes, seconds);
                }
            }, 1000);

            startButton.textContent = "Pause";
        }
        
        function updateTimerDisplay(minutes, seconds) {
            console.log('Min',minutes)
            console.log('Sec',seconds)
            const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
            const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
            timerParagraph.textContent = `${formattedMinutes}:${formattedSeconds}`;

            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButton.textContent = "Start";
            }
        }

        function updateButtonStyles(backgroundColor) {
            timerParagraph.style.backgroundColor = backgroundColor;
            startButton.style.backgroundColor = backgroundColor;
        }
    }
});
