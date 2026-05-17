const DashboardView = ({ entries, onNavigateToNew }) => {
    
    // Створюємо копію масиву та сортуємо її за датою (від найновіших до найстаріших)
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

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
                    {/* Використовуємо наш ВІДСОРТОВАНИЙ за датою масив */}
                    {sortedEntries.map(entry => (
                        <EntryCard key={entry.id} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
};