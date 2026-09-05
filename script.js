// ========== داده‌های دقیق دروس ==========
const courses = [
    {
        name: "تربیت بدنی",
        professor: "وحید ترک ملک",
        schedule: "شنبه از 13:00 تا 14:30",
        exam: "1405/10/10 از 10:30 تا 12:00",
        units: "۰/۵"
    },
    {
        name: "ورزش ۱",
        professor: "حسین ساکی",
        schedule: "شنبه از 14:45 تا 16:15",
        exam: "",
        units: "۱ (عملی)"
    },
    {
        name: "زبان انگلیسی عمومی-ترکیبی (۳)",
        professor: "سینا کسرائی",
        schedule: "شنبه از 19:15 تا 20:00",
        exam: "1405/10/25 از 13:00 تا 14:00",
        units: "۱"
    },
    {
        name: "اصول فقه (۱)",
        professor: "محمد گودرزی",
        schedule: "یکشنبه از 08:00 تا 09:30",
        exam: "1405/10/13 از 10:30 تا 12:00",
        units: "۲"
    },
    {
        name: "حقوق سازمان‌های بین‌المللی",
        professor: "رضا کرمی",
        schedule: "یکشنبه از 10:00 تا 11:30",
        exam: "1405/10/20 از 08:30 تا 10:00",
        units: "۲"
    },
    {
        name: "تفسیر موضوعی قرآن",
        professor: "مجتبی بیرانوند",
        schedule: "یکشنبه از 13:00 تا 14:30",
        exam: "1405/10/13 از 12:45 تا 13:45",
        units: "۲"
    },
    {
        name: "حقوق بین‌الملل عمومی (۳) روش‌های حل و فصل مسالمت‌آمیز اختلافات",
        professor: "مهدی یوسف وند",
        schedule: "یکشنبه از 14:45 تا 16:15",
        exam: "1405/10/21 از 08:30 تا 10:00",
        units: "۲"
    },
    {
        name: "حقوق جزای عمومی (۲)",
        professor: "رضا محبی فر",
        schedule: "یکشنبه از 16:30 تا 18:00",
        exam: "1405/10/22 از 08:30 تا 10:00",
        units: "۲"
    },
    {
        name: "زبان انگلیسی عمومی-ترکیبی (۲)",
        professor: "مریم بیرجندی",
        schedule: "یکشنبه از 19:30 تا 20:15",
        exam: "1405/11/02 از 13:00 تا 14:00",
        units: "۱"
    },
    {
        name: "آیین دادرسی مدنی (۱)",
        professor: "محمدصفر نوروزی",
        schedule: "دوشنبه از 14:45 تا 16:15",
        exam: "1405/10/14 از 08:30 تا 10:00",
        units: "۲"
    },
    {
        name: "انس با قرآن کریم",
        professor: "محمدحسن مقصودی گودرزی",
        schedule: "دوشنبه از 16:30 تا 18:00",
        exam: "1405/10/14 از 12:45 تا 13:45",
        units: "۱"
    },
    {
        name: "حقوق مدنی (۳) کلیات قراردادها",
        professor: "عبدالمحمد کردی",
        schedule: "سه شنبه از 07:30 تا 09:45",
        exam: "1405/10/19 از 10:30 تا 12:00",
        units: "۳"
    },
    {
        name: "حقوق تجارت (۳) اسناد تجاری",
        professor: "حسین شعبان پور",
        schedule: "چهارشنبه از 13:00 تا 14:30",
        exam: "1405/10/15 از 10:30 تا 12:00",
        units: "۲"
    }
];

// ========== بقیه توابع (بدون تغییر از نسخه قبلی) ==========
// ... (توابع parseSchedule, parseExamDate, getIranNow, ...)

// ========== ساخت جدول برنامه هفتگی ==========
function renderScheduleTable() {
    const tbody = document.getElementById('schedule-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const todayIndex = getCurrentDayIndex();
    const currentClass = getCurrentClass();
    const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

    // مرتب‌سازی بر اساس روز و زمان
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

        if (schedule.dayIndex === todayIndex) tr.classList.add('today-row');
        if (currentClass && course.name === currentClass.name && course.professor === currentClass.professor) {
            tr.classList.add('current-class-row');
        }

        tr.innerHTML = `
            <td>${dayName}</td>
            <td>${schedule.startTime} تا ${schedule.endTime}</td>
            <td>${course.name}</td>
            <td>${course.professor}</td>
            <td>${course.units || '—'}</td>
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
            <td>${course.exam || '<span style="color:#aaa;">ثبت نشده</span>'}</td>
            <td>${course.units || '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ========== اجرای اولیه (بدون تغییر) ==========
// ...
