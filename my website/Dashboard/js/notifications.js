// Notifications System

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('notification-container');
        }

        // Add styles if not already in document
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 300px;
                }
                
                .notification {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 15px;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    animation: slideInRight 0.3s ease forwards;
                    position: relative;
                    overflow: hidden;
                }
                
                .notification.success {
                    border-left: 4px solid #82d616;
                }
                
                .notification.error {
                    border-left: 4px solid #ea0606;
                }
                
                .notification.info {
                    border-left: 4px solid #17c1e8;
                }
                
                .notification.warning {
                    border-left: 4px solid #fbcf33;
                }
                
                .notification-icon {
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification.success .notification-icon {
                    color: #82d616;
                }
                
                .notification.error .notification-icon {
                    color: #ea0606;
                }
                
                .notification.info .notification-icon {
                    color: #17c1e8;
                }
                
                .notification.warning .notification-icon {
                    color: #fbcf33;
                }
                
                .notification-content {
                    flex: 1;
                }
                
                .notification-title {
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #344767;
                }
                
                .notification-message {
                    font-size: 0.875rem;
                    color: #67748e;
                }
                
                .notification-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    color: #8392AB;
                    cursor: pointer;
                    font-size: 14px;
                    padding: 0;
                }
                
                .notification-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background-color: rgba(0, 0, 0, 0.1);
                    width: 100%;
                }
                
                .notification-progress-bar {
                    height: 100%;
                    width: 100%;
                }
                
                .notification.success .notification-progress-bar {
                    background-color: #82d616;
                }
                
                .notification.error .notification-progress-bar {
                    background-color: #ea0606;
                }
                
                .notification.info .notification-progress-bar {
                    background-color: #17c1e8;
                }
                
                .notification.warning .notification-progress-bar {
                    background-color: #fbcf33;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .notification.closing {
                    animation: slideOutRight 0.3s ease forwards;
                }
            `;
            document.head.appendChild(style);
        }

        // Setup notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotification({
                    type: 'info',
                    title: 'Notification System',
                    message: 'This is a demo notification from the system.',
                    duration: 5000
                });
            });
        }
    }

    createNotificationElement(options) {
        const { id, type, title, message, duration } = options;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = id;
        
        // Icon based on type
        let iconClass = '';
        switch (type) {
            case 'success':
                iconClass = 'fa-check-circle';
                break;
            case 'error':
                iconClass = 'fa-exclamation-circle';
                break;
            case 'warning':
                iconClass = 'fa-exclamation-triangle';
                break;
            case 'info':
            default:
                iconClass = 'fa-info-circle';
                break;
        }
        
        // Create notification content
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress">
                <div class="notification-progress-bar"></div>
            </div>
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.closeNotification(id);
        });
        
        // Animate progress bar
        const progressBar = notification.querySelector('.notification-progress-bar');
        progressBar.style.transition = `width ${duration}ms linear`;
        
        // Start with full width
        progressBar.style.width = '100%';
        
        // After a small delay, start the animation
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 10);
        
        return notification;
    }

    showNotification(options) {
        const defaults = {
            type: 'info', // success, error, warning, info
            title: 'Notification',
            message: 'This is a notification message',
            duration: 5000 // milliseconds
        };
        
        const settings = { ...defaults, ...options };
        const id = 'notification-' + Date.now();
        settings.id = id;
        
        // Create notification element
        const notificationElement = this.createNotificationElement(settings);
        
        // Add to container
        this.container.appendChild(notificationElement);
        
        // Store notification data
        this.notifications.push({
            id,
            element: notificationElement,
            timeout: setTimeout(() => {
                this.closeNotification(id);
            }, settings.duration)
        });
        
        return id;
    }

    closeNotification(id) {
        const notificationIndex = this.notifications.findIndex(n => n.id === id);
        
        if (notificationIndex !== -1) {
            const notification = this.notifications[notificationIndex];
            
            // Clear timeout
            clearTimeout(notification.timeout);
            
            // Add closing animation
            notification.element.classList.add('closing');
            
            // Remove after animation
            setTimeout(() => {
                if (notification.element.parentNode) {
                    notification.element.parentNode.removeChild(notification.element);
                }
                this.notifications.splice(notificationIndex, 1);
            }, 300); // Match animation duration
        }
    }

    clearAll() {
        // Clear all notifications
        this.notifications.forEach(notification => {
            clearTimeout(notification.timeout);
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
        });
        
        this.notifications = [];
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Export for use in other modules
window.notificationSystem = notificationSystem;

// Demo notifications
document.addEventListener('DOMContentLoaded', () => {
    // Setup demo buttons if they exist
    const demoSuccessBtn = document.getElementById('demo-success-notification');
    if (demoSuccessBtn) {
        demoSuccessBtn.addEventListener('click', () => {
            notificationSystem.showNotification({
                type: 'success',
                title: 'Success!',
                message: 'Operation completed successfully.',
                duration: 5000
            });
        });
    }
    
    const demoErrorBtn = document.getElementById('demo-error-notification');
    if (demoErrorBtn) {
        demoErrorBtn.addEventListener('click', () => {
            notificationSystem.showNotification({
                type: 'error',
                title: 'Error!',
                message: 'Something went wrong. Please try again.',
                duration: 5000
            });
        });
    }
    
    const demoInfoBtn = document.getElementById('demo-info-notification');
    if (demoInfoBtn) {
        demoInfoBtn.addEventListener('click', () => {
            notificationSystem.showNotification({
                type: 'info',
                title: 'Information',
                message: 'This is an informational message.',
                duration: 5000
            });
        });
    }
    
    const demoWarningBtn = document.getElementById('demo-warning-notification');
    if (demoWarningBtn) {
        demoWarningBtn.addEventListener('click', () => {
            notificationSystem.showNotification({
                type: 'warning',
                title: 'Warning!',
                message: 'Please be careful with this action.',
                duration: 5000
            });
        });
    }
});