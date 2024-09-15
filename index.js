import config from "./config.js";

const cardContainer = document.getElementById("card-container");
const searchButton = document.getElementById("search-btn");

console.log(config.AppKey);

searchButton.addEventListener("click", async () => {
  console.log("button is working");

  try {
    const inputFood = document.getElementById("input-food").value;
    console.log(inputFood);

    const url = `${config.baseURL}?q=${encodeURI(inputFood)}&app_id=${
      config.AppId
    }&app_key=${config.AppKey}`;

    let response = await fetch(url);
    console.log(url);

    let data = await response.json();
    console.log(data);

    cardContainer.innerHTML = ""; // Clear previous results
    if (data.hits.length === 0) {
      cardContainer.innerHTML = `<h4 class="error">Sorry! Couldn't find the food<h4/>`;
      return;
    }

    data.hits.slice(0, 4).forEach((hit) => {
      const recipe = hit.recipe;

      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = recipe.image;
      card.appendChild(image);

      const label = document.createElement("h2");
      label.textContent = recipe.label;
      card.appendChild(label);

      const cuisineType = document.createElement("p");
      cuisineType.textContent = `Cuisine: ${recipe.cuisineType.join(", ")}`;
      card.appendChild(cuisineType);

      const viewRecipeText = document.createElement("p");
      viewRecipeText.textContent = "Click anywhere to view recipe";
      viewRecipeText.style.cursor = "pointer";
      viewRecipeText.style.color = "#007bff";
      card.appendChild(viewRecipeText);

      const ingredients = document.createElement("ul");
      ingredients.style.display = "none";
      recipe.ingredientLines.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredients.appendChild(li);
      });
      card.appendChild(ingredients);

      // Add click event listener to center the card and display ingredients
      card.addEventListener("click", () => {
        document.querySelectorAll(".card").forEach((c) => {
          c.classList.remove("centered-card");
          c.classList.add("background-card");
          const closeButton = c.querySelector(".close-btn");
          if (closeButton) {
            closeButton.remove();
          }
          c.querySelector("ul").style.display = "none";
          c.querySelector("p").style.display = "block";
        });
        card.classList.remove("background-card");
        card.classList.add("centered-card");
        ingredients.style.display = "block";
        viewRecipeText.style.display = "none";

        // Create and add the close button
        const closeButton = document.createElement("button");
        closeButton.className = "close-btn";
        closeButton.innerHTML = "&times;";
        card.appendChild(closeButton);

        // Add click event listener to close button to revert card
        closeButton.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent the card click event from firing
          card.classList.remove("centered-card");
          document.querySelectorAll(".card").forEach((c) => {
            c.classList.remove("background-card");
          });
          closeButton.remove(); // Remove the close button
          ingredients.style.display = "none";
          viewRecipeText.style.display = "block";
        });
      });

      cardContainer.appendChild(card);
    });
  } catch (error) {
    cardContainer.innerHTML = `<h4 class="error">Sorry! Couldn't find the food<h4/>`;
    console.error("Error fetching data:", error);
  }
});

// Add a click event listener to the container to remove the centered effect
cardContainer.addEventListener("click", (e) => {
  if (e.target === cardContainer) {
    document.querySelectorAll(".card").forEach((c) => {
      c.classList.remove("centered-card");
      c.classList.remove("background-card");

      const closeButton = c.querySelector(".close-btn");
      if (closeButton) {
        closeButton.remove();
      }

      const ingredients = c.querySelector("ul");
      if (ingredients) {
        ingredients.style.display = "none";
      }

      const viewRecipeText = c.querySelector("p");
      if (viewRecipeText) {
        viewRecipeText.style.display = "block";
      }
    });
  }
});
