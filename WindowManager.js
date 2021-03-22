import ComputerErrors from "./Computer/ComputerErrors.js";
import ComputerNotification from "./Computer/ComputerNotification.js";
import Globals from "./Globals.js";
import StyleModifier from "./StyleModifier.js";
import Type from "./Type.js";
import Window from "./Window.js";

class WindowManager {
    constructor() {
        this.windows = [];
        this.window_z_index_additioner = 0;
        this.foreground_window = null;
    }

    /**
     * 
     * @param {Window} window 
     */
    add_window(window) {
        const maximum_window_allowed = Globals.WINDOWS_Z_INDEX_LAYER.max - Globals.WINDOWS_Z_INDEX_LAYER.min;
        if (this.windows.length >= maximum_window_allowed) {
            new ComputerNotification(ComputerErrors.window_overload).run();
            window.close();
            return;
        }
        if (!Type.isSameType(window, ["Window"])) throw Error("You can only add Window");
        this.windows.push(window);
    }

    /**
     * 
     * @param {Window} window 
     */
    remove_window(window) {
        if (!Type.isSameType(window, ["Window"])) throw Error("You can only add Window");
        this.windows.splice(this.windows.findIndex(w => w === window), 1);
    }

    /**
     * 
     * @param {String} window_application_id 
     */
    open_window(window_id) {
        this.find_by_window_id(window_id).show();
    }

    /**
     * 
     * @param {String} window_id 
     */
    set_foreground_window(window_id) {
        // Reset des couches de superposition des fenêtres
        if (Globals.WINDOWS_Z_INDEX_LAYER.min + this.window_z_index_additioner >= Globals.WINDOWS_Z_INDEX_LAYER.max) {
            const min_max_diff = Globals.WINDOWS_Z_INDEX_LAYER.max - Globals.WINDOWS_Z_INDEX_LAYER.min;
            this.windows.forEach(function (window_infos) {
                const window_z_index = window_infos.window.style.zIndex;
                StyleModifier(window_infos.window, { zIndex: window_z_index - min_max_diff });
            });
            this.window_z_index_additioner = 0;
        }

        const window_elements = this.find_by_window_id(window_id);
        if (this.foreground_window) {
            if (this.foreground_window.id !== window_id) this.window_z_index_additioner++;
        }
        StyleModifier(window_elements.window, { zIndex: Globals.WINDOWS_Z_INDEX_LAYER.min + this.window_z_index_additioner });
        this.foreground_window = window_elements;
    }

    find_by_application_id(application_id) {
        return this.windows.find(win => win.application_id === application_id) || null;
    }

    find_by_window_id(window_id) {
        
        return this.windows.find(win => win.id === window_id) || null;
    }
}

export default new WindowManager();