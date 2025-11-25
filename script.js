// ======================= СНЕГ =======================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let snowflakes = [];

class Snowflake {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initSnow() {
  snowflakes = [];
  for (let i = 0; i < 200; i++) snowflakes.push(new Snowflake());
}
function animateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((s) => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animateSnow);
}
initSnow();
animateSnow();

// ======================= ЗАГРУЗКА ИГР =======================
async function loadGames() {
  try {
    const res = await fetch("./games.json");
    const data = await res.json();
    displayGames(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

function displayGames(data) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  data.forEach((game) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${game.img}" alt="${game.title}"><span>${game.title}</span>`;
    card.addEventListener("click", () => showModal(game));
    container.appendChild(card);
  });
}

// ======================= МОДАЛЬНОЕ ОКНО =======================
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalGenre = document.getElementById("modalGenre");
const modalBpmKey = document.getElementById("modalBpmKey");
const modalRating = document.getElementById("modalRating");
const modalRelease = document.getElementById("modalRelease");
const closeBtn = document.querySelector(".close");

function showModal(game) {
  modal.classList.remove("hidden");
  modalImg.src = game.img;
  modalTitle.textContent = game.title;
  modalGenre.textContent = "Genre: " + game.genre;
  modalBpmKey.textContent = `BPM: ${game.bpm} • Key: ${game.key}`;
  modalRating.textContent = "Rating: " + game.rating;
  modalRelease.textContent = "Release: " + game.release;
}

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

loadGames();
