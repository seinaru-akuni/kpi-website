const FeedView = ({ entries, onNavigateToNew }) => (
    <div className="flex-container-column w100">
        <div className="flex-container-row flex-space-between y-center w100 ymg-16px">
            <h2>Ваші особисті записи</h2>
            <button className="prpl-btn pg-8px xpg-16px br-radius-16px" onClick={onNavigateToNew}>+ Додати думку</button>
        </div>

        {entries.length === 0 ? (
            <div className="bgc-white pg-2 br-radius-24px text-al-center br-1 brc-0">
                <p>У вас ще немає жодного запису. Створіть свій перший запис прямо зараз!</p>
            </div>
        ) : (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', width: '100%'}}>
                {entries.map(item => (
                    <div key={item.id} className="bgc-white br-radius-24px pg-2 br-1 brc-0 flex-container-column">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px'}}>
                            <span style={{fontSize: '0.85rem', color: '#666'}}>{item.date}</span>
                            <span style={{backgroundColor: 'rgb(246, 246, 255)', color: 'rgb(92, 43, 226)', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold'}}>
                                Настрій: {item.mood}/5
                            </span>
                        </div>
                        <p style={{flexGrow: 1, padding: '12px 0', margin: 0, lineHeight: '1.5'}}>{item.content}</p>
                        <div style={{color: 'gray', fontSize: '0.9rem', fontStyle: 'italic'}}>{item.tags}</div>
                    </div>
                ))}
            </div>
        )}
    </div>
);