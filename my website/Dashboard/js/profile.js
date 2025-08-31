/**
 * Profile Page JavaScript
 * Handles profile page interactions and functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize profile page components
    initProfilePage();
});

function initProfilePage() {
    // Setup toggle switches
    setupToggleSwitches();
    
    // Setup project card hover effects
    setupProjectCards();
    
    // Setup conversation interactions
    setupConversations();
    
    // Add animation classes to elements
    addAnimations();
}

// Setup toggle switches
function setupToggleSwitches() {
    const switches = document.querySelectorAll('.custom-switch input');
    
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const settingName = this.closest('.setting-item').querySelector('.setting-name').textContent;
            const isEnabled = this.checked;
            
            // In a real app, this would save the setting to a database
            console.log(`Setting "${settingName}" ${isEnabled ? 'enabled' : 'disabled'}`);
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: isEnabled ? 'success' : 'info',
                    title: 'Setting Updated',
                    message: `${settingName} has been ${isEnabled ? 'enabled' : 'disabled'}.`,
                    duration: 3000
                });
            }
        });
    });
}

// Setup project card hover effects
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('.project-title').textContent;
            
            // In a real app, this would open the project details page
            console.log(`Opening project: ${projectTitle}`);
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Project Selected',
                    message: `You selected the project: ${projectTitle}`,
                    duration: 3000
                });
            }
        });
    });
}

// Setup conversation interactions
function setupConversations() {
    const replyButtons = document.querySelectorAll('.conversation-actions .btn-action');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            
            const conversationItem = button.closest('.conversation-item');
            const personName = conversationItem.querySelector('.conversation-name').textContent;
            
            // In a real app, this would open a chat window
            console.log(`Replying to ${personName}`);
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Message',
                    message: `Opening chat with ${personName}`,
                    duration: 3000
                });
            }
        });
    });
    
    // Make conversation items clickable
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            const personName = item.querySelector('.conversation-name').textContent;
            
            // In a real app, this would open the full conversation
            console.log(`Opening conversation with ${personName}`);
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Conversation',
                    message: `Opening conversation with ${personName}`,
                    duration: 3000
                });
            }
        });
    });
}

// Add animations to profile page elements
function addAnimations() {
    // Profile header animations
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        profileHeader.classList.add('fade-in');
    }
    
    // Staggered animations for cards
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
        card.classList.add('slide-in-up');
    });
    
    // Project cards animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
        card.classList.add('slide-in-up');
    });
    
    // Conversation items animations
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach((item, index) => {
        item.style.animationDelay = `${0.05 * (index + 1)}s`;
        item.classList.add('slide-in-right');
    });
}

// Edit profile functionality
const editProfileBtn = document.querySelector('.profile-actions .btn-primary');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        // In a real app, this would open a profile edit modal
        console.log('Edit profile clicked');
        
        // Show notification
        if (window.notificationSystem) {
            window.notificationSystem.showNotification({
                type: 'info',
                title: 'Edit Profile',
                message: 'Profile edit functionality would open here.',
                duration: 3000
            });
        }
    });
}

// Message button functionality
const messageBtn = document.querySelector('.profile-actions .btn-light');
if (messageBtn) {
    messageBtn.addEventListener('click', () => {
        // In a real app, this would open a message compose modal
        console.log('Message button clicked');
        
        // Show notification
        if (window.notificationSystem) {
            window.notificationSystem.showNotification({
                type: 'info',
                title: 'New Message',
                message: 'Message composition would open here.',
                duration: 3000
            });
        }
    });
}