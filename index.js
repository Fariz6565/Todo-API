var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const todoContainer = document.getElementById("appenchilddiv");
const clearBtn = document.getElementById("clear-completed");
const API_URL = "http://localhost:3002/todos";
function addTodo(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });
        const newTodo = yield response.json();
        renderTodo(newTodo);
    });
}
function loadTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        const todos = yield response.json();
        todoContainer.innerHTML = "";
        todos.forEach(renderTodo);
    });
}
function renderTodo(todo) {
    const div = document.createElement("div");
    div.className = "todo-item";
    const span = document.createElement("span");
    span.textContent = todo.title;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => deleteTodo(todo.id, div));
    div.appendChild(span);
    div.appendChild(delBtn);
    todoContainer.appendChild(div);
}
function deleteTodo(id, element) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        element.remove();
    });
}
function clearAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        const todos = yield response.json();
        for (const todo of todos) {
            yield fetch(`${API_URL}/${todo.id}`, { method: "DELETE" });
        }
        todoContainer.innerHTML = "";
    });
}
addBtn.addEventListener("click", () => {
    const title = input.value.trim();
    if (title) {
        addTodo(title);
        input.value = "";
    }
});
clearBtn.addEventListener("click", () => {
    clearAllTodos();
});
window.addEventListener("DOMContentLoaded", () => {
    loadTodos();
});
