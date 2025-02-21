import './index.css'
import 'flowbite'

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // Toggle menu visibility
    });
});