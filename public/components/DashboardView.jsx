const { useState, useEffect } = React;

const DashboardApp = () => {
    const [currentView, setCurrentView] = useState('home');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true); // Починаємо з true, бо спочатку йде перевірка на сервері
    const [error, setError] = useState('');
    const [username, setUsername] = useState('Користувач');
    
    // ДОДАНО: Стан для перевірки, чи залогінений користувач
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ДОДАНО: Головна функція, яка перевіряє статус при завантаженні сайту
    const checkAuthAndLoadData = async () => {
        try {
            const response = await fetch('/api/me');
            const data = await response.json();

            if (data.loggedIn) {
                setIsLoggedIn(true);
                setUsername(data.username);
                await loadEntries(); // Завантажуємо записи тільки якщо користувач залогінений
            } else {
                setIsLoggedIn(false);
                setLoading(false); // Якщо це гість, просто показуємо йому сторінку без записів
            }
        } catch (err) {
            console.error("Помилка з'єднання з сервером", err);
            setIsLoggedIn(false);
            setLoading(false);
        }
    };

    // Функція завантаження записів з сервера (GET)
    const loadEntries = async () => {
        setError('');
        try {
            const response = await fetch('/api/entries');
            if (!response.ok) {
                throw new Error('Не вдалося завантажити дані');
            }
            const data = await response.json();
            setEntries(data);
            
            if (data.length > 0) setUsername(data[0].user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Запускаємо перевірку авторизації одразу при відкритті сайту
    useEffect(() => {
        checkAuthAndLoadData();
    }, []);

    // Функція додавання нового запису (POST)
    const handleAddEntry = async (newEntryData) => {
        setLoading(true);
        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntryData)
            });
            if (!response.ok) throw new Error('Помилка збереження запису');
            
            await loadEntries();
            setCurrentView('feed');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Навігація
    const navigateTo = (view) => {
        // Якщо гість намагається перейти кудись окрім головної сторінки - відправляємо на логін
        if (!isLoggedIn && view !== 'home') {
            window.location.href = 'login.html';
            return;
        }
        setCurrentView(view);
    };

    // Функція виходу
    const handleLogout = async (e) => {
        e.preventDefault();
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = 'index.html';
    };

    // Поки сервер перевіряє чи ми залогінені, показуємо екран завантаження
    if (loading && entries.length === 0) {
        return (
            <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div className="loader-spinner"></div>
                <p style={{ marginTop: '15px', color: '#6200ee', fontWeight: 'bold' }}>Завантаження MindFlow...</p>
            </div>
        );
    }

    return (
        <div>
            {/* ДОДАНО: Передаємо isLoggedIn у ваш Header */}
            <Header 
                currentView={currentView}
                navigateTo={navigateTo}
                username={username}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
            />

            <main className="flex-container-column mg-2 clmp-xmg-2">
                {error && <div style={{color: 'red', padding: '10px', backgroundColor: '#fff'}}>{error}</div>}

                {currentView === 'home' && (
                    <HomeView onNavigate={navigateTo} />
                )}

                {/* Ці компоненти показуються ТІЛЬКИ якщо користувач залогінений */}
                {isLoggedIn && currentView === 'feed' && (
                    <FeedView entries={entries} onNavigateToNew={() => setCurrentView('new')} />
                )}

                {isLoggedIn && currentView === 'new' && (
                    <NewEntryView onSave={handleAddEntry} disabled={loading} />
                )}

                {isLoggedIn && currentView === 'analytics' && (
                    <AnalyticsView entries={entries} />
                )}

                {isLoggedIn && currentView === 'profile' && (
                    <ProfileView username={username} />
                )}
            </main>
        </div>
    );
};