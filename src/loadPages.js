import { ALL_TODOS, PROJECTS } from "./index";
import { renderToDo } from "./renderToDo";
import { isToday } from "date-fns";
export function loadRepetitives() {
    document.getElementById("repetitive-todos").addEventListener("click", () => {
        const todo_container = document.querySelector(".todo-grid-container");
        const header = document.getElementById("header");
        header.textContent = "Repetitive To-Do's";
        todo_container.innerHTML = "";
        return ALL_TODOS.filter((x) => x.type === "repetitive").forEach((todo) => renderToDo(todo));
    });
}
export function loadTodays() {
    document.getElementById("today-todos").addEventListener("click", () => {
        const todo_container = document.querySelector(".todo-grid-container");
        const header = document.getElementById("header");
        header.textContent = "Today To-Do's";   
        todo_container.innerHTML = "";
        return ALL_TODOS.filter((x) => isToday(new Date(x.date))).forEach((todo) => renderToDo(todo));
    });
}
export function loadMainPage() {
    document.getElementById("main-page").addEventListener("click", () => {
        const todo_container = document.querySelector(".todo-grid-container");
        const header = document.getElementById("header");
        header.textContent = "All To-Do's";
        todo_container.innerHTML = "";
        return ALL_TODOS.forEach((todo) => renderToDo(todo));
    });
}
export function loadProjects(e) {
    const todo_container = document.querySelector(".todo-grid-container");
    const header = document.getElementById("header");
    const name = e.target.dataset.title;
    header.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)} To-Do's`;
    todo_container.innerHTML = "";
    return ALL_TODOS.filter((x) => x.type === name).forEach((todo) => renderToDo(todo));
}
