const AnalyticsView = ({ entries }) => {
    // Створюємо посилання на HTML-елемент canvas, де буде малюватися графік
    const chartRef = React.useRef(null);
    // Зберігаємо екземпляр графіка, щоб мати змогу його оновлювати/видаляти
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        // Якщо записів немає, графік не будуємо
        if (!entries || entries.length === 0) return;

        // 1. ГРУПУВАННЯ ТА ОБЧИСЛЕННЯ СЕРЕДНЬОГО ЗНАЧЕННЯ
        const groupedData = {};
        
        entries.forEach(entry => {
            if (!groupedData[entry.date]) {
                groupedData[entry.date] = { sum: 0, count: 0 };
            }
            // Перетворюємо настрій з рядка на число (наприклад, "4" -> 4) і додаємо до суми
            groupedData[entry.date].sum += parseInt(entry.mood, 10);
            groupedData[entry.date].count += 1;
        });

        // 2. СОРТУВАННЯ ДАТ (від найстарішої до найновішої осі X)
        const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

        // 3. ФОРМУВАННЯ ДАНИХ ДЛЯ ОСЕЙ X та Y
        const labels = sortedDates; // Осі X (Дати)
        const dataPoints = sortedDates.map(date => {
            // Ділимо суму на кількість = отримуємо середнє значення (1 знак після коми)
            return (groupedData[date].sum / groupedData[date].count).toFixed(1); 
        });

        // 4. МАЛЮВАННЯ ГРАФІКА
        const ctx = chartRef.current.getContext('2d');

        // Якщо графік вже був намальований раніше, знищуємо його перед новим рендером (обов'язково для Chart.js)
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Створюємо новий лінійний графік
        chartInstance.current = new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Середня оцінка',
                    data: dataPoints,
                    borderColor: 'rgb(92, 43, 226)', // Фірмовий фіолетовий колір
                    backgroundColor: 'rgba(92, 43, 226, 0.2)', // Напівпрозоре заливання під лінією
                    borderWidth: 3,
                    pointBackgroundColor: 'rgb(92, 43, 226)',
                    pointRadius: 5, // Розмір крапочок на графіку
                    fill: true,
                    tension: 0.3 // Робить лінію плавною (згладжені кути)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 1, // Мінімальна оцінка настрою
                        max: 5, // Максимальна оцінка настрою
                        ticks: {
                            stepSize: 1 // Крок сітки (1, 2, 3, 4, 5)
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Приховуємо легенду для мінімалістичного вигляду
                    }
                }
            }
        });

        // Функція очищення, яка спрацьовує при переході на іншу сторінку
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [entries]); // Графік буде перемальовуватися щоразу, коли змінюються записи (entries)

    return (
        <div className="flex-container-column w100" style={{gap: '24px', paddingBottom: '24px'}}>
            
            {/* 1. БЛОК З ТАБЛИЦЕЮ (Залишається як і був) */}
            <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '900px', margin: '0 auto', overflowX: 'auto'}}>
                <h2 className="ymg-16px">Зведена таблиця аналітики емоцій</h2>
                <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead>
                        <tr style={{backgroundColor: 'rgb(246, 246, 255)'}}>
                            <th style={{padding: '12px', borderBottom: '1px solid #ccc'}}>Дата</th>
                            <th style={{padding: '12px', borderBottom: '1px solid #ccc'}}>Оцінка</th>
                            <th style={{padding: '12px', borderBottom: '1px solid #ccc'}}>Теги</th>
                            <th style={{padding: '12px', borderBottom: '1px solid #ccc'}}>Фрагмент тексту</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{padding: '12px', textAlign: 'center'}}>Дані відсутні</td>
                            </tr>
                        ) : (
                            entries.map(item => (
                                <tr key={item.id}>
                                    <td style={{padding: '12px', borderBottom: '1px solid #eee'}}>{item.date}</td>
                                    <td style={{padding: '12px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: 'rgb(92, 43, 226)'}}>{item.mood} / 5</td>
                                    <td style={{padding: '12px', borderBottom: '1px solid #eee', color: 'gray'}}>{item.tags || '-'}</td>
                                    <td style={{padding: '12px', borderBottom: '1px solid #eee'}}>{item.content.substring(0, 60)}...</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 2. БЛОК З ГРАФІКОМ (З'являється лише якщо є дані) */}
            {entries.length > 0 && (
                <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '900px', margin: '0 auto'}}>
                    <h2 className="ymg-16px">Динаміка зміни стану</h2>
                    {/* Контейнер обов'язково повинен мати фіксовану висоту для коректної роботи Chart.js */}
                    <div style={{height: '350px', width: '100%'}}>
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            )}

        </div>
    );
};