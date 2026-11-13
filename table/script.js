/**
 * ═══════════════════════════════════════════════════════════════
 * TABLE HUB STUDIO - ENGINE & INTERACTIVITY
 * Author: Hamza Gamal (https://hamza-gamal.github.io/portfolio)
 * Highlights:
 *   - Freely resizable table container (like <textarea> with corner grip)
 *   - Interactive column & row drag-to-resize on borders
 *   - Clean tables (no # index column, no bulky add buttons)
 *   - Seamless Tab/Enter auto-row generation
 *   - Zero native browser alert/confirm popups (custom glass modal)
 *   - Balanced Red & Black palette (neutral darks + electric red)
 *   - Bilingual EN (default) / AR with real-time switching
 *   - Excel-ready CSV export with UTF-8 BOM
 * ═══════════════════════════════════════════════════════════════
 */

// ── Translation Dictionary ──
const I18N = {
  en: {
    appTitle: "Table Hub",
    searchPlaceholder: "Search table cells...",
    addOneTable: "+1 Table",
    removeOneTable: "-1 Table",
    activeCopies: "Tables:",
    singleTable: "1 Table",
    multiTables: "{n} Tables",
    hintResizeBox: "Resize table freely from bottom corner",
    hintResize: "Drag column borders",
    hintAutoSave: "Instant auto-save",
    tableDefaultTitle: "Table {n}",
    colDefault: "Column {n}",
    duplicate: "Duplicate Table",
    clear: "Clear Table Data",
    exportCsv: "Export to CSV",
    print: "Print / PDF",
    deleteCol: "Delete Column",
    deleteRow: "Delete Row",
    toastSaved: "Auto-saved",
    toastAdded: "Table {n} created",
    toastRemoved: "Table {n} removed",
    toastCsv: "Exported '{name}.csv'",
    toastJson: "All tables exported to JSON",
    confirmClearTitle: "Clear Table",
    confirmClearMsg: "Clear all cell values in '{name}'?",
    confirmResetTitle: "Reset Tables",
    confirmResetMsg: "Reset to 1 table only? Additional copies will be removed.",
    confirmDelColTitle: "Delete Column",
    confirmDelColMsg: "Delete this column and all its data?",
    confirmBtn: "Confirm",
    cancelBtn: "Cancel",
    langSwitch: "العربية"
  },
  ar: {
    appTitle: "جدول",
    searchPlaceholder: "بحث في خلايا الجدول...",
    addOneTable: "+1 جدول",
    removeOneTable: "-1 جدول",
    activeCopies: "الجداول:",
    singleTable: "جدول واحد",
    multiTables: "{n} جداول",
    hintResizeBox: "اسحب وكبر الجدول بحرية من الزاوية السفلية",
    hintResize: "اسحب حدود الأعمدة لتعديل العرض",
    hintAutoSave: "حفظ فوري تلقائي",
    tableDefaultTitle: "جدول {n}",
    colDefault: "عمود {n}",
    duplicate: "نسخ الجدول",
    clear: "تفريغ محتوى الجدول",
    exportCsv: "تصدير ملف CSV",
    print: "طباعة / PDF",
    deleteCol: "حذف العمود",
    deleteRow: "حذف الصف",
    toastSaved: "تم الحفظ تلقائياً",
    toastAdded: "تم إضافة جدول {n}",
    toastRemoved: "تم حذف جدول {n}",
    toastCsv: "تم تصدير '{name}.csv'",
    toastJson: "تم تصدير كافة الجداول كملف JSON",
    confirmClearTitle: "تفريغ الجدول",
    confirmClearMsg: "هل أنت متأكد من تفريغ كافة بيانات '{name}'؟",
    confirmResetTitle: "إعادة الضبط",
    confirmResetMsg: "هل تريد العودة لجدول واحد فقط وحذف النسخ الإضافية؟",
    confirmDelColTitle: "حذف العمود",
    confirmDelColMsg: "هل تريد حذف هذا العمود بالكامل؟",
    confirmBtn: "تأكيد",
    cancelBtn: "إلغاء",
    langSwitch: "English"
  }
};

// ── Application State ──
const AppState = {
  // Defaults: English LTR + Dark Mode
  lang: localStorage.getItem("table_hub_lang") || "en",
  theme: localStorage.getItem("table_hub_theme") || "dark",
  viewMode: "tabs", // 'tabs' or 'grid'
  activeTableId: 1,
  tables: [],
  searchQuery: ""
};

// Default table template
function createInitialTable(id, num) {
  const isAr = AppState.lang === "ar";
  return {
    id: id,
    title: isAr ? `جدول ${num}` : `Table ${num}`,
    boxWidth: "",
    boxHeight: "",
    colWidths: [200, 180, 160, 160],
    rowHeights: [],
    columns: isAr
      ? ["الاسم / المهمة", "النوع", "الحالة", "الأولوية"]
      : ["Item / Task", "Category", "Status", "Priority"],
    rows: isAr
      ? [
          ["تصميم واجهة المستخدم", "تطوير", "مكتمل", "عالي"],
          ["تكبير الجدول من الزاوية", "ميزة", "مكتمل", "عالي"],
          ["الوضع المظلم أحمر وأسود", "تصميم", "مكتمل", "متوسط"],
          ["تصدير ملفات Excel", "بيانات", "مكتمل", "عالي"]
        ]
      : [
          ["Red & Black Luxury Theme", "UI Design", "Completed", "High"],
          ["Corner Resize Handle", "Feature", "Ready", "High"],
          ["Drag-to-Resize Column Borders", "UX Polish", "Ready", "Urgent"],
          ["Excel & UTF-8 CSV Export", "Feature", "Completed", "Normal"]
        ]
  };
}

// ── Initialize App ──
document.addEventListener("DOMContentLoaded", () => {
  initCopyright();
  loadData();
  applyLanguage(AppState.lang, false);
  applyTheme(AppState.theme, false);
  bindEvents();
  renderApp();
});

function initCopyright() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
}

function loadData() {
  const saved = localStorage.getItem("table_hub_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.tables = parsed;
        AppState.activeTableId = AppState.tables[0].id;
        return;
      }
    } catch (e) {
      console.warn("Resetting tables to default", e);
    }
  }
  AppState.tables = [createInitialTable(1, 1)];
  AppState.activeTableId = 1;
}

function saveData(silent = false) {
  localStorage.setItem("table_hub_data", JSON.stringify(AppState.tables));
  if (!silent) {
    showToast(I18N[AppState.lang].toastSaved, "check");
  }
}

// ── Language Toggle (EN / AR) ──
function applyLanguage(lang, shouldRender = true) {
  AppState.lang = lang;
  localStorage.setItem("table_hub_lang", lang);

  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // Static translations
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (I18N[lang][key]) el.placeholder = I18N[lang][key];
  });

  // Language button label
  const langBtnText = document.getElementById("langBtnText");
  if (langBtnText) langBtnText.textContent = I18N[lang].langSwitch;

  if (shouldRender) renderApp();
}

function toggleLanguage() {
  const nextLang = AppState.lang === "en" ? "ar" : "en";
  applyLanguage(nextLang, true);
}

// ── Theme Toggle (Dark / Light) ──
function applyTheme(theme, save = true) {
  AppState.theme = theme;
  if (save) localStorage.setItem("table_hub_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const nextTheme = AppState.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
}

// ── Event Bindings ──
function bindEvents() {
  document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);
  document.getElementById("langToggleBtn")?.addEventListener("click", toggleLanguage);
  document.getElementById("viewToggleBtn")?.addEventListener("click", toggleViewMode);
  document.getElementById("exportAllBtn")?.addEventListener("click", exportAllJSON);

  // Search
  const searchInput = document.getElementById("globalSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  searchInput?.addEventListener("input", (e) => {
    AppState.searchQuery = e.target.value.trim().toLowerCase();
    if (clearBtn) clearBtn.style.display = AppState.searchQuery ? "block" : "none";
    filterTableCells();
  });

  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    AppState.searchQuery = "";
    clearBtn.style.display = "none";
    filterTableCells();
  });

  // Scaling Controls (+1 / -1 / Reset)
  document.getElementById("addTableBtn")?.addEventListener("click", () => addTable());
  document.getElementById("quickAddTabBtn")?.addEventListener("click", () => addTable());
  document.getElementById("removeTableBtn")?.addEventListener("click", () => removeLastTable());
  document.getElementById("resetTablesBtn")?.addEventListener("click", () => resetAllTables());
}

// ── View Mode (Tabs vs Grid) ──
function toggleViewMode() {
  AppState.viewMode = AppState.viewMode === "tabs" ? "grid" : "tabs";
  renderApp();
}

// ── Table Scaling (+1 / -1) ──
function addTable(clonedData = null) {
  const nextId =
    AppState.tables.length > 0
      ? Math.max(...AppState.tables.map((t) => t.id)) + 1
      : 1;
  const nextNum = AppState.tables.length + 1;

  const newTable = clonedData
    ? {
        ...clonedData,
        id: nextId,
        title: clonedData.title + (AppState.lang === "ar" ? " (نسخة)" : " (Copy)")
      }
    : createInitialTable(nextId, nextNum);

  AppState.tables.push(newTable);
  AppState.activeTableId = nextId;

  saveData(true);
  renderApp();
  showToast(I18N[AppState.lang].toastAdded.replace("{n}", nextNum), "plus");
}

function removeLastTable() {
  if (AppState.tables.length <= 1) return;

  const target = AppState.tables[AppState.tables.length - 1];
  const targetNum = AppState.tables.length;

  AppState.tables.pop();
  if (AppState.activeTableId === target.id) {
    AppState.activeTableId = AppState.tables[AppState.tables.length - 1].id;
  }

  saveData(true);
  renderApp();
  showToast(I18N[AppState.lang].toastRemoved.replace("{n}", targetNum), "trash");
}

function removeTableById(tableId) {
  if (AppState.tables.length <= 1) return;

  const idx = AppState.tables.findIndex((t) => t.id === tableId);
  if (idx === -1) return;

  AppState.tables.splice(idx, 1);
  if (AppState.activeTableId === tableId) {
    AppState.activeTableId = AppState.tables[Math.max(0, idx - 1)].id;
  }

  saveData(true);
  renderApp();
}

function resetAllTables() {
  openCustomModal(
    I18N[AppState.lang].confirmResetTitle,
    I18N[AppState.lang].confirmResetMsg,
    () => {
      AppState.tables = [createInitialTable(1, 1)];
      AppState.activeTableId = 1;
      saveData(true);
      renderApp();
    }
  );
}

function duplicateCurrentTable(tableId) {
  const source = AppState.tables.find((t) => t.id === tableId);
  if (!source) return;
  const clone = JSON.parse(JSON.stringify(source));
  addTable(clone);
}

function clearCurrentTable(tableId) {
  const table = AppState.tables.find((t) => t.id === tableId);
  if (!table) return;

  openCustomModal(
    I18N[AppState.lang].confirmClearTitle,
    I18N[AppState.lang].confirmClearMsg.replace("{name}", table.title),
    () => {
      table.rows = table.rows.map((row) => row.map(() => ""));
      saveData(true);
      renderApp();
    }
  );
}

// ── Rendering Engine ──
function renderApp() {
  renderTabs();
  renderTables();
  updateSummaryStrip();
}

function renderTabs() {
  const container = document.getElementById("tabsContainer");
  if (!container) return;

  container.innerHTML = "";

  AppState.tables.forEach((table, idx) => {
    const tab = document.createElement("div");
    tab.className = `tab-item ${table.id === AppState.activeTableId ? "active" : ""}`;
    tab.innerHTML = `
      <span class="tab-name">${escapeHtml(table.title || `Table ${idx + 1}`)}</span>
      ${
        AppState.tables.length > 1
          ? `<i class="fa-solid fa-xmark tab-close-x" title="Close" data-id="${table.id}"></i>`
          : ""
      }
    `;

    tab.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-close-x")) return;
      AppState.activeTableId = table.id;
      if (AppState.viewMode === "grid") AppState.viewMode = "tabs";
      renderApp();
    });

    const closeBtn = tab.querySelector(".tab-close-x");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeTableById(table.id);
      });
    }

    container.appendChild(tab);
  });
}

function renderTables() {
  const workspace = document.getElementById("mainWorkspace");
  if (!workspace) return;

  workspace.innerHTML = "";
  workspace.className =
    AppState.viewMode === "grid"
      ? "main-workspace workspace-grid"
      : "main-workspace";

  const visibleTables =
    AppState.viewMode === "grid"
      ? AppState.tables
      : AppState.tables.filter((t) => t.id === AppState.activeTableId);

  if (visibleTables.length === 0 && AppState.tables.length > 0) {
    AppState.activeTableId = AppState.tables[0].id;
    visibleTables.push(AppState.tables[0]);
  }

  visibleTables.forEach((table, index) => {
    const card = buildTableCard(table, index + 1);
    workspace.appendChild(card);
  });

  if (AppState.searchQuery) {
    filterTableCells();
  }
}

// Build a clean, spacious Table Card
function buildTableCard(table, displayIndex) {
  const card = document.createElement("div");
  card.className = "table-card";
  card.id = `table-card-${table.id}`;

  const lang = AppState.lang;
  const i18n = I18N[lang];

  const boxStyle = [];
  if (table.boxWidth) boxStyle.push(`width: ${table.boxWidth}`);
  if (table.boxHeight) boxStyle.push(`height: ${table.boxHeight}`);

  card.innerHTML = `
    <!-- Card Header -->
    <div class="card-header">
      <div class="card-title-group">
        <span class="card-table-badge">#${displayIndex}</span>
        <input 
          type="text" 
          class="card-table-title" 
          value="${escapeHtml(table.title)}" 
          placeholder="${i18n.tableDefaultTitle.replace("{n}", displayIndex)}" 
          data-table-id="${table.id}"
        />
      </div>

      <div class="card-actions-group">
        <!-- Duplicate -->
        <button class="tool-icon-btn" data-action="duplicate" data-table-id="${table.id}" title="${i18n.duplicate}">
          <i class="fa-solid fa-copy"></i>
        </button>

        <!-- Export CSV -->
        <button class="tool-icon-btn" data-action="export-csv" data-table-id="${table.id}" title="${i18n.exportCsv}">
          <i class="fa-solid fa-file-csv"></i>
        </button>

        <!-- Print -->
        <button class="tool-icon-btn" data-action="print" data-table-id="${table.id}" title="${i18n.print}">
          <i class="fa-solid fa-print"></i>
        </button>

        <!-- Clear Table -->
        <button class="tool-icon-btn btn-danger" data-action="clear" data-table-id="${table.id}" title="${i18n.clear}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>

    <!-- Freely Resizable Table Container (Like Textarea with Corner Grip) -->
    <div class="table-resizable-wrap" style="${boxStyle.join("; ")}" data-table-id="${table.id}">
      <table class="interactive-table" data-table-id="${table.id}">
        <thead>
          <tr>
            ${table.columns
              .map((colName, colIdx) => {
                const colW = table.colWidths && table.colWidths[colIdx] ? table.colWidths[colIdx] : 180;
                return `
              <th data-col-idx="${colIdx}" style="width: ${colW}px;">
                <div class="th-inner">
                  <span class="th-text" contenteditable="true" spellcheck="false">${escapeHtml(colName)}</span>
                  ${
                    table.columns.length > 1
                      ? `<button class="th-del-btn" title="${i18n.deleteCol}" data-col-idx="${colIdx}"><i class="fa-solid fa-xmark"></i></button>`
                      : ""
                  }
                </div>
                <!-- Interactive Drag-to-Resize Column Handle -->
                <div class="col-resize-handle" data-col-idx="${colIdx}"></div>
              </th>`;
              })
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${table.rows
            .map((row, rowIdx) => {
              const rowH = table.rowHeights && table.rowHeights[rowIdx] ? `style="height: ${table.rowHeights[rowIdx]}px;"` : "";
              return `
            <tr data-row-idx="${rowIdx}" ${rowH}>
              ${row
                .map(
                  (val, colIdx) => `
                <td contenteditable="true" spellcheck="false" data-row="${rowIdx}" data-col="${colIdx}">${escapeHtml(val)}</td>`
                )
                .join("")}
              <!-- Interactive Drag-to-Resize Row Handle -->
              <div class="row-resize-handle" data-row-idx="${rowIdx}"></div>
            </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  attachTableCardEvents(card, table);
  return card;
}

// ── Attach Events inside Table Card ──
function attachTableCardEvents(card, table) {
  // Title Edit
  const titleInput = card.querySelector(".card-table-title");
  titleInput?.addEventListener("input", (e) => {
    table.title = e.target.value;
    updateTabLabel(table.id, table.title);
    saveData(true);
  });

  // Action Buttons
  card.querySelectorAll(".tool-icon-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-action");
      if (act === "duplicate") duplicateCurrentTable(table.id);
      if (act === "clear") clearCurrentTable(table.id);
      if (act === "export-csv") exportSingleCSV(table.id);
      if (act === "print") window.print();
    });
  });

  // Free Resize Container: Persist Width and Height on mouseup
  const resizableWrap = card.querySelector(".table-resizable-wrap");
  resizableWrap?.addEventListener("mouseup", () => {
    table.boxWidth = resizableWrap.style.width;
    table.boxHeight = resizableWrap.style.height;
    saveData(true);
  });

  // Delete Column
  card.querySelectorAll(".th-del-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const colIdx = Number(btn.getAttribute("data-col-idx"));
      if (table.columns.length <= 1) return;

      openCustomModal(
        I18N[AppState.lang].confirmDelColTitle,
        I18N[AppState.lang].confirmDelColMsg,
        () => {
          table.columns.splice(colIdx, 1);
          if (table.colWidths) table.colWidths.splice(colIdx, 1);
          table.rows.forEach((r) => r.splice(colIdx, 1));
          saveData(true);
          renderApp();
        }
      );
    });
  });

  // Column Header Title Edit
  card.querySelectorAll(".th-text").forEach((thText) => {
    thText.addEventListener("blur", () => {
      const th = thText.closest("th");
      const colIdx = Number(th.getAttribute("data-col-idx"));
      table.columns[colIdx] = thText.textContent.trim() || `Col ${colIdx + 1}`;
      saveData(true);
    });
  });

  // Cell Edit & Arrow/Tab Navigation
  card.querySelectorAll("tbody td[contenteditable='true']").forEach((td) => {
    td.addEventListener("input", () => {
      const r = Number(td.getAttribute("data-row"));
      const c = Number(td.getAttribute("data-col"));
      if (table.rows[r]) {
        table.rows[r][c] = td.textContent;
        saveData(true);
      }
    });

    td.addEventListener("keydown", (e) => {
      const r = Number(td.getAttribute("data-row"));
      const c = Number(td.getAttribute("data-col"));

      // Enter moves to cell below (or adds new row seamlessly if on last row!)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (r + 1 < table.rows.length) {
          const nextCell = card.querySelector(`td[data-row="${r + 1}"][data-col="${c}"]`);
          if (nextCell) nextCell.focus();
        } else {
          // Bottom of table: Add new row seamlessly
          const emptyRow = new Array(table.columns.length).fill("");
          table.rows.push(emptyRow);
          saveData(true);
          renderApp();
          setTimeout(() => {
            const newCell = document.querySelector(`td[data-row="${r + 1}"][data-col="${c}"]`);
            if (newCell) newCell.focus();
          }, 30);
        }
      }

      // Tab on very last cell adds next row seamlessly
      if (e.key === "Tab" && !e.shiftKey && r === table.rows.length - 1 && c === table.columns.length - 1) {
        e.preventDefault();
        const emptyRow = new Array(table.columns.length).fill("");
        table.rows.push(emptyRow);
        saveData(true);
        renderApp();
        setTimeout(() => {
          const firstCellNextRow = document.querySelector(`td[data-row="${r + 1}"][data-col="0"]`);
          if (firstCellNextRow) firstCellNextRow.focus();
        }, 30);
      }
    });
  });

  // ── Drag-to-Resize Column Borders ──
  setupColumnResize(card, table);

  // ── Drag-to-Resize Row Borders ──
  setupRowResize(card, table);
}

// ── Interactive Drag-to-Resize Columns ──
function setupColumnResize(card, table) {
  const handles = card.querySelectorAll(".col-resize-handle");
  const isRtl = document.documentElement.dir === "rtl";

  handles.forEach((handle) => {
    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const colIdx = Number(handle.getAttribute("data-col-idx"));
      const th = handle.closest("th");
      const startX = e.pageX;
      const startWidth = th.offsetWidth;

      handle.classList.add("resizing");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      function onMouseMove(moveEvent) {
        const delta = isRtl
          ? startX - moveEvent.pageX
          : moveEvent.pageX - startX;
        const newWidth = Math.max(70, startWidth + delta);

        th.style.width = `${newWidth}px`;
        if (!table.colWidths) table.colWidths = [];
        table.colWidths[colIdx] = newWidth;
      }

      function onMouseUp() {
        handle.classList.remove("resizing");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        saveData(true);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
}

// ── Interactive Drag-to-Resize Rows ──
function setupRowResize(card, table) {
  const handles = card.querySelectorAll(".row-resize-handle");

  handles.forEach((handle) => {
    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const rowIdx = Number(handle.getAttribute("data-row-idx"));
      const tr = handle.closest("tr");
      const startY = e.pageY;
      const startHeight = tr.offsetHeight;

      handle.classList.add("resizing");
      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";

      function onMouseMove(moveEvent) {
        const delta = moveEvent.pageY - startY;
        const newHeight = Math.max(32, startHeight + delta);

        tr.style.height = `${newHeight}px`;
        if (!table.rowHeights) table.rowHeights = [];
        table.rowHeights[rowIdx] = newHeight;
      }

      function onMouseUp() {
        handle.classList.remove("resizing");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        saveData(true);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
}

function updateTabLabel(tableId, title) {
  const tabs = document.querySelectorAll(".tab-item");
  AppState.tables.forEach((t, i) => {
    if (t.id === tableId && tabs[i]) {
      const name = tabs[i].querySelector(".tab-name");
      if (name) name.textContent = title || `Table ${i + 1}`;
    }
  });
}

function updateSummaryStrip() {
  const count = AppState.tables.length;
  const numEl = document.getElementById("activeCountNumber");
  if (numEl) numEl.textContent = count;

  const removeBtn = document.getElementById("removeTableBtn");
  if (removeBtn) removeBtn.disabled = count <= 1;
}

// ── Search & Filter ──
function filterTableCells() {
  const q = AppState.searchQuery;
  const cards = document.querySelectorAll(".table-card");

  cards.forEach((card) => {
    card.querySelectorAll("tbody tr").forEach((row) => {
      if (!q) {
        row.style.display = "";
        row.querySelectorAll("td").forEach((td) => (td.style.backgroundColor = ""));
        return;
      }

      let matched = false;
      row.querySelectorAll("td[contenteditable='true']").forEach((td) => {
        const txt = td.textContent.toLowerCase();
        if (txt.includes(q)) {
          matched = true;
          td.style.backgroundColor = "var(--table-cell-focus)";
        } else {
          td.style.backgroundColor = "";
        }
      });

      row.style.display = matched ? "" : "none";
    });
  });
}

// ── Export CSV (UTF-8 BOM for 100% Excel Arabic support) ──
function exportSingleCSV(tableId) {
  const table = AppState.tables.find((t) => t.id === tableId);
  if (!table) return;

  const escapeVal = (v) => {
    if (v === null || v === undefined) return '""';
    const s = String(v).replace(/"/g, '""');
    return `"${s}"`;
  };

  const header = table.columns.map(escapeVal).join(",");
  const body = table.rows.map((row) => row.map(escapeVal).join(","));
  const csvText = [header, ...body].join("\r\n");

  // UTF-8 BOM (\uFEFF) ensures Excel renders Arabic text properly!
  const blob = new Blob(["\uFEFF" + csvText], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const cleanName = (table.title || "Table").replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_");

  a.href = url;
  a.download = `${cleanName}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(I18N[AppState.lang].toastCsv.replace("{name}", cleanName), "download");
}

function exportAllJSON() {
  const str = JSON.stringify(AppState.tables, null, 2);
  const blob = new Blob([str], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `TableHub_All_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(I18N[AppState.lang].toastJson, "download");
}

// ── Custom Glassmorphism Confirmation Modal (Zero Native Alerts) ──
function openCustomModal(title, message, onConfirm) {
  const modal = document.getElementById("customModal");
  const titleEl = document.getElementById("modalTitle");
  const msgEl = document.getElementById("modalMessage");
  const confirmBtn = document.getElementById("modalConfirmBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");

  if (!modal || !titleEl || !msgEl || !confirmBtn || !cancelBtn) return;

  titleEl.textContent = title;
  msgEl.textContent = message;
  confirmBtn.textContent = I18N[AppState.lang].confirmBtn;
  cancelBtn.textContent = I18N[AppState.lang].cancelBtn;

  modal.style.display = "flex";

  const close = () => {
    modal.style.display = "none";
    confirmBtn.onclick = null;
    cancelBtn.onclick = null;
  };

  confirmBtn.onclick = () => {
    close();
    if (onConfirm) onConfirm();
  };

  cancelBtn.onclick = () => {
    close();
  };
}

// ── Floating Toast Stack ──
function showToast(msg, iconType = "check") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-pill";

  let icon = "fa-solid fa-circle-check";
  if (iconType === "plus") icon = "fa-solid fa-plus";
  if (iconType === "trash") icon = "fa-solid fa-trash-can";
  if (iconType === "download") icon = "fa-solid fa-file-arrow-down";

  toast.innerHTML = `<i class="${icon}" style="color: var(--accent-red);"></i> <span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 2000);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
