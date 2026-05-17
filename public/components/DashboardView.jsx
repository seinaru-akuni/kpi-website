const DashboardView = ({ entries, onNavigateToNew }) => {
    return (
        <div className="w100" style={{maxWidth: '900px', margin: '0 auto'}}>
            <div className="flex-container-row flex-space-between y-center ymg-16px">
                <h2>Ваші останні записи</h2>
                <button onClick={onNavigateToNew} className="prpl-btn pg-8px xpg-16px br-radius-16px">
                    + Створити запис
                </button>
            </div>
            
            {entries.length === 0 ? (
                <div className="text-al-center pg-2 bgc-white br-radius-24px br-1 brc-0 tmg-16px">
                    <p style={{color: 'gray'}}>У вас ще немає жодного запису.</p>
                    <button onClick={onNavigateToNew} className="prpl-btn pg-8px xpg-16px br-radius-16px tmg-8px">
                        Створити свій перший запис
                    </button>
                </div>
            ) : (
                <div className="flex-container-column tmg-16px" style={{gap: '16px'}}>
                    {/* Перебираємо всі записи та створюємо для кожного карточку */}
                    {entries.map(entry => (
                        <div key={entry.id} className="bgc-white br-radius-16px pg-16px br-1 brc-0">
                            <div className="flex-container-row flex-space-between y-center flex-wrap">
                                <h3 className="mg-0">{entry.date}</h3>
                                <span className="pg-8px br-radius-16px" style={{backgroundColor: '#f6f6ff', color: '#5c2be2', fontWeight: 'bold', fontSize: '0.9rem'}}>
                                    Оцінка стану: {entry.mood}/5
                                </span>
                            </div>
                            
                            {/* Якщо є теги, показуємо їх */}
                            {entry.tags && (
                                <div className="tmg-8px flex-container-row" style={{gap: '8px', flexWrap: 'wrap'}}>
                                    <span style={{color: 'gray', fontSize: '0.85rem'}}>
                                        {/* Якщо теги це масив - об'єднуємо, якщо строка - просто виводимо */}
                                        {Array.isArray(entry.tags) ? entry.tags.map(t => `#${t}`).join(' ') : entry.tags}
                                    </span>
                                </div>
                            )}
                            
                            <p className="tmg-16px mg-0" style={{lineHeight: '1.5'}}>{entry.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};