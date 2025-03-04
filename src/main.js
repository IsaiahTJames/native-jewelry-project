import './index.css'
import 'flowbite'
import './responsive.css'
import './jewelry-styles.css'




document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevents jumping to top of page
            event.stopPropagation(); // Stops event from bubbling to document

            const dropdownMenu = this.closest("li").querySelector(".dropdown-menu"); // Ensures the correct dropdown menu
            const isOpen = !dropdownMenu.classList.contains("hidden");

            // Close all dropdowns first
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                menu.classList.add("hidden");
            });

            // Toggle only the clicked dropdown
            if (!isOpen) {
                dropdownMenu.classList.remove("hidden");
                document.body.classList.add("dropdown-active"); // Disables hover effect when open
            } else {
                document.body.classList.remove("dropdown-active"); // Re-enable hover effect
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
// Select the cart count element
const cartCount = document.getElementById('cart-count');
let cartItems = 0; // Initial cart count

// Function to update the cart count
function addToCart() {
    cartItems++; // Increase count
    cartCount.textContent = cartItems; // Update the number in cart

    // Show the count badge when there's at least one item
    if (cartItems > 0) {
        cartCount.classList.remove('hidden');
    }
}

// Example: Attach this function to your "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});






function createCarousel(containerSelector, leftArrowSelector, rightArrowSelector) {
    let currentIndex = 0;

    function getTotalItems() {
        return document.querySelectorAll(`${containerSelector} .product-box, ${containerSelector} .featured-box`).length;
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
        const container = document.querySelector(containerSelector);
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

    // Attach event listeners for arrows
    document.querySelector(leftArrowSelector).addEventListener("click", () => scrollCarousel(-1));
    document.querySelector(rightArrowSelector).addEventListener("click", () => scrollCarousel(1));

    // Reset on window resize
    window.addEventListener("resize", () => {
        currentIndex = 0; // Reset position
        scrollCarousel(0);
    });

    // Set initial position
    scrollCarousel(0);
}

// **Initialize both carousels**
document.addEventListener("DOMContentLoaded", () => {
    createCarousel(".popular-products-container", ".popular-products .left-arrow", ".popular-products .right-arrow");
    createCarousel(".featured-products-container", ".featured-products .left-arrow", ".featured-products .right-arrow");
});


