import ApplicationInterface from "./ApplicationInterface.js";
import ApplicationManager from "./ApplicationManager.js";
import generate_random_id from "./RandomId.js";
import TaskBar from "./TaskBar.js";
import TaskManager from "./TaskManager/TaskManager.js";
import Window from "./Window.js";
import WindowManager from "./WindowManager.js";

class Application {
    /**
     * 
     * @param {String} name 
     * @param {String} icon 
     * @param {ApplicationInterface} application_interface
     * @param {String} id
     */
    constructor(name, icon = null, application_interface = null, id = null) {
        this.name = name;
        this.icon = icon;
        this.id = id || generate_random_id();
        this.application_interface = application_interface !== null ? application_interface : null;
        this._create_new_interface = function() {
            if (this.application_interface) {
                const Application_Interface = this.application_interface;
                return new Application_Interface().interface;
            } else {
                return null;
            }
        }
        ApplicationManager.add_application(this);
    }

    open() {
        const window = new Window({ name: this.name, icon: this.icon, id: this.id, application: this, application_content: this._create_new_interface() }).create();
        WindowManager.add_window(window);
        WindowManager.set_foreground_window(window.id);
        TaskBar.add_task({ ...this, window: window });
        TaskManager.add_task(this);
        return this;
    }

    close() {
        TaskManager.remove_task(this);
        TaskBar.remove_task(this);
    }
}

export default Application;