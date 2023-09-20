document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
  
    function updateCartDisplay() {
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
  