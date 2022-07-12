// Selecting Elements
const rootElem = $("[data-theme]");
const switchThemeElem = $(".todo__info-icon", true);

// Internal State
let theme = localStorage.getItem("theme") || "light";

const toggleTheme = function () {
  // Toggle the theme variable value
  theme = theme === "light" ? "dark" : "light";
  // Update the rootElem data-theme value
  rootElem.setAttribute("data-theme", theme);
  // Update theme in the localstorage
  DB.updateUserTheme(theme);
};

// Event Listener
switchThemeElem.forEach((element) =>
  element.addEventListener("click", toggleTheme)
);
