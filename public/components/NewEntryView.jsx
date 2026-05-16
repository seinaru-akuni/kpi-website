const NewEntryView = ({ onSave, disabled }) => {
    // Беремо useState з глобального об'єкта React
    const { useState } = React;

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [mood, setMood] = useState('3');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim().length < 10) {
            alert('Будь ласка, розпишіть думки детальніше (мінімум 10 символів).');
            return;
        }
        onSave({ date, mood, tags, content });
    };

    return (
        <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '600px', margin: '0 auto'}}>
            <h2 className="text-al-center ymg-16px">Створити новий запис</h2>
            <form onSubmit={handleSubmit} className="flex-container-column">
                <label className="ymg-8px"><b>Дата:</b></label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" required disabled={disabled} />

                <label className="ymg-8px tmg-16px"><b>Теги (наприклад #навчання, #ідеї):</b></label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="#тег" className="pg-8px br-1 brc-0 br-radius-16px" disabled={disabled} />

                <label className="ymg-8px tmg-16px"><b>Оцінка стану (1 - Жахливо, 5 - Чудово):</b></label>
                <select value={mood} onChange={(e) => setMood(e.target.value)} className="pg-8px br-1 brc-0 br-radius-16px" disabled={disabled}>
                    <option value="5">Чудовий (5)</option>
                    <option value="4">Хороший (4)</option>
                    <option value="3">Нормальний (3)</option>
                    <option value="2">Поганий (2)</option>
                    <option value="1">Жахливий (1)</option>
                </select>

                <label className="ymg-8px tmg-16px"><b>Ваші думки:</b></label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="6" placeholder="Що у вас на думці?" className="pg-8px br-1 brc-0 br-radius-16px" required disabled={disabled}></textarea>

                <button type="submit" className="prpl-btn pg-16px br-radius-16px tmg-24px text-al-center" disabled={disabled}>
                    Зберегти у щоденник
                </button>
            </form>
        </div>
    );
};