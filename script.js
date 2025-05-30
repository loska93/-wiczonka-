let timer;
let timeLeft = 9;

// Obiekt Audio dla dźwięku ringera
const dingSound = new Audio('Box.mp3');

// Ustawiamy dźwięk gotowy do odtworzenia (to pomaga na mobilkach)
dingSound.load();

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}

function startTimer() {
  if (timer) return;

  // Przed startem wymuś załadowanie dźwięku i pauzę (ważne na telefonach)
  dingSound.play().then(() => {
    dingSound.pause();
    dingSound.currentTime = 0;

    timer = setInterval(() => {
      if (timeLeft > 0) {
        if (timeLeft <= 1) {
          dingSound.play().catch(() => {
            // W razie problemów z autoplay
            console.log("Dźwięk nie odtworzony automatycznie.");
          });
        }
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        alert("Koniec!");
      }
    }, 1000);
  }).catch(() => {
    // Jeśli odtwarzanie się nie powiedzie (np. brak interakcji), startujemy timer bez dźwięku
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
      }
    }, 1000);
  });
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 60;
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

// Zapamiętywanie kolorów taśm z uwzględnieniem dnia (data-day z body)
const day = document.body.dataset.day || "default";

document.querySelectorAll("table tr").forEach((row, index) => {
  const select = row.querySelector("select");
  if (!select) return;

  const key = `tasma_${day}_${index}`;

  // Załaduj poprzedni wybór (jeśli był)
  const saved = localStorage.getItem(key);
  if (saved) select.value = saved;

  // Zapisuj przy zmianie
  select.addEventListener("change", () => {
    localStorage.setItem(key, select.value);
  });
});
