// ========== تنظیمات ثابت ==========
const IRAN_OFFSET_MS = 4.5 * 60 * 60 * 1000; // +4.5 ساعت
const DAYS_MAP = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

const USERS = {
    MOK: {
        password: '13241234',
        displayName: 'محمد',
        courses: [
            { id: 1, name: "تربیت بدنی", professor: "وحید ترک ملک", schedule: "شنبه از 13:00 تا 14:30", exam: "1405/10/10 از 10:30 تا 12:00", units: "۱" },
            { id: 2, name: "ورزش ۱", professor: "حسین ساکی", schedule: "شنبه از 14:45 تا 16:15", exam: "", units: "۱ (عملی)" },
            { id: 3, name: "زبان انگلیسی عمومی-ترکیبی (۳)", professor: "سینا کسرائی", schedule: "شنبه از 19:15 تا 20:00", exam: "1405/10/25 از 13:00 تا 14:00", units: "۱" },
            { id: 4, name: "اصول فقه (۱)", professor: "محمد گودرزی", schedule: "یکشنبه از 08:00 تا 09:30", exam: "1405/10/13 از 10:30 تا 12:00", units: "۲" },
            { id: 5, name: "حقوق سازمان‌های بین‌المللی", professor: "رضا کرمی", schedule: "یکشنبه از 10:00 تا 11:30", exam: "1405/10/20 از 08:30 تا 10:00", units: "۲" },
            { id: 6, name: "تفسیر موضوعی قرآن", professor: "مجتبی بیرانوند", schedule: "یکشنبه از 13:00 تا 14:30", exam: "1405/10/13 از 12:45 تا 13:45", units: "۲" },
            { id: 7, name: "حقوق بین‌الملل عمومی (۳) روش‌های حل و فصل مسالمت‌آمیز اختلافات", professor: "مهدی یوسف وند", schedule: "یکشنبه از 14:45 تا 16:15", exam: "1405/10/21 از 08:30 تا 10:00", units: "۲" },
            { id: 8, name: "حقوق جزای عمومی (۲)", professor: "رضا محبی فر", schedule: "یکشنبه از 16:30 تا 18:00", exam: "1405/10/22 از 08:30 تا 10:00", units: "۲" },
            { id: 9, name: "زبان انگلیسی عمومی-ترکیبی (۲)", professor: "مریم بیرجندی", schedule: "یکشنبه از 19:30 تا 20:15", exam: "1405/11/02 از 13:00 تا 14:00", units: "۱" },
            { id: 10, name: "آیین دادرسی مدنی (۱)", professor: "محمدصفر نوروزی", schedule: "دوشنبه از 14:45 تا 16:15", exam: "1405/10/14 از 08:30 تا 10:00", units: "۲" },
            { id: 11, name: "انس با قرآن کریم", professor: "محمدحسن مقصودی گودرزی", schedule: "دوشنبه از 16:30 تا 18:00", exam: "1405/10/14 از 12:45 تا 13:45", units: "۱" },
            { id: 12, name: "حقوق مدنی (۳) کلیات قراردادها", professor: "عبدالمحمد کردی", schedule: "سه شنبه از 07:30 تا 09:45", exam: "1405/10/19 از 10:30 تا 12:00", units: "۳" },
            { id: 13, name: "حقوق تجارت (۳) اسناد تجاری", professor: "حسین شعبان پور", schedule: "چهارشنبه از 13:00 تا 14:30", exam: "1405/10/15 از 10:30 تا 12:00", units: "۲" }
        ]
    },
    NARGES: {
        password: '13841234',
        displayName: 'نرگس',
        courses: [
            { id: 1, name: "حقوق جزا عمومی 2", professor: "آرمان", schedule: "شنبه از 13:00 تا 14:30", exam: "1405/10/22 از 00:00 تا 00:00", units: "—" },
            { id: 2, name: "حقوق بین الملل عمومی 3", professor: "مهدی یوسفوند", schedule: "شنبه از 14:45 تا 16:15", exam: "1405/10/21 از 00:00 تا 00:00", units: "—" },
            { id: 3, name: "حقوق ثبت", professor: "محمد صارمی", schedule: "یکشنبه از 08:00 تا 10:30", exam: "1405/10/20 از 00:00 تا 00:00", units: "—" },
            { id: 4, name: "اصول فقه 1", professor: "محمد گودرزی", schedule: "یکشنبه از 10:00 تا 11:30", exam: "1405/10/13 از 00:00 تا 00:00", units: "—" },
            { id: 5, name: "فلسفه حقوق", professor: "بابک بزرگمهر", schedule: "یکشنبه از 16:30 تا 18:00", exam: "1405/10/26 از 00:00 تا 00:00", units: "—" },
            { id: 6, name: "زبان انگلیسی عمومی-ترکیبی 2", professor: "مریم بیرجندی", schedule: "یکشنبه از 19:30 تا 20:15", exam: "1405/11/02 از 00:00 تا 00:00", units: "—" },
            { id: 7, name: "حقوق مدنی 5", professor: "محمد صفر نوروزی", schedule: "دوشنبه از 13:00 تا 14:30", exam: "1405/10/14 از 00:00 تا 00:00", units: "—" },
            { id: 8, name: "آیین دادرسی مدنی 1", professor: "محمد صفر نوروزی", schedule: "دوشنبه از 14:45 تا 16:15", exam: "1405/10/12 از 00:00 تا 00:00", units: "—" },
            { id: 9, name: "انقلاب اسلامی ایران", professor: "سعیده معین نجف آبادی", schedule: "دوشنبه از 16:30 تا 18:00", exam: "1405/10/21 از 00:00 تا 00:00", units: "—" },
            { id: 10, name: "حقوق مدنی 3", professor: "عبدالمحمد کردی", schedule: "سه شنبه از 07:30 تا 09:45", exam: "1405/10/19 از 00:00 تا 00:00", units: "—" },
            { id: 11, name: "حقوق اداری 2", professor: "محمد صارمی", schedule: "سه شنبه از 10:00 تا 11:30", exam: "1405/10/24 از 00:00 تا 00:00", units: "—" },
            { id: 12, name: "حقوق اساسی 3", professor: "محمد صارمی", schedule: "سه شنبه از 13:00 تا 14:30", exam: "1405/10/17 از 00:00 تا 00:00", units: "—" },
            { id: 13, name: "حقوق مدنی 4", professor: "حسین شعبان پور", schedule: "چهارشنبه از 16:30 تا 18:00", exam: "1405/10/16 از 00:00 تا 00:00", units: "—" }
        ]
    }
};

let currentUser = null;
let sortState = { key: 'id', asc: true };

// ========== توابع کمکی ==========
function parseSchedule(scheduleStr) {
    const parts = scheduleStr.split(' از ');
    if (parts.length < 2) return null;
    const dayPart = parts[0].trim();
    const timePart = parts[1].trim();
    const times = timePart.split(' تا ');
    if (times.length < 2) return null;
    const startTime = times[0].trim();
    const endTime = times[1].trim();
    const dayMap = {
        'شنبه': 0,
        'یکشنبه': 1,
        'دوشنبه': 2,
        'سه شنبه': 3,
        'چهارشنبه': 4,
        'پنجشنبه': 5,
        'جمعه': 6
    };
    const dayIndex = dayMap[dayPart];
    if (dayIndex === undefined) return null;
    return { dayIndex, startTime, endTime };
}

function parseExamDate(examStr) {
    if (!examStr) return null;
    const parts = examStr.split(' از ');
    if (parts.length < 2) return null;
    const datePart = parts[0].trim();
    const timePart = parts[1].trim();
    const examTime = timePart.split(' تا ')[0].trim();
    const [year, month, day] = datePart.split('/').map(Number);
    const [hour, minute] = examTime.split(':').map(Number);
    return { year, month, day, hour, minute };
}

function getIranNow() {
    return new Date(Date.now() + IRAN_OFFSET_MS);
}

function getIranDateForShamsi() {
    // جبران اختلاف یک ساعته نسبت به timeZone واقعی تهران
    return new Date(Date.now() + (IRAN_OFFSET_MS - 3.5 * 60 * 60 * 1000));
}

function getCurrentDayIndex() {
    const tehranNow = getIranNow();
    const utcDay = tehranNow.getUTCDay();
    const map = [1, 2, 3, 4, 5, 6, 0];
    return map[utcDay];
}

function getCurrentTimeString() {
    const tehranNow = getIranNow();
    const hours = String(tehranNow.getUTCHours()).padStart(2, '0');
    const minutes = String(tehranNow.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function isTimeInRange(current, start, end) {
    const c = timeToMinutes(current);
    const s = timeToMinutes(start);
    const e = timeToMinutes(end);
    return c >= s && c <= e;
}

function getCurrentShamsiDate() {
    const now = getIranDateForShamsi();
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
        year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran'
    });
    const parts = formatter.formatToParts(now);
    const get = (type) => Number(parts.find(p => p.type === type)?.value);
    return { year: get('year'), month: get('month'), day: get('day') };
}

function getTomorrowShamsiDate() {
    const now = getIranDateForShamsi();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
        year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tehran'
    });
    const parts = formatter.formatToParts(tomorrow);
    const get = (type) => Number(parts.find(p => p.type === type)?.value);
    return { year: get('year'), month: get('month'), day: get('day') };
}

function getCurrentClass() {
    if (!currentUser) return null;
    const courses = USERS[currentUser].courses;
    const currentDay = getCurrentDayIndex();
    const currentTime = getCurrentTimeString();
    for (const course of courses) {
        const schedule = parseSchedule(course.schedule);
        if (schedule && schedule.dayIndex === currentDay && isTimeInRange(currentTime, schedule.startTime, schedule.endTime)) {
            return course;
        }
    }
    return null;
}

function getUpcomingExams() {
    if (!currentUser) return [];
    const courses = USERS[currentUser].courses;
    const today = getCurrentShamsiDate();
    const tomorrow = getTomorrowShamsiDate();
    const currentTime = getCurrentTimeString();
    const upcoming = [];
    for (const course of courses) {
        if (!course.exam) continue;
        const exam = parseExamDate(course.exam);
        if (!exam) continue;
        const examTimeStr = `${String(exam.hour).padStart(2, '0')}:${String(exam.minute).padStart(2, '0')}`;
        const examDate = { year: exam.year, month: exam.month, day: exam.day };
        if (examDate.year === tomorrow.year && examDate.month === tomorrow.month && examDate.day === tomorrow.day) {
            upcoming.push({ course, exam, type: 'tomorrow' });
        } else if (examDate.year === today.year && examDate.month === today.month && examDate.day === today.day) {
            if (currentTime < examTimeStr) {
                upcoming.push({ course, exam, type: 'today' });
            }
        }
    }
    return upcoming;
}

// ========== انیمیشن پس‌زمینه ==========
function createBackgroundDots() {
    const bg = document.getElementById('bg-animation');
    if (!bg) return;
    const numDots = 18;
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.width = `${Math.random() * 16 + 10}px`;
        dot.style.height = dot.style.width;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 10 + 8}s`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        bg.appendChild(dot);
    }
}

// ========== نمایش ساعت و تاریخ ==========
function updateClock() {
    const now = getIranNow();
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');
    if (!clockEl || !dateEl) return;

    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;

    const dateForDisplay = getIranDateForShamsi();
    const formatter = new Intl.DateTimeFormat('fa-IR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Tehran'
    });
    dateEl.textContent = formatter.format(dateForDisplay);
}

// ========== به‌روزرسانی باکس اصلی ==========
function updateMainBox() {
    const boxTitle = document.getElementById('box-title');
    const boxContent = document.getElementById('box-content');
    if (!boxTitle || !boxContent) return;

    const upcomingExams = getUpcomingExams();
    if (upcomingExams.length > 0) {
        boxTitle.textContent = '📝 امتحان‌های پیش رو:';
        if (upcomingExams.length === 1) {
            const exam = upcomingExams[0];
            const typeText = exam.type === 'today' ? 'امروز' : 'فردا';
            boxContent.textContent = `${exam.course.name} - ${typeText} ساعت ${String(exam.exam.hour).padStart(2, '0')}:${String(exam.exam.minute).padStart(2, '0')}`;
        } else {
            boxContent.textContent = upcomingExams.map(exam => {
                const typeText = exam.type === 'today' ? 'امروز' : 'فردا';
                return `${exam.course.name} (${typeText} ${String(exam.exam.hour).padStart(2, '0')}:${String(exam.exam.minute).padStart(2, '0')})`;
            }).join(' | ');
        }
    } else {
        boxTitle.textContent = 'کلاس فعلی:';
        const currentClass = getCurrentClass();
        boxContent.textContent = currentClass ? `${currentClass.name} - ${currentClass.professor}` : 'کلاسی در حال برگزاری نیست';
    }
}

// ========== ساخت جدول برنامه هفتگی ==========
function renderScheduleTable() {
    const tbody = document.getElementById('schedule-body');
    if (!tbody || !currentUser) return;
    tbody.innerHTML = '';
    const courses = USERS[currentUser].courses;
    const todayIndex = getCurrentDayIndex();
    const currentClass = getCurrentClass();

    const sortedCourses = [...courses].sort((a, b) => {
        const sa = parseSchedule(a.schedule);
        const sb = parseSchedule(b.schedule);
        if (!sa || !sb) return 0;
        if (sa.dayIndex !== sb.dayIndex) return sa.dayIndex - sb.dayIndex;
        return timeToMinutes(sa.startTime) - timeToMinutes(sb.startTime);
    });

    sortedCourses.forEach(course => {
        const schedule = parseSchedule(course.schedule);
        if (!schedule) return;
        const dayName = DAYS_MAP[schedule.dayIndex];
        const tr = document.createElement('tr');
        if (schedule.dayIndex === todayIndex) tr.classList.add('today-row');
        if (currentClass && course.id === currentClass.id) tr.classList.add('current-class-row');
        tr.innerHTML = `
            <td>${dayName}</td>
            <td>${schedule.startTime} تا ${schedule.endTime}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== ساخت جدول لیست دروس با مرتب‌سازی ==========
function renderListTable() {
    const tbody = document.getElementById('list-body');
    if (!tbody || !currentUser) return;
    tbody.innerHTML = '';
    let courses = [...USERS[currentUser].courses];

    courses.sort((a, b) => {
        let valA, valB;
        switch (sortState.key) {
            case 'id':
                valA = a.id;
                valB = b.id;
                break;
            case 'name':
                valA = a.name;
                valB = b.name;
                break;
            case 'professor':
                valA = a.professor;
                valB = b.professor;
                break;
            case 'schedule':
                valA = a.schedule || '';
                valB = b.schedule || '';
                break;
            case 'exam':
                valA = a.exam || '';
                valB = b.exam || '';
                break;
            case 'units':
                valA = a.units || '';
                valB = b.units || '';
                break;
            default:
                valA = a.id;
                valB = b.id;
        }
        if (typeof valA === 'number') return sortState.asc ? valA - valB : valB - valA;
        return sortState.asc ? valA.localeCompare(valB, 'fa') : valB.localeCompare(valA, 'fa');
    });

    courses.forEach((course, idx) => {
        const schedule = parseSchedule(course.schedule);
        const dayName = schedule ? DAYS_MAP[schedule.dayIndex] : 'نامشخص';
        const timeStr = schedule ? `${schedule.startTime} تا ${schedule.endTime}` : 'نامشخص';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
            <td>${dayName} ${timeStr}</td>
            <td>${course.exam || '<span style="color:#aaa;">ثبت نشده</span>'}</td>
            <td>${course.units || '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== ساخت جدول امتحانات ==========
function renderExamsTable() {
    const tbody = document.getElementById('exams-body');
    if (!tbody || !currentUser) return;
    tbody.innerHTML = '';
    const courses = USERS[currentUser].courses;
    const exams = courses
        .filter(c => c.exam)
        .map(c => ({ ...c, examData: parseExamDate(c.exam) }))
        .filter(c => c.examData);

    exams.sort((a, b) => {
        const ea = a.examData, eb = b.examData;
        if (ea.year !== eb.year) return ea.year - eb.year;
        if (ea.month !== eb.month) return ea.month - eb.month;
        if (ea.day !== eb.day) return ea.day - eb.day;
        return (ea.hour * 60 + ea.minute) - (eb.hour * 60 + eb.minute);
    });

    exams.forEach(course => {
        const tr = document.createElement('tr');
        const dateStr = `${course.examData.year}/${String(course.examData.month).padStart(2, '0')}/${String(course.examData.day).padStart(2, '0')}`;
        const timeStr = `${String(course.examData.hour).padStart(2, '0')}:${String(course.examData.minute).padStart(2, '0')}`;
        tr.innerHTML = `
            <td>${dateStr}</td>
            <td>${timeStr}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== تب‌ها و مرتب‌سازی ==========
function setupTabsAndSorting() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const target = tab.getAttribute('data-tab');
            if (target === 'weekly') document.getElementById('weekly-tab').classList.add('active');
            else if (target === 'list') document.getElementById('list-tab').classList.add('active');
            else if (target === 'exams') document.getElementById('exams-tab').classList.add('active');
        });
    });

    document.querySelectorAll('#courses-list-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-sort');
            if (sortState.key === key) {
                sortState.asc = !sortState.asc;
            } else {
                sortState.key = key;
                sortState.asc = true;
            }
            renderListTable();
        });
    });
}

// ========== مدیریت منوی کاربر ==========
function setupUserMenu() {
    const userButton = document.getElementById('user-button');
    const dropdown = document.getElementById('user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    userButton.addEventListener('click', () => {
        const expanded = userButton.getAttribute('aria-expanded') === 'true';
        userButton.setAttribute('aria-expanded', String(!expanded));
        dropdown.classList.toggle('show', !expanded);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.user-menu')) {
            userButton.setAttribute('aria-expanded', 'false');
            dropdown.classList.remove('show');
        }
    });

    logoutBtn.addEventListener('click', handleLogout);
}

// ========== نمایش نام کاربر ==========
function updateUserDisplay() {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl && currentUser) {
        userNameEl.textContent = USERS[currentUser].displayName + ' خوش آمدی';
    }
}

// ========== به‌روزرسانی فوتر (متن ثابت) ==========
function updateFooter() {
    const footerEl = document.getElementById('footer-text');
    if (footerEl) {
        footerEl.textContent = 'شهریور 1405،محمد';
    }
}

// ========== به‌روزرسانی theme-color بر اساس دارک مود ==========
function updateThemeColor() {
    const metaThemeColor = document.getElementById('theme-color-meta');
    if (!metaThemeColor) return;
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    metaThemeColor.setAttribute('content', isDark ? '#000000' : '#ffffff');
}

// ========== نوتیفیکیشن‌ها ==========
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

function showUpdateToast() {
    const toast = document.getElementById('update-toast');
    if (!toast) return;
    toast.textContent = 'نسخه جدید آماده است';
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 5000);
}

// ========== لاگین ==========
function safeLocalStorage(action, key, value = null) {
    try {
        if (action === 'set') localStorage.setItem(key, value);
        else if (action === 'get') return localStorage.getItem(key);
        else if (action === 'remove') localStorage.removeItem(key);
    } catch (e) {
        console.warn('خطا در localStorage:', e);
        return null;
    }
}

function checkLogin() {
    const saved = safeLocalStorage('get', 'logged_in_user');
    return saved && USERS[saved] ? saved : null;
}

function showMainContent() {
    document.getElementById('login-overlay').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    updateUserDisplay();
    updateAll();
}

function showLogin() {
    document.getElementById('login-overlay').classList.remove('hidden');
    document.getElementById('main-content').classList.add('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('login-error');

    if (!USERS[username]) {
        showToast('❌ نام کاربری اشتباه است');
        errorEl.textContent = 'نام کاربری اشتباه است';
        return;
    }
    if (USERS[username].password !== password) {
        showToast('❌ رمز عبور اشتباه است');
        errorEl.textContent = 'رمز عبور اشتباه است';
        return;
    }

    safeLocalStorage('set', 'logged_in_user', username);
    currentUser = username;
    errorEl.textContent = '';
    document.getElementById('login-form').reset();
    showMainContent();
}

function handleLogout() {
    safeLocalStorage('remove', 'logged_in_user');
    currentUser = null;
    showLogin();
}

// ========== به‌روزرسانی همه ==========
function updateAll() {
    updateClock();
    updateMainBox();
    renderScheduleTable();
    renderListTable();
    renderExamsTable();
    updateFooter();
    updateThemeColor();
}

// ========== PWA ==========
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateToast();
                        }
                    });
                });
                setInterval(() => {
                    reg.update();
                }, 60 * 60 * 1000);
            })
            .catch(err => console.log('SW registration failed:', err));
    }
}

// ========== اجرای اولیه ==========
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundDots();
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    setupTabsAndSorting();
    setupUserMenu();
    registerServiceWorker();
    updateThemeColor();

    // گوش دادن به تغییرات دارک مود سیستم
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        updateThemeColor();
    });

    const savedUser = checkLogin();
    if (savedUser) {
        currentUser = savedUser;
        showMainContent();
    } else {
        showLogin();
    }

    setInterval(() => {
        if (currentUser) {
            updateClock();
            updateMainBox();
            const now = new Date();
            if (now.getSeconds() % 5 === 0) {
                renderScheduleTable();
                renderListTable();
                renderExamsTable();
                updateFooter();
                updateThemeColor();
            }
        }
    }, 1000);
});
