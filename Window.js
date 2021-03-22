import Application from "./Application.js";
import Globals from "./Globals.js";
import generate_random_id from "./RandomId.js";
import StyleModifier from "./StyleModifier.js";
import TaskBar from "./TaskBar.js";
import TaskManager from "./TaskManager/TaskManager.js";
import WindowManager from "./WindowManager.js";

class Window {
    /**
     * 
     * @param {Number} width  - Largeur de la fenêtre
     * @param {Number} height - Hauteur de la fenêtre
     * @param {String} name - Nom de l'Application
     * @param {String} icon - Icone de l'Application
     * @param {Application} application - L'ID de l'Application qui est lancé et rendu grâce à cette fenêtre
     * @param {HTMLElement} application_interface - Element HTML parent du contenu de l'application
     */
    constructor ({ width = 500, height = 300, name, icon, application, application_interface }) {
        this.id = generate_random_id();
        this.application = application;
        this.application_interface = application_interface || Globals.CREATE_ELEMENT("div");

        this.window = Globals.CREATE_ELEMENT("div", { className: "window-container" });

        this.window_icon = Globals.CREATE_ELEMENT("img", { className: "window-icon", src: icon });
        this.window_name = Globals.CREATE_ELEMENT("span", { className: "window-name", textContent: name });
        this.window_infos_container = Globals.CREATE_ELEMENT("div", { className: "window-infos-container" });
        
        this.window_minimize_button = Globals.CREATE_ELEMENT("span", { className: "window-minimize-button", textContent: "_", title: "Minimiser" });
        this.window_close_button = Globals.CREATE_ELEMENT("span", { className: "window-close-button", textContent: "X", title: "Fermer" });
        this.window_buttons_container = Globals.CREATE_ELEMENT("div", { className: "window-buttons-container" });

        this.window_top_container = Globals.CREATE_ELEMENT("div", { className: "window-top-container" });

        this.window_content = Globals.CREATE_ELEMENT("div", { className: "window-content" });
        // Initialisation des evenements des elements
        this.event_init();

        this.window.style.height = `${height}px`;
        this.window.style.width = `${width}px`;
        this.name = name;
        this.open_state = true;
        this.dragged = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.position = {
            x: 0,
            y: 0
        }
    }

    create() {
        // Infos
        this.window_infos_container.append(this.window_icon, this.window_name);
        // Boutons
        this.window_buttons_container.append(this.window_minimize_button, this.window_close_button);
        // TOP Container
        this.window_top_container.append(this.window_infos_container, this.window_buttons_container);
        // CONTENU 
        this.window_content.appendChild(this.application_interface);
        this.window.append(this.window_top_container, this.window_content);

        this.show();
        console.time("TEMPS DE RECHERCHE");
        console.log(Globals.FIND_ELEMENT_BY_IDENTIFIER("writing zone", this.application_interface));
        console.timeEnd("TEMPS DE RECHERCHE");
        return this;
    }

    show() {
        Globals.DESKTOP_NODE.appendChild(this.window);
        this.window.style.left = `${this.position.x}px`;
        this.window.style.top = `${this.position.y}px`;
        this.open_state = true;
    }

    close() {
        this.window.remove();
        WindowManager.remove_window(this);
        application.close();
        this.open_state = false;
    }

    minimize() {
        this.window.remove();
        this.open_state = false;
    }

    // INITIALISATION DES EVENEMENTS
    event_init() {
        // Fermer la fenêtre
        this.window_close_button.addEventListener("mouseup", () => this.close());
        // Minimiser la fenêtre
        this.window_minimize_button.addEventListener("click", () => this.minimize());
        // SYSTEME DE DEPLACEMENT
        this.window_top_container.addEventListener("mousedown", event => {
            this.dragged = true;
            this.offsetX = event.layerX;
            this.offsetY = event.layerY;
        });
        this.window_top_container.addEventListener("mouseup", event => {
            this.set_position(event.x - this.offsetX, event.y - this.offsetY);
            this.dragged = false;
        });
        Globals.DESKTOP_NODE.addEventListener("mousemove", (event) => {
            if (this.dragged) {
                this.window.style.left = `${event.x - this.offsetX}px`;
                this.window.style.top = `${event.y - this.offsetY}px`;
            }
        });
        this.window.addEventListener("mousedown", () => WindowManager.set_foreground_window(this.id));
    }

    /**
     * Méthode modifiant les positions X et/ou Y de la fenêtre
     * @param {Number} x
     * @param {Number} y 
     */
    set_position(x, y) {
        this.position.x = x || this.position.x;
        this.position.y = y || this.position.y;
        this.window.style.left = `${this.position.x}px`;
        this.window.style.top = `${this.position.y}px`;
    }
}

export default Window;