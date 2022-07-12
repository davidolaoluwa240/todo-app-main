// Selecting Elements
const rootElem = $("[data-theme]");
const switchThemeElem = $(".todo__info-icon", true);

// Internal State
let theme;

const updateThemingAttribute = function (value) {
  rootElem.setAttribute("data-theme", value);
};

const toggleTheme = function () {
  // Toggle the theme variable value
  theme = theme === "light" ? "dark" : "light";
  // Update theme in the localstorage
  DB.updateUserTheme(theme);
  // Update the rootElem data-theme value
  updateThemingAttribute(theme);
};

// Init
(() => {
  // Set theme value in load
  theme = localStorage.getItem("theme") || "light";

  // Invoke toggle theme
  updateThemingAttribute(theme);
})();

// Event Listener
switchThemeElem.forEach((element) =>
  element.addEventListener("click", toggleTheme)
);
