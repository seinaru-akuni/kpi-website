const ProfileView = ({ username, entries = [] }) => {
    
    // --- ОБЧИСЛЕННЯ РЕАЛЬНОЇ СТАТИСТИКИ ---
    let totalEntries = entries.length;
    let avgMood = 0;
    let popularTag = '-';
    let activityDaysCount = 0;

    if (totalEntries > 0) {
        // 1. Середня оцінка стану
        const sumMood = entries.reduce((sum, entry) => sum + parseInt(entry.mood, 10), 0);
        avgMood = (sumMood / totalEntries).toFixed(1);

        // 2. Найпопулярніший тег
        const tagCounts = {};
        entries.forEach(entry => {
            if (entry.tags) {
                const tagsArray = entry.tags.split(',').map(t => t.trim()).filter(t => t !== '');
                tagsArray.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            }
        });

        if (Object.keys(tagCounts).length > 0) {
            popularTag = Object.keys(tagCounts).reduce((a, b) => tagCounts[a] > tagCounts[b] ? a : b);
        }

        // 3. Розрахунок активності у днях (рахуємо лише унікальні дати, де є бодай один запис)
        const uniqueDays = new Set(entries.map(e => e.date));
        activityDaysCount = uniqueDays.size;
    }

    // Допоміжна функція для правильного відмінювання слова "день"
    const getDaysWord = (count) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'днів';
        if (lastDigit === 1) return 'день';
        if (lastDigit >= 2 && lastDigit <= 4) return 'дні';
        return 'днів';
    };

    return (
        <main className="flex-container-column x-center y-center mg-2">
            {/* Обмежуємо ширину до 500px, щоб одна колонка виглядала акуратно та збалансовано */}
            <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '500px', boxSizing: 'border-box'}}>
                <h2 className="ymg-16px text-al-center">Профіль користувача</h2>

                {/* Блок аватара користувача */}
                <div className="text-al-center ymg-16px">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cl-prpl bgc-0 br-radius-32px pg-16px" style={{border: '1px solid rgb(192, 192, 192)'}}>
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                    </svg>
                    <h3 className="tmg-8px ymg-0">{username}</h3>
                </div>

                {/* Блок згенерованої статистики */}
                <h4 className="tmg-24px bbr-1 brc-0 pg-8px text-al-center">Статистика активності</h4>
                <ul style={{lineHeight: '2.2', paddingLeft: '20px', listStyleType: 'square', maxWidth: '360px', margin: '0 auto'}}>
                    <li>Всього створено записів: <span className="cl-prpl"><b>{totalEntries}</b></span></li>
                    <li>Середня оцінка стану: <b>{totalEntries > 0 ? `${avgMood} / 5` : '-'}</b></li>
                    <li>Найбільш часто використовуваний тег: <b style={{color: 'rgb(92, 43, 226)'}}>{popularTag}</b></li>
                    {/* Дні рахуються динамічно та красиво відмінюються (наприклад: 1 день, 3 ні, 5 днів) */}
                    <li>Активність облікового запису: <b>{totalEntries > 0 ? `${activityDaysCount} ${getDaysWord(activityDaysCount)}` : '0 днів'}</b></li>
                </ul>
            </div>
        </main>
    );
};