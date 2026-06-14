const recipes = {
    "bruschetta": "Bruschetta.html",
    "pizza": "Pizza.html",
    "pasta": "Pasta.html",
    "burger": "Burger.html",
    "brownie": "Brownie.html",
    "tiramisu": "Tiramisu.html",

    "appetizers": "Appetizers.html",
    "entree": "Entree.html",
    "desserts": "Desserts.html",
    "sides": "Sides.html",
    "mocktails": "Mocktails.html",
    "meals": "Meals.html",
    "cuisine": "Cuisine.html",
    "diet": "Diet.html"
};

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const searchForm = document.getElementById("searchForm");

searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    suggestions.innerHTML = "";

    if (value === "") return;

    const matches = Object.keys(recipes).filter(recipe =>
        recipe.includes(value)
    );

    matches.forEach(match => {

        const div = document.createElement("div");

        div.classList.add("suggestion-item");
        div.textContent = match;

        div.addEventListener("click", function () {
            window.location.href = recipes[match];
        });

        suggestions.appendChild(div);
    });
});

searchForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const value = searchInput.value.toLowerCase().trim();

    if (recipes[value]) {
        window.location.href = recipes[value];
    } else {
        alert("Recipe not found!");
    }
});

document.addEventListener("click", function (e) {

    if (!e.target.closest(".SearchBox")) {
        suggestions.innerHTML = "";
    }
});
