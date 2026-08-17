const clockElement = document.getElementById('clock');

function updateClock() {
  const now = new Date();
  clockElement.textContent = now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);