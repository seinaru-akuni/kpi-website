const AnalyticsView = ({ entries }) => (
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
);