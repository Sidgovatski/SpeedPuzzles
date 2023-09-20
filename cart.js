document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
  
    function updateCartDisplay() {
        let cart = [];
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            cart = JSON.parse(cartData);
        }

        cartItems.innerHTML = "";

        const cartMap = new Map();

        cart.forEach((item) => {
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
                    <span>${item} (x${count})</span>
                    <button class="delete-button" data-item-name="${item}">Delete</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const itemName = button.getAttribute("data-item-name");
                const itemIndex = cart.indexOf(itemName);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartDisplay();
                }
            });
        });
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
        cartItem.textContent = `${item} (x${count})`;
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
  
        deleteButton.addEventListener("click", function () {
          cartData.splice(cartData.indexOf(item), 1);
          localStorage.setItem("cart", JSON.stringify(cartData));
          updateCartDisplay();
        });
  
        cartItem.appendChild(deleteButton);
        cartItems.appendChild(cartItem);
      });
    }
  
    updateCartDisplay();
  });
  