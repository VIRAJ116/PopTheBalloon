const exitBtn = document.getElementById("exitBtn");

exitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.alert("Redirecting to Home Page", "success", 5);
  setTimeout(() => {
    window.location = "index.html";
  }, 500);
});