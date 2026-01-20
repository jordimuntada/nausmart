# RealBrave - WhatsApp Integration

This project includes WhatsApp integration for the "Programar visita" (Schedule Visit) buttons.

## WhatsApp Configuration

### Environment Variable Setup

The WhatsApp phone number is configured using an environment variable for easy deployment management.

#### Local Development

1. Update the phone number in [`index.html`](index.html) line 21:
   ```javascript
   window.WHATSAPP_PHONE = '+34123456789'; // Replace with your actual WhatsApp business number
   ```

#### Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new environment variable:
   - **Name**: `WHATSAPP_PHONE`
   - **Value**: Your WhatsApp business phone number (e.g., `+34123456789`)
   - **Environment**: Production (and Preview if needed)

4. For static sites, you'll need to inject this at build time. Update your build process to replace the placeholder in the HTML file.

### WhatsApp Link Format

The buttons use the standard WhatsApp URL format:
```
https://wa.me/[PHONE_NUMBER]?text=[ENCODED_MESSAGE]
```

### Message Templates

The system includes pre-configured messages in three languages:
- **Catalan**: "Hola! M'agradaria programar una visita a RealBrave per veure els espais d'oficina disponibles."
- **Spanish**: "Hola! Me gustaría programar una visita a RealBrave para ver los espacios de oficina disponibles."
- **English**: "Hello! I would like to schedule a visit to RealBrave to see the available office spaces."

### Files Modified

- [`index.html`](index.html) - Updated buttons to use WhatsApp links
- [`config.js`](config.js) - WhatsApp configuration and message templates
- [`.env`](.env) - Environment variable for phone number
- [`.env.example`](.env.example) - Example environment configuration

### Testing

The WhatsApp functionality has been tested and confirmed working. Clicking the "Programar Visita" buttons will:
1. Open WhatsApp in a new tab/window
2. Pre-fill the message based on the current language
3. Direct the user to the configured phone number

### Customization

To modify the WhatsApp messages:
1. Edit the `WHATSAPP_MESSAGES` object in [`config.js`](config.js)
2. Update the href attributes in [`index.html`](index.html) if using direct links

### Security Note

The phone number is visible in the client-side code. For additional security, consider implementing a server-side redirect or using environment variable injection during the build process.