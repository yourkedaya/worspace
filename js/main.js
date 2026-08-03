// =================== Main App ===================
(function() {
    'use strict';

    // ===== Navbar scroll effect =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = current;
    });

    // ===== Smooth scroll for nav links =====
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // ===== Render Platforms =====
    const platformsGrid = document.getElementById('platformsGrid');

    function renderPlatforms(category = 'all') {
        const filtered = category === 'all'
            ? PLATFORMS
            : PLATFORMS.filter(p => p.cat === category);

        platformsGrid.innerHTML = filtered.map(p => `
            <a href="${p.url}" target="_blank" rel="noopener" class="platform-card" data-cat="${p.cat}">
                <div class="platform-icon" style="background: ${p.color}">${p.letter}</div>
                <div class="platform-name">${p.name}</div>
                <div class="platform-desc">${p.desc}</div>
                <span class="platform-link">
                    访问
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </span>
            </a>
        `).join('');
    }

    function updateCategoryCounts() {
        const cats = { all: PLATFORMS.length };
        PLATFORMS.forEach(p => { cats[p.cat] = (cats[p.cat] || 0) + 1; });
        document.querySelectorAll('.category-item').forEach(item => {
            const cat = item.dataset.cat;
            if (cat && cat !== 'more' && cats[cat] !== undefined) {
                const span = item.querySelector('.cat-count');
                if (span) span.textContent = cats[cat];
            }
        });
        // Update "全部" count
        const allSpan = document.querySelector('.category-item[data-cat="all"] .cat-count');
        if (allSpan) allSpan.textContent = cats.all;
    }

    renderPlatforms();
    updateCategoryCounts();

    // Category filter
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const cat = item.dataset.cat;
            if (cat === 'more') {
                showToast('更多分类开发中...');
                return;
            }
            renderPlatforms(cat);
        });
    });

    // ===== Render Templates =====
    const templatesGrid = document.getElementById('templatesGrid');
    let currentTab = 'recommend';

    function renderTemplates(tab) {
        const list = TEMPLATES[tab] || TEMPLATES.recommend;
        templatesGrid.innerHTML = list.map(t => {
            const wrapTag = t.url ? 'a' : 'div';
            const urlAttr = t.url ? ` href="${t.url}" target="_blank" rel="noopener"` : '';
            const clickHint = t.url ? ' style="cursor:pointer"' : '';
            return `
            <${wrapTag}${urlAttr} class="template-card"${clickHint}>
                <div class="template-cover" style="background: ${t.gradient}">
                    <span class="template-cover-tag">精选</span>
                    <span class="template-format">${t.type.toUpperCase()}</span>
                    <div class="template-cover-text">${t.cover.replace('\n', '<br>')}</div>
                    ${t.url ? '<span class="template-dl-badge">下载</span>' : ''}
                </div>
                <div class="template-info">
                    <div class="template-title">${t.title}</div>
                    <div class="template-meta">
                        <span>⬇ ${t.size}</span>
                        <span class="template-rating">★ ${t.rating}</span>
                    </div>
                </div>
            </${wrapTag}>
        `}).join('');
    }

    renderTemplates('recommend');

    document.querySelectorAll('.template-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.template-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            if (currentTab === 'more') {
                showToast('更多模板敬请期待...');
                return;
            }
            renderTemplates(currentTab);
        });
    });

    // ===== Render Tools =====
    const toolsGrid = document.getElementById('toolsGrid');

    function renderTools() {
        toolsGrid.innerHTML = TOOLS.map(t => {
            const featuredClass = t.featured ? ' featured' : '';
            const onClick = t.action === 'openMatcher'
                ? 'onclick="window.MatcherUI.open()"' : '';
            return `
                <button class="tool-card${featuredClass}" ${onClick}>
                    <div class="tool-icon" style="background: ${t.color}">
                        ${TOOL_ICONS[t.icon] || TOOL_ICONS.more}
                    </div>
                    <div class="tool-content">
                        <div class="tool-name">${t.name}</div>
                        <div class="tool-desc">${t.desc}</div>
                    </div>
                </button>
            `;
        }).join('');
    }

    renderTools();

    // ===== Platform nav arrows =====
    document.querySelectorAll('.nav-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('更多平台加载中...');
        });
    });

    // ===== Toast helper =====
    function showToast(message, type = '') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }

    window.showToast = showToast;

    // ===== Search box =====
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            showToast(`搜索: ${searchInput.value}`);
        }
    });

    // ===== Cmd+K shortcut =====
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            window.MatcherUI && window.MatcherUI.close();
        }
    });

    // ===== Intersection observer for fade-in =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-header, .platform-card, .template-card, .tool-card').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = (i % 8) * 40 + 'ms';
        observer.observe(el);
    });

    // ===== Hero button actions =====
    document.querySelector('.btn-primary').addEventListener('click', () => {
        document.getElementById('platforms').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelector('.btn-secondary').addEventListener('click', () => {
        showToast('更多介绍正在准备中 ✨');
    });
})();
