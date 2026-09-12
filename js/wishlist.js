document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("wishlistGrid");
  const empty = document.getElementById("wishlistEmpty");
  // Read full saved post objects so the wishlist works even if the posts list changes.
  function render() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    grid.innerHTML = wishlist
      .map(
        (post) =>
          `<article class="overflow-hidden rounded-2xl border bg-white shadow-sm"><img src="${post.image || "../images/default-product.jpg"}" alt="${post.title || "Saved post"}" class="h-48 w-full object-cover"><div class="p-5"><p class="text-sm text-blue-600">${post.category || "Other"}</p><h2 class="mt-1 text-xl font-bold">${post.title || "Untitled"}</h2><p class="mt-2 font-semibold text-green-600">${post.listingType === "Sell" || post.listingType === "Rent" ? `৳${post.price || 0}` : post.listingType || "Listing"}</p><div class="mt-5 grid grid-cols-2 gap-3"><button class="view-saved rounded-lg bg-blue-600 py-2 font-semibold text-white" data-id="${post.postId}">View</button><button class="remove-saved rounded-lg border border-red-200 py-2 font-semibold text-red-600" data-id="${post.postId}">Remove</button></div></div></article>`,
      )
      .join("");
    empty.classList.toggle("hidden", wishlist.length !== 0);
    grid.classList.toggle("hidden", wishlist.length === 0);
  }
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = String(button.dataset.id);
    if (button.classList.contains("view-saved")) {
      localStorage.setItem("selectedPostId", id);
      window.location.href = "post-details.html";
    } else {
      localStorage.setItem(
        "wishlist",
        JSON.stringify(
          (JSON.parse(localStorage.getItem("wishlist")) || []).filter(
            (post) => String(post.postId) !== id,
          ),
        ),
      );
      render();
    }
  });
  render();
});
