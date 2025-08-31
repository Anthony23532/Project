/**
 * Billing Page JavaScript
 * Handles billing page interactions and functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize billing page components
    initBillingPage();
});

function initBillingPage() {
    // Setup payment method interactions
    setupPaymentMethods();
    
    // Setup invoice interactions
    setupInvoices();
    
    // Setup billing info interactions
    setupBillingInfo();
    
    // Setup subscription interactions
    setupSubscription();
    
    // Setup transaction interactions
    setupTransactions();
    
    // Setup modals
    setupModals();
    
    // Add animations
    addAnimations();
}

// Payment Methods Functionality
function setupPaymentMethods() {
    // Add payment method button
    const addPaymentBtn = document.getElementById('addPaymentMethod');
    if (addPaymentBtn) {
        addPaymentBtn.addEventListener('click', () => {
            openModal('paymentMethodModal');
        });
    }
    
    // Payment method form
    const paymentMethodForm = document.getElementById('paymentMethodForm');
    if (paymentMethodForm) {
        // Format card number with spaces
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = '';
                
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }
                
                this.value = formattedValue;
                
                // Detect card type
                detectCardType(value);
            });
        }
        
        // Format expiry date
        const expiryDateInput = document.getElementById('expiryDate');
        if (expiryDateInput) {
            expiryDateInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                
                if (value.length > 2) {
                    this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
                } else {
                    this.value = value;
                }
            });
        }
        
        // Only allow numbers in CVV
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                this.value = this.value.replace(/\D/g, '');
            });
        }
        
        // Form submission
        paymentMethodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // In a real app, this would send data to a server
                
                // Show success notification
                if (window.notificationSystem) {
                    window.notificationSystem.showNotification({
                        type: 'success',
                        title: 'Card Added',
                        message: 'Your payment method has been added successfully.',
                        duration: 3000
                    });
                }
                
                // Close modal
                closeModal('paymentMethodModal');
            }
        });
    }
    
    // Edit payment method buttons
    const editPaymentBtns = document.querySelectorAll('.payment-actions .btn-edit');
    editPaymentBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // In a real app, this would populate the form with the card details
            openModal('paymentMethodModal');
            
            // For demo purposes, we'll pre-fill with the visible card details
            const paymentMethod = this.closest('.payment-method');
            const cardNumber = paymentMethod.querySelector('.card-number').textContent.split(' ').pop();
            const cardHolder = paymentMethod.querySelector('.card-holder').textContent;
            const cardExpiry = paymentMethod.querySelector('.card-expiry').textContent;
            
            document.getElementById('cardholderName').value = cardHolder;
            document.getElementById('cardNumber').value = '**** **** **** ' + cardNumber;
            document.getElementById('expiryDate').value = cardExpiry;
            document.getElementById('cvv').value = '***';
        });
    });
    
    // Delete payment method buttons
    const deletePaymentBtns = document.querySelectorAll('.payment-actions .btn-delete');
    deletePaymentBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // In a real app, this would show a confirmation dialog
            if (confirm('Are you sure you want to delete this payment method?')) {
                const paymentMethod = this.closest('.payment-method');
                
                // Animate removal
                paymentMethod.style.opacity = '0';
                paymentMethod.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    paymentMethod.remove();
                    
                    // Show notification
                    if (window.notificationSystem) {
                        window.notificationSystem.showNotification({
                            type: 'success',
                            title: 'Card Removed',
                            message: 'Your payment method has been removed successfully.',
                            duration: 3000
                        });
                    }
                }, 300);
            }
        });
    });
}

// Detect credit card type
function detectCardType(number) {
    const icons = document.querySelectorAll('.card-type-icons i');
    
    // Reset all icons
    icons.forEach(icon => {
        icon.classList.remove('active');
    });
    
    // Detect card type based on first digits
    if (/^4/.test(number)) {
        // Visa
        document.querySelector('.card-type-icons .fa-cc-visa').classList.add('active');
    } else if (/^5[1-5]/.test(number)) {
        // Mastercard
        document.querySelector('.card-type-icons .fa-cc-mastercard').classList.add('active');
    } else if (/^3[47]/.test(number)) {
        // American Express
        document.querySelector('.card-type-icons .fa-cc-amex').classList.add('active');
    } else if (/^6(?:011|5)/.test(number)) {
        // Discover
        document.querySelector('.card-type-icons .fa-cc-discover').classList.add('active');
    }
}

// Validate payment form
function validatePaymentForm() {
    let isValid = true;
    
    // Validate cardholder name
    const cardholderName = document.getElementById('cardholderName');
    if (!cardholderName.value.trim()) {
        showError(cardholderName, 'Cardholder name is required');
        isValid = false;
    } else {
        clearError(cardholderName);
    }
    
    // Validate card number
    const cardNumber = document.getElementById('cardNumber');
    const cardNumberValue = cardNumber.value.replace(/\s/g, '');
    if (!cardNumberValue) {
        showError(cardNumber, 'Card number is required');
        isValid = false;
    } else if (!/^\d{13,19}$/.test(cardNumberValue)) {
        showError(cardNumber, 'Invalid card number');
        isValid = false;
    } else {
        clearError(cardNumber);
    }
    
    // Validate expiry date
    const expiryDate = document.getElementById('expiryDate');
    if (!expiryDate.value) {
        showError(expiryDate, 'Expiry date is required');
        isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
        showError(expiryDate, 'Invalid format (MM/YY)');
        isValid = false;
    } else {
        const [month, year] = expiryDate.value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            showError(expiryDate, 'Card has expired');
            isValid = false;
        } else if (parseInt(month) < 1 || parseInt(month) > 12) {
            showError(expiryDate, 'Invalid month');
            isValid = false;
        } else {
            clearError(expiryDate);
        }
    }
    
    // Validate CVV
    const cvv = document.getElementById('cvv');
    if (!cvv.value) {
        showError(cvv, 'CVV is required');
        isValid = false;
    } else if (!/^\d{3,4}$/.test(cvv.value)) {
        showError(cvv, 'Invalid CVV');
        isValid = false;
    } else {
        clearError(cvv);
    }
    
    return isValid;
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    if (!formGroup.querySelector('.error-message')) {
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

// Clear error message
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    input.classList.remove('error');
}

// Invoice Functionality
function setupInvoices() {
    // Download all button
    const downloadAllBtn = document.getElementById('downloadAll');
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', () => {
            // In a real app, this would download all invoices
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Download Started',
                    message: 'Your invoices are being prepared for download.',
                    duration: 3000
                });
            }
        });
    }
    
    // Individual invoice download buttons
    const invoiceBtns = document.querySelectorAll('.invoice-btn');
    invoiceBtns.forEach(button => {
        button.addEventListener('click', function() {
            const invoiceItem = this.closest('.invoice-item');
            const invoiceTitle = invoiceItem.querySelector('.invoice-title').textContent;
            const invoiceId = invoiceItem.querySelector('.invoice-id').textContent;
            
            // In a real app, this would download the specific invoice
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Invoice Downloaded',
                    message: `Invoice ${invoiceId} for ${invoiceTitle} has been downloaded.`,
                    duration: 3000
                });
            }
        });
    });
}

// Billing Info Functionality
function setupBillingInfo() {
    // Edit billing info button
    const editBillingBtn = document.getElementById('editBillingInfo');
    if (editBillingBtn) {
        editBillingBtn.addEventListener('click', () => {
            openModal('billingInfoModal');
        });
    }
    
    // Billing info form
    const billingInfoForm = document.getElementById('billingInfoForm');
    if (billingInfoForm) {
        billingInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send data to a server
            
            // Show success notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'success',
                    title: 'Billing Info Updated',
                    message: 'Your billing information has been updated successfully.',
                    duration: 3000
                });
            }
            
            // Close modal
            closeModal('billingInfoModal');
        });
    }
}

// Subscription Functionality
function setupSubscription() {
    // Change plan button
    const changePlanBtn = document.getElementById('changePlan');
    if (changePlanBtn) {
        changePlanBtn.addEventListener('click', () => {
            openModal('changePlanModal');
        });
    }
    
    // Cancel subscription button
    const cancelSubscriptionBtn = document.getElementById('cancelSubscription');
    if (cancelSubscriptionBtn) {
        cancelSubscriptionBtn.addEventListener('click', () => {
            openModal('cancelSubscriptionModal');
        });
    }
    
    // Plan option buttons
    const planOptionBtns = document.querySelectorAll('.plan-option .btn-outline');
    planOptionBtns.forEach(button => {
        button.addEventListener('click', function() {
            const planOption = this.closest('.plan-option');
            const planName = planOption.querySelector('.plan-name').textContent;
            
            // In a real app, this would change the subscription plan
            
            // Show confirmation dialog
            if (confirm(`Are you sure you want to switch to the ${planName} plan?`)) {
                // Show success notification
                if (window.notificationSystem) {
                    window.notificationSystem.showNotification({
                        type: 'success',
                        title: 'Plan Changed',
                        message: `Your subscription has been changed to the ${planName} plan.`,
                        duration: 3000
                    });
                }
                
                // Close modal
                closeModal('changePlanModal');
            }
        });
    });
    
    // Cancel reason dropdown
    const cancelReasonSelect = document.getElementById('cancelReason');
    const otherReasonGroup = document.getElementById('otherReasonGroup');
    
    if (cancelReasonSelect && otherReasonGroup) {
        cancelReasonSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherReasonGroup.style.display = 'block';
            } else {
                otherReasonGroup.style.display = 'none';
            }
        });
    }
    
    // Keep subscription button
    const keepSubscriptionBtn = document.getElementById('keepSubscription');
    if (keepSubscriptionBtn) {
        keepSubscriptionBtn.addEventListener('click', () => {
            closeModal('cancelSubscriptionModal');
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Subscription Maintained',
                    message: 'Your subscription has been maintained. Thank you for staying with us!',
                    duration: 3000
                });
            }
        });
    }
    
    // Confirm cancel button
    const confirmCancelBtn = document.getElementById('confirmCancel');
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', function() {
            const cancelReason = document.getElementById('cancelReason').value;
            
            if (!cancelReason) {
                alert('Please select a reason for cancellation.');
                return;
            }
            
            // In a real app, this would cancel the subscription
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Subscription Canceled',
                    message: 'Your subscription has been canceled. It will remain active until the end of the current billing period.',
                    duration: 5000
                });
            }
            
            // Close modal
            closeModal('cancelSubscriptionModal');
        });
    }
}

// Transaction Functionality
function setupTransactions() {
    // Date filter
    const dateFilter = document.getElementById('transactionDateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            // In a real app, this would filter transactions by date
            
            // Show notification
            if (window.notificationSystem) {
                window.notificationSystem.showNotification({
                    type: 'info',
                    title: 'Transactions Filtered',
                    message: `Showing transactions for ${this.options[this.selectedIndex].text}.`,
                    duration: 2000
                });
            }
        });
    }
}

// Modal Functionality
function setupModals() {
    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close, #cancelPaymentForm, #cancelBillingForm');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add animations to billing page elements
function addAnimations() {
    // Card animations
    const cards = document.querySelectorAll('.billing-content .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
        card.classList.add('slide-in-up');
    });
    
    // Payment methods animations
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach((method, index) => {
        method.style.animationDelay = `${0.1 * (index + 1)}s`;
        method.classList.add('slide-in-right');
    });
    
    // Invoice items animations
    const invoiceItems = document.querySelectorAll('.invoice-item');
    invoiceItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
        item.classList.add('slide-in-right');
    });
    
    // Transaction items animations
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach((item, index) => {
        item.style.animationDelay = `${0.05 * (index + 1)}s`;
        item.classList.add('slide-in-up');
    });
}