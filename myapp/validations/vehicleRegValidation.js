

const vehicleRegValidation = (registration) => {
    // Check if the registration has exactly 7 characters
    if (registration.length !== 7) {
        return { valid: false, error: 'Registration must be exactly 7 characters long.' };
    }
    
    // Regex for validating 7-character vehicle registration numbers
    const regex = /^[A-Z0-9]{7}$/; // Matches exactly 7 characters of A-Z and 0-9
    if (!regex.test(registration)) {
        return { valid: false, error: 'Registration must contain only uppercase letters and numbers.' };
    }
    
    // If both checks pass
    return { valid: true };

}


module.exports = {
    vehicleRegValidation
}