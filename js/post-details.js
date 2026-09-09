document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. GET SELECTED POST ID
    // =====================================

    const selectedPostId =
        Number(localStorage.getItem("selectedPostId"));

    if (!selectedPostId) {
        alert("Post not found!");
        window.location.href = "marketplace.html";
        return;
    }


    // =====================================
    // 2. GET ALL POSTS
    // =====================================

    const posts =
        JSON.parse(localStorage.getItem("posts")) || [];


    // =====================================
    // 3. FIND SELECTED POST
    // =====================================

    const post = posts.find(
        post => post.postId === selectedPostId
    );


    if (!post) {
        alert("Post not found!");
        window.location.href = "marketplace.html";
        return;
    }


    // =====================================
    // 4. GET HTML ELEMENTS
    // =====================================

    const postImage =
        document.getElementById("postImage");

    const postTitle =
        document.getElementById("postTitle");

    const postType =
        document.getElementById("postType");

    const postCategory =
        document.getElementById("postCategory");

    const postPrice =
        document.getElementById("postPrice");

    const postCondition =
        document.getElementById("postCondition");

    const postLocation =
        document.getElementById("postLocation");

    const postContact =
        document.getElementById("postContact");

    const postDescription =
        document.getElementById("postDescription");

    const postAuthor =
        document.getElementById("postAuthor");

    const postDate =
        document.getElementById("postDate");


    // =====================================
    // 5. SET POST IMAGE
    // =====================================

    postImage.src =
        post.image || "../images/default-product.jpg";

    postImage.alt = post.title;


    // =====================================
    // 6. SET BASIC INFORMATION
    // =====================================

    postTitle.textContent =
        post.title;

    postType.textContent =
        post.listingType;

    postCategory.textContent =
        post.category;

    postCondition.textContent =
        post.condition;

    postLocation.textContent =
        post.location;

    postContact.textContent =
        post.contact;

    postDescription.textContent =
        post.description;

    postAuthor.textContent =
        post.authorName;

    postDate.textContent =
        post.createdAt;


    // =====================================
    // 7. PRICE
    // =====================================

    if (
        post.listingType === "Sell" ||
        post.listingType === "Rent"
    ) {

        postPrice.textContent =
            `৳${post.price || 0}`;

    } else {

        postPrice.textContent =
            "No Price";

    }


    // =====================================
    // 8. BADGE COLOR
    // =====================================

    if (post.listingType === "Sell") {

        postType.className =
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700";

    }

    else if (post.listingType === "Rent") {

        postType.className =
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-700";

    }

    else if (post.listingType === "Lost") {

        postType.className =
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-700";

    }

    else if (post.listingType === "Found") {

        postType.className =
            "inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700";

    }

});