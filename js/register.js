const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event){
    event.preventDefault();

    // Input values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const university = document.getElementById("university").value.trim();
    const department = document.getElementById("department").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("terms").checked;

    if (!fullName || !email || !studentId || !phone || !university || !password || !confirmPassword || !terms) {
        alert("Please fill up all required fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // User Object - posts array যুক্ত করা হয়েছে
    const user = {
      id: Date.now(),
      fullName,
      email,
      studentId,
      phone,
      university,
      department,
      password,
      posts: [], // নতুন রেজিস্টার্ড ইউজারের পোস্ট রাখার জন্য খালি অ্যারে
      createdAt: new Date().toLocaleString()
    };

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(function(existingUser){
        return existingUser.email === email;
    });

    if(emailExists){
        alert("This email is already registered");
        return;
    }

    users.push(user);

    // Save to LocalStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    alert("Account created successfully!");
    registerForm.reset();
    window.location.href = "login.html";
});