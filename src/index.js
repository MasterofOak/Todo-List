class ToDo {
    constructor(title, type) {
        this.title = title;
        this.date = new Date().toLocaleDateString();
        this.type = type;
    }
}
const user = new ToDo("take out trash", "Today");
console.log(user);