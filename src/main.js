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

let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });
}

// Show the first slide initially
showSlide(slideIndex);

// Function to move to the next slide
window.nextSlide = function () {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
};

// Function to move to the previous slide
window.prevSlide = function () {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
};

// Auto-slide every 8 seconds
setInterval(nextSlide, 8000);



// Function to Open the Four Box Modal
window.openFourBoxModal = function (title, description, images) {
    document.getElementById('fourBoxModalTitle').textContent = title;
    document.getElementById('fourBoxModalDescription').textContent = description;

    const modalImagesContainer = document.getElementById("fourBoxModalImages");
    modalImagesContainer.innerHTML = ""; // Clear previous images

    // Loop through images and create clickable product boxes
    images.forEach((imageSrc, index) => {
        const productBox = document.createElement("div");
        productBox.classList.add("four-box-product");
        productBox.innerHTML = `<img src="${imageSrc}" alt="Product Image ${index + 1}" class="four-box-product-image">`;

        // Click event: Opens the product modal without names or prices
        productBox.addEventListener("click", function () {
            window.openProductModal(
                "", // No title
                "", // No price
                imageSrc, // Main image is the clicked image
                images.filter(img => img !== imageSrc).slice(0, 2) // Pick 2 other images as thumbnails
            );
        });

        modalImagesContainer.appendChild(productBox);
    });

    document.getElementById("fourBoxModal").style.display = "flex";
};

// Function to Close the Four Box Modal
window.closeFourBoxModal = function () {
    document.getElementById("fourBoxModal").style.display = "none";
};

// Ensure clicking outside the modal closes it
window.onclick = function (event) {
    const fourBoxModal = document.getElementById("fourBoxModal");
    if (event.target === fourBoxModal) {
        window.closeFourBoxModal();
    }
};

























window.updateMainImage = function (thumbnail) {
    const mainImage = document.getElementById("modalImage");
    const thumbnailsContainer = document.getElementById("modalThumbnails");

    // Store current main image source
    const currentMainImage = mainImage.src;

    // Swap the clicked thumbnail with the main image
    mainImage.src = thumbnail.src;
    thumbnail.src = currentMainImage;
};

window.updateMainImage = function (thumbnail) {
    const mainImage = document.getElementById("modalImage");

    // Swap the clicked thumbnail with the main image
    const tempSrc = mainImage.src;
    mainImage.src = thumbnail.src;
    thumbnail.src = tempSrc;
};

// Get modal elements
const modal = document.getElementById("productModal");
const closeButton = document.querySelector(".close");

// Function to Open the Modal and Update Content
window.openModal = function (title, price, mainImage, thumbnails = []) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = `$${price}`;
    document.getElementById('modalImage').src = mainImage;
    document.getElementById("productModal").style.display = "flex";

    // Ensure exactly two thumbnails (if more provided, limit to 2)
    let updatedThumbnails = thumbnails.slice(0, 2);

    // Get thumbnail elements
    const thumbnailElements = document.querySelectorAll(".thumbnail");

    // Loop through two available thumbnails and assign images
    thumbnailElements.forEach((thumb, index) => {
        if (updatedThumbnails[index]) {
            thumb.src = updatedThumbnails[index];  // Set the image source
            thumb.style.display = "block";  // Ensure it's visible
            thumb.onclick = function () {
                window.updateMainImage(thumb); // Swap with main image
            };
        } else {
            thumb.style.display = "none";  // Hide extra thumbnails if not available
        }
    });
};

// Function to Close the Modal
window.closeModal = function () {
    modal.style.display = "none";
};

// Ensure the close button has the event listener
if (closeButton) {
    closeButton.addEventListener("click", window.closeModal);
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target === modal) {
        window.closeModal();
    }
};



















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


