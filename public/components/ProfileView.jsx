const ProfileView = ({ username }) => {
    return (
        <main className="flex-container-column x-center y-center mg-2">
            <div className="bgc-white br-radius-24px pg-2 br-1 brc-0 w100" style={{maxWidth: '800px', boxSizing: 'border-box'}}>
                <h2 className="ymg-16px text-al-center">Профіль користувача</h2>

                <div className="flex-container-row flex-space-between al-items-stretch tmg-16px" style={{gap: '30px', flexWrap: 'wrap'}}>
                    
                    <div className="flex-1" style={{minWidth: '280px'}}>
                        <div className="text-al-center ymg-16px">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cl-prpl bgc-0 br-radius-32px pg-16px" style={{border: '1px solid rgb(192, 192, 192)'}}>
                                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                            </svg>
                            <h3 className="tmg-8px ymg-0">{username}</h3>
                            <p className="mg-0" style={{color: 'gray', fontSize: '0.9rem'}}>student_pti@kpi.ua</p>
                        </div>

                        <h4 className="tmg-24px bbr-1 brc-0 pg-8px">Статистика активності</h4>
                        <ul style={{lineHeight: '2', paddingLeft: '20px', listStyleType: 'square'}}>
                            <li>Всього створено записів: <span className="cl-prpl"><b>14</b></span></li>
                            <li>Середня оцінка стану за місяць: <b>4.2 / 5</b></li>
                            <li>Найбільш часто використовуваний тег: <b>#навчання</b></li>
                            <li>Активність облікового запису: <b>З травня 2026</b></li>
                        </ul>
                    </div>

                    <div className="flex-1 lbr-1 brc-0 lpg-2" style={{minWidth: '280px'}}>
                        <h4 className="ymg-8px bbr-1 brc-0 pg-8px">Налаштування профілю</h4>
                        
                        <form onSubmit={(e) => e.preventDefault()} className="flex-container-column">
                            <label htmlFor="profile-name" className="ymg-8px"><b>Ім'я або нікнейм:</b></label>
                            <input type="text" id="profile-name" defaultValue={username} className="pg-8px br-1 brc-0 br-radius-16px" />

                            <label htmlFor="profile-theme" className="ymg-8px tmg-16px"><b>Тема інтерфейсу:</b></label>
                            <select id="profile-theme" className="pg-8px br-1 brc-0 br-radius-16px" style={{cursor: 'pointer'}}>
                                <option value="light">Світла тема (MindFlow Light)</option>
                                <option value="dark">Темна тема (Deep Space)</option>
                                <option value="indigo">Палітра Індиго</option>
                            </select>

                            <label htmlFor="profile-bio" className="ymg-8px tmg-16px"><b>Статус або цитата:</b></label>
                            <textarea id="profile-bio" rows="4" className="pg-8px br-1 brc-0 br-radius-16px" placeholder="Життєве кредо..."></textarea>

                            <button type="submit" className="prpl-btn pg-12px br-radius-16px tmg-24px">Зберегти налаштування</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};