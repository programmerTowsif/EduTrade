document.addEventListener("DOMContentLoaded", () => {
  const postId = String(localStorage.getItem("selectedPostId") || "");
  const post = (JSON.parse(localStorage.getItem("posts")) || []).find(
    (item) => String(item.postId) === postId,
  );
  if (!post) {
    alert("Post not found!");
    window.location.href = "marketplace.html";
    return;
  }

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  const image = document.getElementById("postImage");
  image.src = post.image || "../images/default-product.jpg";
  image.alt = post.title || "Product";
  setText("postTitle", post.title || "No title");
  setText("postType", post.listingType || "Unknown");
  setText("postCategory", post.category || "Other");
  setText("postPrice", `৳${post.price || 0}`);
  setText("postCondition", post.condition || "Unknown");
  setText("postLocation", post.location || "Not specified");
  setText("postDate", post.createdAt || "Unknown");
  setText("postDescription", post.description || "No description available.");
  setText("pickupLocation", `📍 ${post.location || "Location not specified"}`);
  setText("postAuthor", post.authorName || "Unknown seller");
  setText("sellerContact", post.contact || "Contact information not available");

  document.getElementById("postType").className =
    "absolute left-5 top-5 rounded-full px-4 py-1.5 text-sm font-semibold " +
    ({
      Sell: "bg-green-100 text-green-700",
      Rent: "bg-blue-100 text-blue-700",
      Lost: "bg-red-100 text-red-700",
      Found: "bg-purple-100 text-purple-700",
    }[post.listingType] || "bg-gray-100 text-gray-700");
  const contactButton = document.getElementById("contact-seller");
  contactButton.addEventListener("click", () => {
    contactButton.textContent = "Request sent ✓";
    contactButton.disabled = true;
    document.getElementById("contact-note").classList.remove("hidden");
  });

  const saveButton = document.getElementById("save-post");
  const renderSaveState = () => {
    const saved = (JSON.parse(localStorage.getItem("wishlist")) || []).some(
      (item) => String(item.postId) === postId,
    );
    saveButton.textContent = saved ? "♥" : "♡";
    saveButton.classList.toggle("text-rose-500", saved);
  };
  saveButton.addEventListener("click", () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex((item) => String(item.postId) === postId);
    if (index === -1) wishlist.push(post);
    else wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderSaveState();
  });
  renderSaveState();
});
