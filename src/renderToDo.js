import { id } from "date-fns/locale";
import { ALL_TODOS } from "./index";
import { checkToDo, fillUpForm } from "./utilities";
import { format } from "date-fns";
function createCheckbox(grid_item, todo) {
    const checkbox_item = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const span = document.createElement("span");

    grid_item.appendChild(checkbox_item);
    checkbox_item.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);

    checkbox_item.classList.add("checkbox-item");
    label.classList.add("checkbox-container");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "todo-checkbox");
    if (todo.isChecked === true) {
        input.checked = true;
    } else {
        input.checked = false;
    }
    input.addEventListener("change", () => {
        return checkToDo(todo, input);
    });
    span.classList.add("custom-check");
}
export function renderToDo(todo) {
    const todo_container = document.querySelector(".todo-grid-container");
    const grid_item = document.createElement("div");
    const title_item = document.createElement("div");
    const priority_item = document.createElement("div");
    const description_item = document.createElement("div");
    const date_item = document.createElement("div");
    const edit_dots = document.createElement("span");
    const delete_todo = document.createElement("span");

    createCheckbox(grid_item, todo);

    todo_container.appendChild(grid_item);
    grid_item.appendChild(title_item);
    grid_item.appendChild(priority_item);
    grid_item.appendChild(description_item);
    grid_item.appendChild(date_item);
    grid_item.appendChild(edit_dots);
    grid_item.appendChild(delete_todo);

    grid_item.classList.add("todo-grid-item");
    title_item.classList.add("title-item");
    priority_item.classList.add("priority-item");
    switch (todo.priority) {
        case "low":
            priority_item.classList.add("low_p");
            break;
        case "middle":
            priority_item.classList.add("middle_p");
            break;
        case "high":
            priority_item.classList.add("high_p");
            break;
    }
    description_item.classList.add("description-item");
    date_item.classList.add("date-item");
    edit_dots.classList.add("material-symbols-rounded", "edit-dots");
    delete_todo.classList.add("material-symbols-rounded", "delete-todo");

    title_item.textContent = todo.title;
    priority_item.textContent = todo.priority;
    description_item.innerHTML = `<em>${todo.description}</em>`;
    if (todo.type === "repetitive") {
        date_item.innerHTML = `due date: ${format(
            new Date(todo.date),
            "MMM d  p"
        )} (<span class="material-symbols-rounded icons-todo">repeat</span> ${format(new Date(todo.endDate), "MMM d  p")})`;
    } else {
        date_item.textContent = `due date: ${format(new Date(todo.date), "MMM d  p")}`;
    }
    edit_dots.textContent = "more_vert";
    delete_todo.textContent = "close";

    grid_item.dataset.id = todo.id;
    edit_dots.addEventListener("click", (e) => {
        const container = document.querySelector(".form-container");
        const form = document.getElementById("create-todo-form");
        container.classList.remove("hidden");
        form.dataset.state = "edit";
        form.dataset.todoid = e.target.parentNode.dataset.id;
        document.documentElement.scrollTop = 0;
        document.body.style.overflowY = "hidden";
    });
    delete_todo.addEventListener("click", (e) => {
        ALL_TODOS.splice(
            ALL_TODOS.findIndex((x) => x.id === e.target.parentNode.dataset.id),
            1
        );
        e.target.parentNode.remove();
    });
}
