// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Toggle sidebar on mobile
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
            sidebar.classList.remove('active');
        }
    }
});

// Notification dropdown
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle notification dropdown
        // Implementation would go here
    });
}

// Settings dropdown
const settingsBtn = document.querySelector('.settings-btn');
if (settingsBtn) {
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle settings dropdown
        // Implementation would go here
    });
}

// Close dropdowns when clicking elsewhere
document.addEventListener('click', () => {
    // Close any open dropdowns
    // Implementation would go here
});

// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        sidebar.classList.remove('active');
    }
});

// Initialize tooltips (if we had them)
const initTooltips = () => {
    // Implementation would go here if we were using a tooltip library
};

// Initialize popovers (if we had them)
const initPopovers = () => {
    // Implementation would go here if we were using a popover library
};

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    initPopovers();
});