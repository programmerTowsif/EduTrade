document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("createPostForm");

    if (!form) {
        return;
    }

    // Edit mode: load the post selected from My Posts into the same form.
    const editPostId = localStorage.getItem("editPostId");
    const existingPost = (JSON.parse(localStorage.getItem("posts")) || [])
        .find(post => String(post.postId) === String(editPostId));

    if (existingPost) {
        document.getElementById("title").value = existingPost.title || "";
        document.getElementById("listingType").value = existingPost.listingType || "";
        document.getElementById("category").value = existingPost.category || "";
        document.getElementById("price").value = existingPost.price || "";
        document.getElementById("condition").value = existingPost.condition || "";
        document.getElementById("contact").value = existingPost.contact || "";
        document.getElementById("location").value = existingPost.location || "";
        document.getElementById("description").value = existingPost.description || "";
        document.querySelector("h1").textContent = "Edit Post";
        form.querySelector('button[type="submit"]').textContent = "Save Changes";
    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        // =====================================
        // 1. CURRENT USER
        // =====================================

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (!currentUser) {
            alert("Please login first!");
            window.location.href = "login.html";
            return;
        }

        // =====================================
        // 2. FORM VALUES
        // =====================================

        const title =
            document.getElementById("title").value.trim();

        const listingType =
            document.getElementById("listingType").value;

        const category =
            document.getElementById("category").value;

        const price =
            document.getElementById("price").value;

        const condition =
            document.getElementById("condition").value;

        const contact =
            document.getElementById("contact").value.trim();

        const location =
            document.getElementById("location").value.trim();

        const description =
            document.getElementById("description").value.trim();

        // =====================================
        // 3. VALIDATION
        // =====================================

        if (
            !title ||
            !listingType ||
            !category ||
            !condition ||
            !contact ||
            !location ||
            !description
        ) {
            alert("Please fill up all required fields!");
            return;
        }

        // =====================================
        // 4. GET EXISTING POSTS
        // =====================================

        let posts = JSON.parse(
            localStorage.getItem("posts")
        ) || [];

        // Update the selected post instead of creating a duplicate.
        if (editPostId) {
            const postIndex = posts.findIndex(
                post => String(post.postId) === String(editPostId)
            );

            if (postIndex === -1 || String(posts[postIndex].userId) !== String(currentUser.id)) {
                alert("This post could not be found or edited.");
                localStorage.removeItem("editPostId");
                window.location.href = "my-posts.html";
                return;
            }

            const updatedPost = {
                ...posts[postIndex],
                title,
                listingType,
                category,
                price: Number(price) || 0,
                condition,
                contact,
                location,
                description
            };

            posts[postIndex] = updatedPost;
            localStorage.setItem("posts", JSON.stringify(posts));

            if (Array.isArray(currentUser.posts)) {
                currentUser.posts = currentUser.posts.map(post =>
                    String(post.postId) === String(editPostId) ? updatedPost : post
                );
            }
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(user => String(user.id) === String(currentUser.id));
            if (userIndex !== -1 && Array.isArray(users[userIndex].posts)) {
                users[userIndex].posts = users[userIndex].posts.map(post =>
                    String(post.postId) === String(editPostId) ? updatedPost : post
                );
                localStorage.setItem("users", JSON.stringify(users));
            }

            localStorage.removeItem("editPostId");
            alert("Post updated successfully!");
            window.location.href = "my-posts.html";
            return;
        }

        // =====================================
        // 5. DEFAULT IMAGE
        // =====================================

        const defaultImage =
            "../images/default-product.jpg";

        // =====================================
        // 6. CREATE NEW POST
        // =====================================

        const newPost = {

            postId: Date.now(),

            userId: currentUser.id,

            authorName: currentUser.fullName,

            title: title,

            listingType: listingType,

            category: category,

            price: Number(price) || 0,

            condition: condition,

            contact: contact,

            location: location,

            description: description,

            image: defaultImage,

            createdAt: new Date().toLocaleString()
        };

        // =====================================
        // 7. SAVE TO POSTS
        // =====================================

        posts.push(newPost);

        localStorage.setItem(
            "posts",
            JSON.stringify(posts)
        );

        // =====================================
        // 8. UPDATE CURRENT USER
        // =====================================

        if (!Array.isArray(currentUser.posts)) {
            currentUser.posts = [];
        }

        currentUser.posts.push(newPost);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        // =====================================
        // 9. UPDATE USERS
        // =====================================

        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const userIndex = users.findIndex(
            user => user.id === currentUser.id
        );

        if (userIndex !== -1) {

            if (!Array.isArray(users[userIndex].posts)) {
                users[userIndex].posts = [];
            }

            users[userIndex].posts.push(newPost);

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );
        }

        // =====================================
        // 10. SUCCESS
        // =====================================

        alert("Post created successfully!");

        form.reset();

        // =====================================
        // 11. GO TO MY POSTS
        // =====================================

        window.location.href = "my-posts.html";

    });

});
