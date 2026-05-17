const EntryCard = ({ entry }) => {
    // 1. Функція тепер приймає конкретно цифру настрою (mood)
    const getMoodStyle = (mood) => {
        switch(Number(mood)) {
            case 1:
                return { color: 'hsl(5, 100%, 50%)', bgc: 'hsla(5, 100%, 75%, 0.20)' };
            case 2:
                return { color: 'hsl(36, 100%, 50%)', bgc: 'hsla(36, 100%, 65%, 0.20)' };
            case 3:
                return { color: 'hsl(45, 100%, 47%)', bgc: 'hsla(45, 100%, 76%, 0.20)' };
            case 4:
                return { color: 'hsl(123, 100%, 37%)', bgc: 'hsla(123, 39%, 64%, 0.20)' };
            case 5:
                return { color: 'hsl(174, 100%, 35%)', bgc: 'hsla(174, 42%, 51%, 0.20)' };
            default:
                return { color: 'white', bgc: 'black' };
        }
    };

    // 2. Викликаємо функцію один раз і зберігаємо результат
    const moodStyle = getMoodStyle(entry.mood);

    return (
        <div className="bgc-white br-radius-16px pg-16px br-1 brc-0">
            <div className="flex-container-row flex-space-between y-center flex-wrap">
                <h3 className="mg-0">{entry.date}</h3>
                
                {/* 3. Правильно підставляємо змінні у стилі (без зайвих дужок) */}
                <span className="pg-8px br-radius-16px" style={{ backgroundColor: moodStyle.bgc, color: moodStyle.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Оцінка стану: {entry.mood}/5
                </span>
            </div>
            
            {/* Якщо є теги, показуємо їх */}
            {entry.tags && (
                <div className="tmg-8px flex-container-row" style={{gap: '8px', flexWrap: 'wrap'}}>
                    <span style={{color: 'gray', fontSize: '0.85rem'}}>
                        {Array.isArray(entry.tags) ? entry.tags.map(t => `#${t}`).join(' ') : entry.tags}
                    </span>
                </div>
            )}
            
            <p className="tmg-16px mg-0" style={{lineHeight: '1.5'}}>{entry.content}</p>
        </div>
    );
};