const { useState, useEffect } = React;

const DashboardApp = () => {
    const [currentView, setCurrentView] = useState('home');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('Користувач');

    // Функція завантаження записів з сервера (GET)
    const loadEntries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/entries');
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = 'login.html';
                    return;
                }
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

    useEffect(() => {
        loadEntries();
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
        setCurrentView(view);
    };

    // Функція виходу
    const handleLogout = async (e) => {
        e.preventDefault();
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = 'index.html';
    };

    return (
        <div>
            <Header 
                currentView={currentView}
                navigateTo={navigateTo}
                username={username}
                handleLogout={handleLogout}
            />

            <main className="flex-container-column mg-2 clmp-xmg-2">
                {error && <div style={{color: 'red', padding: '10px', backgroundColor: '#fff'}}>{error}</div>}
                {loading && <div className="text-al-center pg-2">Обробка запиту сервером...</div>}

                {/* НОВИЙ КОМПОНЕНТ HOME */}
                {!loading && currentView === 'home' && (
                    <HomeView onNavigate={navigateTo} />
                )}

                {!loading && currentView === 'feed' && (
                    <FeedView entries={entries} onNavigateToNew={() => setCurrentView('new')} />
                )}

                {currentView === 'new' && (
                    <NewEntryView onSave={handleAddEntry} disabled={loading} />
                )}

                {currentView === 'analytics' && (
                    <AnalyticsView entries={entries} />
                )}

                {currentView === 'profile' && (
                    <ProfileView username={username} />
                )}
            </main>
        </div>
    );
};