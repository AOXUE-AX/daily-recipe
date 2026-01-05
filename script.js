const recipes = [
  {
    name: "番茄鸡蛋盖饭",
    ingredients: ["番茄", "鸡蛋", "米饭"],
    steps: [
      "番茄切块",
      "鸡蛋炒熟盛出",
      "番茄炒软",
      "倒回鸡蛋翻炒",
      "配米饭食用"
    ]
  },
  {
    name: "青椒炒肉",
    ingredients: ["五花肉/梅花肉", "青椒"],
    steps: [
      "猪肉切片",
      "青椒切块",
      "先炒猪肉",
      "加入青椒翻炒"
    ]
  }
];

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

showTodayRecipe();
updateHintByDate();
