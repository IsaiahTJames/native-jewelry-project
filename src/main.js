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

function getTotalItems() {
    return document.querySelectorAll(".product-box").length; // Count total products
}

function getVisibleItems() {
    return window.innerWidth <= 576 ? 3 : 5; // 3 on mobile, 5 on desktop
}

function getProductBoxWidth() {
    return window.innerWidth <= 576 ? 200 : 220; // Adjust width dynamically
}

function getMaxIndex() {
    return Math.floor((getTotalItems() - getVisibleItems()) / getVisibleItems()); // Prevent overshooting
}

function scrollCarousel(direction) {
    const container = document.querySelector(".popular-products-container");
    if (!container) return;

    const visibleItems = getVisibleItems();
    const maxIndex = getMaxIndex();

    currentIndex += direction;

    // **Looping behavior: Reset to start when reaching the end**
    if (currentIndex < 0) {
        currentIndex = maxIndex; // Go to the last set when scrolling left at the start
    } else if (currentIndex > maxIndex) {
        currentIndex = 0; // Reset to first set when scrolling right at the end
    }

    // Calculate correct position
    const productBoxWidth = getProductBoxWidth();
    const newPosition = -(currentIndex * visibleItems * productBoxWidth);

    // Apply transform
    container.style.transform = `translateX(${newPosition}px)`;
}

// **Attach event listeners for arrows**
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".left-arrow").addEventListener("click", () => scrollCarousel(-1));
    document.querySelector(".right-arrow").addEventListener("click", () => scrollCarousel(1));

    // Reset on window resize
    window.addEventListener("resize", () => {
        currentIndex = 0; // Reset position
        scrollCarousel(0);
    });

    // Set initial position
    scrollCarousel(0);
});
