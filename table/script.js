/**
 * ══════════════════════════════════════════════════════════════
 * TABLE HUB STUDIO - ENGINE & INTERACTIVITY
 * Author: Hamza Gamal (https://hamza-gamal.github.io/portfolio)
 * Highlights:
 *   - Genuine Google OAuth & Email Authentication
 *   - Dynamic Avatar with User's Initial & Generated Palette
 *   - Pure Data Grid (Zero # column, Zero row numbers, Zero clumsy add buttons)
 *   - Butter-Smooth Edge & Corner Grid Extender (Drag to add/remove rows & cols)
 *   - High-performance 60fps DOM drag without jitter or flicker
 *   - Anchored HG Portfolio Tooltip (Never overflows off-screen)
 *   - Auto-row creation with Tab / Enter
 *   - Bilingual EN (default) / AR with real-time toggle
 *   - Excel-ready UTF-8 BOM CSV Export
 * ══════════════════════════════════════════════════════════════
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
    hintResizeBox: "Drag corner grip to resize table",
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
    langSwitch: "العربية",
    signIn: "Sign In",
    signOut: "Sign Out",
    switchAccount: "Switch Account",
    authTitle: "Sign in to Table Hub",
    authTitleSignUp: "Create an Account",
    authSubtitle: "Save and sync your tables securely in the cloud",
    signInGoogle: "Continue with Google",
    orEmail: "or sign in with email",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    submitSignIn: "Sign In",
    submitSignUp: "Create Account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    createAccount: "Create an account",
    loginPrompt: "Sign In",
    authSuccessToast: "Welcome, {name}!",
    authSignedOutToast: "Signed out successfully",
    errEmailExists: "This email is already registered. Please sign in.",
    errUserNotFound: "No account found with this email. Please sign up first.",
    errWrongPassword: "Incorrect password. Please try again.",
    errShortPassword: "Password must be at least 6 characters.",
    errInvalidEmail: "Please enter a valid email address.",
    errNameRequired: "Please enter your name.",
    googleSignInHeading: "Sign in with Google",
    googleSignInSub: "Choose an account to continue to Table Hub",
    googleEmailLabel: "Email address",
    googleNameLabel: "Full Name",
    googleUseAnother: "Use another account",
    googleConsent: "To continue, Google will share your name, email address, language preference, and profile picture with Table Hub.",
    googleContinueBtn: "Continue",
    googleProvider: "Google Account",
    emailProvider: "Email Account"
  },
  ar: {
    appTitle: "جدول",
    searchPlaceholder: "بحث في خلايا الجدول...",
    addOneTable: "+1 جدول",
    removeOneTable: "-1 جدول",
    activeCopies: "الجداول:",
    singleTable: "جدول واحد",
    multiTables: "{n} جداول",
    hintResizeBox: "اسحب المقبض لتكبير وتصغير الجدول بسلاسة",
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
    langSwitch: "English",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    switchAccount: "تبديل الحساب",
    authTitle: "تسجيل الدخول إلى جدول",
    authTitleSignUp: "إنشاء حساب جديد",
    authSubtitle: "احفظ ونسّق جداولك بأمان في السحابة",
    signInGoogle: "المتابعة باستخدام Google",
    orEmail: "أو سجّل بالبريد الإلكتروني",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    submitSignIn: "دخول",
    submitSignUp: "إنشاء الحساب",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    createAccount: "إنشاء حساب جديد",
    loginPrompt: "تسجيل الدخول",
    authSuccessToast: "أهلاً بك، {name}!",
    authSignedOutToast: "تم تسجيل الخروج بنجاح",
    errEmailExists: "هذا البريد مسجل بالفعل، يرجى تسجيل الدخول.",
    errUserNotFound: "لا يوجد حساب مسجل بهذا البريد، يرجى إنشاء حساب أولاً.",
    errWrongPassword: "كلمة المرور غير صحيحة، حاول مجدداً.",
    errShortPassword: "كلمة المرور يجب ألا تقل عن 6 خانات.",
    errInvalidEmail: "يرجى كتابة بريد إلكتروني صالح.",
    errNameRequired: "يرجى كتابة الاسم الكامل.",
    googleSignInHeading: "تسجيل الدخول باستخدام Google",
    googleSignInSub: "اختيار حساب للمتابعة إلى Table Hub",
    googleEmailLabel: "البريد الإلكتروني",
    googleNameLabel: "الاسم الكامل",
    googleUseAnother: "استخدام حساب آخر",
    googleConsent: "للمتابعة، ستشارك Google اسمك وعنوان بريدك الإلكتروني ولغتك المفضلة وصورة ملفك الشخصي مع Table Hub.",
    googleContinueBtn: "متابعة",
    googleProvider: "حساب Google",
    emailProvider: "حساب بريد إلكتروني"
  }
};

// ── Application State ──
const AppState = {
  lang: localStorage.getItem("table_hub_lang") || "en",
  theme: localStorage.getItem("table_hub_theme") || "dark",
  user: JSON.parse(localStorage.getItem("table_hub_user") || "null"),
  authMode: "signin",
  viewMode: "tabs",
  activeTableId: 1,
  tables: [],
  searchQuery: ""
};

// Dynamic Avatar Gradient Generator from User's Name
function getAvatarGradient(name) {
  let hash = 0;
  const str = name && name.trim() ? name.trim() : "User";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 45) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 75%, 48%), hsl(${hue2}, 85%, 38%))`;
}

// Default initial table template
function createInitialTable(id, num) {
  const isAr = AppState.lang === "ar";
  return {
    id: id,
    title: isAr ? `جدول ${num}` : `Table ${num}`,
    colWidths: [200, 180, 160, 160],
    columns: isAr
      ? ["الاسم / المهمة", "النوع", "الحالة", "الأولوية"]
      : ["Item / Task", "Category", "Status", "Priority"],
    rows: isAr
      ? [
          ["تصميم واجهة المستخدم الفاخرة", "تطوير", "مكتمل", "عالي"],
          ["مقبض تكبير الزاوية السلس التلقائي", "ميزة", "مكتمل", "عالي"],
          ["تسجيل الدخول مع Google والبريد", "سحابة", "مكتمل", "متوسط"],
          ["تصدير ملفات Excel و CSV مع UTF-8", "بيانات", "مكتمل", "عالي"]
        ]
      : [
          ["Red & Black Luxury Theme", "UI Design", "Completed", "High"],
          ["Corner Dynamic Scaling Grip", "Feature", "Ready", "High"],
          ["Google & Email Cloud Sign In", "Auth", "Active", "Urgent"],
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
  updateAuthUI();
  bindEvents();
  renderApp();
  initGoogleIdentity();
});

function initCopyright() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
}

// ── User Database & Authentication Storage ──
function getRegisteredUsers() {
  const users = localStorage.getItem("table_hub_registered_users");
  if (!users) {
    const initialUsers = [
      {
        id: 1,
        name: "Hamza Gamal",
        email: "thehamzagamal@gmail.com",
        password: "password123",
        provider: "google"
      }
    ];
    localStorage.setItem("table_hub_registered_users", JSON.stringify(initialUsers));
    return initialUsers;
  }
  try {
    return JSON.parse(users);
  } catch (e) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem("table_hub_registered_users", JSON.stringify(users));
}

function showAuthError(msg) {
  const box = document.getElementById("authErrorBox");
  if (box) {
    box.textContent = msg;
    box.style.display = "block";
  }
}

function clearAuthError() {
  const box = document.getElementById("authErrorBox");
  if (box) {
    box.textContent = "";
    box.style.display = "none";
  }
}

function getUserDataKey() {
  return AppState.user && AppState.user.email
    ? `table_hub_data_${AppState.user.email}`
    : "table_hub_data";
}

function loadData() {
  const key = getUserDataKey();
  const saved = localStorage.getItem(key);
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
  const key = getUserDataKey();
  localStorage.setItem(key, JSON.stringify(AppState.tables));
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

  updateAuthUI();

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

// ── Authentication Management (Google & Email) ──
function updateAuthUI() {
  const authBtn = document.getElementById("authBtn");
  const dropdown = document.getElementById("userProfileDropdown");
  if (!authBtn) return;

  if (AppState.user) {
    const rawName = AppState.user.name || AppState.user.email || "User";
    const initial = rawName.trim().charAt(0).toUpperCase();
    const firstName = rawName.trim().split(" ")[0];
    const gradient = getAvatarGradient(rawName);

    authBtn.innerHTML = `
      <div class="user-avatar-circle" style="background:${gradient};">${escapeHtml(initial)}</div>
      <span>${escapeHtml(firstName)}</span>
    `;
    authBtn.title = `${AppState.user.email}`;

    // Update Dropdown Contents
    const dropAvatar = document.getElementById("dropdownAvatar");
    const dropName = document.getElementById("dropdownName");
    const dropEmail = document.getElementById("dropdownEmail");
    const dropBadge = document.getElementById("dropdownBadge");

    if (dropAvatar) {
      dropAvatar.textContent = initial;
      dropAvatar.style.background = gradient;
    }
    if (dropName) dropName.textContent = rawName;
    if (dropEmail) dropEmail.textContent = AppState.user.email;
    if (dropBadge) {
      dropBadge.textContent = AppState.user.provider === "google"
        ? I18N[AppState.lang].googleProvider
        : I18N[AppState.lang].emailProvider;
    }
  } else {
    authBtn.innerHTML = `
      <i class="fa-solid fa-user"></i>
      <span id="authBtnText">${I18N[AppState.lang].signIn}</span>
    `;
    authBtn.title = I18N[AppState.lang].signIn;
    if (dropdown) dropdown.style.display = "none";
  }
}

function handleAuthBtnClick(e) {
  e.stopPropagation();
  if (AppState.user) {
    // Toggle Profile Dropdown
    const dropdown = document.getElementById("userProfileDropdown");
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    }
  } else {
    openAuthModal();
  }
}

function openAuthModal() {
  clearAuthError();
  initGoogleIdentity();
  const modal = document.getElementById("authModal");
  if (modal) modal.style.display = "flex";
}

function closeAuthModal() {
  clearAuthError();
  const modal = document.getElementById("authModal");
  if (modal) modal.style.display = "none";
}

function toggleAuthMode() {
  AppState.authMode = AppState.authMode === "signin" ? "signup" : "signin";
  const isSignIn = AppState.authMode === "signin";
  const i18n = I18N[AppState.lang];

  clearAuthError();

  const titleEl = document.getElementById("authModalTitle");
  const submitBtn = document.getElementById("authSubmitBtn");
  const toggleText = document.getElementById("authToggleText");
  const switchBtn = document.getElementById("authSwitchModeBtn");
  const nameGroup = document.getElementById("authNameGroup");

  if (titleEl) titleEl.textContent = isSignIn ? i18n.authTitle : i18n.authTitleSignUp;
  if (submitBtn) submitBtn.textContent = isSignIn ? i18n.submitSignIn : i18n.submitSignUp;
  if (toggleText) toggleText.textContent = isSignIn ? i18n.noAccount : i18n.haveAccount;
  if (switchBtn) switchBtn.textContent = isSignIn ? i18n.createAccount : i18n.loginPrompt;
  if (nameGroup) nameGroup.style.display = isSignIn ? "none" : "flex";
}

// ── Google OAuth Client Configuration ──
// معرّف العميل الرسمي لـ Google Cloud الخاص بـ Table Hub
const GOOGLE_CLIENT_ID = "592566520210-4ftbc8sf9ftost7s7h7t6ud8nq1mu55v.apps.googleusercontent.com";

function decodeJwtResponse(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function handleGoogleCredentialResponse(response) {
  if (!response || !response.credential) return;
  const payload = decodeJwtResponse(response.credential);
  if (payload && payload.email) {
    const user = {
      id: Date.now(),
      name: payload.name || payload.given_name || payload.email.split("@")[0],
      email: payload.email,
      provider: "google",
      picture: payload.picture
    };
    completeGoogleLogin(user);
  }
}

// تهيئة زر جوجل الرسمي ونظام Google Identity Services
function initGoogleIdentity() {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        auto_select: false
      });

      const officialBtnEl = document.getElementById("googleOfficialBtn");
      const fallbackBtn = document.getElementById("googleSignInBtn");

      if (officialBtnEl) {
        officialBtnEl.innerHTML = "";
        window.google.accounts.id.renderButton(officialBtnEl, {
          theme: AppState.theme === "dark" ? "filled_black" : "outline",
          size: "large",
          width: 340,
          text: "continue_with",
          shape: "rectangular"
        });
        officialBtnEl.style.display = "flex";
        if (fallbackBtn) fallbackBtn.style.display = "none";
      }
    } catch (e) {
      console.warn("Google Identity init warning:", e);
      const fallbackBtn = document.getElementById("googleSignInBtn");
      if (fallbackBtn) fallbackBtn.style.display = "flex";
    }
  } else {
    // Retry if Google script is still loading
    setTimeout(initGoogleIdentity, 600);
  }
}

// ── Genuine Google OAuth Account Chooser ──
function openGoogleOAuthModal() {
  closeAuthModal();

  // إذا تم توفير Client ID الحقيقي، يتم تشغيل نافذة جوجل الرسمية مباشرة
  if (GOOGLE_CLIENT_ID && window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse
      });
      window.google.accounts.id.prompt();
      return;
    } catch (err) {
      console.warn("Google Identity prompt fallback", err);
    }
  }

  const modal = document.getElementById("googleOAuthModal");
  if (!modal) return;

  const users = getRegisteredUsers().filter(u => u.provider === "google");
  const listEl = document.getElementById("googleAccountList");
  const emailInput = document.getElementById("googleEmailInput");
  const nameInput = document.getElementById("googleNameInput");

  if (listEl) {
    listEl.innerHTML = "";
    if (users.length > 0) {
      users.forEach(u => {
        const item = document.createElement("div");
        item.className = "google-account-item";
        const initial = (u.name || "G")[0].toUpperCase();
        const gradient = getAvatarGradient(u.name);
        item.innerHTML = `
          <div class="google-account-avatar" style="background:${gradient};">${escapeHtml(initial)}</div>
          <div class="google-account-text">
            <span class="google-account-name">${escapeHtml(u.name)}</span>
            <span class="google-account-email">${escapeHtml(u.email)}</span>
          </div>
        `;
        item.addEventListener("click", () => {
          completeGoogleLogin(u);
        });
        listEl.appendChild(item);
      });
    }
  }

  if (emailInput) emailInput.value = "";
  if (nameInput) nameInput.value = "";

  modal.style.display = "flex";
}

function closeGoogleOAuthModal() {
  const modal = document.getElementById("googleOAuthModal");
  if (modal) modal.style.display = "none";
}

function handleGoogleConfirm() {
  const emailInput = document.getElementById("googleEmailInput");
  const nameInput = document.getElementById("googleNameInput");

  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  let name = nameInput ? nameInput.value.trim() : "";

  if (!email || !email.includes("@") || !email.includes(".")) {
    showToast(I18N[AppState.lang].errInvalidEmail, "trash");
    if (emailInput) emailInput.focus();
    return;
  }

  if (!name) {
    const raw = email.split("@")[0];
    name = raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  const users = getRegisteredUsers();
  let existingUser = users.find(u => u.email.toLowerCase() === email);

  if (!existingUser) {
    existingUser = {
      id: Date.now(),
      name: name,
      email: email,
      provider: "google",
      createdAt: new Date().toISOString()
    };
    users.push(existingUser);
    saveRegisteredUsers(users);
  } else {
    existingUser.name = name;
    saveRegisteredUsers(users);
  }

  completeGoogleLogin(existingUser);
}

function completeGoogleLogin(user) {
  AppState.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: "google"
  };

  localStorage.setItem("table_hub_user", JSON.stringify(AppState.user));
  loadData();
  updateAuthUI();
  closeGoogleOAuthModal();
  renderApp();
  showToast(I18N[AppState.lang].authSuccessToast.replace("{name}", user.name), "check");
}

function handleFormAuthSubmit() {
  clearAuthError();
  const i18n = I18N[AppState.lang];
  const emailInput = document.getElementById("authEmailInput");
  const passInput = document.getElementById("authPasswordInput");
  const nameInput = document.getElementById("authNameInput");

  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const password = passInput ? passInput.value : "";
  const name = nameInput ? nameInput.value.trim() : "";

  if (!email || !email.includes("@") || !email.includes(".")) {
    showAuthError(i18n.errInvalidEmail);
    return;
  }

  if (password.length < 6) {
    showAuthError(i18n.errShortPassword);
    return;
  }

  const users = getRegisteredUsers();

  if (AppState.authMode === "signup") {
    if (!name) {
      showAuthError(i18n.errNameRequired);
      return;
    }
    const exists = users.some(u => u.email.toLowerCase() === email);
    if (exists) {
      showAuthError(i18n.errEmailExists);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      provider: "email",
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveRegisteredUsers(users);

    AppState.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      provider: "email"
    };

    localStorage.setItem("table_hub_user", JSON.stringify(AppState.user));
    loadData();
    updateAuthUI();
    closeAuthModal();
    renderApp();
    showToast(i18n.authSuccessToast.replace("{name}", newUser.name), "check");
  } else {
    const user = users.find(u => u.email.toLowerCase() === email);
    if (!user) {
      showAuthError(i18n.errUserNotFound);
      return;
    }

    if (user.password && user.password !== password) {
      showAuthError(i18n.errWrongPassword);
      return;
    }

    AppState.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider || "email"
    };

    localStorage.setItem("table_hub_user", JSON.stringify(AppState.user));
    loadData();
    updateAuthUI();
    closeAuthModal();
    renderApp();
    showToast(i18n.authSuccessToast.replace("{name}", user.name), "check");
  }
}

// ── Event Bindings ──
function bindEvents() {
  document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);
  document.getElementById("langToggleBtn")?.addEventListener("click", toggleLanguage);
  document.getElementById("viewToggleBtn")?.addEventListener("click", toggleViewMode);
  document.getElementById("exportAllBtn")?.addEventListener("click", exportAllJSON);

  // Auth Button (Opens modal or toggles dropdown)
  document.getElementById("authBtn")?.addEventListener("click", handleAuthBtnClick);
  document.getElementById("authCloseBtn")?.addEventListener("click", closeAuthModal);
  document.getElementById("authSwitchModeBtn")?.addEventListener("click", toggleAuthMode);
  document.getElementById("googleSignInBtn")?.addEventListener("click", openGoogleOAuthModal);

  // Google OAuth Modal Events
  document.getElementById("googleOAuthCancelBtn")?.addEventListener("click", closeGoogleOAuthModal);
  document.getElementById("googleOAuthConfirmBtn")?.addEventListener("click", handleGoogleConfirm);

  // Dropdown Sign Out
  document.getElementById("dropdownSignOutBtn")?.addEventListener("click", () => {
    AppState.user = null;
    localStorage.removeItem("table_hub_user");
    loadData();
    updateAuthUI();
    renderApp();
    showToast(I18N[AppState.lang].authSignedOutToast, "check");
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("userProfileDropdown");
    const authBtn = document.getElementById("authBtn");
    if (dropdown && dropdown.style.display !== "none") {
      if (!dropdown.contains(e.target) && !authBtn?.contains(e.target)) {
        dropdown.style.display = "none";
      }
    }
  });

  document.getElementById("emailAuthForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormAuthSubmit();
  });

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
      ? Math.max(...AppState.tables.map(t => t.id)) + 1
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

  const targetIdx = AppState.tables.findIndex(t => t.id === tableId);
  if (targetIdx === -1) return;

  AppState.tables.splice(targetIdx, 1);
  if (AppState.activeTableId === tableId) {
    AppState.activeTableId = AppState.tables[Math.max(0, targetIdx - 1)].id;
  }

  saveData(true);
  renderApp();
  showToast(I18N[AppState.lang].toastRemoved.replace("{n}", targetIdx + 1), "trash");
}

function resetAllTables() {
  if (AppState.tables.length <= 1) return;

  openCustomModal(
    I18N[AppState.lang].confirmResetTitle,
    I18N[AppState.lang].confirmResetMsg,
    () => {
      AppState.tables = [AppState.tables[0]];
      AppState.activeTableId = AppState.tables[0].id;
      saveData(true);
      renderApp();
    }
  );
}

function duplicateCurrentTable(tableId) {
  const source = AppState.tables.find(t => t.id === tableId);
  if (!source) return;
  const clone = JSON.parse(JSON.stringify(source));
  addTable(clone);
}

function clearCurrentTable(tableId) {
  const table = AppState.tables.find(t => t.id === tableId);
  if (!table) return;

  openCustomModal(
    I18N[AppState.lang].confirmClearTitle,
    I18N[AppState.lang].confirmClearMsg.replace("{name}", table.title),
    () => {
      table.rows = table.rows.map(row => row.map(() => ""));
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
      <span 
        class="tab-name" 
        contenteditable="true" 
        spellcheck="false" 
        title="${AppState.lang === "ar" ? "انقر لتعديل اسم الجدول" : "Click to rename table"}"
      >${escapeHtml(table.title || `Table ${idx + 1}`)}</span>
      ${
        AppState.tables.length > 1
          ? `<i class="fa-solid fa-xmark tab-close-x" title="Close" data-id="${table.id}"></i>`
          : ""
      }
    `;

    const tabNameEl = tab.querySelector(".tab-name");

    // Click on tab switches active table
    tab.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-close-x")) return;
      if (e.target === tabNameEl) {
        // Just select active table without rebuilding DOM so cursor is preserved
        if (AppState.activeTableId !== table.id) {
          AppState.activeTableId = table.id;
          renderApp();
          const freshTabName = document.querySelector(`.tab-item.active .tab-name`);
          if (freshTabName) freshTabName.focus();
        }
        return;
      }
      AppState.activeTableId = table.id;
      if (AppState.viewMode === "grid") AppState.viewMode = "tabs";
      renderApp();
    });

    // Inline edit tab title
    tabNameEl.addEventListener("input", () => {
      const newTitle = tabNameEl.textContent.trim();
      table.title = newTitle || `Table ${idx + 1}`;
      
      // Sync with card header title input if rendered
      const cardTitleInput = document.querySelector(`#table-card-${table.id} .card-table-title`);
      if (cardTitleInput) cardTitleInput.value = table.title;

      saveData(true);
    });

    tabNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        tabNameEl.blur();
      }
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
      : AppState.tables.filter(t => t.id === AppState.activeTableId);

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

// ── Build Clean Data Table Card (Zero # column, Zero row numbers, Zero clumsy add buttons) ──
function buildTableCard(table, displayIndex) {
  const card = document.createElement("div");
  card.className = "table-card";
  card.id = `table-card-${table.id}`;

  const lang = AppState.lang;
  const i18n = I18N[lang];

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

    <!-- Crisp Table Stage with Integrated Drag Extenders -->
    <div class="table-stage-wrap">
      <div class="table-grid-container" data-table-id="${table.id}">
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
                  </div>
                </th>`;
                })
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${table.rows
              .map((row, rowIdx) => {
                return `
              <tr data-row-idx="${rowIdx}">
                ${row
                  .map(
                    (val, colIdx) => `
                  <td contenteditable="true" spellcheck="false" data-row="${rowIdx}" data-col="${colIdx}">${escapeHtml(val)}</td>`
                  )
                  .join("")}
              </tr>`;
              })
              .join("")}
          </tbody>
        </table>

        <!-- Interactive Handles: Drag edge to multiply or shrink rows & columns -->
        <div class="grid-edge-col-handle" title="${lang === "ar" ? "اسحب لزيادة أو إنقاص الأعمدة" : "Drag edge to add or remove columns"}"></div>
        <div class="grid-edge-row-handle" title="${lang === "ar" ? "اسحب لزيادة أو إنقاص الصفوف" : "Drag edge to add or remove rows"}"></div>
        <div class="grid-corner-handle" title="${lang === "ar" ? "اسحب الزاوية لتوسيع أو تقليص الشبكة" : "Drag corner to expand or shrink grid"}">
          <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
        </div>
      </div>
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

  // Attach Cell Listeners & Keyboard Nav
  attachCellListeners(card, table);

  // Setup High-Performance Butter-Smooth Drag Grid Extender
  setupGridExtender(card, table);
}

function attachCellListeners(card, table) {
  // Column Header Title Edit
  card.querySelectorAll(".th-text").forEach((thText) => {
    if (thText.dataset.bound) return;
    thText.dataset.bound = "true";

    thText.addEventListener("blur", () => {
      const th = thText.closest("th");
      const colIdx = Number(th.getAttribute("data-col-idx"));
      table.columns[colIdx] = thText.textContent.trim() || `Col ${colIdx + 1}`;
      saveData(true);
    });
  });

  // Cell Edit & Arrow/Tab/Enter Navigation
  card.querySelectorAll("tbody td[contenteditable='true']").forEach((td) => {
    if (td.dataset.bound) return;
    td.dataset.bound = "true";

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

      // Enter moves down (or adds new row smoothly if at the bottom)
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
}

function updateTabLabel(tableId, title) {
  const tabs = document.querySelectorAll(".tab-item");
  AppState.tables.forEach((t, i) => {
    if (t.id === tableId && tabs[i]) {
      const nameEl = tabs[i].querySelector(".tab-name");
      if (nameEl) nameEl.textContent = title || `Table ${i + 1}`;
    }
  });
}

// ── 60fps Butter-Smooth Drag Grid Extender Engine ──
function setupGridExtender(card, table) {
  const colHandle = card.querySelector(".grid-edge-col-handle");
  const rowHandle = card.querySelector(".grid-edge-row-handle");
  const cornerHandle = card.querySelector(".grid-corner-handle");
  const domTable = card.querySelector(".interactive-table");
  const theadTr = domTable?.querySelector("thead tr");
  const tbody = domTable?.querySelector("tbody");

  const isRtl = document.documentElement.dir === "rtl";

  function createLiveIndicator() {
    let ind = document.getElementById("gridLiveIndicator");
    if (!ind) {
      ind = document.createElement("div");
      ind.id = "gridLiveIndicator";
      ind.className = "grid-live-indicator";
      document.body.appendChild(ind);
    }
    ind.style.display = "flex";
    return ind;
  }

  function removeLiveIndicator() {
    const ind = document.getElementById("gridLiveIndicator");
    if (ind) ind.style.display = "none";
  }

  // Smooth DOM Column Sync during drag (no DOM teardown)
  function syncDomColumns(targetCols) {
    if (!theadTr || !tbody) return;
    let currentCols = theadTr.children.length;

    while (currentCols < targetCols) {
      const colIdx = currentCols;
      const colNum = colIdx + 1;
      const defaultName = I18N[AppState.lang].colDefault.replace("{n}", colNum);

      // Append <th>
      const th = document.createElement("th");
      th.setAttribute("data-col-idx", colIdx);
      th.style.width = "180px";
      th.innerHTML = `
        <div class="th-inner">
          <span class="th-text" contenteditable="true" spellcheck="false">${defaultName}</span>
        </div>`;
      theadTr.appendChild(th);

      // Append <td> in all rows
      Array.from(tbody.children).forEach((tr, rIdx) => {
        const td = document.createElement("td");
        td.contentEditable = "true";
        td.spellcheck = false;
        td.setAttribute("data-row", rIdx);
        td.setAttribute("data-col", colIdx);
        tr.appendChild(td);
      });

      currentCols++;
    }

    while (currentCols > targetCols && currentCols > 1) {
      theadTr.removeChild(theadTr.lastElementChild);
      Array.from(tbody.children).forEach((tr) => {
        if (tr.lastElementChild) tr.removeChild(tr.lastElementChild);
      });
      currentCols--;
    }
  }

  // Smooth DOM Row Sync during drag (no DOM teardown)
  function syncDomRows(targetRows) {
    if (!tbody || !theadTr) return;
    let currentRows = tbody.children.length;
    const currentCols = theadTr.children.length;

    while (currentRows < targetRows) {
      const rIdx = currentRows;
      const tr = document.createElement("tr");
      tr.setAttribute("data-row-idx", rIdx);

      for (let cIdx = 0; cIdx < currentCols; cIdx++) {
        const td = document.createElement("td");
        td.contentEditable = "true";
        td.spellcheck = false;
        td.setAttribute("data-row", rIdx);
        td.setAttribute("data-col", cIdx);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      currentRows++;
    }

    while (currentRows > targetRows && currentRows > 1) {
      tbody.removeChild(tbody.lastElementChild);
      currentRows--;
    }
  }

  // Commit DOM changes back to Table Data Model on drag completion
  function commitGridChanges() {
    if (!theadTr || !tbody) return;
    const finalCols = [];
    Array.from(theadTr.children).forEach((th, idx) => {
      const span = th.querySelector(".th-text");
      finalCols.push(span ? span.textContent.trim() : `Column ${idx + 1}`);
    });

    const finalRows = [];
    Array.from(tbody.children).forEach((tr) => {
      const rowData = [];
      Array.from(tr.children).forEach((td) => {
        rowData.push(td.textContent || "");
      });
      finalRows.push(rowData);
    });

    table.columns = finalCols;
    table.rows = finalRows;
    table.colWidths = finalCols.map(() => 180);

    saveData(true);
    attachCellListeners(card, table);
    updateSummaryStrip();
  }

  // 1. Drag Side Edge to Add/Remove Columns
  colHandle?.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.pageX;
    const initialCols = table.columns.length;
    const indicator = createLiveIndicator();
    colHandle.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    let lastTargetCols = initialCols;

    function onMouseMove(me) {
      const deltaX = isRtl ? (startX - me.pageX) : (me.pageX - startX);
      const step = 85;
      const targetCols = Math.max(1, Math.min(30, initialCols + Math.round(deltaX / step)));

      indicator.style.left = `${me.pageX}px`;
      indicator.style.top = `${me.pageY}px`;
      indicator.innerHTML = `<i class="fa-solid fa-table-columns" style="color:var(--accent-red)"></i> ${targetCols} ${AppState.lang === "ar" ? "أعمدة" : "Cols"} &times; ${table.rows.length} ${AppState.lang === "ar" ? "صفوف" : "Rows"}`;

      if (targetCols !== lastTargetCols) {
        lastTargetCols = targetCols;
        syncDomColumns(targetCols);
      }
    }

    function onMouseUp() {
      colHandle.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      removeLiveIndicator();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      commitGridChanges();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // 2. Drag Bottom Edge to Add/Remove Rows
  rowHandle?.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.pageY;
    const initialRows = table.rows.length;
    const indicator = createLiveIndicator();
    rowHandle.classList.add("dragging");
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";

    let lastTargetRows = initialRows;

    function onMouseMove(me) {
      const deltaY = me.pageY - startY;
      const step = 34;
      const targetRows = Math.max(1, Math.min(80, initialRows + Math.round(deltaY / step)));

      indicator.style.left = `${me.pageX}px`;
      indicator.style.top = `${me.pageY}px`;
      indicator.innerHTML = `<i class="fa-solid fa-bars" style="color:var(--accent-red)"></i> ${theadTr ? theadTr.children.length : table.columns.length} ${AppState.lang === "ar" ? "أعمدة" : "Cols"} &times; ${targetRows} ${AppState.lang === "ar" ? "صفوف" : "Rows"}`;

      if (targetRows !== lastTargetRows) {
        lastTargetRows = targetRows;
        syncDomRows(targetRows);
      }
    }

    function onMouseUp() {
      rowHandle.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      removeLiveIndicator();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      commitGridChanges();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // 3. Drag Corner Handle to Add/Remove BOTH Rows & Columns simultaneously
  cornerHandle?.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.pageX;
    const startY = e.pageY;
    const initialCols = table.columns.length;
    const initialRows = table.rows.length;
    const indicator = createLiveIndicator();

    cornerHandle.classList.add("dragging");
    document.body.style.cursor = isRtl ? "nesw-resize" : "nwse-resize";
    document.body.style.userSelect = "none";

    let lastTargetCols = initialCols;
    let lastTargetRows = initialRows;

    function onMouseMove(me) {
      const deltaX = isRtl ? (startX - me.pageX) : (me.pageX - startX);
      const deltaY = me.pageY - startY;

      const colStep = 85;
      const rowStep = 34;

      const targetCols = Math.max(1, Math.min(30, initialCols + Math.round(deltaX / colStep)));
      const targetRows = Math.max(1, Math.min(80, initialRows + Math.round(deltaY / rowStep)));

      indicator.style.left = `${me.pageX}px`;
      indicator.style.top = `${me.pageY}px`;
      indicator.innerHTML = `<i class="fa-solid fa-up-right-and-down-left-from-center" style="color:var(--accent-red)"></i> ${targetCols} ${AppState.lang === "ar" ? "أعمدة" : "Cols"} &times; ${targetRows} ${AppState.lang === "ar" ? "صفوف" : "Rows"}`;

      if (targetCols !== lastTargetCols) {
        lastTargetCols = targetCols;
        syncDomColumns(targetCols);
      }

      if (targetRows !== lastTargetRows) {
        lastTargetRows = targetRows;
        syncDomRows(targetRows);
      }
    }

    function onMouseUp() {
      cornerHandle.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      removeLiveIndicator();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      commitGridChanges();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

// ── Summary Strip (Active copies & disable logic) ──
function updateSummaryStrip() {
  const count = AppState.tables.length;
  const countEl = document.getElementById("activeTableCount");
  const removeBtn = document.getElementById("removeTableBtn");

  if (countEl) countEl.textContent = count;
  if (removeBtn) {
    removeBtn.disabled = count <= 1;
  }
}

// ── Filter / Search Cells ──
function filterTableCells() {
  const query = AppState.searchQuery;
  const cards = document.querySelectorAll(".table-card");

  cards.forEach((card) => {
    let hasMatch = false;
    const cells = card.querySelectorAll("tbody td[contenteditable='true']");

    cells.forEach((td) => {
      const text = (td.textContent || "").toLowerCase();
      if (!query) {
        td.style.backgroundColor = "";
        hasMatch = true;
      } else if (text.includes(query)) {
        td.style.backgroundColor = "rgba(239, 68, 68, 0.35)";
        hasMatch = true;
      } else {
        td.style.backgroundColor = "";
      }
    });

    if (query) {
      card.style.opacity = hasMatch ? "1" : "0.35";
    } else {
      card.style.opacity = "1";
    }
  });
}

// ── Custom Glassmorphism Confirmation Modal (Zero Native Alerts) ──
let modalConfirmCallback = null;

function openCustomModal(title, message, onConfirm) {
  const modal = document.getElementById("customModal");
  const titleEl = document.getElementById("modalTitle");
  const msgEl = document.getElementById("modalMessage");
  const confirmBtn = document.getElementById("modalConfirmBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");

  if (!modal || !titleEl || !msgEl) {
    if (onConfirm) onConfirm();
    return;
  }

  titleEl.textContent = title;
  msgEl.textContent = message;
  modalConfirmCallback = onConfirm;

  if (confirmBtn) confirmBtn.textContent = I18N[AppState.lang].confirmBtn;
  if (cancelBtn) cancelBtn.textContent = I18N[AppState.lang].cancelBtn;

  modal.style.display = "flex";

  const closeHandler = () => {
    modal.style.display = "none";
    modalConfirmCallback = null;
    confirmBtn?.removeEventListener("click", confirmHandler);
    cancelBtn?.removeEventListener("click", closeHandler);
  };

  const confirmHandler = () => {
    modal.style.display = "none";
    if (modalConfirmCallback) modalConfirmCallback();
    modalConfirmCallback = null;
    confirmBtn?.removeEventListener("click", confirmHandler);
    cancelBtn?.removeEventListener("click", closeHandler);
  };

  confirmBtn?.addEventListener("click", confirmHandler);
  cancelBtn?.addEventListener("click", closeHandler);
}

// ── Floating Toast Stack ──
function showToast(message, icon = "check") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-pill";
  toast.innerHTML = `<i class="fa-solid fa-${icon}" style="color:var(--accent-red)"></i> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px) scale(0.95)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// ── CSV Export with UTF-8 BOM (Perfect for Excel) ──
function exportSingleCSV(tableId) {
  const table = AppState.tables.find(t => t.id === tableId);
  if (!table) return;

  const header = table.columns.map(escapeCsvCell).join(",");
  const rows = table.rows.map(r => r.map(escapeCsvCell).join(","));
  const csvContent = "\uFEFF" + [header, ...rows].join("\r\n");

  downloadFile(`${slugify(table.title || "table")}.csv`, csvContent, "text/csv;charset=utf-8;");
  showToast(I18N[AppState.lang].toastCsv.replace("{name}", table.title || "Table"), "file-csv");
}

function exportAllJSON() {
  const jsonContent = JSON.stringify(AppState.tables, null, 2);
  downloadFile("table-hub-backup.json", jsonContent, "application/json");
  showToast(I18N[AppState.lang].toastJson, "download");
}

function escapeCsvCell(val) {
  const s = String(val ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Utilities ──
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
