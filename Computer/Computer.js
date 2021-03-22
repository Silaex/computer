import ReloadableElements from "../ReloadableElements.js";

class Computer {
    constructor() {
        this.username = "COMPUTER";
        ReloadableElements.add_trigger("computer-username", (elements) => {
            elements.map(element => {
                element.textContent = this.username
            })
        });
        this.password = "admin";
        this.notification_permission = true;
    }

    /**
     * Méthode de modification du nom d'utilisateur
     * @param {String} new_username 
     */
    modify_username(new_username = "") {
        this.username = new_username;
        ReloadableElements.reload_triggers["computer-username"].reload()
    }

    /**
     * Méthode de modification du mot de passe
     * @param {String} new_password 
     */
    modify_password(new_password = "") {
        this.password = new_password;
    }
}

export default new Computer();