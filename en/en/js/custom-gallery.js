/* my-blog/themes/你的主题名/source/js/custom-gallery.js */

// 使用 DOMContentLoaded 事件确保在操作DOM之前，HTML已完全加载和解析
document.addEventListener('DOMContentLoaded', () => {

    // 查找页面上所有需要的元素
    const lightbox = document.getElementById('lightbox');

    // 如果页面上没有灯箱元素，就直接退出，避免在不含灯箱的页面上报错
    if (!lightbox) {
        return;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox.querySelector('.close-btn');

    // 使用事件委托来处理所有照片墙项的点击事件
    // 这样更高效，特别是当照片很多时
    document.body.addEventListener('click', (e) => {
        // 检查被点击的元素或其父元素是否是 .photo-item
        const photoItem = e.target.closest('.photo-item');
        
        if (photoItem) {
            // 从 photo-item 中找到图片元素
            const imgElement = photoItem.querySelector('img');
            if (imgElement) {
                // 获取图片的源(src)和长描述(data-caption)
                const imgSrc = imgElement.getAttribute('src');
                const captionText = imgElement.getAttribute('data-caption');

                // 将信息填充到灯箱中
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.innerHTML = captionText;
                // 显示灯箱
                lightbox.style.display = 'flex';
                // 使用一个极小的延迟来确保 display 的改变被浏览器渲染，从而触发 opacity 的过渡动画
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10); 
            }
        }
    });

    // 定义关闭灯箱的函数
    function closeLightbox() {
        lightbox.style.opacity = '0';
        
        // 在CSS过渡动画（0.3秒）结束后，再将元素彻底隐藏（display: none）
        // 这可以防止隐藏的元素仍然可以被交互
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // 这个时间应与 CSS transition-duration 保持一致
    }

    // 为关闭按钮 '×' 添加点击事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // 点击灯箱的背景区域（即 #lightbox 元素本身）时，也关闭灯箱
    lightbox.addEventListener('click', (e) => {
        // 如果点击的目标就是灯箱背景本身，而不是它的子元素（如图片或标题）
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 添加键盘支持：按 "Escape" 键关闭灯箱
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display !== 'none') {
            closeLightbox();
        }
    });
});