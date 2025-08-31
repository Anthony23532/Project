/**
 * Performance Optimization for Soft UI Dashboard
 * This file contains functions to optimize dashboard performance
 */

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Scroll-based animations or calculations
    const scrollPosition = window.scrollY;
    
    // Example: Add class to header on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Optimize resize events
const optimizedResize = debounce(() => {
    // Resize-based calculations
    const windowWidth = window.innerWidth;
    
    // Example: Adjust chart sizes on resize
    const charts = document.querySelectorAll('canvas');
    charts.forEach(chart => {
        if (chart.chart) {
            chart.chart.resize();
        }
    });
}, 250);

window.addEventListener('resize', optimizedResize);

// Defer non-critical JavaScript
function deferScript(url) {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('defer', '');
    document.body.appendChild(script);
}

// Example usage:
// deferScript('js/non-critical.js');

// Cache DOM elements for better performance
const DOMCache = {
    sidebar: document.querySelector('.sidebar'),
    mainContent: document.querySelector('.main-content'),
    header: document.querySelector('.header'),
    cards: document.querySelectorAll('.card'),
    // Add more elements as needed
};

// Use requestAnimationFrame for smooth animations
function smoothAnimation(element, property, target, duration) {
    const start = parseFloat(getComputedStyle(element)[property]) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease in-out
        
        const currentValue = start + (target - start) * easeProgress;
        element.style[property] = `${currentValue}px`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Example usage:
// smoothAnimation(element, 'height', 300, 500);

// Optimize chart rendering
function optimizeCharts() {
    // Set devicePixelRatio to 1 for better performance on high-DPI screens
    const originalRatio = window.devicePixelRatio;
    window.devicePixelRatio = 1;
    
    // Render charts
    // ... chart rendering code ...
    
    // Restore original devicePixelRatio
    window.devicePixelRatio = originalRatio;
}

// Detect idle time to perform background tasks
let idleTimer = null;
const idleTime = 3000; // 3 seconds

function onIdle() {
    // Perform non-critical tasks when user is idle
    console.log('User is idle, performing background tasks');
    
    // Example: Preload additional resources
    // prefetchResource('path/to/resource');
}

function resetIdleTimer() {
    if (idleTimer) {
        clearTimeout(idleTimer);
    }
    idleTimer = setTimeout(onIdle, idleTime);
}

// Events that reset the idle timer
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetIdleTimer, true);
});

// Start the idle timer
resetIdleTimer();

// Prefetch resources for better performance
function prefetchResource(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
}

// Example usage:
// prefetchResource('path/to/resource');

// Initialize performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.startTime, 'ms');
                
                // You could send this data to an analytics service
            }, 0);
        });
    }
}

initPerformanceMonitoring();