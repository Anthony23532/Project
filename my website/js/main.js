// Main JavaScript file for PetroBid Oil Company Website

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Form Validation
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const biddingForm = document.getElementById('biddingForm');
    
    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            let errorMessage = '';
            
            // Simple validation
            if (!email || !validateEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!password || password.length < 6) {
                isValid = false;
                errorMessage += 'Password must be at least 6 characters long.\n';
            }
            
            if (isValid) {
                // Simulate login - in a real app, this would be an API call
                simulateLogin(email, password);
            } else {
                alert(errorMessage);
            }
        });
    }
    
    // Signup Form Validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const company = document.getElementById('signupCompany').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            let isValid = true;
            let errorMessage = '';
            
            // Simple validation
            if (!name || name.length < 2) {
                isValid = false;
                errorMessage += 'Please enter your full name.\n';
            }
            
            if (!email || !validateEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!company || company.length < 2) {
                isValid = false;
                errorMessage += 'Please enter your company name.\n';
            }
            
            if (!password || password.length < 6) {
                isValid = false;
                errorMessage += 'Password must be at least 6 characters long.\n';
            }
            
            if (password !== confirmPassword) {
                isValid = false;
                errorMessage += 'Passwords do not match.\n';
            }
            
            if (isValid) {
                // Simulate signup - in a real app, this would be an API call
                simulateSignup(name, email, company, password);
            } else {
                alert(errorMessage);
            }
        });
    }
    
    // Bidding Form Validation
    if (biddingForm) {
        biddingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bidAmount = document.getElementById('bidAmount').value;
            const bidComments = document.getElementById('bidComments').value;
            
            let isValid = true;
            let errorMessage = '';
            
            // Simple validation
            if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
                isValid = false;
                errorMessage += 'Please enter a valid bid amount.\n';
            }
            
            if (isValid) {
                // Simulate bid submission - in a real app, this would be an API call
                simulateBidSubmission(bidAmount, bidComments);
            } else {
                alert(errorMessage);
            }
        });
    }
    
    // Countdown Timer for Bidding
    const countdownElement = document.getElementById('bidCountdown');
    if (countdownElement) {
        startCountdown(countdownElement);
    }
    
    // Check authentication status on page load
    checkAuthStatus();
});

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Authentication Functions
function simulateLogin(email, password) {
    // In a real application, this would be an API call to your backend
    console.log(`Login attempt: ${email}`);
    
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    // Show success message
    alert('Login successful! Redirecting to bidding page...');
    
    // Redirect to bidding page
    setTimeout(() => {
        window.location.href = 'bidding.html';
    }, 1000);
}

function simulateSignup(name, email, company, password) {
    // In a real application, this would be an API call to your backend
    console.log(`Signup: ${name}, ${email}, ${company}`);
    
    // Simulate successful signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    localStorage.setItem('userCompany', company);
    
    // Show success message
    alert('Account created successfully! Redirecting to bidding page...');
    
    // Redirect to bidding page
    setTimeout(() => {
        window.location.href = 'bidding.html';
    }, 1000);
}

function logout() {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCompany');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const protectedPages = ['bidding.html'];
    const authPages = ['login.html', 'signup.html'];
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Update UI based on auth status
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (isLoggedIn) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (userInfo) {
            const userEmail = localStorage.getItem('userEmail');
            userInfo.textContent = `Welcome, ${userEmail}`;
            userInfo.style.display = 'inline-block';
        }
        
        // If on auth pages, redirect to bidding
        if (authPages.includes(currentPage)) {
            window.location.href = 'bidding.html';
        }
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (signupBtn) signupBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
        
        // If on protected pages, redirect to login
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
}

// Bidding Functions
function simulateBidSubmission(amount, comments) {
    // In a real application, this would be an API call to your backend
    console.log(`Bid submitted: $${amount}`);
    console.log(`Comments: ${comments}`);
    
    // Show success message
    alert(`Your bid of $${amount} has been submitted successfully!`);
    
    // Reset form
    document.getElementById('bidAmount').value = '';
    document.getElementById('bidComments').value = '';
}

function startCountdown(element) {
    // Set the countdown date (24 hours from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1);
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // Time calculations for hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        element.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        
        // If the countdown is finished, display expired message
        if (distance < 0) {
            clearInterval(countdownTimer);
            element.innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Bidding Data - In a real application, this would come from an API
const biddingData = [
    {
        id: 1,
        title: "North Sea Oil Field Exploration",
        location: "North Sea, UK",
        deadline: "2025-09-15",
        startingPrice: 5000000,
        image: "images/oil-field-1.jpg",
        description: "Exploration rights for promising oil field in the North Sea region with estimated reserves of 50 million barrels."
    },
    {
        id: 2,
        title: "Gulf of Mexico Drilling Rights",
        location: "Gulf of Mexico, USA",
        deadline: "2025-09-20",
        startingPrice: 7500000,
        image: "images/oil-field-2.jpg",
        description: "Drilling rights for established oil field in the Gulf of Mexico with existing infrastructure and proven reserves."
    },
    {
        id: 3,
        title: "Caspian Sea Exploration Block",
        location: "Caspian Sea, Azerbaijan",
        deadline: "2025-09-25",
        startingPrice: 4200000,
        image: "images/oil-field-3.jpg",
        description: "Exploration block in the resource-rich Caspian Sea region with favorable geological indicators."
    }
];

// Function to populate bidding listings
function populateBiddingListings() {
    const biddingGrid = document.getElementById('biddingGrid');
    if (!biddingGrid) return;
    
    biddingGrid.innerHTML = '';
    
    biddingData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bidding-card';
        
        // Calculate days remaining
        const deadline = new Date(item.deadline);
        const today = new Date();
        const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        card.innerHTML = `
            <div class="bidding-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="bidding-content">
                <h3>${item.title}</h3>
                <div class="bidding-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="fas fa-clock"></i> ${daysRemaining} days left</span>
                </div>
                <div class="bidding-price">
                    Starting at $${item.startingPrice.toLocaleString()}
                </div>
                <p>${item.description}</p>
                <a href="bidding-detail.html?id=${item.id}" class="btn btn-primary">Place Bid</a>
            </div>
        `;
        
        biddingGrid.appendChild(card);
    });
}

// Call this function when the bidding page loads
window.addEventListener('load', function() {
    if (window.location.pathname.includes('bidding.html')) {
        populateBiddingListings();
    }
});