const ADMIN_PIN = "1209";
const kids = ["shepherd", "beckett", "sylvie", "maisie"];

function loadPoints() {
  kids.forEach(kid => {
    const points = localStorage.getItem(`${kid}-points`) || 0;
    const el = document.getElementById(`${kid}-points`);
    el.textContent = points;
  });
}

function unlockAdmin() {
  const pin = document.getElementById("pin-input").value;
  if (pin === ADMIN_PIN) {
    document.getElementById("admin-controls").classList.remove("hidden");
    alert("🪄 Admin access granted!");
  } else {
    alert("❌ Incorrect PIN.");
  }
}

function animatePoints(kid) {
  const el = document.getElementById(`${kid}-points`);
  el.classList.remove("points");
  void el.offsetWidth; // trigger reflow
  el.classList.add("points");
}

function addPoints() {
  const kid = document.getElementById("child-select").value;
  const amount = parseInt(document.getElementById("points-input").value);
  if (!isNaN(amount)) {
    const current = parseInt(localStorage.getItem(`${kid}-points`) || 0);
    localStorage.setItem(`${kid}-points`, current + amount);
    loadPoints();
    animatePoints(kid);
  }
}

function subtractPoints() {
  const kid = document.getElementById("child-select").value;
  const amount = parseInt(document.getElementById("points-input").value);
  if (!isNaN(amount)) {
    const current = parseInt(localStorage.getItem(`${kid}-points`) || 0);
    localStorage.setItem(`${kid}-points`, Math.max(0, current - amount));
    loadPoints();
    animatePoints(kid);
  }
}

window.onload = loadPoints;
