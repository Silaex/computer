/**
 * Fonction de création d'élement HTML
 * @param {String} type 
 * @param {Object} props 
 * @param {Array} childrens 
 * @returns {HTMLElement}
 */
const createElement = function createElement(type, props = {}, childrens = []) {
    const element = document.createElement(type);
    for (const [key, value] of Object.entries(props)) {
        if (key !== "style") {
            element[key] = value;
        } else {
            /**
             *  Si c'est du style il faut le traiter differement
             *  TODO: Améliorable (process identique à la boucle for au-dessus
             *       donc faire une fonction externe avec possibilité de "récursivité")
             */ 
            for (const [a, b] of Object.entries(value)) {
                let v = b
                if (b > 0 && !Number.isNaN(b)) v = `${v}px`
                element.style[a] = v;
            }
        }
    }
    if (childrens) {
        if (!Array.isArray(childrens)) childrens = [childrens]
        childrens.forEach(children => {
            element.append(children)
        })
    }

    return element;
}

export default createElement;