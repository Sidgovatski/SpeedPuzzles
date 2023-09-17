document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");

    // Retrieve cart items from local storage
    const cartData = localStorage.getItem("cart");

    if (cartData) {
        const cart = JSON.parse(cartData);

        // Display cart items on the page with delete buttons
        cart.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `${item} <button class="delete-button" data-item-index="${index}">Delete</button>`;
            cartItems.appendChild(cartItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const itemIndex = button.getAttribute("data-item-index");
                // Remove the item from the cart array and update local storage
                cart.splice(itemIndex, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                // Remove the item from the DOM
                cartItems.removeChild(button.parentElement);
            });
        });
    } else {
        console.log("Cart is empty");
    }
});