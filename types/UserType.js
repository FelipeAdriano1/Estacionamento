import GenerateIDError from "../errors/GenerateIDError.js";

function User() {
    return {
        name: "",
        phone: ""
    }
}

function generateCode() {
    const id = [];

    function generateLetter() {
        const maiuscula = Math.random() < 0.5;

        if (maiuscula) {
            // A-Z → 65–90
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
        } else {
            // a-z → 97–122
            return String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
    }

    const generateSequence = () => {

        for (let i = 0; i < 6; i++) {
            id[i] = Math.random() < 0.5 ? generateLetter() : Math.floor(Math.random() * 10);
        }
    }

    generateSequence();

    if (id.length > 6 || id.length !== 6) throw new GenerateIDError();
    return id.join('');
}

function assignID(obj) {
    const newObj = {
        ...obj,
        id: generateCode()
    }

    return newObj;
}

export { User, assignID };