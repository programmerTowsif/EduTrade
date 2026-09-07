const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit",function(event){
    event.preventDefault();



    // inpte  values
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
    const user = {
      id: Date.now(),
      fullName,
      email,
      studentId,
      phone,
      university,
      department,
      password,
      createdAt: new Date().toLocaleString()
    };
    // get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(function(existingUser){
        return existingUser.email === email
    })
     if(emailExists){
        alert("this email is already register");
        return;
     }
     users.push(user);

     //save local
     localStorage.setItem("users",JSON.stringify(users));
     localStorage.setItem("currentUser",JSON.stringify(user));
     alert("account created successfully");
    registerForm.reset();
      window.location.href = "login.html";
})