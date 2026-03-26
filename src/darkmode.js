// darkmode.js - Dark mode functionality with auto detection

(function () {
    // AUTO DARK MODE: detect system preference + localStorage override
    const storageKey = 'theme-preference';
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    // Get initial theme: stored > system
    const getStoredTheme = () => localStorage.getItem(storageKey);
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    };

    const setTheme = (theme) => {
        applyTheme(theme);
        localStorage.setItem(storageKey, theme);
    };

    // Initial load
    let stored = getStoredTheme();
    if (stored) {
        applyTheme(stored);
    } else {
        const system = getSystemTheme();
        applyTheme(system);
        localStorage.setItem(storageKey, system);
    }

    // Toggle handler: cycles light/dark
    const handleToggle = () => {
        const isDark = body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', handleToggle);
    }

    // Watch system preference changes if user hasn't manually set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(storageKey)) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
        }
    });
})();