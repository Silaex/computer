import createElement from "./createElement.js";

const Globals = {
    DESKTOP_NODE: document.getElementById("desktop"),
    CREATE_ELEMENT: createElement,
    RANDOM_NUMBER: function(min, max) { return Math.round(Math.random() * (max - min)) + min; },
    HOME_SCREEN_Z_INDEX_LAYER: 6000,
    WINDOWS_Z_INDEX_LAYER: { min: 100, max: 105 },
    TASK_BAR_Z_INDEX_LAYER: 5000,
    FIND_ELEMENT_BY_IDENTIFIER:
        /**
         * 
         * @param {String} identifier - Nom de l'identifiant de la Node a rechercher.
         * @param {Node} hint_node - La Node la plus proche que l'on a pu renseigner (permettant de raccourcir la recherche).
         */
        function find_element_by_identifier(identifier, hint_node) {
            if (!hint_node) hint_node = document.body;
            if (hint_node.identifier && hint_node.identifier === identifier) {
                return hint_node;
            } else {
                // Si la Node a des enfants
                if (hint_node.children) {
                    // Alors on parcourt ses enfants pour faire une liste de ce qu'il renvoie et avoir peut-être dans la liste l'element recherché
                    const result = [...hint_node.children].map(node => {
                        return find_element_by_identifier(identifier, node);
                    });
                    // On filtre la liste por n'avoir que celle trouvée
                    const filtered_results = result.filter(f => f !== null);
                    if (filtered_results.length) {
                        return filtered_results[0];
                    } else {
                        return null;
                    }
                }
                return null;
            }
        },
    
}

export default Globals;