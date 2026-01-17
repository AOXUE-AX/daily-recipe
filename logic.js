let currentRecipeIndex = null;
let userRecipes = [];   // 用户真正的数据来源

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
  document.getElementById("recipe-name").innerText = recipe.name || "未命名菜谱";

  // 分类 - 用户菜谱可能没有 category
  const categoryEl = document.getElementById("recipe-category");
  if (categoryEl) {
    if (recipe.category) {
      categoryEl.innerText = `分类 · ${recipe.category}`;
    } else {
      categoryEl.innerText = ""; // 用户菜谱不显示分类
    }
  }

  // 标签 - 用户菜谱可能没有 tags
  const tagsEl = document.getElementById("recipe-tags");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "recipe-tag";
        span.innerText = tag;
        tagsEl.appendChild(span);
      });
    }
  }

  // 食材
  const ingredients = document.getElementById("ingredients");
  ingredients.innerHTML = "";
  if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
    recipe.ingredients.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ingredients.appendChild(li);
    });
  }

  // 做法
  const steps = document.getElementById("steps");
  steps.innerHTML = "";
  if (recipe.steps && Array.isArray(recipe.steps)) {
    recipe.steps.forEach(step => {
      const li = document.createElement("li");
      li.innerText = step;
      steps.appendChild(li);
    });
  }
}

function renderMyFavorites() {
  const container = document.getElementById("user-recipes-list");
  if (!container) return;

  container.innerHTML = "";

  if (userRecipes.length === 0) {
    container.innerHTML = `<div class="hint">还没有添加常用菜谱</div>`;
    return;
  }

  userRecipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
      <div class="fav-name">${recipe.name}</div>
      <div class="fav-meta">刚刚添加</div>
    `;

    // 点击 → 进入详情页
    card.addEventListener("click", () => {
      // 1. 隐藏所有页面
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      
      // 2. 显示详情页
      document.getElementById('detail-page').classList.add('active');
      
      // 3. 渲染菜谱
      renderRecipe(recipe);
    });

    container.appendChild(card);
  });
} //renderMyFavorites 函数结束

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
  // 1 从页面收集输入
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

  // 2 把数据交给系统处理
  const result = addUserRecipe(recipe);

  // 3 根据处理结果回应用户
  const hintEl = document.getElementById("editor-hint");

  if (!result.ok) {
    if (hintEl) {
      hintEl.innerText = result.errors[0];
    }
    return; // 这里直接返回，不执行后面的代码
  }

  // 保存成功后的处理
  renderMyFavorites();
  
  if (hintEl) {
    hintEl.innerText = "✅ 菜谱已保存！";
  }

  console.log("已保存菜谱：", recipe);

  // 2秒后返回首页并清空表单
  setTimeout(() => {
    // 返回首页
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById('home-page').classList.add('active');
    
    // 清空表单
    document.getElementById("input-name").value = "";
    document.getElementById("input-ingredients").value = "";
    document.getElementById("input-steps").value = "";
    
    // 清空提示
    if (hintEl) {
      hintEl.innerText = "";
    }
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("save-recipe-btn");
  if (btn) {
    btn.addEventListener("click", handleSaveRecipe);
  }
});

//删除 showDetailWithRecipe 函数，因为已经不需要了

/*统一入口（给按钮 / 未来滑动用）*/
function switchRecipe(source = "button") {
  changeRecipe();
}