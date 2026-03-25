class User {
    #id;
    name;
    age;
    phone;

    constructor(name, age, phone) {
        this.name = name;
        this.age = age;
        this.phone = phone;
    }

    generateID() {

    }

    getID() {
        return this.#id;
    }
}

export default User;