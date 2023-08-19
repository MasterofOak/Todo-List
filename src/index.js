import "./style.css";
import { uid } from "uid";
import ToDo from "./ToDo";
import { createCheckbox, renderToDo } from "./renderToDo";
import * as util from "./utilities";
import * as pages from "./loadPages";

export const ALL_TODOS = JSON.parse(localStorage.getItem("all-todos")) || [];
export const PROJECTS = JSON.parse(localStorage.getItem("projects")) || [];

window.addEventListener("load", () => {
    return (
        ALL_TODOS.forEach((todo) => renderToDo(todo)),
        PROJECTS.forEach((project) => util.addProject(project)),
        util.checkDueDate()
    );
});
window.addEventListener("unload", () => {
    return (
        window.localStorage.setItem("all-todos", JSON.stringify(ALL_TODOS)),
        window.localStorage.setItem("projects", JSON.stringify(PROJECTS))
    );
});
formHandler();
pages.loadMainPage();
pages.loadTodays();
pages.loadRepetitives();
util.toggleForm();
util.toggleProject();
util.toggleNotificationBar();
util.disableAside();
util.showProjects();
util.getRandomTodo();
util.searchTodo();
function formHandler() {
    document.querySelector("#create-todo-form").addEventListener("submit", (e) => {
        return createToDo(e);
    });
}
function createToDo(e) {
    e.preventDefault();
    let title = document.getElementById("todo-title").value.toLowerCase();
    let description = document.getElementById("todo-description").value;
    let date = document.getElementById("todo-date").value;
    let type = document.getElementById("todo-type").value;
    let radioBtns = document.getElementsByName("priority");
    let priority = null;
    let endDate = null;
    let frequency = null;

    for (const radioBtn of radioBtns) {
        if (radioBtn.checked) {
            priority = radioBtn.value;
            break;
        }
    }
    if (description === "") description = "No description...";
    switch (type) {
        case "projects":
            type = document.getElementById("projects").value.toLowerCase();
            PROJECTS.push(type);
            util.addProject(type);
            break;
        case "repetitive":
            const repeat_select = document.getElementById("repeat");
            frequency = repeat_select.options[repeat_select.selectedIndex].value;
            endDate = util.setRepetitive(date, frequency);
            break;
    }
    if (e.target.dataset.state === "create") {
        const todo = new ToDo(title, description, date, priority, type, endDate, frequency);
        ALL_TODOS.push(todo);
    } else {
        const todo = ALL_TODOS[ALL_TODOS.findIndex((todo) => todo.id === e.target.dataset.todoid)];
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;
        todo.type = type;
        todo.endDate = endDate;
        todo.frequency = frequency;
    }
    location.reload();
}
