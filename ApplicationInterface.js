import Globals from "./Globals.js";

class ApplicationInterface {
    constructor() {
        this.interface = Globals.CREATE_ELEMENT("div", { className: "application-interface-container", identifier: "root" });
        this.elements = {
            root: {
                node: this.interface,
                childrens: {}
            }
        };
    }

    /**
     * 
     * @param {Array.<HTMLElement> | HTMLElement} elements - Elements à ajouter
     * @param {HTMLElement} parent - Cible de là où les élements devrait être ajouter en tant qu'enfant
     */
    add_elements(elements, parent) {
        if (!Array.isArray(elements)) elements = [elements];
        parent.append(...elements);
        elements.forEach(element => {
            this.elements[parent.identifier].childrens[element.identifier] = { node: element, childrens: {} };
        });
        console.log(this.elements)
    }
}

export default ApplicationInterface;