import Globals from "./Globals.js";

class DesktopInput {
    constructor({ type = "", id = "", button_text = "", placeholder = "" }) {
            this.input_container = Globals.CREATE_ELEMENT("div", {
                className: "desktop-input-container"
            })
            this.input = Globals.CREATE_ELEMENT("input", {
                id,
                className: "desktop-input",
                type,
                placeholder
            });
            this.sumbit_button = Globals.CREATE_ELEMENT("button", {
                className: "desktop-submit-button",
                textContent: button_text,
                type: "submit"
            })
            this.input_container.append(this.input, this.sumbit_button);
            return this;
    }
}

export default DesktopInput;