console.log("hi");
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if(!currentUser){
    alert("pleas login");
    window.location.href = "login.html";
}
 
const profileName = document.getElementById("profileName");
profileName.textContent = currentUser.fullName;

const accountName = document.getElementById("accountName");
accountName.textContent = currentUser.studentId;

 document.getElementById("accountUniversity").textContent = currentUser.university;
 document.getElementById("accountPhone").textContent = currentUser.phone;
  document.getElementById("accountPhone").textContent = currentUser.phone;