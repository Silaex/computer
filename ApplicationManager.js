import Type from "./Type.js";

class ApplicationManager {
    constructor() {
        this.applications = [];
    }

    add_application(application) {
        if (!Type.isSameType(application, ["Application"])) throw Error("Only Application are accepted.");
        this.applications.push(application);   
    }

    remove_application(application_id) {
        const app_index = this.applications.findIndex(app => app.id === application_id);
        this.applications.splice(app_index, 1);
    }
}

export default new ApplicationManager();