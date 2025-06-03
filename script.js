let timer;
let timeLeft = 90;  // 1 minuta 30 sekund

// Obiekt Audio dla dźwięku ringera
const dingSound = new Audio('Box.mp3');
dingSound.load(); // Przygotowanie dźwięku

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}

function startTimer() {
  if (timer) return;

  dingSound.play().then(() => {
    dingSound.pause();
    dingSound.currentTime = 0;

    timer = setInterval(() => {
      if (timeLeft > 0) {
        if (timeLeft <= 1) {
          dingSound.play().catch(() => {
            console.log("Dźwięk nie odtworzony automatycznie.");
          });
        }
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alert("Koniec!");
        setTimeout(resetTimer, 2000);
      }
    }, 1000);
  }).catch(() => {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        if (timeLeft <= 1) {
          console.log("Dźwięk zablokowany, nie odtwarzany.");
        }
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alert("Koniec!");
        setTimeout(resetTimer, 2000);
      }
    }, 1000);
  });
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 90;  // reset do 1:30
  updateDisplay();
}

updateDisplay();

// Tooltip z obrazkiem
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

// Zapisywanie wyborów z uwzględnieniem dnia i rodzaju (kg lub taśma)
const day = document.body.dataset.day || "default";

document.querySelectorAll("table tr").forEach((row, index) => {
  if (index === 0) return; // pomijamy nagłówek

  const weightSelect = row.querySelector(".weight-select");
  const bandSelect = row.querySelector(".band-color-select");

  if (weightSelect) {
    const weightKey = `weight_${day}_${index}`;
    const savedWeight = localStorage.getItem(weightKey);
    if (savedWeight) weightSelect.value = savedWeight;

    weightSelect.addEventListener("change", () => {
      localStorage.setItem(weightKey, weightSelect.value);
    });
  }

  if (bandSelect) {
    const bandKey = `band_${day}_${index}`;
    const savedBand = localStorage.getItem(bandKey);
    if (savedBand) bandSelect.value = savedBand;

    bandSelect.addEventListener("change", () => {
      localStorage.setItem(bandKey, bandSelect.value);
    });
  }
});
