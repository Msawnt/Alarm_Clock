document.getElementById('start-timer').addEventListener('click', startNewTimer);

let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please set a valid time.');
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    addTimer(totalSeconds);
}

function addTimer(totalSeconds) {
    const timerId = timers.length;
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.setAttribute('data-id', timerId);
    timerElement.innerHTML = `
        <span class="time-remaining">${formatTime(totalSeconds)}</span>
        <button class="stop-timer">Stop Timer</button>
    `;

    document.getElementById('active-timers').appendChild(timerElement);
    timers.push({ remainingTime: totalSeconds, interval: null });

    startCountdown(timerId);
    timerElement.querySelector('.stop-timer').addEventListener('click', () => stopTimer(timerId));
}

function startCountdown(timerId) {
    const timer = timers[timerId];
    timer.interval = setInterval(() => {
        timer.remainingTime--;

        if (timer.remainingTime <= 0) {
            clearInterval(timer.interval);
            timerEnded(timerId);
        } else {
            updateTimerDisplay(timerId);
        }
    }, 1000);
}

function updateTimerDisplay(timerId) {
    const timerElement = document.querySelector(`.timer[data-id="${timerId}"]`);
    timerElement.querySelector('.time-remaining').textContent = formatTime(timers[timerId].remainingTime);
}

function stopTimer(timerId) {
    clearInterval(timers[timerId].interval);
    timers.splice(timerId, 1);
    document.querySelector(`.timer[data-id="${timerId}"]`).remove();
}

function timerEnded(timerId) {
    const timerElement = document.querySelector(`.timer[data-id="${timerId}"]`);
    timerElement.classList.add('timer-ended');
    timerElement.querySelector('.time-remaining').textContent = 'Time’s up!';
    playAlertSound();
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

