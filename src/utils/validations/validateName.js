/**
 * Méthode pour valider les noms du user
 * @param name
 * @returns {boolean}
 */
export const validateName = (name) => {
    const regex = /^[a-zA-Zàâäéèêëïîôöùûüÿçœ' -]+$/;
    return regex.test(name);
};