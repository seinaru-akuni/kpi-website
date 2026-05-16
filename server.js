const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// === НАЛАШТУВАННЯ (Middleware) ===
// Вчимо сервер читати дані у форматі JSON (те, що надсилає React)
app.use(express.json()); 
// Вчимо сервер читати Cookies (вимога лаби)
app.use(cookieParser()); 
// Вказуємо серверу, що всі HTML, CSS та JS файли лежать у папці public
app.use(express.static(path.join(__dirname, 'public'))); 

// Шляхи до наших текстових "баз даних" (вимога лаби)
const usersFile = path.join(__dirname, 'data', 'users.json');
const entriesFile = path.join(__dirname, 'data', 'entries.json');

// Допоміжні функції для читання та запису у файли
const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));


// === REST API ЕНДПОЇНТИ (Пункт 6) ===

// 1. Ендпоїнт Реєстрації (POST-запит)
app.post('/api/register', (req, res) => {
    const { login, email, password } = req.body;
    const users = readData(usersFile);

    // Перевіряємо, чи є вже такий користувач
    if (users.find(u => u.email === email || u.login === login)) {
        return res.status(400).json({ error: "Користувач з таким логіном або email вже існує." });
    }

    // Додаємо нового користувача
    users.push({ login, email, password });
    writeData(usersFile, users);

    res.status(201).json({ message: "Реєстрація успішна!" });
});

// 2. Ендпоїнт Логіну (POST-запит)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = readData(usersFile);

    // Шукаємо користувача
    const user = users.find(u => (u.email === email || u.login === email) && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Невірний логін або пароль." });
    }

    // Встановлюємо Cookie з логіном користувача на 24 години (вимога про Cookies)
    res.cookie('username', user.login, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    
    res.json({ message: "Вхід успішний!", user: user.login });
});

// 3. Ендпоїнт отримання карток Дашборду (GET-запит)
app.get('/api/entries', (req, res) => {
    // Читаємо Cookie, щоб зрозуміти, хто це запитує
    const username = req.cookies.username;

    if (!username) {
        return res.status(401).json({ error: "Ви не авторизовані." });
    }

    const allEntries = readData(entriesFile);
    // Віддаємо тільки ті записи, які належать поточному користувачу
    const userEntries = allEntries.filter(entry => entry.user === username);

    res.json(userEntries);
});

// 4. Ендпоїнт динамічного контенту (залежність від часу - вимога лаби)
app.get('/api/theme', (req, res) => {
    const currentHour = new Date().getHours();
    // Якщо час від 18:00 до 06:00 - темна тема, інакше - світла
    const theme = (currentHour >= 18 || currentHour < 6) ? 'dark' : 'light';
    
    res.json({ theme: theme });
});


// === ЗАПУСК СЕРВЕРА ===
app.listen(PORT, () => {
    console.log(`Сервер успішно запущено! Відкрийте у браузері: http://localhost:${PORT}`);
});