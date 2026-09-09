document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. GET CURRENT USER
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
    // 2. GET ALL POSTS
    // =====================================

    const posts = JSON.parse(
        localStorage.getItem("posts")
    ) || [];


    // =====================================
    // 3. GET ONLY CURRENT USER'S POSTS
    // =====================================

    const myPosts = posts.filter(
        post => post.userId === currentUser.id
    );


    // =====================================
    // 4. GET HTML ELEMENTS
    // =====================================

    const myPostsContainer =
        document.getElementById("myPosts");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const totalPosts =
        document.getElementById("totalPosts");

    const sellPosts =
        document.getElementById("sellPosts");

    const lostFoundPosts =
        document.getElementById("lostFoundPosts");


    // =====================================
    // 5. UPDATE STATS
    // =====================================

    totalPosts.textContent = myPosts.length;


    const sellCount = myPosts.filter(
        post => post.listingType === "Sell"
    ).length;

    sellPosts.textContent = sellCount;


    const lostFoundCount = myPosts.filter(
        post =>
            post.listingType === "Lost" ||
            post.listingType === "Found"
    ).length;

    lostFoundPosts.textContent = lostFoundCount;


    // =====================================
    // 6. NO POSTS
    // =====================================

    if (myPosts.length === 0) {

        myPostsContainer.classList.add("hidden");

        emptyMessage.classList.remove("hidden");

        return;
    }


    // =====================================
    // 7. SHOW POSTS
    // =====================================

    myPostsContainer.classList.remove("hidden");
    emptyMessage.classList.add("hidden");


    myPosts.forEach(post => {

        const card = document.createElement("div");

        card.className =
            "bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition";


        // =================================
        // IMAGE
        // =================================

        let imageHTML = "";

        if (post.image) {

            imageHTML = `
                <img
                    src="${post.image}"
                    alt="${post.title}"
                    class="w-full h-48 object-cover"
                >
            `;

        } else {

            imageHTML = `
                <div class="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <span class="text-gray-400 text-5xl">
                        📚
                    </span>
                </div>
            `;
        }


        // =================================
        // PRICE
        // =================================

        let priceHTML = "";

        if (
            post.listingType === "Sell" ||
            post.listingType === "Rent"
        ) {

            priceHTML = `
                <p class="text-lg font-bold text-green-600">
                    ৳${post.price}
                </p>
            `;

        } else {

            priceHTML = `
                <p class="text-sm text-gray-500">
                    No Price
                </p>
            `;
        }


        // =================================
        // BADGE
        // =================================

        let badgeClass =
            "bg-gray-100 text-gray-700";

        if (post.listingType === "Sell") {

            badgeClass =
                "bg-green-100 text-green-700";

        } else if (post.listingType === "Rent") {

            badgeClass =
                "bg-blue-100 text-blue-700";

        } else if (post.listingType === "Lost") {

            badgeClass =
                "bg-red-100 text-red-700";

        } else if (post.listingType === "Found") {

            badgeClass =
                "bg-purple-100 text-purple-700";
        }


        // =================================
        // CARD
        // =================================

        card.innerHTML = `

            ${imageHTML}

            <div class="p-5">

                <!-- Badge & Category -->

                <div class="flex justify-between items-center mb-3">

                    <span
                        class="${badgeClass}
                        px-3 py-1 rounded-full text-xs font-semibold">

                        ${post.listingType}

                    </span>

                    <span class="text-xs text-gray-400">
                        ${post.category}
                    </span>

                </div>


                <!-- Title -->

                <h3 class="text-lg font-bold text-gray-800 line-clamp-1">
                    ${post.title}
                </h3>


                <!-- Description -->

                <p class="text-sm text-gray-500 mt-2 line-clamp-2">
                    ${post.description}
                </p>


                <!-- Price -->

                <div class="mt-4">
                    ${priceHTML}
                </div>


                <!-- Location -->

                <p class="text-sm text-gray-500 mt-2">
                    📍 ${post.location}
                </p>


                <!-- Contact -->

                <p class="text-sm text-gray-500 mt-1">
                    📞 ${post.contact}
                </p>


                <!-- Date -->

                <p class="text-xs text-gray-400 mt-2">
                    Posted: ${post.createdAt}
                </p>


                <!-- Buttons -->

                <div class="flex gap-3 mt-5">

                    <button
                        onclick="editPost(${post.postId})"
                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">

                        Edit

                    </button>


                    <button
                        onclick="deletePost(${post.postId})"
                        class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium">

                        Delete

                    </button>

                </div>

            </div>
        `;


        myPostsContainer.appendChild(card);

    });

});


// ========================================
// DELETE POST
// ========================================

function deletePost(postId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
        return;
    }


    // Get posts

    let posts = JSON.parse(
        localStorage.getItem("posts")
    ) || [];


    // Remove selected post

    posts = posts.filter(
        post => post.postId !== postId
    );


    // Save

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );


    alert("Post deleted successfully!");


    // Refresh

    window.location.reload();
}


// ========================================
// EDIT POST
// ========================================

function editPost(postId) {

    localStorage.setItem(
        "editPostId",
        postId
    );

    window.location.href = "create-post.html";
}