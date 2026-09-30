/* Meniu mobil + starea „lipită” a header-ului. Fără dependențe. */
(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");

  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      toggle.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Închide meniul când se navighează pe mobil.
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Scurtătura „/” pentru căutare: ori deschide pagina de căutare, ori —
     dacă ești deja pe ea — pune cursorul în câmp. */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var el = e.target;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
    var field = document.querySelector("[data-search-input]");
    e.preventDefault();
    if (field) {
      field.focus();
      field.select();
    } else {
      window.location.href = "/cauta/";
    }
  });
})();
