document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Get product information from the clicked button
            const productName = button.getAttribute("data-product-name");
            const productPrice = button.getAttribute("data-product-price");

            // Store cart items in local storage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(`${productName} - €${productPrice}`);
            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
});
