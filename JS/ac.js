/* LOADER */
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "none";
});

/* NAV TOGGLE */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

/* DARK MODE */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
});

/* FADE-IN ON SCROLL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

/* SCROLL TO TOP */
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollTop.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
