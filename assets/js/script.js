"use strict";

const $ = function (selector, shouldSelectAll) {
  return shouldSelectAll
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
};

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

const updateTodoActiveTextInfo = function () {
  const activeTodosLength = todoDB.getTodos("active").length;
  todoActionUncompletedTextElem.textContent = `${activeTodosLength} ${
    activeTodosLength === 1 ? "item" : "items"
  } left`;
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
  todos.forEach((todo) =>
    todoRootElem.insertAdjacentHTML("afterBegin", createHTML(todo))
  );

  // Update the uncompleted todo info text
  updateTodoActiveTextInfo();
};

const onAddTodo = function (e) {
  e.preventDefault();

  // Get value in the add todo input
  const todoTitle = addTodoInputElem.value;

  //When todoValue is empty toast error message
  if (!todoTitle) {
    toastMessage("Add todo text ⛔", "error");
    return;
  }

  // add to todo list
  todoDB.addTodo(todoTitle);

  // Filter todos
  todos = todoDB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);

  // Resets
  addTodoInputElem.value = "";
};

const onTodoCompleted = function (e) {
  const targetElem = e.target;
  const todoBox = targetElem.closest("[data-todo-id]");
  const excludeClasses = ["todo-box__right", "todo-box__delete-icon"];

  if (
    todoBox &&
    ![...targetElem.classList].some((nodeClass) =>
      excludeClasses.includes(nodeClass)
    )
  ) {
    const id = Number(todoBox.dataset.todoId);

    // update the specified todo state
    todoDB.updateTodo(id);

    // Filter todos
    todos = todoDB.getTodos(filterBy);

    // Update the dom
    render(todos, filterBy);
  }
};

const onDeleteTodo = function (e) {
  const targetElem = e.target;
  const todoBox = targetElem.closest(".todo-box");

  if (targetElem.classList.contains("todo-box__delete-icon") && todoBox) {
    const id = Number(todoBox.dataset.todoId);

    // delete the specified todo value
    todoDB.deleteTodo(id);

    // Filter todos
    todos = todoDB.getTodos(filterBy);

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
  todos = todoDB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);
};

const onClearCompletedTodos = function () {
  // Clear completed todos
  todoDB.clearCompletedTodos();

  // Filter todos
  todos = todoDB.getTodos(filterBy);

  // Update the dom
  render(todos, filterBy);
};

(function () {
  // Get the todos
  todos = todoDB.getTodos(filterBy);

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
