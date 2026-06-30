const API_KEY = "ee9ba88783264228a4795c84d950228f";

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const suggestions = document.getElementById("suggestions");

if (searchInput && searchForm && suggestions) {

    searchInput.addEventListener("input", async function () {

        const query = this.value.trim();

        suggestions.innerHTML = "";

        if (query.length < 2) return;

        try {

            const response = await fetch(
                `https://api.spoonacular.com/recipes/autocomplete?query=${encodeURIComponent(query)}&number=8&apiKey=${API_KEY}`
            );

            const data = await response.json();

            data.forEach(recipe => {

                const item = document.createElement("div");

                item.className = "suggestion-item";
                item.textContent = recipe.title;

                item.onclick = () => {

                    window.open(
                        `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}`,
                        "_blank"
                    );

                };

                suggestions.appendChild(item);

            });

        } catch (error) {

            console.log(error);

        }

    });

    searchForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const query = searchInput.value.trim();

        if (query === "") return;

        try {

            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=1&apiKey=${API_KEY}`
            );

            const data = await response.json();

            if (data.results.length > 0) {

                const recipe = data.results[0];

                window.open(
                    `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}`,
                    "_blank"
                );

            }
            else {

                alert("Recipe not found.");

            }

        } catch (error) {

            console.log(error);

        }

    });

    document.addEventListener("click", function (e) {

        if (!e.target.closest(".SearchBox")) {

            suggestions.innerHTML = "";

        }

    });

}
