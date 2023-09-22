document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");

    function updateCartDisplay() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";

        const cartData = JSON.parse(localStorage.getItem("cart")) || [];

        const cartMap = new Map();

        cartData.forEach((item) => {
            if (cartMap.has(item)) {
                const count = cartMap.get(item);
                cartMap.set(item, count + 1);
            } else {
                cartMap.set(item, 1);
            }
        });

        cartMap.forEach((count, item) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <div class="cart-item">
                    <span>${item} (x<span class="item-quantity">${count}</span>)</span>
                    <button class="increment-button" data-item-name="${item}">+</button>
                    <button class="delete-button" data-item-name="${item}">Delete</button>
                </div>
            `;

            const deleteButton = cartItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", function () {
                cartData.splice(cartData.indexOf(item), 1);
                localStorage.setItem("cart", JSON.stringify(cartData));
                updateCartDisplay();
            });

            const incrementButton = cartItem.querySelector(".increment-button");
            incrementButton.addEventListener("click", function () {
                cartData.push(item);
                localStorage.setItem("cart", JSON.stringify(cartData));
                updateCartDisplay();
            });

            cartItems.appendChild(cartItem);
        });
    }

    updateCartDisplay();
});
