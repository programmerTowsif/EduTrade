document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("rentalSearch");
  const grid = document.getElementById("rentalGrid");
  const empty = document.getElementById("rentalEmpty");
  const escapeHtml = (value = "") =>
    String(value).replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[character],
    );
  // Render only localStorage posts marked specifically as rentals.
  function render() {
    const query = search.value.trim().toLowerCase();
    const rentals = (JSON.parse(localStorage.getItem("posts")) || [])
      .filter((post) => post.listingType === "Rent")
      .filter((post) =>
        [post.title, post.description, post.category, post.location].some(
          (value) =>
            String(value || "")
              .toLowerCase()
              .includes(query),
        ),
      );
    grid.innerHTML = rentals
      .map(
        (post) =>
          `<article class="overflow-hidden rounded-2xl border bg-white shadow-sm"><img src="${escapeHtml(post.image || "../images/default-product.jpg")}" alt="${escapeHtml(post.title)}" class="h-48 w-full object-cover"><div class="p-5"><p class="text-sm font-medium text-blue-600">${escapeHtml(post.category || "Other")}</p><h2 class="mt-1 text-xl font-bold">${escapeHtml(post.title || "Untitled")}</h2><p class="mt-3 text-lg font-bold text-green-600">৳${Number(post.price) || 0}</p><p class="mt-2 text-sm text-gray-500">📍 ${escapeHtml(post.location || "Location not specified")}</p><button data-post-id="${escapeHtml(post.postId)}" class="view-rental mt-5 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700">View Details</button></div></article>`,
      )
      .join("");
    empty.classList.toggle("hidden", rentals.length !== 0);
    grid.classList.toggle("hidden", rentals.length === 0);
  }
  search.addEventListener("input", render);
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".view-rental");
    if (button) {
      localStorage.setItem("selectedPostId", button.dataset.postId);
      window.location.href = "post-details.html";
    }
  });
  render();
});
