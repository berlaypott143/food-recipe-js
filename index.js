// api id and key
const AppId = "b9a12d47";
const AppKey = "b9a5ec8c6a3751d5d515fcef821187af";

//food url
const baseURL = "https://api.edamam.com/search";

const cardContainer = document.getElementById("card-container");
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", async () => {
  console.log("button is working");

  try {
    const inputFood = document.getElementById("input-food").value;
    console.log(inputFood);

    const url = `${baseURL}?q=${encodeURIComponent(
      inputFood
    )}&app_id=${AppId}&app_key=${AppKey}`;

    let response = await fetch(url);
    console.log(url);

    let data = await response.json();
    console.log(data);

    data.hits.slice(0, 3).forEach((hit) => {
      const recipe = hit.recipe;

      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = recipe.image;
      card.appendChild(image);

      const label = document.createElement("h3");
      label.textContent = recipe.label;
      card.appendChild(label);

      const cuisineType = document.createElement("p");
      cuisineType.textContent = `Cuisine: ${recipe.cuisineType.join(", ")}`;
      card.appendChild(cuisineType);

      const ingredients = document.createElement("ul");
      recipe.ingredientLines.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredients.appendChild(li);
      });
      card.appendChild(ingredients);

      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
