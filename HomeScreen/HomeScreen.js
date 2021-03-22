import Application from "../Application.js";
import ApplicationIcon from "../ApplicationIcon.js";
import Computer from "../Computer/Computer.js";
import ComputerOptions from "../Computer/ComputerOptions.js";
import Desktop from "../Desktop.js";
import DesktopInput from "../DesktopInput.js";
import Globals from "../Globals.js";
import NativeApplicationsInterface from "../NativeApplicationsInterface.js";
import ReloadableElements from "../ReloadableElements.js";
import StyleModifier from "../StyleModifier.js";
import TaskBar from "../TaskBar.js";
import TaskManager from "../TaskManager/TaskManager.js";

class HomeScreen {
    constructor() {
        this.home_screen = Globals.CREATE_ELEMENT("form", { id: "desktop-homescreen" });
        StyleModifier(this.home_screen, { zIndex: Globals.HOME_SCREEN_Z_INDEX_LAYER });
        this.username = Globals.CREATE_ELEMENT("h2", { id: "desktop-homescreen-username", className: "font-title" });
        this.username.textContent = Computer.username;
        ReloadableElements.add_element_to_trigger("computer-username", this.username);

        this.password = new DesktopInput({ type: "password", id: "desktop-homescreen-pwd", button_text: "login", placeholder: "password" });
        this.password["input"].addEventListener("keypress", () => this.password["input_container"].classList.remove("b-red"));
        
        // Appuie sur Entrée ou sur le bouton << login >>
        this.home_screen.addEventListener("submit", (event) => this.login(event));
    }

    init() {
        this.home_screen.append(this.username, this.password["input_container"]);
        Globals.DESKTOP_NODE.appendChild(this.home_screen);
    }

    /**
     * Méthode d'authentification
     * @param {Event} event - le paramètre des évenements
     */
    login(event) {
        event.preventDefault();
        
        if (this.password["input"].value === Computer.password) {
            this.password["input_container"].classList.add("b-green");

            const text_application = new Application("Bloc-notes", "./text_editor.svg", NativeApplicationsInterface.Notepad.instance, NativeApplicationsInterface.Notepad.id);
            console.log(text_application)
            Desktop.add_elements(text_application);

            Desktop.add_elements(new Application("a", "./file.svg"))

            Desktop.init();
            TaskBar.init();

            setTimeout(() => {
                this.home_screen.classList.add("fade-out");
                this.home_screen.addEventListener("animationend", () => {
                    this.home_screen.remove();
                    this.home_screen.classList.remove("fade-out");
                    this.password["input_container"].classList.remove("b-green");
                    this.password["input"].value = "";
                });
            }, 1000);
        } else {
            this.password["input_container"].classList.add("b-red");
        }
    }
}

export default new HomeScreen();