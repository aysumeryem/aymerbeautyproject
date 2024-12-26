const menuButton = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


menuButton.addEventListener("click", function () {
    
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none"; 
    } else {
        navMenu.style.display = "block"; 
    }
});



const cardNumber = document.getElementById("card-number");
const showEye = document.getElementById("show-eye");
const hideEye = document.getElementById("hide-eye");


const originalNumber = 4169738808744720;

showEye.addEventListener("click", () => {
  cardNumber.textContent = originalNumber; 
  showEye.style.display = "none"; 
  hideEye.style.display = "inline"; 
});

hideEye.addEventListener("click", () => {
  cardNumber.textContent = "************4720"; 
  hideEye.style.display = "none"; 
  showEye.style.display = "inline"; 
});


// Modal

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openModal.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});