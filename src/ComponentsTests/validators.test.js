import {validateName} from "../utils/validations/validateName";
import {validateEmail} from "../utils/validations/validateEmail";
import {validatePostalCode} from "../utils/validations/validatePostalCode";
import {validateDateOfBirth} from "../utils/validations/validateDateOfBirth";

describe('Validation Functions', () => {
    // Tests pour validateName
    describe('validateName', () => {
        it('should validate correct names', () => {
            expect(validateName('Jean')).toBeTruthy();
            expect(validateName("O'Connor")).toBeTruthy();
            expect(validateName('Marie-Hélène')).toBeTruthy();
        });

        it('should invalidate incorrect names', () => {
            expect(validateName('Jean123')).toBeFalsy();
            expect(validateName('$$$Marc')).toBeFalsy();
            expect(validateName('')).toBeFalsy();
        });
    });

    // Tests pour validateEmail
    describe('validateEmail', () => {
        it('should validate correct emails', () => {
            expect(validateEmail('user@example.com')).toBeTruthy();
            expect(validateEmail('my.email+2024@domain.co.uk')).toBeTruthy();
        });

        it('should invalidate incorrect emails', () => {
            expect(validateEmail('userexample.com')).toBeFalsy();
            expect(validateEmail('user@.com')).toBeFalsy();
            expect(validateEmail('user@domain')).toBeFalsy();
        });
    });

    // Tests pour validatePostalCode
    describe('validatePostalCode', () => {
        it('should validate correct postal codes', () => {
            expect(validatePostalCode('75000')).toBeTruthy();
            expect(validatePostalCode('13001')).toBeTruthy();
        });

        it('should invalidate incorrect postal codes', () => {
            expect(validatePostalCode('7500')).toBeFalsy();
            expect(validatePostalCode('123456')).toBeFalsy();
            expect(validatePostalCode('ABCDE')).toBeFalsy();
        });
    });

    // Tests pour validateDateOfBirth
    describe('validateDateOfBirth', () => {
        it('should validate dates of birth over 18 years ago', () => {
            expect(validateDateOfBirth('2000-01-01')).toBeTruthy();
            expect(validateDateOfBirth('1990-12-31')).toBeTruthy();
        });

        it('should invalidate dates of birth less than 18 years ago', () => {
            const today = new Date();
            const year = today.getFullYear() - 17;
            expect(validateDateOfBirth(`${year}-01-01`)).toBeFalsy();
        });
    });
});
