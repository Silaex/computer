class ReloadableElements {
    constructor() {
        // reload_triggers est le nom qui est donné aux choses tel que le << username >> de l'utilisateur qui est un texte changeant en fonction du texte
        // et donc si l'on le modifie il faut que celui-ci se change dynamiquement donc un RECHARGEMENT des champs textes des ELEMENTS l'incluant
        this.reload_triggers = {};
    }

    /**
     * Méthode d'ajout du trigger
     * @param {String} trigger_name 
     */
    add_trigger(trigger_name = "") {
        this.reload_triggers[trigger_name] = {
            elements: []
        }
    }

    /**
     * Méthode de rechargement des élements
     * @param {String} trigger_name 
     * @param {Function} reload_function 
     */
    reload(trigger_name, reload_function) {
        console.log(this.reload_triggers["computer-username"])
        reload_function(this.reload_triggers[trigger_name].elements);
    }

    /**
     * Ajout d'une Node à la liste des élements à modifier lors de leur rechargement
     * @param {String} trigger_name 
     * @param {Node} element 
     */
    add_element_to_trigger(trigger_name, element) {
        if (!this.reload_triggers[trigger_name]) throw Error("Unknown trigger")
        this.reload_triggers[trigger_name].elements.push(element);
    }
}

export default new ReloadableElements();