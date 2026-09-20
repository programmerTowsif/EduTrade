document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "Not provided";
  };
  function renderProfile() {
    setText("profileName", user.fullName);
    setText("profileUniversity", user.university);
    setText("profileDepartment", user.department);
    setText("profileEmail", user.email);
    setText("profilePhone", user.phone);
    setText("accountName", user.fullName);
    setText("accountEmail", user.email);
    setText("accountStudentId", user.studentId);
    setText("accountPhone", user.phone);
    setText("accountUniversity", user.university);
    setText("accountDepartment", user.department);
    setText("accountCreatedAt", user.createdAt);
    const image = document.getElementById("profileImage");
    if (image)
      image.src = user.profileImage || "https://via.placeholder.com/150";
    const posts = (JSON.parse(localStorage.getItem("posts")) || []).filter(
      (post) => String(post.userId) === String(user.id),
    );
    setText("totalPosts", posts.length);
    setText(
      "sellPosts",
      posts.filter((post) => post.listingType === "Sell").length,
    );
    setText(
      "lostPosts",
      posts.filter((post) => post.listingType === "Lost").length,
    );
    setText(
      "foundPosts",
      posts.filter((post) => post.listingType === "Found").length,
    );
    const recent = document.getElementById("recentPosts");
    if (recent)
      recent.innerHTML =
        posts
          .slice(-3)
          .reverse()
          .map(
            (post) =>
              `<article class="rounded-xl border bg-white p-4"><h3 class="font-bold">${post.title || "Untitled"}</h3><p class="mt-1 text-sm text-gray-500">${post.listingType || "Listing"} · ${post.category || "Other"}</p></article>`,
          )
          .join("") ||
        '<p class="text-gray-500">You have not created any posts yet.</p>';
  }
  const modal = document.getElementById("editModal");
  const form = document.getElementById("editProfileForm");
  document
    .getElementById("editProfileButton")
    ?.addEventListener("click", () => {
      ["Name", "Email", "Phone", "University", "Department"].forEach((key) => {
        const field = document.getElementById(`edit${key}`);
        if (field)
          field.value =
            user[key === "Name" ? "fullName" : key.toLowerCase()] || "";
      });
      document.getElementById("editProfileImage").value =
        user.profileImage || "";
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };
  document.getElementById("closeModal")?.addEventListener("click", close);
  document.getElementById("cancelEdit")?.addEventListener("click", close);
  // Email and student ID remain unchanged; update the user, users list, and authored posts together.
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    user.fullName =
      document.getElementById("editName").value.trim() || user.fullName;
    user.phone = document.getElementById("editPhone").value.trim();
    user.university = document.getElementById("editUniversity").value.trim();
    user.department = document.getElementById("editDepartment").value.trim();
    user.profileImage = document
      .getElementById("editProfileImage")
      .value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(
      (item) => String(item.id) === String(user.id),
    );
    const posts = (JSON.parse(localStorage.getItem("posts")) || []).map(
      (post) =>
        String(post.userId) === String(user.id)
          ? { ...post, authorName: user.fullName }
          : post,
    );
    user.posts = posts.filter(
      (post) => String(post.userId) === String(user.id),
    );
    if (index >= 0) users[index] = { ...users[index], ...user };
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("posts", JSON.stringify(posts));
    close();
    renderProfile();
  });
  renderProfile();
});
