class Type {
    constructor() {}
    
    /**
     * Donne le type de la variable
     * @param {*} variable 
     */
    get(variable) {
        let dataType = typeof variable;
        if (Array.isArray(variable)) dataType = "Array";
        if (dataType === "object") dataType = variable.constructor.name;
        dataType = dataType[0].toUpperCase() + dataType.substr(1);
        return dataType;
    }

    /**
     * Vérifie si le type de la variable donnée correspond à la liste des Type voulues
     * @param {*} data 
     * @param {*} typeWanted 
     * @returns {Boolean} validType
     */
    isSameType(data, typeWanted) {
        let validType = false;
        if (!Array.isArray(typeWanted)) typeWanted = [typeWanted];
        
        if (this.get(typeWanted) === "Array") {
            validType = typeWanted.filter(type => type === this.get(data)).length > 0;
        } else {
            validType = this.get(data) === typeWanted;
        }
        return validType;
    }
}

export default new Type();