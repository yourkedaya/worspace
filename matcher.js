// =================== Table Matcher ===================
(function() {
    'use strict';

    // State
    const state = {
        currentStep: 1,
        tableA: null,        // { name, headers, rows, rawRows }
        tableB: null,        // { name, headers, rows, rawRows }
        cleanA: { trim: true, caseInsensitive: true, dedup: true, removeEmpty: false, numberFormat: true },
        cleanB: { trim: true, caseInsensitive: true, dedup: true, removeEmpty: false, numberFormat: true },
        keyColA: null,
        keyColB: null,
        selectedFields: [],  // columns from B to bring back
        matchMode: 'exact',
        currentPreview: 'A',
        result: null,
    };

    // =================== Data Cleaning ===================
    function cleanValue(val, opts) {
        if (val === null || val === undefined) return '';
        let v = String(val);
        if (opts.trim) v = v.trim();
        if (opts.caseInsensitive) v = v.toLowerCase();
        return v;
    }

    function cleanData(table, opts) {
        if (!table) return null;
        const { headers, rows } = table;
        let cleaned = rows.map(row => {
            const newRow = {};
            headers.forEach((h, i) => {
                newRow[h] = cleanValue(row[h], opts);
            });
            return newRow;
        });

        const dedupCount = cleaned.length;
        const seen = new Set();
        cleaned = cleaned.filter(row => {
            const key = headers.map(h => row[h]).join('|');
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        const removedDup = dedupCount - cleaned.length;

        let emptyCount = 0;
        if (opts.removeEmpty) {
            const before = cleaned.length;
            cleaned = cleaned.filter(row => {
                return headers.some(h => row[h] !== '');
            });
            emptyCount = before - cleaned.length;
        }

        return { rows: cleaned, removedDup, emptyCount };
    }

    // =================== File Parsing ===================
    function parseFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const wb = XLSX.read(data, { type: 'array', cellDates: true });
                    const sheet = wb.Sheets[wb.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
                    if (!json.length) {
                        reject(new Error('文件为空或无法解析'));
                        return;
                    }
                    const headers = Object.keys(json[0]);
                    resolve({
                        name: file.name,
                        headers,
                        rows: json,
                        rowCount: json.length,
                    });
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file);
        });
    }

    // =================== UI Bindings ===================
    const modal = document.getElementById('matcherModal');
    const btnImportA = document.getElementById('btnImportA');
    const btnImportB = document.getElementById('btnImportB');
    const fileA = document.getElementById('fileA');
    const fileB = document.getElementById('fileB');
    const statusA = document.getElementById('statusA');
    const statusB = document.getElementById('statusB');
    const importCardA = document.getElementById('importA');
    const importCardB = document.getElementById('importB');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnClose = document.getElementById('matcherClose');
    const btnRunMatch = document.getElementById('btnRunMatch');
    const btnExport = document.getElementById('btnExport');
    const tablePreview = document.getElementById('tablePreview');
    const fieldPicker = document.getElementById('fieldPicker');
    const keyColA = document.getElementById('keyColA');
    const keyColB = document.getElementById('keyColB');
    const configSummary = document.getElementById('configSummary');
    const resultTable = document.getElementById('resultTable');

    // Open / Close
    window.MatcherUI = {
        open() {
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        },
        close() {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        },
    };

    btnClose.addEventListener('click', () => window.MatcherUI.close());
    modal.querySelector('.modal-backdrop').addEventListener('click', () => window.MatcherUI.close());

    // File import
    btnImportA.addEventListener('click', () => fileA.click());
    btnImportB.addEventListener('click', () => fileB.click());

    fileA.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            statusA.textContent = '正在解析...';
            statusA.className = 'import-status';
            const table = await parseFile(file);
            state.tableA = table;
            statusA.innerHTML = `✓ <strong>${table.name}</strong> · ${table.rowCount} 行 · ${table.headers.length} 列`;
            statusA.className = 'import-status success';
            importCardA.classList.add('loaded');
            checkCanProceed();
        } catch (err) {
            statusA.textContent = '✗ ' + err.message;
            statusA.className = 'import-status';
            statusA.style.color = 'var(--danger)';
        }
    });

    fileB.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            statusB.textContent = '正在解析...';
            statusB.className = 'import-status';
            const table = await parseFile(file);
            state.tableB = table;
            statusB.innerHTML = `✓ <strong>${table.name}</strong> · ${table.rowCount} 行 · ${table.headers.length} 列`;
            statusB.className = 'import-status success';
            importCardB.classList.add('loaded');
            checkCanProceed();
        } catch (err) {
            statusB.textContent = '✗ ' + err.message;
            statusB.className = 'import-status';
            statusB.style.color = 'var(--danger)';
        }
    });

    function checkCanProceed() {
        const canProceed = state.tableA && state.tableB;
        btnNext.disabled = !canProceed;
    }

    // Step navigation
    btnNext.addEventListener('click', () => {
        if (state.currentStep < 4) {
            state.currentStep++;
            goToStep(state.currentStep);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (state.currentStep > 1) {
            state.currentStep--;
            goToStep(state.currentStep);
        }
    });

    function goToStep(step) {
        // Update stepper
        document.querySelectorAll('.step').forEach(s => {
            const sStep = parseInt(s.dataset.step);
            s.classList.remove('active', 'completed');
            if (sStep === step) s.classList.add('active');
            else if (sStep < step) s.classList.add('completed');
        });
        document.querySelectorAll('.step-line').forEach((line, i) => {
            if (i + 1 < step) line.classList.add('completed');
            else line.classList.remove('completed');
        });

        // Update panels
        document.querySelectorAll('.matcher-step').forEach(p => p.classList.remove('active'));
        const panel = document.querySelector(`.matcher-step[data-panel="${step}"]`);
        if (panel) panel.classList.add('active');

        // Step-specific init
        if (step === 2) renderPreview();
        if (step === 3) renderConfig();
        if (step === 4) prepareResult();

        // Buttons
        btnPrev.disabled = step === 1;
        if (step === 4) {
            btnNext.style.display = 'none';
        } else {
            btnNext.style.display = '';
            btnNext.textContent = step === 3 ? '查看结果' : '下一步';
        }
    }

    // =================== Step 2: Preview ===================
    document.querySelectorAll('.clean-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.clean-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.currentPreview = tab.dataset.table;
            renderPreview();
        });
    });

    ['optTrim', 'optCase', 'optDedup', 'optEmpty', 'optNumber'].forEach(id => {
        const el = document.getElementById(id);
        const keyMap = {
            optTrim: 'trim',
            optCase: 'caseInsensitive',
            optDedup: 'dedup',
            optEmpty: 'removeEmpty',
            optNumber: 'numberFormat',
        };
        el.addEventListener('change', () => {
            const cleanObj = state.currentPreview === 'A' ? state.cleanA : state.cleanB;
            cleanObj[keyMap[id]] = el.checked;
            renderPreview();
        });
    });

    function renderPreview() {
        const table = state.currentPreview === 'A' ? state.tableA : state.tableB;
        const opts = state.currentPreview === 'A' ? state.cleanA : state.cleanB;
        if (!table) {
            tablePreview.innerHTML = '<div class="empty-state">暂无数据</div>';
            document.getElementById('cleanStats').innerHTML = '';
            return;
        }

        const { rows, removedDup, emptyCount } = cleanData(table, opts);
        const previewRows = rows.slice(0, 8);

        let html = '<table><thead><tr>';
        table.headers.forEach(h => html += `<th>${h}</th>`);
        html += '</tr></thead><tbody>';
        previewRows.forEach(row => {
            html += '<tr>';
            table.headers.forEach(h => {
                const val = row[h] || '';
                html += `<td>${escapeHtml(val)}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';

        tablePreview.innerHTML = html;

        let stats = `<span>原始 <strong>${table.rowCount}</strong> 行</span>`;
        if (removedDup > 0) stats += `<span style="color: var(--success)">去重 <strong>${removedDup}</strong> 行</span>`;
        if (emptyCount > 0) stats += `<span style="color: var(--warning)">删除空值 <strong>${emptyCount}</strong> 行</span>`;
        stats += `<span>清洗后 <strong>${rows.length}</strong> 行</span>`;
        document.getElementById('cleanStats').innerHTML = stats;
    }

    // =================== Step 3: Config ===================
    function renderConfig() {
        if (!state.tableA || !state.tableB) return;

        // Populate selects
        keyColA.innerHTML = state.tableA.headers.map(h =>
            `<option value="${escapeHtml(h)}">${escapeHtml(h)}</option>`
        ).join('');
        keyColB.innerHTML = state.tableB.headers.map(h =>
            `<option value="${escapeHtml(h)}">${escapeHtml(h)}</option>`
        ).join('');

        // Default selections
        if (!state.keyColA) state.keyColA = state.tableA.headers[0];
        if (!state.keyColB) state.keyColB = state.tableB.headers[0];
        keyColA.value = state.keyColA;
        keyColB.value = state.keyColB;

        // Field picker
        const otherHeaders = state.tableB.headers.filter(h => h !== state.keyColB);
        if (!state.selectedFields.length) {
            state.selectedFields = otherHeaders.slice(0, Math.min(3, otherHeaders.length));
        }

        function renderFieldPicker() {
            fieldPicker.innerHTML = state.tableB.headers.map(h => {
                const isKey = h === state.keyColB;
                const checked = state.selectedFields.includes(h);
                const cls = isKey ? 'disabled' : (checked ? 'checked' : '');
                return `
                    <label class="field-pill ${cls}">
                        <input type="checkbox" data-field="${escapeHtml(h)}"
                            ${checked ? 'checked' : ''} ${isKey ? 'disabled' : ''}>
                        <span>${escapeHtml(h)}</span>
                    </label>
                `;
            }).join('');

            fieldPicker.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    const field = cb.dataset.field;
                    if (cb.checked) {
                        if (!state.selectedFields.includes(field)) state.selectedFields.push(field);
                    } else {
                        state.selectedFields = state.selectedFields.filter(f => f !== field);
                    }
                    renderFieldPicker();
                    updateConfigSummary();
                });
            });
        }

        renderFieldPicker();
        updateConfigSummary();
    }

    keyColA.addEventListener('change', () => {
        state.keyColA = keyColA.value;
        updateConfigSummary();
    });
    keyColB.addEventListener('change', () => {
        state.keyColB = keyColB.value;
        if (!state.selectedFields.includes(state.keyColB)) {
            // Re-render field picker because key column changed
            state.selectedFields = state.tableB.headers
                .filter(h => h !== state.keyColB)
                .slice(0, 3);
        }
        renderConfig();
    });

    document.querySelectorAll('input[name="matchMode"]').forEach(r => {
        r.addEventListener('change', () => {
            state.matchMode = r.value;
            updateConfigSummary();
        });
    });

    function updateConfigSummary() {
        if (!state.tableA || !state.tableB) return;
        const modeMap = { exact: '精确匹配', fuzzy: '模糊匹配', leftjoin: '左连接 (LEFT JOIN)' };
        configSummary.innerHTML = `
            将以主表 <code>${escapeHtml(state.keyColA)}</code> 与副表
            <code>${escapeHtml(state.keyColB)}</code> 进行 <strong>${modeMap[state.matchMode]}</strong>。<br>
            带回字段：${state.selectedFields.length
                ? state.selectedFields.map(f => `<code>${escapeHtml(f)}</code>`).join('、')
                : '<em style="color: var(--warning)">未选择字段</em>'}
        `;
    }

    // =================== Step 4: Result ===================
    function prepareResult() {
        document.getElementById('resultTotal').textContent = state.tableA ? state.tableA.rowCount : 0;
        document.getElementById('resultMatched').textContent = '—';
        document.getElementById('resultUnmatched').textContent = '—';
        document.getElementById('resultRate').textContent = '—';
        btnExport.disabled = true;
        resultTable.innerHTML = '<div class="empty-state">点击"开始匹配"按钮执行匹配</div>';
    }

    btnRunMatch.addEventListener('click', () => {
        if (!state.tableA || !state.tableB) return;
        if (!state.selectedFields.length) {
            showToast('请至少选择一个要带回的字段', 'error');
            return;
        }
        try {
            runMatch();
        } catch (err) {
            showToast('匹配出错: ' + err.message, 'error');
            console.error(err);
        }
    });

    function runMatch() {
        const optsA = state.cleanA;
        const optsB = state.cleanB;

        // Clean both tables
        const cleanAResult = cleanData(state.tableA, optsA);
        const cleanBResult = cleanData(state.tableB, optsB);

        // Build lookup index from B
        const lookup = new Map();
        cleanBResult.rows.forEach(row => {
            const key = row[state.keyColB] || '';
            if (state.matchMode === 'fuzzy') {
                // For fuzzy, we'll check contains during lookup
                if (!lookup.has(key)) lookup.set(key, []);
                lookup.get(key).push(row);
            } else {
                if (!lookup.has(key)) lookup.set(key, []);
                lookup.get(key).push(row);
            }
        });

        // Match A rows
        const resultRows = [];
        let matched = 0;
        let unmatched = 0;

        state.tableA.rows.forEach(row => {
            const keyA = cleanValue(row[state.keyColA], optsA);
            const newRow = { ...row };
            let hit = null;

            if (state.matchMode === 'fuzzy') {
                // Try exact first
                if (lookup.has(keyA) && lookup.get(keyA).length) {
                    hit = lookup.get(keyA)[0];
                } else {
                    // Try contains
                    for (const [k, vals] of lookup) {
                        if (k && keyA && (keyA.includes(k) || k.includes(keyA))) {
                            hit = vals[0];
                            break;
                        }
                    }
                }
            } else {
                // exact or leftjoin - both use direct lookup
                const list = lookup.get(keyA);
                if (list && list.length) hit = list[0];
            }

            state.selectedFields.forEach(f => {
                newRow[f] = hit ? hit[f] : '';
            });
            newRow._matched = !!hit;

            if (hit) matched++;
            else unmatched++;

            resultRows.push(newRow);
        });

        state.result = resultRows;
        renderResult(matched, unmatched);
    }

    function renderResult(matched, unmatched) {
        const total = state.tableA.rowCount;
        const rate = total > 0 ? Math.round((matched / total) * 100) : 0;

        document.getElementById('resultTotal').textContent = total;
        document.getElementById('resultMatched').textContent = matched;
        document.getElementById('resultUnmatched').textContent = unmatched;
        document.getElementById('resultRate').textContent = rate + '%';

        // Render preview table
        const previewRows = state.result.slice(0, 50);
        const headers = Object.keys(state.tableA.rows[0] || {});
        const matchedHeaders = state.selectedFields;

        let html = '<table><thead><tr>';
        headers.forEach(h => html += `<th>${escapeHtml(h)}</th>`);
        matchedHeaders.forEach(h => html += `<th class="matched">${escapeHtml(h)} ↗</th>`);
        html += '</tr></thead><tbody>';

        previewRows.forEach(row => {
            const cls = row._matched ? 'matched' : 'unmatched';
            html += `<tr>`;
            headers.forEach(h => {
                html += `<td>${escapeHtml(String(row[h] || ''))}</td>`;
            });
            matchedHeaders.forEach(h => {
                const v = row[h];
                if (v && String(v).trim()) {
                    html += `<td class="${cls}">${escapeHtml(String(v))}</td>`;
                } else {
                    html += `<td class="unmatched">— 未匹配 —</td>`;
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table>';

        resultTable.innerHTML = html;
        btnExport.disabled = false;
        showToast(`匹配完成: ${matched}/${total} (${rate}%)`, 'success');
    }

    // =================== Export ===================
    btnExport.addEventListener('click', () => {
        if (!state.result || !state.result.length) {
            showToast('暂无可导出的数据', 'error');
            return;
        }
        try {
            // Remove _matched internal field
            const exportData = state.result.map(({ _matched, ...rest }) => rest);
            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, '匹配结果');
            const filename = `匹配结果_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, filename);
            showToast('导出成功 ✓', 'success');
        } catch (err) {
            showToast('导出失败: ' + err.message, 'error');
        }
    });

    // =================== Helpers ===================
    function escapeHtml(s) {
        if (s === null || s === undefined) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();
