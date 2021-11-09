class JsonAccess{
    static getObjectJSON(objectJson, level) {
        let levels = level.split(".")  
        let currentObjState = objectJson;          
        for (let i = 0; i < levels.length; i++) {
            currentObjState = currentObjState[levels[i]];
        }
        return currentObjState;
    }
}

export default JsonAccess