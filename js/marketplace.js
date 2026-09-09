document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // GET POSTS
    // =====================================

    const posts =
        JSON.parse(localStorage.getItem("posts")) || [];


    // =====================================
    // ELEMENTS
    // =====================================

    const postsContainer =
        document.getElementById("marketplacePosts");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const postCount =
        document.getElementById("postCount");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    // =====================================
    // CURRENT FILTER
    // =====================================

    let selectedType = "All";


    // =====================================
    // FILTER BUTTON STYLE
    // =====================================

    const style = document.createElement("style");

    style.textContent = `
        .filter-btn {
            padding: 8px 18px;
            border-radius: 9999px;
            border: 1px solid #d1d5db;
            background: white;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            transition: 0.2s;
        }

        .filter-btn:hover {
            background: #f3f4f6;
        }

        .active-filter {
            background: #2563eb !important;
            color: white !important;
            border-color: #2563eb !important;
        }
    `;

    document.head.appendChild(style);


    // =====================================
    // FILTER TYPE
    // =====================================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active-filter");
            });

            button.classList.add("active-filter");

            selectedType =
                button.dataset.type;

            displayPosts();

        });

    });


    // =====================================
    // SEARCH
    // =====================================

    searchInput.addEventListener(
        "input",
        displayPosts
    );


    // =====================================
    // CATEGORY
    // =====================================

    categoryFilter.addEventListener(
        "change",
        displayPosts
    );


    // =====================================
    // SORT
    // =====================================

    sortFilter.addEventListener(
        "change",
        displayPosts
    );


    // =====================================
    // DISPLAY POSTS
    // =====================================

    function displayPosts() {

        let filteredPosts = [...posts];


        // =================================
        // SEARCH
        // =================================

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();

        if (searchText) {

            filteredPosts =
                filteredPosts.filter(post =>

                    post.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    post.description
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    post.category
                        .toLowerCase()
                        .includes(searchText)

                );

        }


        // =================================
        // LISTING TYPE
        // =================================

        if (selectedType !== "All") {

            filteredPosts =
                filteredPosts.filter(post =>
                    post.listingType === selectedType
                );

        }


        // =================================
        // CATEGORY
        // =================================

        const selectedCategory =
            categoryFilter.value;

        if (selectedCategory !== "All") {

            filteredPosts =
                filteredPosts.filter(post =>
                    post.category === selectedCategory
                );

        }


        // =================================
        // SORT
        // =================================

        const sortValue =
            sortFilter.value;


        if (sortValue === "newest") {

            filteredPosts.sort(
                (a, b) =>
                    b.postId - a.postId
            );

        }


        else if (sortValue === "oldest") {

            filteredPosts.sort(
                (a, b) =>
                    a.postId - b.postId
            );

        }


        else if (sortValue === "lowPrice") {

            filteredPosts.sort(
                (a, b) =>
                    (a.price || 0) -
                    (b.price || 0)
            );

        }


        else if (sortValue === "highPrice") {

            filteredPosts.sort(
                (a, b) =>
                    (b.price || 0) -
                    (a.price || 0)
            );

        }


        // =================================
        // UPDATE COUNT
        // =================================

        postCount.textContent =
            `${filteredPosts.length} posts`;


        // =================================
        // CLEAR OLD POSTS
        // =================================

        postsContainer.innerHTML = "";


        // =================================
        // EMPTY
        // =================================

        if (filteredPosts.length === 0) {

            postsContainer.classList.add("hidden");

            emptyMessage.classList.remove("hidden");

            return;

        }


        postsContainer.classList.remove("hidden");

        emptyMessage.classList.add("hidden");


        // =================================
        // CREATE CARDS
        // =================================

        filteredPosts.forEach(post => {

            const card =
                document.createElement("div");


            card.className =
                "bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition";


            // =================================
            // BADGE
            // =================================

            let badgeClass =
                "bg-gray-100 text-gray-700";


            if (post.listingType === "Sell") {

                badgeClass =
                    "bg-green-100 text-green-700";

            }

            else if (post.listingType === "Rent") {

                badgeClass =
                    "bg-blue-100 text-blue-700";

            }

            else if (post.listingType === "Lost") {

                badgeClass =
                    "bg-red-100 text-red-700";

            }

            else if (post.listingType === "Found") {

                badgeClass =
                    "bg-purple-100 text-purple-700";

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
                    <p class="text-xl font-bold text-green-600">
                        ৳${post.price || 0}
                    </p>
                `;

            }

            else {

                priceHTML = `
                    <p class="text-sm text-gray-500">
                        No Price
                    </p>
                `;

            }


            // =================================
            // CARD
            // =================================

            card.innerHTML = `

                <!-- Image -->

                <div class="w-full h-48 bg-gray-100">

                    <img
                        src="${post.image || "../images/default-product.jpg"}"
                        alt="${post.title}"
                        class="w-full h-full object-cover"
                    >

                </div>


                <!-- Content -->

                <div class="p-5">


                    <!-- Type + Category -->

                    <div class="flex justify-between items-center mb-3">

                        <span
                            class="${badgeClass}
                            px-3 py-1
                            rounded-full
                            text-xs
                            font-semibold">

                            ${post.listingType}

                        </span>


                        <span class="text-xs text-gray-400">

                            ${post.category}

                        </span>

                    </div>


                    <!-- Title -->

                    <h3
                        class="text-lg font-bold text-gray-800 line-clamp-1">

                        ${post.title}

                    </h3>


                    <!-- Description -->

                    <p
                        class="text-sm text-gray-500 mt-2 line-clamp-2">

                        ${post.description}

                    </p>


                    <!-- Price -->

                    <div class="mt-4">

                        ${priceHTML}

                    </div>


                    <!-- Condition -->

                    <p class="text-sm text-gray-500 mt-2">

                        Condition:
                        ${post.condition}

                    </p>


                    <!-- Location -->

                    <p class="text-sm text-gray-500 mt-1">

                        📍 ${post.location}

                    </p>


                    <!-- Seller -->

                    <p class="text-sm text-gray-500 mt-1">

                        👤 ${post.authorName}

                    </p>


                    <!-- View Button -->

                    <button
                        onclick="viewPost(${post.postId})"
                        class="w-full mt-5
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-2.5
                        rounded-lg
                        font-medium
                        transition">

                        View Details

                    </button>

                </div>

            `;


            postsContainer.appendChild(card);

        });

    }


    // =====================================
    // INITIAL LOAD
    // =====================================

    displayPosts();

});


// =========================================
// VIEW POST
// =========================================

function viewPost(postId) {

    localStorage.setItem(
        "selectedPostId",
        postId
    );

    window.location.href =
        "post-details.html";
}