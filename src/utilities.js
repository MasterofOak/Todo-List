import { ALL_TODOS, PROJECTS } from ".";
import { loadProjects } from "./loadPages";
import { isToday, isYesterday, add } from "date-fns";
import { renderToDo } from "./renderToDo";

export function toggleForm() {
    limitDatePick();
    document.querySelector("#todo-add").addEventListener("click", () => {
        const container = document.querySelector(".form-container");
        const form = document.getElementById("create-todo-form");
        container.classList.remove("hidden");
        form.dataset.state = "create";
        document.documentElement.scrollTop = 0;
        document.body.style.overflowY = "hidden";
    });
    document.querySelector("#todo-close").addEventListener("click", () => {
        const container = document.querySelector(".form-container");
        const form = document.getElementById("create-todo-form");
        container.classList.add("hidden");
        document.body.style.overflowY = "auto";
        form.reset();
    });
}
export function toggleProject() {
    const select = document.getElementById("todo-type");
    const input = document.getElementById("project-input");
    const repeat_sel = document.getElementById("repeat-selection");
    select.addEventListener("change", () => {
        let selectedText = select.options[select.selectedIndex].value;
        input.classList.add("hidden");
        repeat_sel.classList.add("hidden");
        if (selectedText === "projects") {
            input.classList.remove("hidden");
        } else if (selectedText === "repetitive") {
            repeat_sel.classList.remove("hidden");
        }
    });
}
export function toggleNotificationBar() {
    document.getElementById("notification-icon").addEventListener("click", () => {
        const notif_container = document.getElementById("notification-container");
        const bubble = document.getElementById("counter");
        if (notif_container.classList.contains("hidden")) {
            notif_container.classList.remove("hidden");
            bubble.textContent = "";
            bubble.classList.add("hidden");
        } else {
            notif_container.classList.add("hidden");
        }
    });
}
export function getTodaysDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
export function limitDatePick() {
    const calendar = document.getElementById("todo-date");
    getTodaysDate();
    calendar.setAttribute("min", getTodaysDate());
}
export function checkToDo(todo, input) {
    if (input.checked) {
        console.log("cheked");
        todo.isChecked = true;
    } else {
        console.log("uncheked");
        todo.isChecked = false;
    }
}
export function disableAside() {
    document.getElementById("aside").addEventListener("click", () => {
        const aside = document.querySelector("aside");
        const wrapper = document.getElementById("wrapper");
        const grid_items = document.querySelectorAll(".todo-grid-item");
        if (aside.style.display === "none") {
            aside.style.display = "flex";
            wrapper.style.removeProperty("grid-template-columns");
            grid_items.forEach((item) => {
                return item.style.removeProperty("font-size");
            });
        } else {
            aside.style.display = "none";
            wrapper.style.gridTemplateColumns = "1fr";
            grid_items.forEach((item) => {
                return (item.style.fontSize = "1.25rem");
            });
        }
    });
}
export function showProjects() {
    document.getElementById("project-trigger").addEventListener("click", () => {
        const dropDown = document.getElementById("drop-down");
        const projects = document.getElementById("projects-list");
        if (dropDown.classList.contains("drop-down-active")) {
            dropDown.classList.remove("drop-down-active");
            projects.classList.add("hidden");
        } else {
            dropDown.classList.add("drop-down-active");
            projects.classList.remove("hidden");
        }
    });
}
export function addProject(project) {
    const list = document.getElementById("projects-list");
    const li = document.createElement("li");
    const select = document.getElementById("todo-type");
    const option = document.createElement("option");
    const delete_project = document.createElement("span");
    select.appendChild(option);

    option.setAttribute("value", project);
    option.textContent = project.charAt(0).toUpperCase() + project.slice(1);

    list.appendChild(li);
    li.textContent = project.toUpperCase();
    li.appendChild(delete_project);
    li.dataset.title = project;
    delete_project.classList.add("material-symbols-rounded", "delete-project");
    delete_project.textContent = "close";
    li.addEventListener("click", (e) => {
        loadProjects(e);
    });
    delete_project.addEventListener("click", (e) => {
        deleteProject(e);
        location.reload();
    });
}
export function deleteProject(e) {
    e.stopPropagation();
    const project = e.target.parentNode.dataset.title;
    PROJECTS.splice(PROJECTS.indexOf(project), 1);
    for (let i = 0; i < ALL_TODOS.length; i++) {
        if (ALL_TODOS[i].type === project) {
            ALL_TODOS.splice(i, 1);
            i--;
        }
    }
    e.target.parentNode.remove();
}
export function checkDueDate() {
    let counter = 1;
    ALL_TODOS.forEach((todo) => {
        if (todo.type === "repetitive" && isYesterday(new Date(todo.date))) {
            resetRepetitive(todo);
        }
        if (isToday(new Date(todo.date))) {
            addNotification(todo, counter);
            counter++;
        }
    });
}
export function setRepetitive(date, frequency) {
    switch (frequency) {
        case "day":
            date = add(new Date(date), { days: 1 });
            break;
        case "month":
            date = add(new Date(date), { months: 1 });
            break;
        case "year":
            date = add(new Date(date), { years: 1 });
            break;
    }
    return date;
}
export function resetRepetitive(todo) {
    return (todo.date = todo.endDate), (todo.endDate = setRepetitive(todo.endDate, todo.frequency));
}
export function addNotification(todo, counter) {
    const notif_container = document.getElementById("notification-container");
    const bubble = document.getElementById("counter");
    const p = document.createElement("p");
    if (bubble.classList.contains("hidden")) bubble.classList.remove("hidden");
    bubble.textContent = counter;
    notif_container.appendChild(p);
    p.innerHTML = `To-do <b>"${todo.title}"</b> in <b>${
        todo.type === "none" ? "ALL" : todo.type.toUpperCase()
    }</b> folder is waiting for you to be done!`;
}
export function getRandomTodo() {
    document.getElementById("random").addEventListener("click", () => {
        const todo_container = document.querySelector(".todo-grid-container");
        const randomNumber = Math.floor(Math.random() * ALL_TODOS.length);
        todo_container.innerHTML = "";
        return renderToDo(ALL_TODOS[randomNumber]);
    });
}
export function searchTodo() {
    document.getElementById("search-bar").addEventListener("input", (e) => {
        const todo_container = document.querySelector(".todo-grid-container");
        const query = e.target.value.toLowerCase();
        setTimeout(() => {
            todo_container.innerHTML = "";
            if (query.length === 0) {
                return ALL_TODOS.forEach((todo) => renderToDo(todo));
            }
            return ALL_TODOS.filter((todo) => (todo.title.includes(query) ? renderToDo(todo) : false));
        }, 500);
    });
}
