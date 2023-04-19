const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("userName");

var UserInformation = JSON.parse(localStorage.getItem("userInfoDB")) || [];

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    UserInformation.push({
      userName: userName.value,
      score: 0,
    });
    localStorage.setItem("userInfoDB", JSON.stringify(UserInformation));
    window.alert("Register Successfully ", "success", 5);
    setTimeout(() => {
      window.location = "start.html";
    }, 600);
});