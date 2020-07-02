const createChar = () => {
    if(Math.random() < 0.5) return String.fromCharCode(Math.floor((Math.random()*25)+65)).toLowerCase()
    return String.fromCharCode(Math.floor((Math.random()*25)+65))
}

export const generateId = (strength?: number) => {
    var f = ""

    for (var i = 0; i < strength; i++) {
        f += createChar()
    }

    return f;
}

