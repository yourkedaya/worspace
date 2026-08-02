// =================== Admin Manager ===================
(function() {
    'use strict';

    // ===== Clone data so we don't mutate the original =====
    let platforms = JSON.parse(JSON.stringify(PLATFORMS));
    let templates = JSON.parse(JSON.stringify(TEMPLATES));
    let tools = JSON.parse(JSON.stringify(TOOLS));

    // ===== State =====
    let currentTab = 'platforms';
    let editingPlatformIdx = -1;
    let editingTemplateIdx = -1;
    let editingToolIdx = -1;

    // ===== Tab switching =====
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            document.getElementById('panel-' + currentTab).classList.add('active');
        });
    });

    // =================== Platforms ===================
    function renderPlatforms() {
        document.getElementById('platformCount').textContent = platforms.length;
        const tbody = document.getElementById('platformTableBody');
        if (!platforms.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-row">暂无数据，点击上方按钮添加</td></tr>';
            return;
        }
        tbody.innerHTML = platforms.map((p, i) => `
            <tr>
                <td><div class="mini-platform-icon" style="background:${p.color}">${p.letter}</div></td>
                <td style="font-weight:600;color:var(--text)">${esc(p.name)}</td>
                <td>${esc(p.desc)}</td>
                <td><span class="cat-badge">${catLabel(p.cat)}</span></td>
                <td><span class="link-text">${esc(p.url)}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="Admin.editPlatform(${i})">编辑</button>
                        <button class="btn-delete" onclick="Admin.deletePlatform(${i})">删除</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function catLabel(cat) {
        const map = { ai: 'AI 工具', office: '办公协作', design: '设计创作', dev: '开发编程', ecom: '电商运营', edu: '学习教育' };
        return map[cat] || cat;
    }

    window.Admin = {};

    Admin.editPlatform = function(idx) {
        const p = platforms[idx];
        document.getElementById('platformFormTitle').textContent = '编辑平台';
        document.getElementById('pf-name').value = p.name;
        document.getElementById('pf-desc').value = p.desc;
        document.getElementById('pf-cat').value = p.cat;
        document.getElementById('pf-url').value = p.url;
        document.getElementById('pf-color').value = p.color;
        document.getElementById('pf-colorPicker').value = p.color;
        document.getElementById('pf-letter').value = p.letter;
        document.getElementById('pf-editIndex').value = idx;
        document.getElementById('platformForm').style.display = 'block';
        document.getElementById('platformForm').scrollIntoView({ behavior: 'smooth' });
    };

    Admin.deletePlatform = function(idx) {
        const p = platforms[idx];
        showConfirm(`确定删除「${p.name}」？`, '此操作不可撤销', () => {
            platforms.splice(idx, 1);
            renderPlatforms();
            showToast('已删除');
        });
    };

    document.getElementById('btnAddPlatform').addEventListener('click', () => {
        editingPlatformIdx = -1;
        document.getElementById('platformFormTitle').textContent = '添加平台';
        document.getElementById('pf-name').value = '';
        document.getElementById('pf-desc').value = '';
        document.getElementById('pf-cat').value = 'ai';
        document.getElementById('pf-url').value = '';
        document.getElementById('pf-color').value = '#667eea';
        document.getElementById('pf-colorPicker').value = '#667eea';
        document.getElementById('pf-letter').value = '';
        document.getElementById('pf-editIndex').value = '-1';
        document.getElementById('platformForm').style.display = 'block';
        document.getElementById('platformForm').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btnCancelPlatform').addEventListener('click', () => {
        document.getElementById('platformForm').style.display = 'none';
    });

    document.getElementById('btnSavePlatform').addEventListener('click', () => {
        const name = document.getElementById('pf-name').value.trim();
        const desc = document.getElementById('pf-desc').value.trim();
        const cat = document.getElementById('pf-cat').value;
        const url = document.getElementById('pf-url').value.trim();
        const color = document.getElementById('pf-color').value.trim();
        const letter = document.getElementById('pf-letter').value.trim();
        const idx = parseInt(document.getElementById('pf-editIndex').value);

        if (!name || !cat || !url) {
            showToast('请填写名称、分类和链接', 'error');
            return;
        }

        const platform = { name, desc, cat, url, color: color || '#667eea', letter: letter || name.charAt(0) };

        if (idx >= 0) {
            platforms[idx] = platform;
        } else {
            platforms.push(platform);
        }

        document.getElementById('platformForm').style.display = 'none';
        renderPlatforms();
        showToast(idx >= 0 ? '已更新' : '已添加');
    });

    // Color picker sync
    document.getElementById('pf-color').addEventListener('input', function() {
        document.getElementById('pf-colorPicker').value = this.value;
    });

    // =================== Tools ===================
    function renderTools() {
        document.getElementById('toolCount').textContent = tools.length;
        const tbody = document.getElementById('toolTableBody');
        if (!tools.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-row">暂无数据，点击上方按钮添加</td></tr>';
            return;
        }
        tbody.innerHTML = tools.map((t, i) => `
            <tr>
                <td>
                    <div class="mini-platform-icon" style="background:linear-gradient(135deg, ${t.grad1 || '#667eea'}, ${t.grad2 || '#764ba2'})">
                        ${t.icon === 'table' ? '表' : t.name.charAt(0)}
                    </div>
                </td>
                <td style="font-weight:600;color:var(--text)">
                    ${esc(t.name)}
                    ${t.featured ? ' <span class="featured-badge">推荐</span>' : ''}
                </td>
                <td>${esc(t.desc)}</td>
                <td>${t.featured ? '★' : '—'}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="Admin.editTool(${i})">编辑</button>
                        <button class="btn-delete" onclick="Admin.deleteTool(${i})">删除</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    Admin.editTool = function(idx) {
        const t = tools[idx];
        const parts = (t.color || 'linear-gradient(135deg, #667eea, #764ba2)')
            .replace('linear-gradient(135deg, ', '').replace(')', '')
            .split(',').map(s => s.trim());

        document.getElementById('toolFormTitle').textContent = '编辑工具';
        document.getElementById('tool-name').value = t.name;
        document.getElementById('tool-desc').value = t.desc;
        document.getElementById('tool-icon').value = t.icon;
        document.getElementById('tool-grad1').value = parts[0] || '#667eea';
        document.getElementById('tool-grad2').value = parts[1] || '#764ba2';
        document.getElementById('tool-featured').checked = t.featured;
        document.getElementById('tool-editIndex').value = idx;
        document.getElementById('toolForm').style.display = 'block';
        document.getElementById('toolForm').scrollIntoView({ behavior: 'smooth' });
    };

    Admin.deleteTool = function(idx) {
        const t = tools[idx];
        showConfirm(`确定删除「${t.name}」？`, '此操作不可撤销', () => {
            tools.splice(idx, 1);
            renderTools();
            showToast('已删除');
        });
    };

    document.getElementById('btnAddTool').addEventListener('click', () => {
        editingToolIdx = -1;
        document.getElementById('toolFormTitle').textContent = '添加工具';
        document.getElementById('tool-name').value = '';
        document.getElementById('tool-desc').value = '';
        document.getElementById('tool-icon').value = 'table';
        document.getElementById('tool-grad1').value = '#667eea';
        document.getElementById('tool-grad2').value = '#764ba2';
        document.getElementById('tool-featured').checked = false;
        document.getElementById('tool-editIndex').value = '-1';
        document.getElementById('toolForm').style.display = 'block';
        document.getElementById('toolForm').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btnCancelTool').addEventListener('click', () => {
        document.getElementById('toolForm').style.display = 'none';
    });

    document.getElementById('btnSaveTool').addEventListener('click', () => {
        const name = document.getElementById('tool-name').value.trim();
        const desc = document.getElementById('tool-desc').value.trim();
        const icon = document.getElementById('tool-icon').value;
        const grad1 = document.getElementById('tool-grad1').value.trim();
        const grad2 = document.getElementById('tool-grad2').value.trim();
        const featured = document.getElementById('tool-featured').checked;
        const idx = parseInt(document.getElementById('tool-editIndex').value);

        if (!name) {
            showToast('请填写工具名称', 'error');
            return;
        }

        const tool = {
            name, desc, icon,
            color: `linear-gradient(135deg, ${grad1}, ${grad2})`,
            grad1, grad2,
            featured
        };

        if (idx >= 0) {
            tools[idx] = tool;
        } else {
            tools.push(tool);
        }

        // Ensure only one featured (unless user wants multiple)
        // Just let them do it

        document.getElementById('toolForm').style.display = 'none';
        renderTools();
        showToast(idx >= 0 ? '已更新' : '已添加');
    });

    // =================== Templates ===================
    function renderTemplates() {
        let total = 0;
        Object.values(templates).forEach(arr => total += arr.length);
        document.getElementById('templateCount').textContent = total;

        const container = document.getElementById('templateGroups');
        const tabLabels = {
            recommend: '精选推荐', ppt: 'PPT 模板', word: 'Word 模板',
            excel: 'Excel 模板', resume: '简历模板', ops: '运营模板', design: '设计素材'
        };

        let html = '';
        const tabOrder = ['recommend', 'ppt', 'word', 'excel', 'resume', 'ops', 'design'];

        tabOrder.forEach(tab => {
            const list = templates[tab] || [];
            html += `
                <div class="template-category">
                    <div class="template-cat-header">
                        <h3>${tabLabels[tab] || tab}</h3>
                        <span class="cat-count">${list.length} 个模板</span>
                    </div>
                    <table class="template-table">
                        <thead>
                            <tr>
                                <th width="38%">标题</th>
                                <th width="10%">格式</th>
                                <th width="12%">下载</th>
                                <th width="10%">评分</th>
                                <th width="30%">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${list.length ? list.map((t, i) => `
                                <tr>
                                    <td style="font-weight:600;color:var(--text)">${esc(t.title)}</td>
                                    <td><span class="cat-badge">${t.type.toUpperCase()}</span></td>
                                    <td>${esc(t.size)}</td>
                                    <td>★ ${t.rating}</td>
                                    <td>
                                        <div class="table-actions">
                                            <button class="btn-edit" onclick="Admin.editTemplate('${tab}', ${i})">编辑</button>
                                            <button class="btn-delete" onclick="Admin.deleteTemplate('${tab}', ${i})">删除</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" class="empty-row">暂无模板</td></tr>'}
                        </tbody>
                    </table>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    Admin.editTemplate = function(tab, idx) {
        const t = templates[tab][idx];
        const parts = t.gradient
            .replace('linear-gradient(135deg, ', '').replace(')', '')
            .split(',').map(s => s.trim());

        document.getElementById('templateFormTitle').textContent = '编辑模板';
        document.getElementById('tpl-title').value = t.title;
        document.getElementById('tpl-tab').value = tab;
        document.getElementById('tpl-type').value = t.type;
        document.getElementById('tpl-size').value = t.size;
        document.getElementById('tpl-rating').value = t.rating;
        document.getElementById('tpl-cover').value = t.cover.replace('<br>', '\\n');
        document.getElementById('tpl-grad1').value = parts[0] || '#667eea';
        document.getElementById('tpl-grad2').value = parts[1] || '#764ba2';

        // Store tuple
        document.getElementById('tpl-editIndex').value = JSON.stringify({ tab, idx });
        document.getElementById('templateForm').style.display = 'block';
        document.getElementById('templateForm').scrollIntoView({ behavior: 'smooth' });
    };

    Admin.deleteTemplate = function(tab, idx) {
        const t = templates[tab][idx];
        showConfirm(`确定删除「${t.title}」？`, '此操作不可撤销', () => {
            templates[tab].splice(idx, 1);
            renderTemplates();
            showToast('已删除');
        });
    };

    document.getElementById('btnAddTemplate').addEventListener('click', () => {
        document.getElementById('templateFormTitle').textContent = '添加模板';
        document.getElementById('tpl-title').value = '';
        document.getElementById('tpl-tab').value = 'recommend';
        document.getElementById('tpl-type').value = 'ppt';
        document.getElementById('tpl-size').value = '1k';
        document.getElementById('tpl-rating').value = '4.5';
        document.getElementById('tpl-cover').value = '新模板';
        document.getElementById('tpl-grad1').value = '#667eea';
        document.getElementById('tpl-grad2').value = '#764ba2';
        document.getElementById('tpl-editIndex').value = '-1';
        document.getElementById('templateForm').style.display = 'block';
        document.getElementById('templateForm').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('btnCancelTemplate').addEventListener('click', () => {
        document.getElementById('templateForm').style.display = 'none';
    });

    document.getElementById('btnSaveTemplate').addEventListener('click', () => {
        const title = document.getElementById('tpl-title').value.trim();
        const tab = document.getElementById('tpl-tab').value;
        const type = document.getElementById('tpl-type').value;
        const size = document.getElementById('tpl-size').value.trim();
        const rating = parseFloat(document.getElementById('tpl-rating').value) || 4.5;
        const cover = document.getElementById('tpl-cover').value.trim().replace(/\\n/g, '\n');
        const grad1 = document.getElementById('tpl-grad1').value.trim();
        const grad2 = document.getElementById('tpl-grad2').value.trim();
        const editData = document.getElementById('tpl-editIndex').value;

        if (!title) {
            showToast('请填写模板标题', 'error');
            return;
        }

        const tpl = {
            title, type, size, rating,
            gradient: `linear-gradient(135deg, ${grad1}, ${grad2})`,
            cover
        };

        if (editData !== '-1') {
            const { tab: oldTab, idx } = JSON.parse(editData);
            if (oldTab === tab) {
                templates[tab][idx] = tpl;
            } else {
                templates[oldTab].splice(idx, 1);
                templates[tab].push(tpl);
            }
        } else {
            if (!templates[tab]) templates[tab] = [];
            templates[tab].push(tpl);
        }

        document.getElementById('templateForm').style.display = 'none';
        renderTemplates();
        showToast('已保存');
    });

    // =================== Export ===================
    document.getElementById('btnExport').addEventListener('click', () => {
        const content = generateDataJS();
        downloadFile(content, 'data.js', 'application/javascript');
        showToast('data.js 已下载！替换项目中的 js/data.js 然后重新部署', 'success');
    });

    document.getElementById('btnExportJSON').addEventListener('click', () => {
        const data = { PLATFORMS: platforms, TEMPLATES: templates, TOOLS: tools };
        const json = JSON.stringify(data, null, 2);
        const filename = `workbench-backup-${new Date().toISOString().slice(0, 10)}.json`;
        downloadFile(json, filename, 'application/json');
        showToast('JSON 备份已下载 ✨');
    });

    // =================== Import ===================
    const importInput = document.getElementById('importFileInput');
    document.getElementById('btnImport').addEventListener('click', () => {
        importInput.click();
    });

    importInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            if (data.PLATFORMS && Array.isArray(data.PLATFORMS)) {
                platforms = data.PLATFORMS;
            }
            if (data.TEMPLATES && typeof data.TEMPLATES === 'object') {
                templates = data.TEMPLATES;
            }
            if (data.TOOLS && Array.isArray(data.TOOLS)) {
                tools = data.TOOLS;
            }

            renderPlatforms();
            renderTemplates();
            renderTools();
            showToast(`导入成功：${platforms.length} 平台 · ${countTemplates()} 模板 · ${tools.length} 工具`, 'success');
        } catch (err) {
            showToast('导入失败：JSON 格式不正确', 'error');
            console.error(err);
        }
        importInput.value = '';
    });

    function countTemplates() {
        let total = 0;
        Object.values(templates).forEach(arr => total += arr.length);
        return total;
    }

    // =================== Generate data.js ===================
    function generateDataJS() {
        // Clean up internal fields before export
        const cleanPlatforms = platforms.map(p => ({
            name: p.name, desc: p.desc, cat: p.cat, color: p.color, letter: p.letter, url: p.url
        }));

        const cleanTools = tools.map(t => {
            const parts = (t.color || 'linear-gradient(135deg, #667eea, #764ba2)')
                .replace('linear-gradient(135deg, ', '').replace(')', '')
                .split(',').map(s => s.trim());
            return {
                name: t.name, desc: t.desc, icon: t.icon,
                color: `linear-gradient(135deg, ${parts[0] || '#667eea'}, ${parts[1] || '#764ba2'})`,
                featured: t.featured || false
            };
        });

        const cleanTemplates = {};
        Object.keys(templates).forEach(key => {
            cleanTemplates[key] = templates[key].map(t => ({
                title: t.title, type: t.type, size: t.size, rating: t.rating, gradient: t.gradient, cover: t.cover
            }));
        });

        return `// 平台导航数据
const PLATFORMS = ${JSON.stringify(cleanPlatforms, null, 2)};

// 模板数据
const TEMPLATES = ${JSON.stringify(cleanTemplates, null, 2)};

// 工具数据
const TOOLS = ${JSON.stringify(cleanTools, null, 2)};

// 工具图标 SVG
const TOOL_ICONS = ${JSON.stringify(TOOL_ICONS, null, 2)};
`;
    }

    // =================== Helpers ===================
    function downloadFile(content, filename, mime) {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function esc(s) {
        if (s === null || s === undefined) return '';
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function showToast(message, type = '') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
    }

    function showConfirm(title, desc, onConfirm) {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-box">
                <h3>${esc(title)}</h3>
                <p>${esc(desc)}</p>
                <div class="confirm-actions">
                    <button class="btn btn-ghost cancel-btn">取消</button>
                    <button class="btn btn-danger confirm-btn" style="background:var(--danger);color:white">确认删除</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);

        dialog.querySelector('.cancel-btn').addEventListener('click', () => dialog.remove());
        dialog.querySelector('.confirm-btn').addEventListener('click', () => {
            dialog.remove();
            onConfirm();
        });
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.remove();
        });
    }

    // ===== Init =====
    renderPlatforms();
    renderTemplates();
    renderTools();

})();
