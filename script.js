/* ===============================
   FOND ÉTOILÉ (CANVAS)
================================ */
const canvas = document.getElementById("stars");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    s: Math.random() * 0.4 + 0.1
  }));

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(star => {
      star.y += star.s;
      if (star.y > canvas.height) star.y = 0;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateStars);
  }

  animateStars();
}

/* ===============================
   PARTICULES AU SURVOL
================================ */
function spawnParticles(x, y, count = 15) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = x + "px";
    p.style.top = y + "px";
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 60;

    p.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
          opacity: 0
        }
      ],
      {
        duration: 700,
        easing: "cubic-bezier(0.25,0.46,0.45,0.94)"
      }
    );

    setTimeout(() => p.remove(), 700);
  }
}

/* ===============================
   ÉLÉMENTS INTERACTIFS
================================ */
document.querySelectorAll(
  ".nav-item, .logo, .card, .media, .about-photo img, .cta-btn, .scroll-logo"
).forEach(el => {
  el.addEventListener("mouseenter", () => {
    const r = el.getBoundingClientRect();
    spawnParticles(r.left + r.width / 2, r.top + r.height / 2, 12);
  });
});

/* ===============================
   BOUTON INTRO (redirige)
================================ */
const btn = document.getElementById("enter-btn");

if (btn) {
  btn.addEventListener("click", () => {
    const r = btn.getBoundingClientRect();
    spawnParticles(r.left + r.width / 2, r.top + r.height / 2, 30);

    document.body.animate(
      [
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(20px)" }
      ],
      { duration: 800, easing: "ease-in-out" }
    );

    const goto = btn.getAttribute("data-goto") || "index.html";

    setTimeout(() => {
      window.location.href = goto;
    }, 800);
  });
}

/* ===============================
   FUSÉE
================================ */
const rocket = document.querySelector(".rocket");

if (rocket) {
  function launchRocket() {
    rocket.animate(
      [
        { transform: "translateX(0) rotate(15deg)" },
        { transform: `translateX(${window.innerWidth + 400}px) rotate(15deg)` }
      ],
      { duration: 12000, easing: "linear" }
    );

    setTimeout(launchRocket, 15000);
  }
  launchRocket();
}

/* ===============================
   AMONG US
================================ */
const amongus = document.querySelector(".amongus");

if (amongus) {
  function moveAmongUs() {
    amongus.animate(
      [
        { transform: "translateX(0) rotate(0deg)" },
        { transform: `translateX(-${window.innerWidth + 300}px) rotate(-720deg)` }
      ],
      { duration: 10000, easing: "linear" }
    );

    setTimeout(moveAmongUs, 13000);
  }
  moveAmongUs();
}

/* ===============================
   LOGO QUI TOURNE AU SCROLL (3D)
================================ */
const scrollLogo = document.getElementById("scroll-logo");

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function updateScrollLogo() {
  if (!scrollLogo) return;

  const y = window.scrollY || 0;

  // visible après un petit scroll
  if (y > 120) scrollLogo.classList.add("is-visible");
  else scrollLogo.classList.remove("is-visible");

  // rotation 3D + petit flottement
  const rotY = (y * 0.25) % 360;
  const rotX = 12 + Math.sin(y * 0.01) * 8;
  const z = 18 + Math.sin(y * 0.02) * 6;

  // légère translation verticale pour donner vie
  const ty = clamp(Math.sin(y * 0.01) * 10, -12, 12);

  scrollLogo.style.transform =
    `translateY(calc(-50% + ${ty}px)) perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${z}px)`;
}

window.addEventListener("scroll", updateScrollLogo, { passive: true });
window.addEventListener("resize", updateScrollLogo);
updateScrollLogo();
