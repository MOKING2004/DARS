// ========== داده‌های دروس ==========
const courses = [
    {
        name: "انس با قرآن کریم",
        professor: "محمدحسن مقصودی گودرزی",
        schedule: "دوشنبه از 16:30 تا 18:00",
        exam: "1405/10/14 از 12:45 تا 13:45"
    },
    {
        name: "زبان انگلیسی عمومی-ترکیبی(2)",
        professor: "مريم بيرجندي",
        schedule: "يكشنبه از 19:30 تا 20:15",
        exam: "1405/11/02 از 13:00 تا 14:00"
    },
    {
        name: "حقوق مدنی (3) کلیات قراردادها",
        professor: "عبدالمحمد کردی",
        schedule: "سه شنبه از 07:30 تا 09:45",
        exam: "1405/10/19 از 10:30 تا 12:00"
    },
    {
        name: "حقوق تجارت (3) اسناد تجاری",
        professor: "حسین شعبان پور",
        schedule: "چهارشنبه از 13:00 تا 14:30",
        exam: "1405/10/15 از 10:30 تا 12:00"
    },
    {
        name: "اصول فقه (1)",
        professor: "محمد گودرزی",
        schedule: "يكشنبه از 08:00 تا 09:30",
        exam: "1405/10/13 از 10:30 تا 12:00"
    },
    {
        name: "حقوق سازمان‌های بین‌المللی",
        professor: "رضا کرمی",
        schedule: "يكشنبه از 10:00 تا 11:30",
        exam: "1405/10/20 از 08:30 تا 10:00"
    },
    {
        name: "آیین دادرسی مدنی (1)",
        professor: "محمدصفر نوروزی",
        schedule: "دوشنبه از 14:45 تا 16:15",
        exam: "1405/10/14 از 08:30 تا 10:00"
    },
    {
        name: "تفسیر موضوعی قرآن",
        professor: "مجتبی بیرانوند",
        schedule: "يكشنبه از 13:00 تا 14:30",
        exam: "1405/10/13 از 12:45 تا 13:45"
    },
    {
        name: "حقوق بین المللی عمومی (3) روش های حل و فصل مسالمت آمیز اختلافات",
        professor: "مهدی یوسف وند",
        schedule: "يكشنبه از 14:45 تا 16:15",
        exam: "1405/10/21 از 08:30 تا 10:00"
    },
    {
        name: "حقوق جزای عمومی (2)",
        professor: "رضا محبي فر",
        schedule: "يكشنبه از 16:30 تا 18:00",
        exam: "1405/10/22 از 08:30 تا 10:00"
    },
    {
        name: "تربیت بدنی",
        professor: "وحيد ترک ملک",
        schedule: "شنبه از 13:00 تا 14:30",
        exam: "1405/10/10 از 10:30 تا 12:00"
    },
    {
        name: "ورزش 1",
        professor: "حسین ساکی",
        schedule: "شنبه از 14:45 تا 16:15",
        exam: ""
    },
    {
        name: "زبان انگلیسی عمومی-ترکیبی(3)",
        professor: "سينا کسرائي",
        schedule: "شنبه از 19:15 تا 20:00",
        exam: "1405/10/25 از 13:00 تا 14:00"
    }
];

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

    const datePart = parts[0].trim(); // "1405/10/14"
    const timePart = parts[1].trim(); // "12:45 تا 13:45"
    const examTime = timePart.split(' تا ')[0].trim(); // "12:45"

    const [year, month, day] = datePart.split('/').map(Number);
    const [hour, minute] = examTime.split(':').map(Number);

    return { year, month, day, hour, minute };
}

function getIranNow() {
    // تبدیل زمان فعلی به وقت ایران
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' }));
}

function getCurrentDayIndex() {
    const now = getIranNow();
    // getDay(): 0 یکشنبه، 1 دوشنبه، ... 6 شنبه
    // تبدیل به ایندکس ما: شنبه=0
    const map = [6, 0, 1, 2, 3, 4, 5];
    return map[now.getDay()];
}

function getCurrentTimeString() {
    return getIranNow().toTimeString().slice(0, 5); // "HH:MM"
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
    const now = getIranNow();
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const parts = formatter.formatToParts(now);
    const get = (type) => Number(parts.find(p => p.type === type)?.value);
    return { year: get('year'), month: get('month'), day: get('day') };
}

function getTomorrowShamsiDate() {
    const now = getIranNow();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const parts = formatter.formatToParts(tomorrow);
    const get = (type) => Number(parts.find(p => p.type === type)?.value);
    return { year: get('year'), month: get('month'), day: get('day') };
}

// ========== تشخیص کلاس در حال برگزاری ==========
function getCurrentClass() {
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

// ========== تشخیص امتحان‌های پیش رو ==========
function getUpcomingExams() {
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

        // اگر امتحان فردا باشد
        if (examDate.year === tomorrow.year && examDate.month === tomorrow.month && examDate.day === tomorrow.day) {
            upcoming.push({ course, exam, type: 'tomorrow' });
        }
        // اگر امتحان امروز باشد و هنوز وقتش نگذشته
        else if (examDate.year === today.year && examDate.month === today.month && examDate.day === today.day) {
            if (currentTime < examTimeStr) {
                upcoming.push({ course, exam, type: 'today' });
            }
        }
    }
    return upcoming;
}

// ========== نمایش ساعت و تاریخ ==========
function updateClock() {
    const now = getIranNow();
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');
    if (!clockEl || !dateEl) return;

    const optionsTime = {
        timeZone: 'Asia/Tehran',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const optionsDate = {
        timeZone: 'Asia/Tehran',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };

    clockEl.textContent = now.toLocaleTimeString('fa-IR', optionsTime);
    dateEl.textContent = now.toLocaleDateString('fa-IR', optionsDate);
}

// ========== به‌روزرسانی باکس کلاس جاری ==========
function updateCurrentClassBox() {
    const box = document.getElementById('current-class-box');
    const info = document.getElementById('current-class-info');
    if (!box || !info) return;

    const currentClass = getCurrentClass();

    if (currentClass) {
        box.classList.remove('empty');
        info.innerHTML = `${currentClass.name} - ${currentClass.professor}`;
    } else {
        box.classList.add('empty');
        info.textContent = 'کلاسی در حال برگزاری نیست';
    }
}

// ========== به‌روزرسانی باکس امتحان‌های نزدیک ==========
function updateExamReminderBox() {
    const box = document.getElementById('exam-reminder-box');
    const info = document.getElementById('exam-reminder-info');
    if (!box || !info) return;

    const upcomingExams = getUpcomingExams();

    if (upcomingExams.length === 0) {
        info.textContent = 'امتحانی نزدیک نیست';
        return;
    }

    if (upcomingExams.length === 1) {
        const exam = upcomingExams[0];
        const typeText = exam.type === 'today' ? 'امروز' : 'فردا';
        info.innerHTML = `${exam.course.name} - ${typeText} ساعت ${String(exam.exam.hour).padStart(2, '0')}:${String(exam.exam.minute).padStart(2, '0')}`;
    } else {
        const examList = upcomingExams.map(exam => {
            const typeText = exam.type === 'today' ? 'امروز' : 'فردا';
            return `${exam.course.name} (${typeText} ${String(exam.exam.hour).padStart(2, '0')}:${String(exam.exam.minute).padStart(2, '0')})`;
        }).join(' | ');
        info.innerHTML = examList;
    }
}

// ========== ساخت جدول برنامه هفتگی ==========
function renderScheduleTable() {
    const tbody = document.getElementById('schedule-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const todayIndex = getCurrentDayIndex();
    const currentClass = getCurrentClass();
    const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

    // مرتب‌سازی: ابتدا بر اساس روز، سپس زمان شروع
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

        const dayName = dayNames[schedule.dayIndex];
        const tr = document.createElement('tr');

        // هایلایت ردیف امروز
        if (schedule.dayIndex === todayIndex) {
            tr.classList.add('today-row');
        }

        // هایلایت کلاس در حال برگزاری
        if (currentClass && course.name === currentClass.name && course.professor === currentClass.professor) {
            tr.classList.add('current-class-row');
        }

        tr.innerHTML = `
            <td>${dayName}</td>
            <td>${schedule.startTime} تا ${schedule.endTime}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
            <td>${course.exam || '<span style="color:#aaa;">-</span>'}</td>
        `;

        tbody.appendChild(tr);
    });
}

// ========== ساخت جدول لیست دروس ==========
function renderListTable() {
    const tbody = document.getElementById('list-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    courses.forEach((course, index) => {
        const schedule = parseSchedule(course.schedule);
        const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
        const dayName = schedule ? dayNames[schedule.dayIndex] : 'نامشخص';
        const timeStr = schedule ? `${schedule.startTime} تا ${schedule.endTime}` : 'نامشخص';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
            <td>${dayName} ${timeStr}</td>
            <td>${course.exam || '<span style="color:#aaa;">-</span>'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== تب‌ها ==========
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // حذف کلاس active از همه تب‌ها
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // مخفی کردن همه محتواها
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // نمایش محتوای مربوطه
            const target = tab.getAttribute('data-tab');
            if (target === 'weekly') {
                document.getElementById('weekly-tab').classList.add('active');
            } else {
                document.getElementById('list-tab').classList.add('active');
            }
        });
    });
}

// ========== لاگین ==========
function checkLogin() {
    const saved = localStorage.getItem('mok_logged_in');
    return saved === 'true';
}

function showMainContent() {
    document.getElementById('login-overlay').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
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

    if (username === 'MOK' && password === '13241234') {
        localStorage.setItem('mok_logged_in', 'true');
        errorEl.textContent = '';
        document.getElementById('login-form').reset();
        showMainContent();
    } else {
        errorEl.textContent = 'نام کاربری یا رمز عبور اشتباه است';
    }
}

function handleLogout() {
    localStorage.removeItem('mok_logged_in');
    showLogin();
}

// ========== به‌روزرسانی همه ==========
function updateAll() {
    updateClock();
    updateCurrentClassBox();
    updateExamReminderBox();
    renderScheduleTable();
    renderListTable();
}

// ========== اجرای اولیه ==========
document.addEventListener('DOMContentLoaded', () => {
    // تنظیم رویدادها
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    setupTabs();

    // بررسی وضعیت لاگین
    if (checkLogin()) {
        showMainContent();
    } else {
        showLogin();
    }

    // به‌روزرسانی هر ثانیه
    setInterval(() => {
        if (checkLogin()) {
            updateClock();
            updateCurrentClassBox();
            updateExamReminderBox();
            // جدول‌ها هر ۵ ثانیه یک‌بار بازسازی شوند
            const now = new Date();
            if (now.getSeconds() % 5 === 0) {
                renderScheduleTable();
                renderListTable();
            }
        }
    }, 1000);
});
