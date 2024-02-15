import React, { useState } from 'react';
import {validateEmail} from "../utils/validations/validateEmail";
import {validateName} from "../utils/validations/validateName";
import {validateDateOfBirth} from "../utils/validations/validateDateOfBirth";
import {validatePostalCode} from "../utils/validations/validatePostalCode";
import {
    ErrorCodeInvalidDob,
    ErrorCodeInvalidEmail, ErrorCodeInvalidPostalCode,
    ErrorCodeInvalidFirstName,
    ErrorCodeInvalidLastName, ErrorCodeInvalidCity
} from "./RegistrationFormErrorCode";
import {toast, ToastContainer} from "react-toastify";

/**
 * composant du formulaire
 * @returns {JSX.Element}
 * @constructor
 */
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
        if (!validateName(formData.firstName)) newErrors.firstName = ErrorCodeInvalidFirstName;
        if (!validateName(formData.lastName)) newErrors.lastName = ErrorCodeInvalidLastName;
        if (!validateEmail(formData.email)) newErrors.email = ErrorCodeInvalidEmail;
        if (!validateDateOfBirth(formData.dob)) newErrors.dob = ErrorCodeInvalidDob;
        if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = ErrorCodeInvalidPostalCode;

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
            console.log(isSubmitted)
            toast.success('Bien joué :)')
        } else {
            setErrors(newErrors);
            toast.error('pas bien joué :(')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">Prénom:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span style={{ color: 'red' }}>Invalid first name</span>}
                </div>

                <div>
                    <label htmlFor="lastName">Nom:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span style={{ color: 'red' }}>{ErrorCodeInvalidLastName}</span>}
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id={'email'}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{ErrorCodeInvalidEmail}</span>}
                </div>

                <div>
                    <label htmlFor="dob">Date de naissance:</label>
                    <input
                        id={'dob'}
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={errors.dob ? 'error' : ''}
                    />
                    {errors.dob && <span style={{ color: 'red' }}>{ErrorCodeInvalidDob}</span>}
                </div>

                <div>
                    <label htmlFor="city">Ville:</label>
                    <input
                        id={'city'}
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {errors.city && <span style={{ color: 'red' }}>{ErrorCodeInvalidCity}</span>}
                </div>

                <div>
                    <label htmlFor="postalCode">Code postale:</label>
                    <input
                        id={'postalCode'}
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span style={{ color: 'red' }}>{ErrorCodeInvalidPostalCode}</span>}
                </div>

                <button type="submit" disabled={Object.values(formData).some(x => x === '')}>Enregistrer</button>
                <ToastContainer/>
            </form>
        </div>
    );
};

export default RegistrationForm;
