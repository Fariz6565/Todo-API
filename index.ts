const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-todo") as HTMLButtonElement;
const todoContainer = document.getElementById("appenchilddiv") as HTMLDivElement;
const clearBtn = document.getElementById("clear-completed") as HTMLButtonElement;

const API_URL = "http://localhost:3002/todos";

interface Todo {
  id: number;
  title: string;
}

async function addTodo(title: string): Promise<any> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  const newTodo: Todo = await response.json();
  renderTodo(newTodo);
}

async function loadTodos(): Promise<any> {
  const response = await fetch(API_URL);
  const todos: Todo[] = await response.json();

  todoContainer.innerHTML = "";
  todos.forEach(renderTodo);
}

function renderTodo(todo: Todo): void {
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

async function deleteTodo(id: number, element: HTMLElement): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  element.remove();
}

async function clearAllTodos(): Promise<void> {
  const response = await fetch(API_URL);
  const todos: Todo[] = await response.json();

  for (const todo of todos) {
    await fetch(`${API_URL}/${todo.id}`, { method: "DELETE" });
  }

  todoContainer.innerHTML = "";
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