document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-placeholder");
  if (!container) return;

  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      container.innerHTML = data;
      initNavbarLogic();
    })
    .catch((err) => console.error("Navbar loading failed:", err));
});

function initNavbarLogic() {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 2. LocalStorage Check for User State
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authSection = document.getElementById("authSection");
  const mobileAuthSection = document.getElementById("mobileAuthSection");

  if (currentUser) {
    // User is logged in
    const userInitial = currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "U";

    authSection.innerHTML = `
      <a href="profile.html" title="${currentUser.fullName || 'Profile'}" class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 hover:bg-blue-200 transition">
        ${userInitial}
      </a>
      <button id="logoutBtn" class="text-xs text-red-500 hover:underline font-semibold">Logout</button>
    `;

    mobileAuthSection.innerHTML = `
      <a href="profile.html" class="block text-gray-700 hover:text-blue-600 font-medium py-1">Profile (${currentUser.fullName || 'User'})</a>
      <button id="mobileLogoutBtn" class="block w-full text-left text-red-500 font-semibold py-1">Logout</button>
    `;

    // Logout Functionality
    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    };

    document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);
    document.getElementById("mobileLogoutBtn")?.addEventListener("click", handleLogout);

  } else {
    // User is not logged in
    authSection.innerHTML = `
      <a href="login.html" class="text-gray-700 hover:text-blue-600 font-medium text-sm">Login</a>
      <a href="register.html" class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg transition">Register</a>
    `;

    mobileAuthSection.innerHTML = `
      <a href="login.html" class="block text-gray-700 hover:text-blue-600 font-medium py-1">Login</a>
      <a href="register.html" class="block text-gray-700 hover:text-blue-600 font-medium py-1">Register</a>
    `;
  }

  // 3. Wishlist Count Update
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCountEl = document.getElementById("wishlistCount");
  if (wishlistCountEl && wishlist.length > 0) {
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.classList.remove("hidden");
  }
}