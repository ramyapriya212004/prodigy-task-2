let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 60000) % 60);
  let hours = Math.floor(ms / 3600000);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
  return num.toString().padStart(size, '0');
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    startStopBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(intervalId);
    startStopBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
  startStopBtn.textContent = "Start";
  running = false;
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = formatTime(elapsedTime);
    lapsList.appendChild(li);
  }
});
