const toastMessage = function (msg, state) {
  toastr.message(msg, state, 3500);
};

const createHTML = function ({ id, title, completed }) {
  return `
      <div class="todo-box-wrapper todo-box-wrapper--rounded-top">
          <div class="todo-box todo-list-box" data-todo-id=${id}>
            <div class="todo-box__left">
              <input
                class="todo-box__checkbox-control d-none"
                type="checkbox"
                id="check-todo-${id}"
                ${completed ? "checked" : ""}
              />
              <label class="todo-box__checkbox-label" for="check-todo-${id}">
                <img
                  class="todo-box__checkbox-icon"
                  src="./assets/images/icon-check.svg"
                  alt="check"
                />
              </label>
            </div>
            <div class="todo-box__middle todo-box__middle--center">
              <p class="todo-list-box__text ${
                completed ? "todo-list-box__text-checked" : ""
              }">${title}</p>
            </div>
            <div class="todo-box__right">
              <img
                class="todo-box__delete-icon"
                src="./assets/images/icon-cross.svg"
                alt="delete todo"
              />
            </div>
          </div>
      </div>
    `;
};
