document.addEventListener("DOMContentLoaded", () => {
  const container =
    document.querySelector("[data-navbar]") ||
    document.getElementById("navbar-placeholder");
  if (!container) return;
  fetch("navbar.html")
    .then((response) =>
      response.ok
        ? response.text()
        : Promise.reject(new Error("Navbar could not be loaded")),
    )
    .then((html) => {
      container.innerHTML = html;
      initializeNavbar();
    })
    .catch((error) => console.error("Navbar loading failed:", error));
});
function initializeNavbar() {
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute(
      "aria-expanded",
      String(!mobileMenu.classList.contains("hidden")),
    );
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authSection = document.getElementById("authSection");
  const mobileAuthSection = document.getElementById("mobileAuthSection");
  if (currentUser) {
    const initial = (currentUser.fullName || "U")
      .trim()
      .charAt(0)
      .toUpperCase();
    authSection.innerHTML = `<a href="profile.html" title="${currentUser.fullName || "Profile"}" class="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-100 font-bold text-blue-600">${initial}</a><button id="logoutBtn" class="text-xs font-semibold text-red-500 hover:underline">Logout</button>`;
    mobileAuthSection.innerHTML = `<a href="profile.html" class="mobile-nav-link">Profile (${currentUser.fullName || "User"})</a><button id="mobileLogoutBtn" class="mobile-nav-link text-red-500">Logout</button>`;
    const logout = () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    };
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document
      .getElementById("mobileLogoutBtn")
      ?.addEventListener("click", logout);
  } else {
    authSection.innerHTML =
      '<a href="login.html" class="nav-link">Login</a><a href="register.html" class="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold">Register</a>';
    mobileAuthSection.innerHTML =
      '<a href="login.html" class="mobile-nav-link">Login</a><a href="register.html" class="mobile-nav-link">Register</a>';
  }
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  ["wishlistCount", "mobileWishlistCount"].forEach((id) => {
    const count = document.getElementById(id);
    if (count) {
      count.textContent = wishlist.length;
      count.classList.toggle("hidden", wishlist.length === 0);
    }
  });
}
