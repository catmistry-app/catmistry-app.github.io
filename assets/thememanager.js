// Manages persistent theme setting

const storageThemeKey = 'pageTheme';
let currentTheme = localStorage.getItem(storageThemeKey);

function setTheme() {
    currentTheme = localStorage.getItem(storageThemeKey);
    if (currentTheme === 'light') {
        console.debug('Light theme');
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
    else if (currentTheme === 'dark') {
        console.debug('Dark theme')
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    else {
        console.debug('No theme set');
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Dark mode
            localStorage.setItem(storageThemeKey, 'dark');
            setTheme();
        }
        else {
            // Light mode
            localStorage.setItem(storageThemeKey, 'light');
            setTheme();
        }
    }
    
    // Check if themeChanged function is present
     if (typeof themeChanged === 'function') {
        themeChanged();
    }
}

setTheme();

function toggleTheme() {
    if (currentTheme === 'light') {
        // Dark mode
        localStorage.setItem(storageThemeKey, 'dark');
        setTheme();
    }
    else {
        // Light mode
        localStorage.setItem(storageThemeKey, 'light');
        setTheme();
    }
}