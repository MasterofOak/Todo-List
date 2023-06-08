class ToDo {
    constructor(title, date, type) {
        this.title = title;
        this.date = date;
        this.type = type;
    }
}
document.querySelector("#todo-add").addEventListener("click", () => {
    const form = document.querySelector(".create-todo-container");
    form.style.display = "block";
});
document.querySelector("#todo-close").addEventListener("click", () => {
    const form = document.querySelector(".create-todo-container");
    form.style.display = "none";
});
document.querySelector("#create-todo").addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("todo-title");
    let date = document.getElementById("todo-date");
    let type = document.getElementById("todo-type");

    const todo = new ToDo(title.value, date.value, type.value);
    console.log(todo);
});
