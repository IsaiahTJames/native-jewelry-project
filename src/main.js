import './index.css'
import 'flowbite'
import './responsive.css'
import './jewelry-styles.css'


document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page jump
            event.stopPropagation(); // Prevent triggering document click immediately

            const dropdownMenu = this.nextElementSibling;
            const isOpen = !dropdownMenu.classList.contains("hidden");

            // Close all dropdowns first
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.classList.add("hidden");
            });

            // Toggle the clicked dropdown
            if (!isOpen) {
                dropdownMenu.classList.remove("hidden");
                document.body.classList.add("dropdown-active"); // Disable hover effects
            } else {
                document.body.classList.remove("dropdown-active"); // Restore hover
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown-button") && !event.target.closest(".dropdown-menu")) {
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.classList.add("hidden");
            });
            document.body.classList.remove("dropdown-active"); // Restore hover effect
        }
    });
});


let currentIndex = 0;
const totalItems = 15;
const productBoxWidth = 220; // 200px width + 20px gap

function getVisibleItems() {
    return window.innerWidth <= 576 ? 3 : 5; // Show 3 on mobile, 5 on desktop
}

function getMaxIndex() {
    const visibleItems = getVisibleItems();
    return Math.ceil(totalItems / visibleItems) - 1; // Ensures correct max index
}

function scrollCarousel(direction) {
    const container = document.querySelector(".popular-products-container");
    const visibleItems = getVisibleItems();
    const maxIndex = getMaxIndex(); // Dynamically get max index

    currentIndex += direction;

    // Ensure we don’t scroll past the available images
    if (currentIndex < 0) {
        currentIndex = maxIndex; // Wrap around to last set
    } else if (currentIndex > maxIndex) {
        currentIndex = 0; // Wrap back to first set
    }

    // Correct translation value calculation
    const newPosition = -(currentIndex * visibleItems * productBoxWidth);
    container.style.transform = `translateX(${newPosition}px)`;
}

// Attach event listeners
document.querySelector(".left-arrow").addEventListener("click", () => scrollCarousel(-1));
document.querySelector(".right-arrow").addEventListener("click", () => scrollCarousel(1));

// Adjust on resize
window.addEventListener("resize", () => {
    currentIndex = 0; // Reset position on resize
    scrollCarousel(0);
});



