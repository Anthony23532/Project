/**
 * Theme Switcher JavaScript
 * Handles dark/light theme switching and persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme switcher
    initThemeSwitcher();
});

function initThemeSwitcher() {
    // Create theme switcher button if it doesn't exist
    if (!document.querySelector('.theme-switcher')) {
        createThemeSwitcherButton();
    }
    
    // Load saved theme preference
    loadThemePreference();
    
    // Add event listener to theme switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }
}

function createThemeSwitcherButton() {
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.setAttribute('title', 'Toggle Dark/Light Mode');
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeSwitcher);
}

function toggleTheme() {
    // Toggle dark theme class on root element
    document.documentElement.classList.toggle('dark-theme');
    
    // Update theme switcher icon
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');
    const themeSwitcherIcon = document.querySelector('.theme-switcher i');
    
    if (themeSwitcherIcon) {
        if (isDarkTheme) {
            themeSwitcherIcon.className = 'fas fa-sun';
        } else {
            themeSwitcherIcon.className = 'fas fa-moon';
        }
    }
    
    // Save theme preference
    saveThemePreference(isDarkTheme);
    
    // Show notification
    if (window.notificationSystem) {
        window.notificationSystem.showNotification({
            type: 'info',
            title: 'Theme Changed',
            message: `Switched to ${isDarkTheme ? 'Dark' : 'Light'} Mode`,
            duration: 2000
        });
    }
}

function saveThemePreference(isDarkTheme) {
    localStorage.setItem('darkTheme', isDarkTheme);
}

function loadThemePreference() {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    
    if (isDarkTheme) {
        document.documentElement.classList.add('dark-theme');
        
        // Update theme switcher icon
        const themeSwitcherIcon = document.querySelector('.theme-switcher i');
        if (themeSwitcherIcon) {
            themeSwitcherIcon.className = 'fas fa-sun';
        }
    }
}