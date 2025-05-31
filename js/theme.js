// Theme management
const ThemeManager = {
    // Initialize theme on page load
    init: function() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // Set up toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },
    
    // Set theme
    setTheme: function(theme) {
        const body = document.body;
        const themeIcon = document.getElementById('theme-icon');
        
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            body.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
        
        localStorage.setItem('theme', theme);
    },
    
    // Toggle between light and dark theme
    toggleTheme: function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    // Get current theme
    getCurrentTheme: function() {
        return document.body.getAttribute('data-theme') || 'light';
    }
};

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
});

// Export for use in other files
window.ThemeManager = ThemeManager;