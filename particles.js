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
    this.y = Math.random() * -canvas.height; // стартует выше экрана
    this.radius = Math.random() * 3 + 1; // размер снежинки
    this.speedY = Math.random() * 1 + 0.5; // скорость падения
    this.speedX = Math.random() * 0.5 - 0.25; // лёгкое колебание
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y > canvas.height) this.reset(); // снова наверх
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
