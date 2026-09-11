```javascript
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. GET SELECTED POST ID
    // =====================================

    const selectedPostId =
        Number(localStorage.getItem("selectedPostId"));

    if (!selectedPostId) {
        alert("Post not found!");
        window.location.href = "posts.html";
        return;
    }


    // =====================================
    // 2. GET ALL POSTS
    // =====================================

    const posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    console.log("All Posts:", posts);


    // =====================================
    // 3. FIND SELECTED POST
    // =====================================

    const post = posts.find(
        post => Number(post.postId) === selectedPostId
    );

    console.log("Selected Post:", post);


    if (!post) {
        alert("Post not found!");
        window.location.href = "posts.html";
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

    const postDescription =
        document.getElementById("postDescription");

    const postAuthor =
        document.getElementById("postAuthor");

    const postDate =
        document.getElementById("postDate");

    const sellerContact =
        document.getElementById("sellerContact");

    const pickupLocation =
        document.getElementById("pickupLocation");

    const contactSeller =
        document.getElementById("contact-seller");

    const contactNote =
        document.getElementById("contact-note");

    const savePost =
        document.getElementById("save-post");


    // =====================================
    // 5. SET IMAGE
    // =====================================

    postImage.src =
        post.image || "../images/default-product.jpg";

    postImage.alt =
        post.title || "Product";


    // =====================================
    // 6. BASIC INFORMATION
    // =====================================

    postTitle.textContent =
        post.title || "No title";

    postCategory.textContent =
        post.category || "Other";

    postCondition.textContent =
        post.condition || "Unknown";

    postLocation.textContent =
        post.location || "Not specified";

    postDescription.textContent =
        post.description || "No description available.";

    postAuthor.textContent =
        post.authorName || "Unknown Seller";

    postDate.textContent =
        post.createdAt || "Unknown";


    // =====================================
    // 7. LISTING TYPE
    // =====================================

    postType.textContent =
        post.listingType || "Unknown";


    // =====================================
    // 8. PRICE
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
    // 9. BADGE COLOR
    // =====================================

    if (post.listingType === "Sell") {

        postType.className =
            "absolute left-5 top-5 inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700";

    } else if (post.listingType === "Rent") {

        postType.className =
            "absolute left-5 top-5 inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-700";

    } else if (post.listingType === "Lost") {

        postType.className =
            "absolute left-5 top-5 inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-700";

    } else if (post.listingType === "Found") {

        postType.className =
            "absolute left-5 top-5 inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700";
    }


    // =====================================
    // 10. PICKUP LOCATION
    // =====================================

    pickupLocation.textContent =
        `📍 ${post.location || "Location not specified"}`;


    // =====================================
    // 11. SELLER CONTACT
    // =====================================

    sellerContact.textContent =
        post.contact || "Contact information not available";


    // =====================================
    // 12. CONTACT SELLER BUTTON
    // =====================================

    contactSeller.addEventListener("click", () => {

        contactSeller.textContent = "Request sent ✓";

        contactSeller.disabled = true;

        contactSeller.classList.add("bg-emerald-600");

        contactNote.classList.remove("hidden");

    });


    // =====================================
    // 13. SAVE POST
    // =====================================

    savePost.addEventListener("click", () => {

        const saved =
            savePost.textContent === "♥";

        savePost.textContent =
            saved ? "♡" : "♥";

        savePost.classList.toggle(
            "text-rose-500",
            !saved
        );

    });

});
```

