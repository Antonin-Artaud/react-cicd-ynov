/**
 * Méthode pour valider le code postal
 * @param postalCode
 * @returns {boolean}
 */
export const validatePostalCode = (postalCode) => {
    const regex = /^\d{5}$/;
    return regex.test(postalCode);
};