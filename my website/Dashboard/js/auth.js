/**
 * Authentication Pages JavaScript
 * Handles form validation, submission, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Form validation
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    // Password toggle functionality
    const setupPasswordToggle = (passwordId, toggleId) => {
        const passwordInput = document.getElementById(passwordId);
        const toggleButton = document.getElementById(toggleId);
        
        if (passwordInput && toggleButton) {
            toggleButton.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle icon
                const icon = toggleButton.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }
    };
    
    // Setup password toggles
    setupPasswordToggle('password', 'passwordToggle');
    setupPasswordToggle('confirmPassword', 'confirmPasswordToggle');
    
    // Form validation functions
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
    };
    
    const showError = (inputId, message) => {
        const errorElement = document.getElementById(`${inputId}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.add('error');
        }
    };
    
    const clearError = (inputId) => {
        const errorElement = document.getElementById(`${inputId}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    };
    
    // Sign In form validation
    if (signInForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        emailInput.addEventListener('input', () => {
            clearError('email');
        });
        
        passwordInput.addEventListener('input', () => {
            clearError('password');
        });
        
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (!passwordInput.value) {
                showError('password', 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission('sign-in', {
                    email: emailInput.value,
                    password: passwordInput.value,
                    rememberMe: document.getElementById('rememberMe').checked
                });
            }
        });
    }
    
    // Sign Up form validation
    if (signUpForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const agreeTermsCheckbox = document.getElementById('agreeTerms');
        
        // Clear errors on input
        nameInput.addEventListener('input', () => clearError('name'));
        emailInput.addEventListener('input', () => clearError('email'));
        passwordInput.addEventListener('input', () => clearError('password'));
        confirmPasswordInput.addEventListener('input', () => clearError('confirmPassword'));
        agreeTermsCheckbox.addEventListener('change', () => clearError('terms'));
        
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError('name', 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (!passwordInput.value) {
                showError('password', 'Password is required');
                isValid = false;
            } else if (!validatePassword(passwordInput.value)) {
                showError('password', 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number');
                isValid = false;
            }
            
            // Validate confirm password
            if (!confirmPasswordInput.value) {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            // Validate terms agreement
            if (!agreeTermsCheckbox.checked) {
                showError('terms', 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission('sign-up', {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value
                });
            }
        });
    }
    
    // Simulate form submission (in a real app, this would be an API call)
    function simulateFormSubmission(formType, formData) {
        // Show loading state
        const submitButton = document.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate API call
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            if (formType === 'sign-in') {
                // Redirect to dashboard on successful sign in
                window.location.href = 'index.html';
            } else if (formType === 'sign-up') {
                // Show success message and redirect to sign in
                alert('Account created successfully! Please sign in.');
                window.location.href = 'sign-in.html';
            }
        }, 1500);
    }
    
    // Add animation classes
    document.querySelector('.auth-card').classList.add('slide-in-left');
    document.querySelector('.auth-info').classList.add('slide-in-right');
});