const Header = ({ currentView, navigateTo, username, handleLogout }) => {
    // Стан для мобільного бургер-меню тепер живе виключно в хедері
    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

    // Зручна обгортка для переходу, яка заодно закриває бургер-меню
    const handleNavClick = (e, view) => {
        e.preventDefault();
        navigateTo(view);
        setIsBurgerOpen(false);
    };

    return (
        <React.Fragment>
            <style>{`
                .desktop-flex-layout {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-grow: 1;
                    margin-left: 30px;
                }
                
                /* Фон та відступи для мобільного меню */
                #burger-dropdown .main-tabs,
                #burger-dropdown .login-tabs {
                    background-color: white;
                }
                #burger-dropdown .main-tabs a h4 {
                    margin: 0;
                    margin-left: 10px;
                }
                #burger-dropdown .main-tabs a svg {
                    margin-left: 15px;
                }
            `}</style>

            <header className="container-fluid bbr-1 brc-0 bgc-white" style={{height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 15px', position: 'relative'}}>
                <div id="header-container" className="clmp-xmg-3" style={{width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    
                    {/* ЛОГОТИП */}
                    <a href="#" onClick={(e) => handleNavClick(e, 'feed')} className="clmp-rpg-1" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flexShrink: 0}}>
                        <div className="logo inline-block" style={{marginRight: '8px', display: 'flex', alignItems: 'center'}}>
                            <svg width="40.00" height="40.00" viewBox="0.00 0.00 200.00 200.00" xmlns="http://www.w3.org/2000/svg">
                                <g strokeLinecap="round" id="Layer_1_Copy_4">
                                    <path d="M137.76,174.64 C131.96,177.51 117.30,181.80 110.01,182.77 C103.62,183.59 88.29,182.53 81.19,180.91 C74.17,179.28 60.95,173.35 54.77,169.33 C48.08,164.94 38.24,155.26 33.92,149.46 C29.15,143.00 23.38,131.40 21.11,123.70 C19.09,116.75 17.30,103.06 17.84,95.08 C18.36,87.73 21.61,73.61 24.54,67.03 C27.54,60.39 35.94,47.53 40.45,42.92 C45.63,37.69 57.89,28.59 63.68,25.69 C69.49,22.82 84.14,18.53 91.44,17.56 C97.83,16.75 113.16,17.81 120.26,19.42 C127.28,21.05 140.50,26.98 146.67,31.00 C153.36,35.39 163.20,45.07 167.52,50.87 C172.30,57.33 178.07,68.93 180.34,76.64 C182.36,83.58 184.14,97.27 183.61,105.25 C183.08,112.60 179.83,126.72 176.90,133.31 C173.91,139.94 165.50,152.81 160.99,157.41 C155.82,162.65 143.56,171.74 137.76,174.64 Z" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                                    <path d="M54.38,126.73 L58.07,131.70 L65.34,138.92 L74.39,144.44 L85.84,148.00 L100.27,149.43 L114.16,148.00 L125.61,144.44 L134.66,138.92 L141.93,131.70 L145.62,126.73" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                                    <path d="M52.39,100.09 C52.32,92.69 52.27,74.69 52.71,68.63 C52.97,65.14 54.15,58.67 55.55,56.53 C56.17,55.62 58.73,53.85 59.92,53.38 C61.03,52.98 65.20,52.23 66.53,52.22 C68.32,52.23 71.14,53.26 72.51,54.39 C74.84,56.40 77.59,61.19 78.89,65.21 C79.85,68.20 81.59,72.25 83.59,76.53 C85.73,81.17 88.09,85.39 90.76,87.63 C91.42,88.18 94.31,90.18 95.18,90.78 C100.99,91.35 106.07,91.38 108.79,89.73 C112.90,87.10 116.94,77.63 117.40,76.55 C119.37,72.30 121.09,68.27 122.02,65.31 C123.29,61.33 126.02,56.58 128.34,54.57 C129.70,53.45 132.53,52.42 134.32,52.40 C135.65,52.41 139.84,53.15 140.95,53.54 C142.14,54.00 144.73,55.75 145.36,56.64 C146.77,58.77 147.99,65.21 148.27,68.65 C148.73,74.69 148.69,92.69 148.61,100.09" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </div>
                        <h2 className="mg-0" style={{fontSize: '1.5rem'}}>MindFlow</h2>
                    </a>
                    
                    {/* ДЕСКТОПНЕ МЕНЮ */}
                    <div id="desktop-menu" className="desktop-flex-layout">
                        <nav style={{display: 'flex', alignItems: 'center'}}>
                            <ul className="mg-0 pg-0" style={{listStyle: 'none', display: 'flex', alignItems: 'center', gap: '20px'}}>
                                <li>
                                    <a className={`inline-block ${currentView === 'home' ? 'cl-prpl' : ''}`} href="#" onClick={(e) => handleNavClick(e, 'home')} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>                                        <svg width="20.00" height="20.00" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{marginRight: '6px'}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <h4 style={{margin: 0}}>Головна</h4>
                                    </a>
                                </li>
                                <li>
                                    <a className={`inline-block ${currentView === 'feed' ? 'cl-prpl' : ''}`} href="#" onClick={(e) => handleNavClick(e, 'feed')} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                                        <svg width="20.00" height="20.00" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{marginRight: '6px'}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                        </svg>
                                        <h4 style={{margin: 0}}>Дашборд</h4>
                                    </a>
                                </li>
                                <li>
                                    <a className={`inline-block ${currentView === 'new' ? 'cl-prpl' : ''}`} href="#" onClick={(e) => handleNavClick(e, 'new')} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                                        <svg width="20.00" height="20.00" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{marginRight: '6px'}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h4 style={{margin: 0}}>Новий запис</h4>
                                    </a>
                                </li>
                                <li>
                                    <a className={`inline-block ${currentView === 'analytics' ? 'cl-prpl' : ''}`} href="#" onClick={(e) => handleNavClick(e, 'analytics')} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                                        <svg width="20.00" height="20.00" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{marginRight: '6px'}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        <h4 style={{margin: 0}}>Аналітика</h4>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block" href="profile.html" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                                        <svg width="20.00" height="20.00" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{marginRight: '6px'}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <h4 style={{margin: 0}}>Профіль</h4>
                                    </a>
                                </li>
                            </ul>   
                        </nav>

                        {/* БЛОК АВТОРИЗАЦІЇ ДЕСКТОП */}
                        <div id="auth-desktop" style={{display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: '20px'}}>
                            <span style={{color: 'gray', marginRight: '15px', whiteSpace: 'nowrap'}}>Вітаємо, <b>{username}</b>!</span>
                            <button onClick={handleLogout} className="btn ypg-8px clmp-xpg-2 xmg-8px white-btn br-radius-16px" style={{color: '#c62828', border: '1px solid #c62828', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                                Вихід
                            </button>
                        </div>
                    </div>

                    {/* === ОБГОРТКА ДЛЯ БУРГЕРА === */}
                    <div className="flex-container-row y-center" style={{ marginLeft: 'auto', height: '100%' }}>
                        <div id="burger" 
                                className={isBurgerOpen ? 'active' : ''} 
                                onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                                style={{ paddingTop: 0 }}>
                            
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{cursor: 'pointer'}}>
                                {isBurgerOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>

                            {/* ВИПАДАЮЧЕ МЕНЮ */}
                            <div id="burger-dropdown" 
                                    onClick={(e) => e.stopPropagation()} 
                                    style={{
                                        minWidth: '280px', 
                                        whiteSpace: 'normal', 
                                        padding: '15px 15px 25px 15px',
                                        borderBottomLeftRadius: '16px',
                                    }}>
                                    
                                <div className="main-tabs bgc-white">
                                    <a href="#" onClick={(e) => handleNavClick(e, 'home')} style={{color: currentView === 'home' ? '#6200ee' : 'inherit'}}>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lmg-16px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <h4 className="lmg-8px ymg-0">Головна</h4>
                                    </a>
                                    <a href="#" onClick={(e) => handleNavClick(e, 'feed')} style={{color: currentView === 'feed' ? '#6200ee' : 'inherit'}}>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lmg-16px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                        </svg>
                                        <h4 className="lmg-8px ymg-0">Дашборд</h4>
                                    </a>
                                    <a href="#" onClick={(e) => handleNavClick(e, 'new')} style={{color: currentView === 'new' ? '#6200ee' : 'inherit'}}>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lmg-16px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h4 className="lmg-8px ymg-0">Новий запис</h4>
                                    </a>
                                    <a href="#" onClick={(e) => handleNavClick(e, 'analytics')} style={{color: currentView === 'analytics' ? '#6200ee' : 'inherit'}}>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lmg-16px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        <h4 className="lmg-8px ymg-0">Аналітика</h4>
                                    </a>
                                    <a href="profile.html" style={{color: 'inherit'}}>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lmg-16px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <h4 className="lmg-8px ymg-0">Профіль</h4>
                                    </a>
                                </div>
                                
                                <div className="login-tabs bgc-white tmg-8px">
                                    <div className="pg-16px flex-container-column y-center gap-10px" style={{gap: '10px'}}>
                                        <span style={{color: 'gray'}}>Вітаємо, <b className="white-space-nowrap">{username}</b>!</span>
                                        <button onClick={handleLogout} className="w100 prpl-btn ypg-8px br-radius-16px">
                                            Вихід
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};