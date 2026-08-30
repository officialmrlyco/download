/* Shared theme, menu, and small progressive-enhancement behaviors for every page. */
(function () {
  "use strict";

  var root = document.documentElement;
  // Private browsing can deny storage; the visual switch still works for that visit.
  var storage = {
    get: function () { try { return localStorage.getItem("bf-theme"); } catch (error) { return null; } },
    set: function (value) { try { localStorage.setItem("bf-theme", value); } catch (error) {} }
  };
  var savedTheme = storage.get();
  root.setAttribute("data-theme", savedTheme === "light" ? "light" : "dark");

  function updateThemeButton() {
    var dark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var icon = button.querySelector("[data-theme-icon]");
      if (icon) icon.textContent = dark ? "☼" : "☾";
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    storage.set(next);
    updateThemeButton();
  }

  function bindMenu() {
    document.querySelectorAll("[data-menu-toggle]").forEach(function (button) {
      var nav = document.getElementById(button.getAttribute("aria-controls"));
      if (!nav) return;
      button.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          button.setAttribute("aria-expanded", "false");
        });
      });
    });
  }

  function bindCopyButtons() {
    document.querySelectorAll("[data-copy-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.getElementById(button.getAttribute("data-copy-target"));
        var original = button.textContent;
        // Keep unsupported or denied clipboard access visible instead of failing silently.
        if (!target || !navigator.clipboard) {
          button.textContent = "Copy unavailable";
          window.setTimeout(function () { button.textContent = original; }, 1800);
          return;
        }
        navigator.clipboard.writeText(target.textContent.trim()).then(function () {
          button.textContent = "Copied";
          window.setTimeout(function () { button.textContent = original; }, 1400);
        }).catch(function () {
          button.textContent = "Copy unavailable";
          window.setTimeout(function () { button.textContent = original; }, 1800);
        });
      });
    });
  }

  window.toggleTheme = toggleTheme;
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", toggleTheme);
    });
    updateThemeButton();
    bindMenu();
    bindCopyButtons();
  });
})();
