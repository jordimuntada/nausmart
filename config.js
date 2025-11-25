// Configuration file for Smart Places
const CONFIG = {
    // WhatsApp configuration
    // Note: For production, set this environment variable in your deployment platform
    WHATSAPP_PHONE: window.WHATSAPP_PHONE || '+34123456789', // Default fallback number
    
    // WhatsApp message templates by language
    WHATSAPP_MESSAGES: {
        cat: 'Hola! M\'agradaria programar una visita a Smart Places per veure els espais d\'oficina disponibles.',
        es: 'Hola! Me gustaría programar una visita a Smart Places para ver los espacios de oficina disponibles.',
        en: 'Hello! I would like to schedule a visit to Smart Places to see the available office spaces.'
    }
};

// Function to generate WhatsApp URL
function generateWhatsAppURL(language = 'cat') {
    const phone = CONFIG.WHATSAPP_PHONE.replace(/[^\d]/g, ''); // Remove non-digits
    const message = encodeURIComponent(CONFIG.WHATSAPP_MESSAGES[language] || CONFIG.WHATSAPP_MESSAGES.cat);
    return `https://wa.me/${phone}?text=${message}`;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}