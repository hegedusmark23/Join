/**
 * Represents a contact with a name, email, phone number, and a badge color.
 */
class Contact {
    /**
     * Creates an instance of a Contact.
     * @param {string} completeName - The full name of the contact.
     * @param {string} email - The email address of the contact.
     * @param {string} phone - The phone number of the contact.
     * @param {string} badgeColor - The color of the badge associated with the contact.
     */
    constructor(completeName, email, phone, badgeColor) {
        this.completeName = completeName;
        this.email = email;
        this.phone = phone;
        this.badgeColor = badgeColor;
    }
}
