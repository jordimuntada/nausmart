# Typeform + Cal.com Integration Setup Guide

## Overview
This implementation adds a Typeform pre-qualification step before Cal.com booking for the "Programar Visitar" buttons on the Smart Places website.

## Setup Instructions

### 1. Create Your Typeform

1. Go to [Typeform.com](https://typeform.com) and create a new form
2. Add the following questions with these field references:

#### Recommended Questions:
- **Name** (Short text)
  - Field reference: `full_name`
  - Required: Yes

- **Email** (Email)
  - Field reference: `email` 
  - Required: Yes

- **Phone** (Phone number)
  - Field reference: `phone_number`
  - Required: Yes

- **Company Name** (Short text)
  - Field reference: `company_name`
  - Required: No

- **Type of Space Needed** (Multiple choice)
  - Field reference: `space_type`
  - Options: Private Office, Shared Office, Meeting Room, Coworking Space
  - Required: Yes

- **Team Size** (Number)
  - Field reference: `team_size`
  - Required: No

- **Budget Range** (Multiple choice)
  - Field reference: `budget`
  - Options: €500-1000/month, €1000-2000/month, €2000-5000/month, €5000+/month
  - Required: No

- **When do you need the space?** (Multiple choice)
  - Field reference: `timeline`
  - Options: Immediately, Within 1 month, Within 3 months, Within 6 months
  - Required: Yes

### 2. Configure Typeform Settings

1. In your Typeform, go to **Settings** → **Notifications**
2. Enable webhook notifications (optional, for tracking)
3. Copy your Typeform ID from the URL (e.g., if URL is `https://admin.typeform.com/form/abc123/create`, the ID is `abc123`)

### 3. Update the Website Configuration

In the `index.html` file, update the `TYPEFORM_CONFIG` object:

```javascript
const TYPEFORM_CONFIG = {
    formId: 'YOUR_ACTUAL_TYPEFORM_ID', // Replace with your Typeform ID
    calLink: 'smartplaces/visit' // Your Cal.com booking link
};
```

### 4. Cal.com Setup

1. Ensure your Cal.com account is set up with the booking link `smartplaces/visit`
2. Configure your Cal.com event type to accept prefilled data
3. Test the booking flow manually

## How It Works

1. **User clicks "Programar Visitar"** → Typeform modal opens
2. **User fills Typeform** → Data is collected and validated
3. **User submits Typeform** → Form closes automatically
4. **Cal.com opens** → Booking calendar appears with prefilled user data
5. **User books appointment** → Meeting is scheduled with context from Typeform

## Data Flow

The integration automatically maps Typeform responses to Cal.com prefill data:

- `full_name` → Cal.com name field
- `email` → Cal.com email field  
- `phone_number` → Cal.com phone field
- `company_name` → Cal.com metadata
- `space_type` → Cal.com metadata
- `budget` → Cal.com metadata
- `timeline` → Cal.com metadata

## Customization Options

### Alternative Popup Mode
If you prefer a popup instead of full-screen modal, replace `openTypeformModal()` calls with `openTypeformPopup()` in the button event listeners.

### Styling
The Typeform inherits the website's branding. You can customize:
- Colors in Typeform admin panel
- Modal behavior in the JavaScript configuration
- Button text in the translations object

### Multi-language Support
The button text "Programar Visitar" is already configured for Spanish and Catalan in the translations object. The Typeform itself should be created in the appropriate language.

## Testing

1. Replace `YOUR_TYPEFORM_ID` with your actual Typeform ID
2. Test the flow:
   - Click "Programar Visitar" button
   - Fill out the Typeform
   - Verify Cal.com opens with prefilled data
   - Complete a test booking

## Troubleshooting

### Typeform doesn't load
- Check that the Typeform ID is correct
- Verify the Typeform is published and public
- Check browser console for JavaScript errors

### Cal.com doesn't open
- Verify Cal.com embed script is loaded
- Check that the Cal.com link is correct
- Ensure Cal.com account is properly configured

### Data not prefilling
- Check that Typeform field references match the mapping in `extractTypeformData()`
- Verify Cal.com accepts prefill data for your event type
- Check browser console for data processing errors

## Support

For issues with:
- **Typeform**: Check [Typeform documentation](https://help.typeform.com/)
- **Cal.com**: Check [Cal.com documentation](https://docs.cal.com/)
- **Integration**: Review the JavaScript console for error messages