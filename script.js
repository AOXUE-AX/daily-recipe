
function showTodayRecipe() {
  const today = new Date();
  const dayNumber = today.getFullYear() * 10000
                  + (today.getMonth() + 1) * 100
                  + today.getDate();

  const index = dayNumber % recipes.length;
  renderRecipe(recipes[index]);
}

function updateHintByDate() {
  const hint = document.querySelector(".hint");
  const today = new Date();
  const day = today.getDay(); // 0 = 周日, 6 = 周六

  if (day === 0 || day === 6) {
    hint.innerText = "周末 · 推荐";
  } else {
    hint.innerText = "今天 · 推荐";
  }
}

function showTodayRecipe() {
  const today = new Date();
  const dayNumber =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  currentRecipeIndex = dayNumber % recipes.length;
  renderRecipe(recipes[currentRecipeIndex]);
}

updateHintByDate();
