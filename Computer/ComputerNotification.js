import Application from "../Application.js";
import Window from "../Window.js";

class ComputerNotification {
    /**
     * 
     * @param {Application} notification 
     */
    constructor(notification) {
        this.notification = new Window(new Application(notification.name, notification.icon, notification, notification.id));
    }

    run() {
        this.notification.create();
    }
}

export default ComputerNotification;