/**
 * ==========================================
 * МЕНЮ (БУРГЕР)
 * ==========================================
 * @description - Управление открытием/закрытием меню
 * @features - Анимация бургера, блокировка скролла, закрытие по Escape
 * @note - На десктопе меню всегда открыто, JS не вмешивается
 * ==========================================
 */

import '../scss/main.scss';

// --- Конфиг ---
const DESKTOP_BREAKPOINT = 1024;

document.addEventListener('DOMContentLoaded', () => {
    try {
        // --- DOM-ссылки ---
        const burger = document.getElementById('burgerBtn');
        const menu = document.getElementById('menu');
        const menuClose = document.getElementById('menuClose');
        const overlay = menu?.querySelector('.menu__overlay');
        const body = document.body;

        // --- Состояние ---
        let isMenuOpen = false;
        let scrollPosition = 0;
        let resizeTimeout;

        // --- Вспомогательные функции ---
        const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;

        /**
         * Переключает состояние меню
         * @note - На десктопе ничего не делает
         */
        function toggleMenu() {
            // На десктопе меню всегда видно, JS не нужен
            if (isDesktop()) return;

            isMenuOpen = !isMenuOpen;

            // Переключаем классы
            burger?.classList.toggle('active');
            menu?.classList.toggle('active');

            // Блокируем/разблокируем скролл
            if (isMenuOpen) {
                scrollPosition = window.pageYOffset;
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
                window.scrollTo(0, scrollPosition);
            }

            // Обновляем aria-атрибуты для доступности
            burger?.setAttribute('aria-expanded', isMenuOpen);
            burger?.setAttribute('aria-label',
                isMenuOpen ? 'Закрыть меню' : 'Открыть меню'
            );
        }

        // --- События ---
        burger?.addEventListener('click', toggleMenu);
        menuClose?.addEventListener('click', toggleMenu);
        overlay?.addEventListener('click', toggleMenu);

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Обработка ресайза (оптимизировано через debounce)
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (isDesktop()) {
                    // Убираем блокировку скролла, если она есть
                    body.classList.remove('no-scroll');

                    // Если меню было открыто на мобилке — закрываем
                    if (isMenuOpen) {
                        burger?.classList.remove('active');
                        menu?.classList.remove('active');
                        isMenuOpen = false;
                        burger?.setAttribute('aria-expanded', 'false');
                        burger?.setAttribute('aria-label', 'Открыть меню');
                    }
                }
            }, 150);
        });

        // Инициализация: на десктопе убираем блокировку скролла
        if (isDesktop()) {
            body.classList.remove('no-scroll');
        }

        console.log('✅ Меню инициализировано');

    } catch (error) {
        console.error('❌ Ошибка инициализации меню:', error);
    }
});