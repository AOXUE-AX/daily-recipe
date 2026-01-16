let currentRecipeIndex = null;
let userRecipes = [];   // 用户真正的数据来源
// 状态在最上，规则在其后，行为再后，渲染最后。
// 验证函数属于“规则”，不是“行为”，更不是“渲染”。

function validateRecipeForUser(recipe) {
  const result = {
    ok: true,
    warnings: [],
    errors: []
  };

  // 名字
  if (!recipe.name || recipe.name.trim().length < 2) {
    result.ok = false;
    result.errors.push("要起个什么名字比较好记呢");
  }

  // 食材
  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    result.ok = false;
    result.errors.push("需要准备什么食材捏");
  } else if (recipe.ingredients.length > 12) {
    result.warnings.push("食材有点多，备菜可能会比较累哦");
  }

  // 步骤
  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    result.ok = false;
    result.errors.push("从哪开始捏");
  } else if (recipe.steps.length > 10) {
    result.warnings.push("步骤有点多，无从下手呀");
  }

  return result;
}

function addUserRecipe(recipe) {
  const checkResult = validateRecipeForUser(recipe);

  if (!checkResult.ok) {
    return checkResult;
  }

  userRecipes.push(recipe);
  // saveUserRecipes(); // 以后接 localStorage

  return { ok: true };
}

/*动画工具*/
function withFadeAnimation(action) {
  const content = document.querySelector(".recipe-content");
  if (!content) {
    action();
    return;
  }

  content.classList.add("fade");

  setTimeout(() => {
    action();
    content.classList.remove("fade");
  }, 120);
}

/*渲染*/
function renderRecipe(recipe) {
  document.getElementById("recipe-name").innerText = recipe.name;

  // 分类
  const categoryEl = document.getElementById("recipe-category");
  if (categoryEl && recipe.category) {
    categoryEl.innerText = `分类 · ${recipe.category}`;
  }

  // 标签
  const tagsEl = document.getElementById("recipe-tags");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    (recipe.tags || []).forEach(tag => {
      const span = document.createElement("span");
      span.className = "recipe-tag";
      span.innerText = tag;
      tagsEl.appendChild(span);
    });
  }

// 食材
  const ingredients = document.getElementById("ingredients");
  ingredients.innerHTML = "";
  (recipe.ingredients || []).forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    ingredients.appendChild(li);
  });

 // 做法
  const steps = document.getElementById("steps");
  steps.innerHTML = "";
  (recipe.steps || []).forEach(step => {
    const li = document.createElement("li");
    li.innerText = step;
    steps.appendChild(li);
  });
}

/*实际切换逻辑*/
function changeRecipe() {
  withFadeAnimation(() => {
    if (recipes.length === 0) return;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * recipes.length);
    } while (newIndex === currentRecipeIndex && recipes.length > 1);

    currentRecipeIndex = newIndex;
    renderRecipe(recipes[currentRecipeIndex]);
  });
}

function handleSaveRecipe() {
  // 1 从页面收集输入（只负责“收”）
  const name = document.getElementById("input-name").value.trim();
  const ingredients = document
    .getElementById("input-ingredients").value
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const steps = document
    .getElementById("input-steps").value
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const recipe = { name, ingredients, steps };

  // 2 把数据交给系统处理（不判断、不保存）
  const result = addUserRecipe(recipe);

  // 3 根据“处理结果”回应用户
const hintEl = document.getElementById("editor-hint");

if (!result.ok) {
  if (hintEl) {
    hintEl.innerText = result.errors[0];
  }
  return;
}

if (hintEl) {
  hintEl.innerText = "菜谱已保存，下次也可以做给自己吃。";
}

  console.log("已保存菜谱：", recipe);
}


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("save-recipe-btn");
  if (btn) {
    btn.addEventListener("click", handleSaveRecipe);
  }
});


/*统一入口（给按钮 / 未来滑动用）*/
function switchRecipe(source = "button") {
  changeRecipe();
}

