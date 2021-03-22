import Application from "../Application.js";
import Type from "../Type.js";

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    /**
     * 
     * @param {Application} task 
     */
    add_task(task) {
        // On regarde si la tâche ajoutée est bien une Application
        if (!Type.isSameType(task, "Application")) throw Error("A task must always be an Application");
        // On ajoute l'application
        this.tasks.push(task);
    }

    /**
     * 
     * @param {String} task_id
     */
    remove_task(task_id) {
        const task_index = this.tasks.findIndex(task => task.id === task_id);
        if (task_index) this.tasks.splice(task_index);
    }
}

export default new TaskManager();