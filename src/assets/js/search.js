/*
 * Căutare în articole — fără dependențe, 100% în browser.
 *
 * Indexul vine din src/_data/search.js (se reconstruiește la fiecare build),
 * încorporat în pagină ca JSON de căutarea din src/cauta.njk.
 *
 * Ce știe: cuvinte parțiale („distribu” găsește „distribuții”), diacritice
 * opționale („initiere” = „Inițiere”), potrivire în titlu > secțiuni >
 * descriere > text, fragment cu cuvintele evidențiate și URL cu ?q= ca să
 * poți trimite căutarea mai departe.
 */
(function () {
  "use strict";

  var input = document.querySelector("[data-search-input]");
  var resultsEl = document.querySelector("[data-search-results]");
  var statusEl = document.querySelector("[data-search-status]");
  var suggestEl = document.querySelector("[data-search-suggest]");
  var clearEl = document.querySelector("[data-search-clear]");
  var formEl = document.querySelector("[data-search-form]");
  if (!input || !resultsEl) return;

  var node = document.getElementById("search-index");
  var posts = [];
  try {
    posts = JSON.parse(node ? node.textContent : "[]") || [];
  } catch (err) {
    posts = [];
  }

  /* ----------------------------------------------------------- utilitare */

  // Caracter cu caracter (1:1), ca pozițiile din textul original să rămână
  // valabile după pliere — altfel evidențierea arată greșit.
  var MAP = { "ă": "a", "â": "a", "î": "i", "ș": "s", "ț": "t", "ş": "s", "ţ": "t" };
  function fold(str) {
    return String(str).toLowerCase().replace(/[ăâîșțşţ]/g, function (c) {
      return MAP[c];
    });
  }

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function tokenize(query) {
    return fold(query)
      .split(/\s+/)
      .map(function (t) {
        return t.replace(/^[.,;:!?"'()[\]{}]+|[.,;:!?"'()[\]{}]+$/g, "");
      })
      .filter(Boolean);
  }

  function count(hay, needle) {
    var n = 0;
    var i = 0;
    while ((i = hay.indexOf(needle, i)) !== -1) {
      n += 1;
      i += needle.length;
    }
    return n;
  }

  function roDate(iso) {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat("ro-RO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(iso.length === 10 ? iso + "T00:00:00" : iso));
    } catch (e) {
      return iso;
    }
  }

  /* ------------------------------------------------------------- scorare */

  function scoreOf(post, tokens, phrase) {
    var title = fold(post.title);
    var heads = fold((post.headings || []).join(" "));
    var desc = fold(post.description || "");
    var cat = fold(post.category || "");
    var text = fold(post.text || "");
    var total = 0;

    for (var k = 0; k < tokens.length; k += 1) {
      var t = tokens[k];
      var s =
        count(title, t) * 12 +
        count(heads, t) * 5 +
        count(desc, t) * 4 +
        count(cat, t) * 3 +
        count(text, t) * 1;
      if (s === 0) return 0; // toate cuvintele trebuie să apară undeva
      total += s;
    }
    if (phrase.length > 3 && title.indexOf(phrase) !== -1) total += 20;
    return total;
  }

  function search(query) {
    var tokens = tokenize(query);
    if (!tokens.length) return [];
    var phrase = fold(query).trim();

    return posts
      .map(function (post) {
        return { post: post, score: scoreOf(post, tokens, phrase) };
      })
      .filter(function (r) {
        return r.score > 0;
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.post.date < b.post.date ? 1 : -1; // la egalitate, cel mai nou
      })
      .map(function (r) {
        return r.post;
      });
  }

  /* ------------------------------------------------- fragment + evidențiere */

  function snippetOf(post, tokens) {
    var text = post.text || "";
    var f = fold(text);
    var pos = -1;
    var k;

    for (k = 0; k < tokens.length; k += 1) {
      var i = f.indexOf(tokens[k]);
      if (i !== -1 && (pos === -1 || i < pos)) pos = i;
    }
    if (pos === -1) {
      return text.slice(0, 190) + (text.length > 190 ? "…" : "");
    }

    var start = Math.max(0, pos - 70);
    if (start > 0) {
      var sp = text.indexOf(" ", start);
      if (sp !== -1 && sp - start < 20) start = sp + 1;
    }
    var end = Math.min(text.length, start + 230);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function highlight(str, tokens) {
    var f = fold(str);
    var ranges = [];
    var k, i;

    for (k = 0; k < tokens.length; k += 1) {
      i = 0;
      while ((i = f.indexOf(tokens[k], i)) !== -1) {
        ranges.push([i, i + tokens[k].length]);
        i += tokens[k].length;
      }
    }
    if (!ranges.length) return esc(str);

    ranges.sort(function (a, b) {
      return a[0] - b[0];
    });
    var merged = [];
    for (k = 0; k < ranges.length; k += 1) {
      var last = merged[merged.length - 1];
      if (last && ranges[k][0] <= last[1]) last[1] = Math.max(last[1], ranges[k][1]);
      else merged.push([ranges[k][0], ranges[k][1]]);
    }

    var out = "";
    var pos = 0;
    for (k = 0; k < merged.length; k += 1) {
      out += esc(str.slice(pos, merged[k][0]));
      out += "<mark>" + esc(str.slice(merged[k][0], merged[k][1])) + "</mark>";
      pos = merged[k][1];
    }
    return out + esc(str.slice(pos));
  }

  /* ------------------------------------------------------------- randare */

  function resultHTML(post, tokens) {
    return (
      '<article class="search-hit">' +
      '<div class="search-hit-top">' +
      '<a class="chip chip--' +
      esc(post.accent || "mint") +
      '" href="/categorii/' +
      esc(post.catSlug || "initiere") +
      '/">' +
      esc(post.category) +
      "</a>" +
      '<time datetime="' +
      esc(post.date) +
      '">' +
      esc(roDate(post.date)) +
      "</time>" +
      '<span class="card-meta-dot" aria-hidden="true"></span>' +
      "<span>" +
      post.minutes +
      " min</span>" +
      "</div>" +
      '<h2 class="search-hit-title"><a href="' +
      esc(post.url) +
      '">' +
      highlight(post.title, tokens) +
      "</a></h2>" +
      '<p class="search-hit-snippet">' +
      highlight(snippetOf(post, tokens), tokens) +
      "</p>" +
      "</article>"
    );
  }

  function plural(n, one, many) {
    return n === 1 ? one : many;
  }

  function render(query) {
    var tokens = tokenize(query);

    if (clearEl) clearEl.hidden = !query;
    if (suggestEl) suggestEl.hidden = !!query;

    if (!tokens.length) {
      resultsEl.innerHTML = "";
      if (statusEl) statusEl.textContent = "";
      return;
    }

    var found = search(query);

    if (statusEl) {
      statusEl.textContent = found.length
        ? found.length +
          " " +
          plural(found.length, "rezultat", "rezultate") +
          " pentru „" +
          query.trim() +
          "”"
        : "Niciun rezultat pentru „" + query.trim() + "”";
    }

    if (!found.length) {
      resultsEl.innerHTML =
        '<div class="empty-state search-empty">' +
        '<span class="empty-state-icon">🔎</span>' +
        "<h2>Nimic pentru „" +
        esc(query.trim()) +
        "”</h2>" +
        "<p>Încearcă un cuvânt mai scurt sau altă scriere — de exemplu " +
        "<em>distribuții</em>, <em>terminal</em> sau <em>Proton</em>. " +
        'Poți răsfoi și <a href="/blog/">toate articolele</a>.</p>' +
        "</div>";
      return;
    }

    resultsEl.innerHTML = found
      .map(function (p) {
        return resultHTML(p, tokens);
      })
      .join("");
  }

  /* -------------------------------------------------------- input & stare */

  var timer = null;
  function onInput() {
    var q = input.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      render(q);
      syncUrl(q);
    }, 90);
  }

  function syncUrl(q) {
    if (!window.history || !history.replaceState) return;
    var url = location.pathname + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : "");
    history.replaceState(null, "", url);
  }

  input.addEventListener("input", onInput);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && input.value) {
      input.value = "";
      render("");
      syncUrl("");
    }
  });

  if (clearEl) {
    clearEl.addEventListener("click", function () {
      input.value = "";
      render("");
      syncUrl("");
      input.focus();
    });
  }

  if (formEl) {
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      render(input.value);
      syncUrl(input.value);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-suggest]"), function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.getAttribute("data-suggest") || "";
      render(input.value);
      syncUrl(input.value);
      input.focus();
    });
  });

  // Pornim de pe ?q= din URL, ca o căutare trimisă cuiva să deschidă direct.
  var initial = "";
  try {
    initial = new URLSearchParams(location.search).get("q") || "";
  } catch (e) {
    initial = "";
  }
  input.value = initial;
  render(initial);
})();
