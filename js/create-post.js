document.addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("createPostForm");

    if (!createPostForm) return;

    createPostForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 1. Check logged in user
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

        if (!currentUser) {
            alert("Please login first to create a post!");
            window.location.href = "login.html";
            return;
        }

        // 2. Get form values
        const title = document.getElementById("title").value.trim();
        const listingType = document.getElementById("listingType").value;
        const category = document.getElementById("category").value;
        const price = document.getElementById("price").value;
        const condition = document.getElementById("condition").value;
        const contact = document.getElementById("contact").value.trim();
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();
        const imageInput = document.getElementById("productImage");

        // 3. Handle Image Read & Save Function
        if (imageInput && imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageBase64 = e.target.result;
                savePost(imageBase64);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            savePost(""); // Image ছাড়া পোস্ট
        }

        // Save Function
        function savePost(imageUrl) {
            // Create New Post Object
            const newPost = {
                postId: Date.now(),
                userId: currentUser.id,
                authorName: currentUser.fullName || "Anonymous",
                title,
                listingType,
                category,
                price: Number(price),
                condition,
                contact,
                location,
                description,
                image: imageUrl,
                createdAt: new Date().toLocaleString()
            };

            // A. Current User-এর posts array তে রাখা
            if (!currentUser.posts) {
                currentUser.posts = [];
            }
            currentUser.posts.push(newPost);

            // B. Main Users List-এ update করা
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
            }

            // C. Global Posts List-এ রাখা (Marketplace-এ দেখানোর জন্য)
            allPosts.push(newPost);

            // LocalStorage Sync
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("posts", JSON.stringify(allPosts));

            alert("Item published successfully!");
            createPostForm.reset();
            window.location.href = "marketplace.html";
        }
    });
});