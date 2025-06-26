document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('player-data-modal');
  const dataCards = document.querySelectorAll('.data-card');

  if (!modal || dataCards.length === 0) {
    return; // 如果页面上没有卡片或模态窗口，则不执行
  }

  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const closeButton = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');

  function openModal(card) {
  const targetId = card.dataset.target;
  const title = card.dataset.title;
  const dataContentElement = document.querySelector(targetId);

  // 检查数据容器是否存在
  if (dataContentElement) {
    const contentHTML = dataContentElement.innerHTML;

    // 关键：检查内容是否为空白（trim()会移除前后的空格和换行符）
    if (contentHTML.trim() === '') {
      // 如果内容为空，可以选择弹出一个提示或直接不执行任何操作
      // alert('该部分数据暂未收录。'); // 方案A：弹出一个系统提示
      return; // 方案B：直接不执行任何操作（推荐）
    }

    // --- 如果内容不为空，则正常执行以下代码 ---
    
    // 填充标题和内容
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHTML;
    
    // 显示模态窗口
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
}
  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    // 清空内容，可选
    // modalBody.innerHTML = ''; 
  }

  // 为每张卡片添加点击事件
  dataCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  // 添加关闭事件
  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // 按 Esc 键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});