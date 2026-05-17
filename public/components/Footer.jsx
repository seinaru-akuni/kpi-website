const Footer = () => {
    return (
        <footer className="bgc-white tbr-1 brc-0 w100 clmp-ypg-2 clmp-xpg-3" style={{marginTop: 'auto'}}>
            <div className="flex-container-row flex-space-between flex-wrap" style={{maxWidth: '1200px', margin: '0 auto', gap: '30px'}}>
                
                {/* 1. Блок з логотипом та описом */}
                <div className="flex-container-column flex-2" style={{minWidth: '280px'}}>
                    <div className="flex-container-row y-center ymg-8px">
                        {/* Зменшена версія вашого логотипу */}
                        <svg width="30" height="30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="cl-prpl rmg-8px">
                            <g strokeLinecap="round">
                                <path d="M137.76,174.64 C131.96,177.51 117.30,181.80 110.01,182.77 C103.62,183.59 88.29,182.53 81.19,180.91 C74.17,179.28 60.95,173.35 54.77,169.33 C48.08,164.94 38.24,155.26 33.92,149.46 C29.15,143.00 23.38,131.40 21.11,123.70 C19.09,116.75 17.30,103.06 17.84,95.08 C18.36,87.73 21.61,73.61 24.54,67.03 C27.54,60.39 35.94,47.53 40.45,42.92 C45.63,37.69 57.89,28.59 63.68,25.69 C69.49,22.82 84.14,18.53 91.44,17.56 C97.83,16.75 113.16,17.81 120.26,19.42 C127.28,21.05 140.50,26.98 146.67,31.00 C153.36,35.39 163.20,45.07 167.52,50.87 C172.30,57.33 178.07,68.93 180.34,76.64 C182.36,83.58 184.14,97.27 183.61,105.25 C183.08,112.60 179.83,126.72 176.90,133.31 C173.91,139.94 165.50,152.81 160.99,157.41 C155.82,162.65 143.56,171.74 137.76,174.64 Z" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                                <path d="M54.38,126.73 L58.07,131.70 L65.34,138.92 L74.39,144.44 L85.84,148.00 L100.27,149.43 L114.16,148.00 L125.61,144.44 L134.66,138.92 L141.93,131.70 L145.62,126.73" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                                <path d="M52.39,100.09 C52.32,92.69 52.27,74.69 52.71,68.63 C52.97,65.14 54.15,58.67 55.55,56.53 C56.17,55.62 58.73,53.85 59.92,53.38 C61.03,52.98 65.20,52.23 66.53,52.22 C68.32,52.23 71.14,53.26 72.51,54.39 C74.84,56.40 77.59,61.19 78.89,65.21 C79.85,68.20 81.59,72.25 83.59,76.53 C85.73,81.17 88.09,85.39 90.76,87.63 C91.42,88.18 94.31,90.18 95.18,90.78 C100.99,91.35 106.07,91.38 108.79,89.73 C112.90,87.10 116.94,77.63 117.40,76.55 C119.37,72.30 121.09,68.27 122.02,65.31 C123.29,61.33 126.02,56.58 128.34,54.57 C129.70,53.45 132.53,52.42 134.32,52.40 C135.65,52.41 139.84,53.15 140.95,53.54 C142.14,54.00 144.73,55.75 145.36,56.64 C146.77,58.77 147.99,65.21 148.27,68.65 C148.73,74.69 148.69,92.69 148.61,100.09" fill="none" stroke="currentColor" strokeWidth="13.00" strokeOpacity="1.00" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        <h3 className="mg-0">MindFlow</h3>
                    </div>
                    <p style={{color: 'gray', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '350px'}}>
                        Ваш особистий простір для ведення записів, відстеження емоційного стану та пошуку гармонії з собою. Піклуйтеся про ментальне здоров'я щодня.
                    </p>
                </div>

                {/* 2. Корисні посилання */}
                <div className="flex-container-column flex-1" style={{minWidth: '200px'}}>
                    <h4 className="ymg-8px">Навігація</h4>
                    <ul className="pg-0" style={{listStyle: 'none', lineHeight: '2', margin: 0}}>
                        <li><a href="index.html" className="cl-prpl" style={{textDecoration: 'none'}}>Головна сторінка</a></li>
                        
                        <li><a href="register.html" className="cl-prpl" style={{textDecoration: 'none'}}>Реєстрація</a></li>
                    </ul>
                </div>

                {/* 3. Контакти */}
                <div className="flex-container-column flex-1" style={{minWidth: '200px'}}>
                    <h4 className="ymg-8px">Зв'язок з нами</h4>
                    <ul className="pg-0" style={{listStyle: 'none', lineHeight: '2', margin: 0}}>
                        <li style={{color: 'gray'}}>Email: support@mindflow.ua</li>
                        <li style={{color: 'gray'}}>Telegram: <a href="#" className="cl-prpl" style={{textDecoration: 'none'}}>@mindflow_bot</a></li>
                        <li style={{color: 'gray'}}>Київ, Україна</li>
                    </ul>
                </div>
            </div>

            {/* Копірайт (Нижня частина підвалу) */}
            <div className="tmg-24px tbr-1 brc-0 ypg-16px text-al-center" style={{color: 'gray', fontSize: '0.85rem', width: '100%', maxWidth: '1200px', margin: '24px auto 0 auto'}}>
                &copy; {new Date().getFullYear()} MindFlow. Всі права захищено.
            </div>
        </footer>
    );
};