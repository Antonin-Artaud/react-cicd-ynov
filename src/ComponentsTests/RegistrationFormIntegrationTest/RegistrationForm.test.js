import React from 'react';
import {render, fireEvent, waitFor, screen, act} from '@testing-library/react';
import RegistrationForm from "../../Components/RegistrationForm";

import {
    ErrorCodeInvalidDob,
    ErrorCodeInvalidEmail, ErrorCodeInvalidPostalCode,
    ErrorCodeInvalidFirstName,
    ErrorCodeInvalidLastName
} from "../../Components/RegistrationFormErrorCode";

describe('RegistrationForm Integration Tests', () => {
    test('should allow a user to fill out the form and submit it', async () => {
        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/Prénom:/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Nom:'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/E-mail:/i), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: '2000-01-01' } });
        fireEvent.change(screen.getByLabelText(/Ville:/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Code postale:/i), { target: { value: '75000' } });

        expect(screen.getByText('Enregistrer')).toBeEnabled();
    });
    test('should display error messages for invalid input', async () => {
        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/Prénom:/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText('Nom:'), { target: { value: '456' } });
        fireEvent.change(screen.getByLabelText(/E-mail:/i), { target: { value: '789' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: 'invalid-date' } });
        fireEvent.change(screen.getByLabelText(/Ville:/i), { target: { value: '999' } });
        fireEvent.change(screen.getByLabelText(/Code postale:/i), { target: { value: 'invalid-code' } });

        const button = screen.getByRole('button', { name: /Enregistrer/i });
        fireEvent.click(button);

        setTimeout(() =>{
            expect(screen.getByText('Invalid first name')).toBeInTheDocument();
            expect(screen.getByText(ErrorCodeInvalidLastName)).toBeInTheDocument();
            expect(screen.getByText(ErrorCodeInvalidEmail)).toBeInTheDocument();
            expect(screen.getByText(ErrorCodeInvalidDob)).toBeInTheDocument();
            expect(screen.getByText(ErrorCodeInvalidPostalCode)).toBeInTheDocument();
        }, 50)
    });

    test('should save valid data to localStorage on form submission', async () => {
        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/Prénom:/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Nom:'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/E-mail:/i), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance:/i), { target: { value: '2000-01-01' } });
        fireEvent.change(screen.getByLabelText(/Ville:/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Code postale:/i), { target: { value: '75000' } });

        fireEvent.click(screen.getByText('Enregistrer'));

        expect(localStorage.getItem('userData')).toEqual(JSON.stringify({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            dob: '2000-01-01',
            city: 'Paris',
            postalCode: '75000'
        }));
    });

});