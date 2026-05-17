const { useState } = React;

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Успішний логін -> перехід на головну SPA сторінку
                window.location.href = 'index.html';
            } else {
                setError(data.error || 'Невірні дані');
            }
        } catch (err) {
            setError('Проблема зі з\'єднанням із сервером');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bgc-white br-radius-24px pg-2 br-1 brc-0" style={{width: '100%', maxWidth: '400px', boxSizing: 'border-box'}}>
            <h2 className="text-al-center ymg-16px">Вхід у MindFlow</h2>
            
            {error && <div className="tmg-16px pg-8px br-radius-16px" style={{backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center'}}>{error}</div>}

            <form onSubmit={handleLogin} className="flex-container-column tmg-16px">
                <label className="ymg-8px"><b>Електронна пошта або логін:</b></label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required />

                <label className="ymg-8px tmg-16px"><b>Пароль:</b></label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required />

                <button type="submit" className={`pg-16px br-radius-16px tmg-24px ${loading ? 'white-btn' : 'prpl-btn'}`} disabled={loading}>
                    {loading ? 'Перевірка...' : 'Увійти'}
                </button>
            </form>
            
            <p className="text-al-center tmg-16px" style={{fontSize: '0.9rem'}}>
                Ще немає акаунту? <a href="register.html" className="cl-prpl" style={{textDecoration: 'underline'}}>Зареєструватися</a>
            </p>
        </div>
    );
};