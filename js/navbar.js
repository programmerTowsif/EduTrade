document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-navbar]");
  if (!container) return;

  fetch("../pages/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      container.innerHTML = data;
      initNavbarLogic();
    })
    .catch((err) => console.error("Navbar loading failed:", err));
});

function initNavbarLogic() {
  // Mobile Menu Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
      navToggle.setAttribute("aria-expanded", navToggle.getAttribute("aria-expanded") === "false" ? "true" : "false");
    });
  }

  // Close mobile menu when a link is clicked
  const links = document.querySelectorAll("[data-nav]");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.add("hidden");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Set active link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("is-active");
    }
  });
}
