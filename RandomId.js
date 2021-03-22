import Globals from "./Globals.js";

export default function generate_random_id() {
    let id = "";
    for (let i = 0; i < Globals.RANDOM_NUMBER(5, 20); i++) {
        id += `${Globals.RANDOM_NUMBER(0, 9)}`;
    }

    return id;
}