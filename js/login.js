const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

   
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("password")
        .value;


     
    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];
 
    if (users.length === 0) {
        alert("No account found! Please create an account first.");
        return;
    }

 
    const user = users.find(function (user) {
       
        return (
            user.email.toLowerCase() === email &&
            user.password === password
        );

    });

    console.log(user);
    if (!user) {
        alert("Invalid email or password!");
        return;
    }

 
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    alert("Login successful!");

 
    window.location.href = "profile.html";
});