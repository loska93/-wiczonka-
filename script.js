let timer;
let timeLeft = 60;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Koniec!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 60;
  updateDisplay();
}

updateDisplay();

document.querySelectorAll(".exercise").forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    tooltip.querySelector("img").src = el.dataset.img;
    tooltip.style.left = e.pageX + 20 + "px";
    tooltip.style.top = e.pageY - 20 + "px";
  });
  el.addEventListener("mousemove", (e) => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.left = e.pageX + 20 + "px";
    tooltip.style.top = e.pageY - 20 + "px";
  });
  el.addEventListener("mouseleave", () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  });
});