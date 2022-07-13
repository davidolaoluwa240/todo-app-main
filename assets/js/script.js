"use strict";

// Selecting Elements
const emptyBoxElem = $(".todo__empty-box");
const emptyMessageElem = $(".todo__empty-text");
const addTodoInputElem = $(".add-todo-box__control");
const addCheckboxInputElem = $(".add-todo-box__checkbox-label");
const addFormElem = $(".add-todo-box__form");
const todoMainElem = $(".todo__main");
const todoActionUncompletedTextElem = $(".todo-action-box__uncompleted");
const todoActionStateElems = $(".todo-action-box__state", true);
const todoActionClearElem = $(".todo-action-box__clear");
const todoRootElem = $(".todo-root");

// Internal State
let todos = [];
let filterBy = "all";
let draggedElemId = null;
let draggedElemTargetId = null;

const updateTodoActiveTextInfo = function () {
  const activeTodosLength = DB.getTodos("active").length;
  const text = `${activeTodosLength} ${
    activeTodosLength === 1 ? "item" : "items"
  } left`;
  todoActionUncompletedTextElem.textContent = text;
};

const showNoTodosMessageBox = function (filterBy) {
  if (filterBy) {
    emptyBoxElem.classList.remove("d-none");
    let msg;
    switch (filterBy) {
      case "active":
        msg = "You do not have any active todo.";
        break;
      case "completed":
        msg = "You do not have any completed todo.";
        break;
      default:
        msg = "You do not have any existing todo.";
    }
    emptyMessageElem.textContent = msg;
  } else {
    emptyBoxElem.classList.add("d-none");
  }
};

const render = function (todos, filterBy) {
  if (!todos.length) {
    // Show no todos box
    showNoTodosMessageBox(filterBy);
  } else {
    showNoTodosMessageBox(null);
  }

  // Update the dom
  todoRootElem.innerHTML = "";
  todos.forEach((todo) => {
    todoRootElem.insertAdjacentHTML("afterBegin", createHTML(todo));
  });

  // Update the uncompleted todo info text
  updateTodoActiveTextInfo();
};

const onAddTodo = function (e) {
  e.preventDefault();

  // Get value in the add todo input
  const todoTitle = addTodoInputElem.value;

  // When todoValue is empty toast error message
  if (!todoTitle) {
    toastMessage("Add todo text ⛔", "error");
    return;
  }

  // add to todo list
  DB.addTodo(todoTitle);

  // Filter todos
  todos = DB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);

  // Resets
  addTodoInputElem.value = "";
};

const onTodoCompleted = function (e) {
  const targetElem = e.target;
  const todoBox = targetElem.closest("[data-todo-id]");
  const excludeElem = targetElem.closest(".todo-box__right");

  if (todoBox && !excludeElem) {
    const id = Number(todoBox.dataset.todoId);

    // update the specified todo state
    DB.updateTodo(id);

    // Filter todos
    todos = DB.getTodos(filterBy);

    // Update the dom
    render(todos, filterBy);
  }
};

const onDeleteTodo = function (e) {
  const targetElem = e.target;
  const todoBox = targetElem.closest(".todo-box");
  const todoDeleteIcon = targetElem.closest(".todo-list-box__delete-icon");

  if (todoDeleteIcon && todoBox) {
    const id = Number(todoBox.dataset.todoId);

    // delete the specified todo value
    DB.deleteTodo(id);

    // Filter todos
    todos = DB.getTodos(filterBy);

    // Update the dom
    render(todos, filterBy);
  }
};

const onToggleTodoState = function (e) {
  const selectedState = e.target.dataset.todoState;

  // Remove active class
  todoActionStateElems.forEach((node) =>
    node.classList.remove("todo-action-box__state--active")
  );

  // Add active class to the current target element
  e.currentTarget.classList.add("todo-action-box__state--active");

  // set filterBy state
  filterBy = selectedState;

  // Filter todos
  todos = DB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);
};

const onClearCompletedTodos = function () {
  // Clear completed todos
  DB.clearCompletedTodos();

  // Filter todos
  todos = DB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);
};

const onDragStart = function (e, id) {
  // Update the draggedElemId  value
  draggedElemId = id;

  // Add a custom class to the dragged Element
  e.target.classList.add("todo-box-wrapper--dragging");
};

const onDragOver = function (e) {
  // Prevent Element Default Handling
  e.preventDefault();
};

const onDragEnter = function (e, id) {
  // Prevent Element Default Handling
  e.preventDefault();

  // Update the draggedElemTargetId value
  draggedElemTargetId = id;

  // Swap the specified drag Item with the target
  DB.swapTodo(draggedElemId, draggedElemTargetId);

  // Filter todos
  todos = DB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);
};

const onDrop = function (e) {
  // Prevent Element Default Handling
  e.preventDefault();

  // Remove the dragging modifier class on the dragged todo item
  $(`[data-todo-id='${draggedElemId}']`).parentNode.classList.remove(
    "todo-box-wrapper--dragging"
  );
};

(function () {
  // Get the todos
  todos = DB.getTodos(filterBy);

  // Render todos on page load
  render(todos, filterBy);
})();

// Event Listener
addCheckboxInputElem.addEventListener("click", onAddTodo);
addFormElem.addEventListener("submit", onAddTodo);
todoMainElem.addEventListener("click", (e) => {
  onDeleteTodo(e);
  onTodoCompleted(e);
});
todoActionStateElems.forEach((node) =>
  node.addEventListener("click", onToggleTodoState)
);
todoActionClearElem.addEventListener("click", onClearCompletedTodos);
