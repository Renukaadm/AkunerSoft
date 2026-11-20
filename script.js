const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const servicesMenu = document.querySelector(".services-menu");
const servicesToggle = document.querySelector(".dropdown-toggle");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navMenu.classList.toggle("open", isOpen);
});

servicesToggle.addEventListener("click", () => {
  const isOpen = servicesToggle.getAttribute("aria-expanded") !== "true";
  servicesToggle.setAttribute("aria-expanded", String(isOpen));
  servicesMenu.classList.toggle("open", isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest(".dropdown-menu a")) {
    servicesToggle.setAttribute("aria-expanded", "false");
    servicesMenu.classList.remove("open");
  }
  if (event.target.closest("a") && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

const carousel = document.querySelector(".carousel");
const slides = [...carousel.querySelectorAll(".slide")];
const indicators = [...carousel.querySelectorAll(".carousel-indicators button")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSlide = 0;
let carouselTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    indicators[slideIndex].classList.toggle("active", isActive);
    indicators[slideIndex].setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function startCarousel() {
  window.clearInterval(carouselTimer);
  if (!reduceMotion.matches) {
    carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  }
}

carousel.querySelector(".previous").addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startCarousel();
});

carousel.querySelector(".next").addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startCarousel();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
    startCarousel();
  });
});

carousel.addEventListener("mouseenter", () => window.clearInterval(carouselTimer));
carousel.addEventListener("mouseleave", startCarousel);
carousel.addEventListener("focusin", () => window.clearInterval(carouselTimer));
carousel.addEventListener("focusout", startCarousel);
reduceMotion.addEventListener("change", startCarousel);
startCarousel();

const backToTop = document.querySelector(".back-to-top");

function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 300);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
