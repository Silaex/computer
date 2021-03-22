import ApplicationInterface from "../ApplicationInterface.js";
import Globals from "../Globals.js";

const itfc = new ApplicationInterface();
itfc.add_elements(Globals.CREATE_ELEMENT("span", { textContent: "Il y a un nombre excessifs de fenêtres ouvertes." }), itfc.interface);

class WindowOverload {
    constructor() {
        this.interface = new ApplicationInterface();
        this.init();
        return this.interface;
    }

    init() {
        this.interface.add_elements(
            Globals.CREATE_ELEMENT("span", { textContent: "Il y a un nombre excessifs de fenêtres ouvertes.", identifier: "window_overload_text" }), 
            this.interface.interface
        );
    }
}

export default WindowOverload;