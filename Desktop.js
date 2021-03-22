import ApplicationIcon from "./ApplicationIcon.js";
import Globals from "./Globals.js";
import TaskBar from "./TaskBar.js";
import TaskManager from "./TaskManager/TaskManager.js";
import Type from "./Type.js";

class Desktop {
    constructor() {
        // Ce sont les elements (Application, File, Folder) qui seront présents sur le bureau
        this.elements = [];
    }

    init() {
        this.elements.forEach(element => Globals.DESKTOP_NODE.appendChild(element.create()));
    }

    /**
     * Méthode d'ajout d'éléments sur le bureau
     * @param {Application|String} new_element 
     */
    add_elements(new_element) {
        if (!Type.isSameType(new_element, ["Application", "File", "Folder"])) throw Error("You can't add an element which is not an Application, a File or a Folder.");
        return this.elements.push(new ApplicationIcon(new_element));
    }
}

export default new Desktop();