// Helper for toast notification
const toastMessage = function (msg, state) {
  toastr.message(msg, state, 3500);
};

// Helper for selecting element
const $ = function (selector, shouldSelectAll) {
  return shouldSelectAll
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
};

// Dynamic Todo element
const createHTML = function ({ id, title, completed }) {
  return `
      <div class="todo-box-wrapper todo-box-wrapper--rounded-top todo-box-wrapper--draggable" draggable="true" ondragstart="onDragStart(event, ${id})" ondragover="onDragOver(event)" ondragenter="onDragEnter(event, ${id})" ondrop="onDrop(event)">
          <div class="todo-box todo-list-box" data-todo-id=${id}>
            <div class="todo-box__left">
              <input
                class="todo-box__checkbox-control d-none"
                type="checkbox"
                id="check-todo-${id}"
                ${completed ? "checked" : ""}
              />
              <label class="todo-box__checkbox-label" for="check-todo-${id}">
                <span class="todo-box__checkbox-background-cover">
                  <img
                    class="todo-box__checkbox-icon"
                    src="./assets/images/icon-check.svg"
                    alt="check"
                  />
                </span>
              </label>
            </div>
            <div class="todo-box__middle todo-box__middle--center">
              <p class="todo-list-box__text ${
                completed ? "todo-list-box__text-checked" : ""
              }">${title}</p>
            </div>
            <div class="todo-box__right">
            <svg class="todo-list-box__delete-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
            </div>
          </div>
      </div>
      `;
};
