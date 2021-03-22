import ApplicationInterface from "./ApplicationInterface.js";
import Globals from "./Globals.js";
import StyleModifier from "./StyleModifier.js";


class Notepad {
    constructor() {
        this.notepad = new ApplicationInterface();
        this.init();
        return this.notepad;
    }

    init() {
        const notepad_writing_zone = Globals.CREATE_ELEMENT("textarea", {
            identifier: "writing zone"
        });
        StyleModifier(notepad_writing_zone, {
            width: "100%",
            height: "100%",
            padding: "4px"
        });
        this.notepad.add_elements(notepad_writing_zone, this.notepad.interface);
    }
}

export default Notepad;