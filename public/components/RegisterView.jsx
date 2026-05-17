const { useState } = React;

const RegisterView = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault(); // Зупиняємо стандартне перезавантаження
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Звертаємося до нашого сервера
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // "Реєстрація успішна!"
                // Очищаємо форму
                setLogin(''); setEmail(''); setPassword('');
                // Через 2 секунди перенаправляємо на сторінку входу
                setTimeout(() => window.location.href = 'login.html', 2000);
            } else {
                setError(data.error || 'Сталася помилка');
            }
        } catch (err) {
            setError('Проблема зі з\'єднанням із сервером');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bgc-white br-radius-24px pg-2 br-1 brc-0" style={{width: '100%', maxWidth: '400px', boxSizing: 'border-box'}}>
            <h2 className="text-al-center ymg-16px">Створити акаунт</h2>
            
            {/* Блоки для виводу повідомлень */}
            {error && <div className="tmg-16px pg-8px br-radius-16px" style={{backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center'}}>{error}</div>}
            {message && <div className="tmg-16px pg-8px br-radius-16px" style={{backgroundColor: '#e8f5e9', color: '#2e7d32', textAlign: 'center'}}>{message}</div>}

            <form onSubmit={handleRegister} className="flex-container-column tmg-16px">
                <label className="ymg-8px"><b>Логін:</b></label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required />

                <label className="ymg-8px tmg-16px"><b>Електронна пошта:</b></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required />

                <label className="ymg-8px tmg-16px"><b>Пароль:</b></label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required />

                <button type="submit" className={`pg-16px br-radius-16px tmg-24px ${loading ? 'white-btn' : 'prpl-btn'}`} disabled={loading}>
                    {loading ? 'Обробка...' : 'Зареєструватися'}
                </button>
            </form>

            <p className="text-al-center tmg-16px" style={{fontSize: '0.9rem'}}>
                Вже є акаунт? <a href="login.html" className="cl-prpl" style={{textDecoration: 'underline'}}>Увійти</a>
            </p>
        </div>
    );
};