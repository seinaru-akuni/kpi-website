const { useState } = React;

// --- КОМПОНЕНТИ ПОГОДИ (перенесені з index.html) ---
const WeatherCard = ({ day }) => (
    <div className="bgc-0 br-radius-16px pg-16px br-1 brc-0 flex-container-column x-center y-center" style={{minWidth: '130px'}}>
        <p className="mg-0" style={{textTransform: 'capitalize'}}><b>{day.date}</b></p>
        <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.desc} />
        <h2 className="mg-0 cl-prpl">{Math.round(day.temp)}°C</h2>
        <p className="mg-0 tmg-8px text-al-center" style={{fontSize: '0.85rem', color: '#555'}}>{day.desc}</p>
    </div>
);

const WeatherWidget = () => {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = '23058113e34db50359b4e4986fa76211'; 

    const fetchWeather = async (searchCity) => {
        setLoading(true);
        setError(null);
        setForecast([]);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); 

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&lang=ua&appid=${API_KEY}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId); 

            if (!response.ok) {
                if (response.status === 404) throw new Error("Місто не знайдено. Перевірте назву.");
                if (response.status === 401) throw new Error("Помилка авторизації. Перевірте API ключ.");
                throw new Error(`Помилка сервера: ${response.status}`);
            }

            const data = await response.json(); 

            const dailyData = data.list
                .filter(item => item.dt_txt.includes("12:00:00"))
                .map(item => ({
                    date: new Date(item.dt_txt).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'short' }),
                    temp: item.main.temp,
                    desc: item.weather[0].description,
                    icon: item.weather[0].icon
                }));

            setForecast(dailyData);
        } catch (err) {
            if (err.name === 'AbortError') {
                setError("Перевищено час очікування відповіді від сервера (Таймаут).");
            } else if (err.message === "Failed to fetch") {
                setError("Проблема з підключенням до Інтернету.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
            fetchWeather(city.trim());
        }
    };

    return (
        <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '800px'}}>
            <h2 className="ymg-16px text-al-center">Прогноз погоди на 5 днів</h2>
            <p className="text-al-center mg-0 ymg-8px" style={{color: 'gray'}}>Плануйте свій день та відслідковуйте вплив погоди на настрій.</p>

            <form onSubmit={handleSubmit} className="flex-container-row flex-space-between tmg-16px al-items-stretch" style={{gap: '12px'}}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Наприклад: Київ, Львів, London..."
                    className="pg-8px br-1 brc-0 br-radius-16px flex-2"
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    className={`pg-8px xpg-24px br-radius-16px flex-1 ${loading ? 'white-btn' : 'prpl-btn'}`} 
                    disabled={loading}
                >
                    {loading ? 'Пошук...' : 'Отримати прогноз'}
                </button>
            </form>

            {error && (
                <div className="tmg-16px pg-16px br-radius-16px" style={{backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a'}}>
                    <strong>Помилка: </strong> {error}
                </div>
            )}

            {loading && (
                <div className="tmg-24px flex-container-column x-center y-center">
                    <div className="loader-spinner"></div>
                    <p className="tmg-8px cl-prpl">Зв'язок із сервером OpenWeatherMap...</p>
                </div>
            )}

            {!loading && !error && forecast.length > 0 && (
                <div className="flex-container-row flex-space-between tmg-24px" style={{overflowX: 'auto', gap: '16px'}}>
                    {forecast.map((day, index) => (
                        <WeatherCard key={index} day={day} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- ГОЛОВНИЙ КОМПОНЕНТ HOME VIEW ---
const HomeView = ({ onNavigate }) => {
    return (
        <React.Fragment>
            <div className="container-fluid flex-container-column x-center y-center text-al-center">
                <h1>ЗБЕРІГАЙ СВОЇ ДУМКИ</h1>
                <h1>АНАЛІЗУЙ СВІЙ СТАН</h1>
                <h3>MindFlow — це ваш особистий простір для ведення записів, відстеження емоційного стану та пошуку гармонії з собою.</h3>
                <div className="flex-container-row clmp-xmg" style={{gap: '15px'}}>
                    {/* Кнопки тепер керують навігацією всередині SPA */}
                    <button onClick={() => onNavigate('new')} className="btn ypg-8px clmp-xpg-2 prpl-btn br-radius-16px">Створити запис</button>
                    <button onClick={() => onNavigate('feed')} className="btn ypg-8px clmp-xpg-2 white-btn br-radius-16px">Мої записи</button>
                </div>
            </div>
            
            {/* Блоки з описом */}
            <div className="flex-container-row mg-2 flex-wrap" id="desktop-main-2-content" style={{gap: '20px'}}>
                <div className="flex-container-column x-center y-center clmp-xmg-2 bgc-white flex-1 br-radius-24px" style={{minWidth: '250px'}}>
                    <h2>Особистий щоденник</h2>
                    <p className="text-al-center">Записуйте свої думки, ідеї та переживання у зручному та безпечному форматі. Додавайте теги для легкої навігації.</p>
                </div>
                <div className="flex-container-column x-center y-center clmp-xmg-2 bgc-white flex-1 br-radius-24px" style={{minWidth: '250px'}}>
                    <h2>Аналізуйте свій стан</h2>
                    <p className="text-al-center">Використовуйте інструменти аналізу, щоб краще розуміти свої емоції та поведінку. MindFlow допоможе вам виявити патерни.</p>
                </div>
                <div className="flex-container-column x-center y-center clmp-xmg-2 bgc-white flex-1 br-radius-24px" style={{minWidth: '250px'}}>
                    <h2>Знаходьте гармонію</h2>
                    <p className="text-al-center">Регулярне ведення щоденника допомагає знизити стрес, структурувати думки та знайти внутрішній спокій.</p>
                </div>
            </div>

            {/* Віджет погоди */}
            <div className="w100 flex-container-column x-center y-center ymg-2">
                <WeatherWidget />
            </div>
        </React.Fragment>
    );
};