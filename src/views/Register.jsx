import React, { useState } from 'react';

function SignUpForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        country: '',
        postalCode: '',
        contactNumber: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        country: '',
        postalCode: '',
        contactNumber: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        console.log('Form submitted:', formData);
    };

    const validateFormField = (fieldName, value) => {
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                return /^[a-zA-Z]+$/.test(value) ? '' : 'Invalid format';
            case 'email':
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
            case 'password':
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasDigit = /[0-9]/.test(value);
                const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
                const hasMinLength = value.length >= 8;
                return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasMinLength ? '' : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
            case 'confirmPassword':
                return value === formData.password ? '' : 'Passwords do not match';
            case 'dateOfBirth':
                return /^\d{4}-\d{2}-\d{2}$/.test(value) ? '' : 'Invalid date format';
            case 'country':
                return value !== '' ? '' : 'This field is required';
            case 'postalCode':
                return /^[a-zA-Z0-9\s]+$/.test(value) ? '' : 'Invalid format';
            case 'contactNumber':
                return /^\+?\d{10,14}$/.test(value) ? '' : 'Invalid phone number format';
            default:
                return '';
        }
    };

    const handleFormFieldBlur = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateFormField(name, value);
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: errorMessage
        }));
    };

    React.useEffect(() => {
        const isFormValid = Object.values(formErrors).every((error) => error === '');
        setIsFormValid(isFormValid);
    }, [formErrors]);

    const renderError = (error) => <span className="error">{error}</span>;

    const renderInputField = (name, label, type = 'text') => (
        <div className="form-group">
            <label>{label}:</label>
            <input
                type={ type }
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                onBlur={handleFormFieldBlur}
            />
            {formErrors[name] && isSubmitted && renderError(formErrors[name])}
        </div>
    );

    return (
        <form onSubmit={handleFormSubmit}>
            {renderInputField('firstName', 'First name', 'text')}
            {renderInputField('lastName', 'Last name', 'text')}
            {renderInputField('email', 'E-mail', 'email')}
            {renderInputField('password', 'Password', 'password')}
            {renderInputField('confirmPassword', 'Confirm password', 'password')}
            {renderInputField('dateOfBirth', 'Date of birth', 'date')}
            <div className="form-group">
                <label>Country of residence:</label>
                <select name="country" value={formData.country} onChange={handleInputChange} onBlur={handleFormFieldBlur}>
                    <option value="">Select country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Brazil">Brazil</option>
                </select>
                {formErrors.country && isSubmitted && renderError(formErrors.country)}
            </div>
            {renderInputField('postalCode', 'Postal code', 'text')}
            {renderInputField('contactNumber', 'Contact number', 'tel')}
            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
    );
}

export default SignUpForm;
