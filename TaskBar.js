import Globals from "./Globals.js";
import Application from "./Application.js";
import ApplicationIcon from "./ApplicationIcon.js";
import StyleModifier from "./StyleModifier.js";
import WindowManager from "./WindowManager.js";

class TaskBar {
    constructor() {
        this.width = { value: 100, unit: "%" }; // POURCENTAGE
        this.height = { value: 32, unit: "px" };
        this.tasks = [];
        this.task_bar = Globals.CREATE_ELEMENT("div", { id: "desktop-task-bar" });
        StyleModifier(this.task_bar, { zIndex: Globals.TASK_BAR_Z_INDEX_LAYER });
    }

    init() {
        Globals.DESKTOP_NODE.append(this.task_bar);
    }

    /**
     * Ajout d'une **tâche** dans la liste de la BARRE DES TACHES
     * @param { Object } task_info
     */
    add_task(task_info) {
        const task = { 
            id: task_info.id,
            window: task_info.window,
            icon: Globals.CREATE_ELEMENT("div", { className: "desktop-task-bar-application-icon", title: task_info.name }),
            name: task_info.name
        };

        // Evenements
        task.icon.addEventListener("click", function() {
            if (!task.window.open_state) {
                WindowManager.open_window(task.window.id); 
                WindowManager.set_foreground_window(task.window.id);
            } else {
                task.window.minimize();
            }
        });

        const icon_side_size = `${this.height.value}${this.height.unit}`;
        StyleModifier(task.icon, { width: icon_side_size, height: icon_side_size, backgroundImage: `url(${task_info.icon})` });
        // Ajout de la tâche dans la barre des tâches
        this.tasks.push(task);
        this.reload();
    }

    /**
     * 
     * @param {String} task_id
     */
    remove_task(task_id) {
        const task_index = this.tasks.findIndex(task => task.id === task_id);
        if (task_index >= 0) this.tasks.splice(task_index, 1);
        this.reload();
    }

    reload() {
        [...this.task_bar.children].forEach(c => c.remove());
        this.tasks.forEach(task => {
            this.task_bar.appendChild(task.icon);
        });
    }
}

export default new TaskBar();