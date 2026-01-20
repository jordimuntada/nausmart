// Configuration - Update these URLs when deploying
const CONFIG = {
    EDGE_FUNCTION_URL: 'https://ofqxvygsjneccemymtws.supabase.co/functions/v1/community-signup',
    WHATSAPP_INVITE_URL: 'https://chat.whatsapp.com/YOUR_INVITE_CODE',
    TELEGRAM_INVITE_URL: 'https://t.me/YOUR_CHANNEL'
};

// Form validation utilities
const validators = {
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email és obligatori';
        if (!emailRegex.test(value)) return 'Format d\'email no vàlid';
        return null;
    },
    
    intent: (value) => {
        if (!value) return 'Què busques és obligatori';
        if (!['Compra', 'Lloguer', 'Inversió'].includes(value)) return 'Opció no vàlida';
        return null;
    },
    
    consent: (checked) => {
        if (!checked) return 'Has d\'acceptar rebre comunicacions';
        return null;
    },
    
    budget: (min, max) => {
        if (min && min < 0) return 'El pressupost mínim ha de ser positiu';
        if (max && max < 0) return 'El pressupost màxim ha de ser positiu';
        if (min && max && min > max) return 'El pressupost mínim no pot ser superior al màxim';
        return null;
    }
};

// UTM parameter extraction
function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
    };
}

// Form data collection
function getFormData() {
    const form = document.getElementById('community-form');
    const formData = new FormData(form);
    
    // Get selected zones
    const zones = [];
    document.querySelectorAll('input[name="zones"]:checked').forEach(checkbox => {
        zones.push(checkbox.value);
    });
    
    // Get selected property types
    const propertyTypes = [];
    document.querySelectorAll('input[name="property_types"]:checked').forEach(checkbox => {
        propertyTypes.push(checkbox.value);
    });
    
    // Get UTM parameters
    const utmParams = getUTMParams();
    
    return {
        email: formData.get('email')?.trim(),
        name: formData.get('name')?.trim() || null,
        intent: formData.get('intent'),
        zones: zones,
        budget_min: formData.get('budget_min') ? parseInt(formData.get('budget_min')) : null,
        budget_max: formData.get('budget_max') ? parseInt(formData.get('budget_max')) : null,
        property_types: propertyTypes,
        consent: document.getElementById('consent').checked,
        weekly_updates: document.getElementById('weekly_updates').checked,
        source: 'community-landing',
        ...utmParams
    };
}

// Form validation
function validateForm(data) {
    const errors = {};
    
    // Validate email
    const emailError = validators.email(data.email);
    if (emailError) errors.email = emailError;
    
    // Validate intent
    const intentError = validators.intent(data.intent);
    if (intentError) errors.intent = intentError;
    
    // Validate consent
    const consentError = validators.consent(data.consent);
    if (consentError) errors.consent = consentError;
    
    // Validate budget
    const budgetError = validators.budget(data.budget_min, data.budget_max);
    if (budgetError) errors.budget = budgetError;
    
    return errors;
}

// Display form errors
function displayErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    document.querySelectorAll('.form-input, .form-select').forEach(el => {
        el.classList.remove('error');
    });
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field) || document.querySelector(`[name="${field}"]`);
        
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.add('show');
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
        
        // Special handling for budget errors
        if (field === 'budget') {
            const budgetMinError = document.getElementById('budget_min-error');
            const budgetMaxError = document.getElementById('budget_max-error');
            if (budgetMinError) {
                budgetMinError.textContent = errors[field];
                budgetMinError.classList.add('show');
            }
            if (budgetMaxError) {
                budgetMaxError.textContent = errors[field];
                budgetMaxError.classList.add('show');
            }
        }
    });
}

// Show loading state
function setLoadingState(loading) {
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('community-form');
    
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        form.style.pointerEvents = 'none';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.style.pointerEvents = 'auto';
    }
}

// Show success state
function showSuccessState(leadData) {
    const form = document.getElementById('community-form');
    const successState = document.getElementById('success-state');
    const successMessage = document.getElementById('success-message');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const telegramBtn = document.getElementById('telegram-btn');
    
    // Hide form and show success state
    form.style.display = 'none';
    successState.style.display = 'block';
    
    // Set success message based on weekly updates preference
    if (leadData.weekly_updates) {
        successMessage.textContent = 'Rebràs actualitzacions setmanals per email.';
    } else {
        successMessage.textContent = 'No tens activades les actualitzacions setmanals (ho pots activar quan vulguis).';
    }
    
    // Show social buttons if URLs are configured
    if (CONFIG.WHATSAPP_INVITE_URL && CONFIG.WHATSAPP_INVITE_URL !== 'https://chat.whatsapp.com/YOUR_INVITE_CODE') {
        whatsappBtn.href = CONFIG.WHATSAPP_INVITE_URL;
        whatsappBtn.style.display = 'block';
    }
    
    if (CONFIG.TELEGRAM_INVITE_URL && CONFIG.TELEGRAM_INVITE_URL !== 'https://t.me/YOUR_CHANNEL') {
        telegramBtn.href = CONFIG.TELEGRAM_INVITE_URL;
        telegramBtn.style.display = 'block';
    }
}

// Show general error
function showGeneralError(message) {
    const errorElement = document.getElementById('form-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Submit form
async function submitForm(data) {
    try {
        const response = await fetch(CONFIG.EDGE_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error del servidor');
        }
        
        if (result.ok) {
            showSuccessState(result.lead);
        } else {
            throw new Error(result.message || 'Error procesant la sol·licitud');
        }
        
    } catch (error) {
        console.error('Submit error:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showGeneralError('Error de connexió. Comprova la teva connexió a internet i torna-ho a provar.');
        } else {
            showGeneralError(error.message || 'Error inesperat. Torna-ho a provar més tard.');
        }
    }
}

// Real-time validation
function setupRealTimeValidation() {
    const emailInput = document.getElementById('email');
    const intentSelect = document.getElementById('intent');
    const consentCheckbox = document.getElementById('consent');
    const budgetMinInput = document.getElementById('budget_min');
    const budgetMaxInput = document.getElementById('budget_max');
    
    // Email validation
    emailInput.addEventListener('blur', () => {
        const error = validators.email(emailInput.value);
        const errorElement = document.getElementById('email-error');
        
        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
            emailInput.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            emailInput.classList.remove('error');
        }
    });
    
    // Intent validation
    intentSelect.addEventListener('change', () => {
        const error = validators.intent(intentSelect.value);
        const errorElement = document.getElementById('intent-error');
        
        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
            intentSelect.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            intentSelect.classList.remove('error');
        }
    });
    
    // Consent validation
    consentCheckbox.addEventListener('change', () => {
        const error = validators.consent(consentCheckbox.checked);
        const errorElement = document.getElementById('consent-error');
        
        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
        } else {
            errorElement.classList.remove('show');
        }
    });
    
    // Budget validation
    function validateBudgets() {
        const min = budgetMinInput.value ? parseInt(budgetMinInput.value) : null;
        const max = budgetMaxInput.value ? parseInt(budgetMaxInput.value) : null;
        const error = validators.budget(min, max);
        
        const minErrorElement = document.getElementById('budget_min-error');
        const maxErrorElement = document.getElementById('budget_max-error');
        
        if (error) {
            minErrorElement.textContent = error;
            minErrorElement.classList.add('show');
            maxErrorElement.textContent = error;
            maxErrorElement.classList.add('show');
            budgetMinInput.classList.add('error');
            budgetMaxInput.classList.add('error');
        } else {
            minErrorElement.classList.remove('show');
            maxErrorElement.classList.remove('show');
            budgetMinInput.classList.remove('error');
            budgetMaxInput.classList.remove('error');
        }
    }
    
    budgetMinInput.addEventListener('blur', validateBudgets);
    budgetMaxInput.addEventListener('blur', validateBudgets);
}

// Initialize form
function initializeForm() {
    const form = document.getElementById('community-form');
    
    // Setup real-time validation
    setupRealTimeValidation();
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypotField = document.getElementById('hp_email_community');
        if (honeypotField && honeypotField.value) {
            console.warn('Bot detected via honeypot field!');
            return; // Prevent form submission
        }

        // Clear previous general errors
        document.getElementById('form-error').classList.remove('show');
        
        // Get form data
        const data = getFormData();
        
        // Validate form
        const errors = validateForm(data);
        
        if (Object.keys(errors).length > 0) {
            displayErrors(errors);
            return;
        }
        
        // Submit form
        setLoadingState(true);
        await submitForm(data);
        setLoadingState(false);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeForm);

// Debug function for development
window.debugCommunityForm = function() {
    console.log('Form data:', getFormData());
    console.log('UTM params:', getUTMParams());
    console.log('Config:', CONFIG);
};
