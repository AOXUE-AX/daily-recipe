function renderRecipe(recipe) {
  document.getElementById("recipe-name").innerText = recipe.name;

  const ingredients = document.getElementById("ingredients");
  ingredients.innerHTML = "";
  recipe.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    ingredients.appendChild(li);
  });

  const steps = document.getElementById("steps");
  steps.innerHTML = "";
  recipe.steps.forEach(step => {
    const li = document.createElement("li");
    li.innerText = step;
    steps.appendChild(li);
  });
}

function changeRecipe() {
  const content = document.querySelector(".recipe-content");

  content.classList.add("fade");

  setTimeout(() => {
    const today = new Date();
    const baseNumber =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();

    const offset = Math.floor(Math.random() * recipes.length);
    const index = (baseNumber + offset) % recipes.length;

    renderRecipe(recipes[index]);
    content.classList.remove("fade");
  }, 120);
}
