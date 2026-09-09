console.log("hi");

// ========================================
// GET CURRENT USER
// ========================================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


// ========================================
// CHECK LOGIN
// ========================================

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

} else {

    // ========================================
    // PROFILE HEADER
    // ========================================

    document.getElementById("profileName").textContent =
        currentUser.fullName;

    document.getElementById("profileUniversity").textContent =
        currentUser.university;

    document.getElementById("profileDepartment").textContent =
        currentUser.department;

    document.getElementById("profileEmail").textContent =
        currentUser.email;

    document.getElementById("profilePhone").textContent =
        currentUser.phone;


    // ========================================
    // ACCOUNT INFORMATION
    // ========================================

    document.getElementById("accountName").textContent =
        currentUser.fullName;

    document.getElementById("accountStudentId").textContent =
        currentUser.studentId;

    document.getElementById("accountEmail").textContent =
        currentUser.email;

    document.getElementById("accountPhone").textContent =
        currentUser.phone;

    document.getElementById("accountUniversity").textContent =
        currentUser.university;

    document.getElementById("accountDepartment").textContent =
        currentUser.department;

    document.getElementById("accountCreatedAt").textContent =
        currentUser.createdAt;
    document.getElementById("profileImage").src =
    currentUser.profileImage || "https://via.placeholder.com/150";

    // ========================================
    // GET ALL POSTS
    // ========================================

    const posts = JSON.parse(
        localStorage.getItem("posts")
    ) || [];


    // ========================================
    // GET ONLY CURRENT USER'S POSTS
    // ========================================

    const myPosts = posts.filter(
        post => post.userId === currentUser.id
    );


    console.log("My Posts:", myPosts);


    // ========================================
    // POST STATISTICS
    // ========================================

    const totalPosts = myPosts.length;


    const sellPosts = myPosts.filter(
        post => post.listingType === "Sell"
    ).length;


    const lostPosts = myPosts.filter(
        post => post.listingType === "Lost"
    ).length;


    const foundPosts = myPosts.filter(
        post => post.listingType === "Found"
    ).length;


    // ========================================
    // DISPLAY STATISTICS
    // ========================================

    document.getElementById("totalPosts").textContent =
        totalPosts;

    document.getElementById("sellPosts").textContent =
        sellPosts;

    document.getElementById("lostPosts").textContent =
        lostPosts;

    document.getElementById("foundPosts").textContent =
        foundPosts;


    // ========================================
    // RECENT POSTS
    // ========================================

    const recentPostsContainer =
        document.getElementById("recentPosts");


    if (myPosts.length === 0) {

        recentPostsContainer.innerHTML = `
            <p class="text-gray-500 text-center py-6">
                You haven't created any posts yet.
            </p>
        `;

    } else {

        // Latest 3 posts
        const recentPosts = myPosts
            .slice(-3)
            .reverse();


        recentPosts.forEach(post => {

            const postCard = document.createElement("div");

            postCard.className =
                "border rounded-lg p-4 mb-3 bg-gray-50";


            postCard.innerHTML = `
                
                <div class="flex justify-between items-start">

                    <div>

                        <h3 class="font-semibold text-gray-800">
                            ${post.title}
                        </h3>

                        <p class="text-sm text-gray-500 mt-1">
                            ${post.category}
                        </p>

                        <p class="text-sm text-gray-400 mt-1">
                            ${post.createdAt}
                        </p>

                    </div>


                    <span class="px-3 py-1 rounded-full text-xs font-semibold
                        ${getBadgeClass(post.listingType)}">

                        ${post.listingType}

                    </span>

                </div>

            `;


            recentPostsContainer.appendChild(postCard);

        });

    }

}


// ========================================
// BADGE COLOR
// ========================================

function getBadgeClass(type) {

    if (type === "Sell") {
        return "bg-green-100 text-green-700";
    }

    if (type === "Rent") {
        return "bg-blue-100 text-blue-700";
    }

    if (type === "Lost") {
        return "bg-red-100 text-red-700";
    }

    if (type === "Found") {
        return "bg-purple-100 text-purple-700";
    }

    return "bg-gray-100 text-gray-700";
}