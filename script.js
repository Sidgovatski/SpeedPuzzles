// JavaScript for search functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const grid = document.getElementById("grid1");
    const allProducts = document.querySelectorAll(".text2");

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        // Clear previous search results
        clearGrid();

        if (searchTerm.trim() === "") {
            // If the search bar is empty, display all products
            allProducts.forEach((product) => {
                const parentDiv = product.parentElement;
                parentDiv.style.display = "block";
            });
        } else {
            // Filter and display matching products
            allProducts.forEach((product) => {
                const productName = product.textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    const parentDiv = product.parentElement;
                    parentDiv.style.display = "block";
                }
            });
        }
    }

    function clearGrid() {
        allProducts.forEach((product) => {
            const parentDiv = product.parentElement;
            parentDiv.style.display = "none";
        });
    }
});
