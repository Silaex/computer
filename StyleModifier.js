class StyleModifier {
    constructor() {
        /**
         * 
         * @param {HTMLElement} element 
         * @param {Object} style 
         */
        function modify(element, style) {
            for (const property in style) {
                if (style.hasOwnProperty(property)) {
                    const value = style[property];
                    element.style[property] = value;
                }
            }

            return element;
        }

        return modify;
    }
}

export default new StyleModifier();