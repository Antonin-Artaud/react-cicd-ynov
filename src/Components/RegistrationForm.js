import React, { useState } from 'react';
import { validateEmail, validateName, validatePostalCode, validateDateOfBirth } from '../utils/validation';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '', // date of birth
        city: '',
        postalCode: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!validateName(formData.firstName)) newErrors.firstName = 'Invalid first name';
        if (!validateName(formData.lastName)) newErrors.lastName = 'Invalid last name';
        if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
        if (!validateDateOfBirth(formData.dob)) newErrors.dob = 'Must be over 18 years old';
        if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = 'Invalid postal code';

        if (Object.keys(newErrors).length === 0) {
            localStorage.setItem('userData', JSON.stringify(formData));
            // Display success toaster here
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                dob: '',
                city: '',
                postalCode: ''
            });
            setIsSubmitted(true);
        } else {
            setErrors(newErrors);
            // Display error toaster here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">Prénom</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div>
                <label htmlFor="lastName">Nom</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="dob">Date de Naissance</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? 'error' : ''}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>

            <div>
                <label htmlFor="city">Ville</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="postalCode">Code Postal</label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </div>

            <button type="submit" disabled={Object.values(formData).some(x => x === '')}>Enregistrer</button>
        </form>
    );
};

export default RegistrationForm;
