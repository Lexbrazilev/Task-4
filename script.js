document.getElementById('calculate').addEventListener('click', function() {
    const dateString = document.getElementById('dateInput').value.trim();
    
    if (!dateString) {
        alert('Пожалуйста, введите дату');
        return;
    }

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(dateString)) {
        alert('Дата должна быть в формате дд.мм.гггг (например, 07.07.2025)');
        return;
    }

    try {
        const [day, month, year] = dateString.split('.').map(Number);

        if (day < 1 || day > 31) {
            throw new Error('День должен быть от 01 до 31');
        }
        if (month < 1 || month > 12) {
            throw new Error('Месяц должен быть от 01 до 12');
        }

        const inputDate = new Date(year, month - 1, day);

        if (
            inputDate.getDate() !== day ||
            inputDate.getMonth() !== month - 1 ||
            inputDate.getFullYear() !== year
        ) {
            throw new Error('Некорректная дата (например, 30 февраля или 31 апреля)');
        }

        const newYear = new Date(year + 1, 0, 1);
        const diffTime = newYear - inputDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const isLeap = isLeapYear(year);

        document.getElementById('daysResult').textContent = `До Нового Года осталось: ${diffDays} дней`;
        document.getElementById('yearResult').textContent = `${year} год - ${isLeap ? 'високосный' : 'не високосный'}`;

    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});

function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}