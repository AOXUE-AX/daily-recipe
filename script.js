// 页面切换函数
function switchPage(pageId) {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // 显示目标页面
  document.getElementById(pageId).classList.add('active');
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  // 更新日期提示
  updateHintByDate();
  
  // 显示今日推荐菜谱
  showTodayRecipe();
  
  // 首页卡片点击事件
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', function() {
      const recipeId = this.getAttribute('data-id');
      if (recipeId) {
        // 找到对应的菜谱
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
          renderRecipe(recipe);
          switchPage('detail-page');
        }
      } else {
        alert('菜谱详情功能开发中...');
      }
    });
  });
  
  // 添加菜谱按钮
  document.getElementById('show-add-btn')?.addEventListener('click', function() {
    switchPage('add-page');
  });
  
  // 返回按钮（从详情页）
  document.getElementById('back-btn')?.addEventListener('click', function() {
    switchPage('home-page');
  });
  
  // 返回按钮（从添加页）
  document.getElementById('back-from-add-btn')?.addEventListener('click', function() {
    switchPage('home-page');
  });
  
  // 保存菜谱按钮（已经在 logic.js 中绑定）
});

// 原有的日期函数
function updateHintByDate() {
  const hint = document.querySelector(".hint");
  if (!hint) return;
  
  const today = new Date();
  const day = today.getDay();
  
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

  if (recipes.length > 0) {
    currentRecipeIndex = dayNumber % recipes.length;
    renderRecipe(recipes[currentRecipeIndex]);
  }
}