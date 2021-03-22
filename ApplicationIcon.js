import Globals from "./Globals.js";
import TaskBar from "./TaskBar.js";
import TaskManager from "./TaskManager/TaskManager.js";

class ApplicationIcon {
    constructor(application) {
        this.root_node = Globals.CREATE_ELEMENT("div", { className: "application-icon-container" });
        this.icon = Globals.CREATE_ELEMENT("img", { src: application.icon, className: "application-icon-image", draggable: false });
        this.name = Globals.CREATE_ELEMENT("span", { textContent: application.name, className: "application-icon-name" });
        this.root_node.addEventListener("dblclick", () => {
            application.open();
        });
    }

    create() {
        this.root_node.append(this.icon, this.name);
        return this.root_node;
    }

    /**
     * Redimensionnement de l'icône
     * @param {Number} width 
     * @param {Number} height 
     */
    set_dimension(width, height) {
        this.root_node.style.width = `${width}px`;
        this.root_node.style.height = `${height}px`;
    }
}

export default ApplicationIcon;