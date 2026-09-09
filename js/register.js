const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Input values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const studentId = document.getElementById("studentId").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const university = document.getElementById("university").value.trim();
    const department = document.getElementById("department").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("terms").checked;
    const profileImageInput =
    document.getElementById("profileImage");
    // Required field validation
    if (
        !fullName ||
        !email ||
        !studentId ||
        !phone ||
        !university ||
        !password ||
        !confirmPassword ||
        !terms 
        
    ) {
        alert("Please fill up all required fields");
        return;
    }

    // Password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get existing users from LocalStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = users.some(function(existingUser) {
        return existingUser.email === email;
    });

    if (emailExists) {
        alert("This email is already registered");
        return;
    }

    // Create new user
    const user = {
        id: Date.now(),
        fullName,
        email,
        studentId,
        phone,
        university,
        department,
        password,
        posts: [],
        profileImageInput,
        createdAt: new Date().toLocaleString()
    };

    // Add new user to users array
    users.push(user);

    // Save updated users array to LocalStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    // Clear form
    registerForm.reset();

    // Go to login page
    window.location.href = "login.html";
});