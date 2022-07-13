const loadTodos = function () {
  // Get the todos data from the localstorage and return empty array if null
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const saveTodos = function (todos) {
  if (Array.isArray(todos)) {
    // Save the todos value to the localstorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const updateUserTheme = function (theme) {
  // Save the user theme value to the localstorage
  localStorage.setItem("theme", theme);
};

const getMaxId = function (todos) {
  if (todos.length) {
    // Returns the maximum id number in the todos array
    return todos.reduce(
      (max, curr) => (curr.id > max ? curr.id : max),
      todos[0].id
    );
  }

  return 0;
};

const getTodos = (filterBy) => {
  // Load Todos
  const todos = loadTodos();

  // Filter Todo by filter by
  const filteredTodos = filterTodo(todos, filterBy);

  return filteredTodos;
};

const addTodo = (title) => {
  // Load Todos
  const todos = loadTodos();

  // Create a new todo
  const maxId = getMaxId(todos);
  const newTodo = { id: maxId + 1, title, completed: false };
  todos.push(newTodo);

  // Save Todos
  saveTodos(todos);
};

const updateTodo = (todoId) => {
  // Load Todos
  const todos = loadTodos();

  // Update the todos array
  const foundTodo = todos.find((todo) => todo.id === todoId);
  foundTodo.completed = !foundTodo.completed;

  // Save Todos
  saveTodos(todos);
};

const swapTodo = (fromId, toId) => {
  if (fromId !== toId) {
    // Load Todos
    let todos = loadTodos();

    // From Object
    const fromObjTemp = todos.find((todo) => todo.id === fromId);

    // To Object
    const toObjTemp = todos.find((todo) => todo.id === toId);

    // Update the todos array
    todos = todos.map((todo) => {
      switch (todo.id) {
        case toId:
          return { ...fromObjTemp };
        case fromId:
          return { ...toObjTemp };
        default:
          return todo;
      }
    });

    // Save Todos
    saveTodos(todos);
  }
};

const deleteTodo = (todoId) => {
  // Load Todos
  const todos = loadTodos();

  // Delete the todo
  todos.splice(
    todos.findIndex((todo) => todo.id === todoId),
    1
  );

  // Save Todos
  saveTodos(todos);
};

const filterTodo = (todos, filterBy = "all") => {
  // Filter todo base on the filterBy value.
  switch (filterBy) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

const clearCompletedTodos = () => {
  // Load Todos
  const todos = loadTodos();

  // Delete all todos that are completed
  const newTodos = filterTodo(todos, "active");

  // Save Todos
  saveTodos(newTodos);
};

const DB = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  filterTodo,
  loadTodos,
  clearCompletedTodos,
  swapTodo,
  updateUserTheme,
};
