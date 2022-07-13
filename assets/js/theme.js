// Selecting Elements
const rootElem = $("[data-theme]");
const switchThemeElem = $(".todo__info-icon", true);

// Internal State
let theme;

const updateRootElemThemingAttribute = function (value) {
  // Update the data-theme attribute on the root element
  rootElem.setAttribute("data-theme", value);
};

const toggleTheme = function () {
  // Toggle the theme variable value
  theme = theme === "light" ? "dark" : "light";

  // Update theme in the localstorage
  DB.updateUserTheme(theme);

  // Update the rootElem data-theme value
  updateRootElemThemingAttribute(theme);
};

// Init
(() => {
  // Set theme value onLoad
  theme = localStorage.getItem("theme") || "light";

  // Update theming value in the dom
  updateRootElemThemingAttribute(theme);
})();

// Event Listener
switchThemeElem.forEach((element) =>
  element.addEventListener("click", toggleTheme)
);
