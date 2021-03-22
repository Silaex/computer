import Notepad from "./Notepad.js";
import generate_random_id from "./RandomId.js";

const NativeApplicationsInterface = {
    "Notepad": {
        "instance": Notepad,
        "id": generate_random_id()
    }
}

// : aezea

export default NativeApplicationsInterface;