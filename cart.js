document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");

    // Function to update the cart display and local storage
    function updateCartDisplay() {
        // Retrieve cart items from local storage
        let cart = [];
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            cart = JSON.parse(cartData);
        }

        // Clear the current cart display
        cartItems.innerHTML = "";

        const cartMap = new Map(); // Use a map to group identical items

        // Count and group identical items
        cart.forEach((item) => {
            if (cartMap.has(item)) {
                // Increment count if item already exists in the map
                const count = cartMap.get(item);
                cartMap.set(item, count + 1);
            } else {
                // Add item to the map with a count of 1 if it doesn't exist
                cartMap.set(item, 1);
            }
        });

        // Display cart items with counts and delete buttons
        cartMap.forEach((count, item) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <div class="cart-item">
                    <span>${item} (x${count})</span>
                    <button class="delete-button" data-item-name="${item}">Delete</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const itemName = button.getAttribute("data-item-name");
                // Remove one instance of the item from the cart
                const itemIndex = cart.indexOf(itemName);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    // Update the cart in local storage
                    localStorage.setItem("cart", JSON.stringify(cart));
                    // Update the cart display
                    updateCartDisplay();
                }
            });
        });
    }

    // Update the initial cart display when the page loads
    updateCartDisplay();
});
