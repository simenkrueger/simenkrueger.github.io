// source/js/language-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    // ---- 1. 全局UI翻译函数 ----
    function translateUI(lang) {
        // 检查注入的数据是否存在
        if (!window.I18N_DATA || !window.I18N_DATA[lang]) {
            return;
        }
        const translations = window.I18N_DATA[lang];

        // 翻译网站标题
        const siteTitle = document.getElementById('site-title');
        if (siteTitle && translations.title) {
            siteTitle.innerText = translations.title;
        }

        // 翻译网站副标题
        const subtitle = document.querySelector('.site-subtitle');
        if (subtitle && translations.subtitle) {
            subtitle.innerText = translations.subtitle;
        }
        
        // 翻译导航菜单
        if (translations.menu) {
            for (const key in translations.menu) {
                // Butterfly的菜单链接是 /archives/ 或 /tags/
                // 我们通过 href 属性来定位正确的菜单项
                const menuItemLink = document.querySelector(`.menu-item-link[href*="/${key}/"]`);
                if (menuItemLink) {
                    const textSpan = menuItemLink.querySelector('span');
                    if(textSpan) {
                         textSpan.innerText = translations.menu[key];
                    }
                }
            }
        }
    }

    // ---- 2. 语言切换器逻辑 (与之前类似，但现在会调用UI翻译) ----
    const switcherItem = document.getElementById('lang-switcher-item');
    if (!switcherItem) return;

    const switcherLink = document.getElementById('lang-switcher-link');
    if (!switcherLink) return;
    
    const currentPath = window.location.pathname;
    let currentLang = '';
    let targetLang = '';
    let targetPath = '';

    if (currentPath.startsWith('/en/')) {
        currentLang = 'en';
        targetLang = 'zh-cn';
        targetPath = currentPath.replace('/en/', '/zh-cn/');
    } else if (currentPath.startsWith('/zh-cn/')) {
        currentLang = 'zh-cn';
        targetLang = 'en';
        targetPath = currentPath.replace('/zh-cn/', '/en/');
    } else {
        // 对于根路径，我们根据默认语言来决定
        // 假设默认语言在 _config.yml 中是 'zh-cn'
        // 这里可以根据需要硬编码或从其他地方获取
        currentLang = 'zh-cn'; 
        targetLang = 'en';
        targetPath = '/en/'; // 根路径的切换目标是对方语言的首页
    }
    
    // !!! 关键：页面加载时，立即翻译UI到当前语言 !!!
    translateUI(currentLang);

    // ---- 3. 设置切换器链接 (与之前相同) ----
    const targetHomepage = `/${targetLang}/`;

    fetch(targetPath, { method: 'HEAD' })
        .then(response => {
            switcherLink.href = (response.ok && response.status !== 404) ? targetPath : targetHomepage;
            switcherLink.innerHTML = `<i class="fas fa-globe"></i> ${targetLang === 'en' ? 'English' : '中文'}`;
            switcherItem.style.display = 'block';
        })
        .catch(() => {
            switcherLink.href = targetHomepage;
            switcherLink.innerHTML = `<i class="fas fa-globe"></i> ${targetLang === 'en' ? 'English' : '中文'}`;
            switcherItem.style.display = 'block';
        });
});