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



window.openFourBoxModal = function (button) {
    // Modal elements
    const modal = document.getElementById("fourBoxModal");
    const modalTitle = document.getElementById("fourBoxModalTitle");
    const modalDescription = document.getElementById("fourBoxModalDescription");
    const imageContainer = document.getElementById("fourBoxModalImages");

    // Get parent container of the clicked button
    const parentDiv = button.closest(".xbox");
    const productDetails = parentDiv.querySelector(".product-details");

    // Set Title and Description dynamically
    modalTitle.textContent = parentDiv.querySelector("p").textContent;
    modalDescription.textContent = parentDiv.getAttribute("data-description"); // from HTML

    // Clear previous content in modal
    imageContainer.innerHTML = "";

    // Loop through each product inside `.product-details`
    productDetails.querySelectorAll(".product").forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("modal-product");

        // Image Element
        let imgElement = document.createElement("img");
        imgElement.src = product.querySelector("img").src;
        imgElement.classList.add("four-box-product-image");

        // Name Element
        let nameElement = document.createElement("p");
        nameElement.textContent = product.getAttribute("data-name");
        nameElement.classList.add("product-name");

        // Price Element
        let priceElement = document.createElement("p");
        priceElement.textContent = product.getAttribute("data-price");
        priceElement.classList.add("product-price");

        // Add to Cart Button (THIS WAS MISSING)
        let addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart-btn");

        // Fix: Now add event listener to the button
        addToCartButton.addEventListener("click", function () {
            addToCart({
                name: nameElement.textContent,
                price: priceElement.textContent,
                image: imgElement.src, // Optional: Add image
            });
        });

        // Append Elements
        productDiv.appendChild(imgElement);
        productDiv.appendChild(nameElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(addToCartButton); // Now it's properly appended
        imageContainer.appendChild(productDiv);
    });

    // Show modal
    modal.style.display = "flex";
};

// Function to Close the Modal
window.closeFourBoxModal = function () {
    document.getElementById("fourBoxModal").style.display = "none"
}

// Select the cart count element
const cartCount = document.getElementById('cart-count')
let cartItems = JSON.parse(localStorage.getItem("cart"))?.length || 0 // Initialize from storage

// Function to update the cart count in the UI
function updateCartCount() {
    cartCount.textContent = cartItems

    // Show the count badge when there's at least one item
    if (cartItems > 0) {
        cartCount.classList.remove('hidden')
    } else {
        cartCount.classList.add('hidden')
    }
}

// Function to handle adding a product to the cart (now unified)
function addToCart(product) {
    console.log("Adding to cart:", product)

    // Get cart from localStorage or create an empty one
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart))

    // Increase and update cart count
    cartItems = cart.length; // Reflects the actual cart size
    updateCartCount() // Update the UI
    updateCartDropdown()

    alert(`${product.name} added to cart for ${product.price}`)
}

// Attach the function to all "Add to Cart" buttons across the site
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        let productElement = this.closest(".product")

        let product = {
            name: productElement.querySelector(".product-name").textContent,
            price: productElement.querySelector(".product-price").textContent,
            image: productElement.querySelector("img").src
        }
        addToCart(product)
    })
})
function addModalProductToCart() {
    let product = {
        name: document.getElementById("modalTitle").textContent,
        price: document.getElementById("modalPrice").textContent,
        image: document.getElementById("modalImage").src
    };
    addToCart(product); // Call the addToCart function
}

// Attach the event listener to the modal "Add to Cart" button
document.getElementById("modalAddToCart").addEventListener("click", addModalProductToCart);

// Initialize cart count on page load
updateCartCount();


document.getElementById("cartButton").addEventListener("click", function (event) {
    event.preventDefault()
    document.getElementById("cartDropdown").classList.toggle("hidden")
})
// Function to update cart dropdown with items
function updateCartDropdown() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cartItemsList");

    cartList.innerHTML = "" // Clear previous items

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-gray-500 text-sm p-2">Your cart is empty.</p>`
    } else {
        cart.forEach((item, index) => {
            let listItem = document.createElement("li")
            listItem.classList.add("flex", "items-center", "justify-between", "border-b", "pb-2", "py-2")

            listItem.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-3">
                    <div>
                        <p class="text-sm font-medium text-gray-800">${item.name}</p>
                        <p class="text-sm text-gray-600">${item.price}</p>
                    </div>
                </div>
                <button class="text-red-500 text-sm hover:text-red-700" onclick="removeFromCart(${index})">x</button>
            `;
            cartList.appendChild(listItem);
        });
    }
}

























// Function to swap the main image with the clicked thumbnail
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
const thumbnailContainer = document.querySelector(".thumbnail-container");

// Function to Open the Modal and Update Content
window.openModal = function (title, price, mainImage, thumbnails = []) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalPrice").textContent = `$${price}`;
    document.getElementById("modalImage").src = mainImage;
    document.getElementById("productModal").style.display = "flex";

    // Clear previous thumbnails
    thumbnailContainer.innerHTML = "";

    // Dynamically add thumbnails (if available)
    thumbnails.forEach((thumbSrc) => {
        let thumb = document.createElement("img");
        thumb.src = thumbSrc;
        thumb.classList.add("thumbnail");
        thumb.onclick = function () {
            window.updateMainImage(thumb); // Swap with main image
        };
        thumbnailContainer.appendChild(thumb);
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


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("subscribe-form");
    const popup = document.getElementById("popup-email");
    const closeButton = document.querySelector(".close-btn");
    const emailInput = document.getElementById("email-input");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if(emailInput.value.trim() !== "") {
            popup.style.display = "block"
            emailInput.value = ""
        }
    })
    closeButton.addEventListener("click", function () {
        popup.style.display = "none"
    })
     window.addEventListener("click", function (event) {
         if (event.target === popup) {
             popup.style.display = "none"
         }
     })
})
