(function () {
  "use strict";

  // Edit this one list when adding videos. Category filters, labels, thumbnails,
  // the three-card preview, and the full tutorials page all read from here.
  var tutorials = [
    {
      title: "Install and first permission check",
      category: "Getting started",
      label: "New",
      duration: "3:45",
      summary: "Install the APK, confirm Android install-source prompts, and review the permissions needed before automation starts.",
      youtubeUrl: "https://youtu.be/4otIYfDQsDs",
      thumbnailUrl: "",
      featured: true
    },
    {
      title: "Create your first offer mapping",
      category: "Getting started",
      label: "Latest feature",
      duration: "8:20",
      summary: "Set the offer amount, SIM, and USSD path before serving real customer payments.",
      youtubeUrl: "https://youtu.be/XdB2ZJNlDyY",
      thumbnailUrl: "",
      featured: true
    },
    {
      title: "Permissions explained",
      category: "Permissions",
      label: "",
      duration: "6:11",
      summary: "Understand why SMS, phone, and accessibility permissions are requested and what they are used for.",
      youtubeUrl: "",
      thumbnailUrl: "",
      featured: true
    },
    {
      title: "Run one safe test transaction",
      category: "Transactions",
      label: "",
      duration: "5:30",
      summary: "Use a small test request to confirm carrier response capture, transaction history, and recovery states.",
      youtubeUrl: "",
      thumbnailUrl: "",
      featured: false
    },
    {
      title: "Prepare web orders before sharing a link",
      category: "Web orders",
      label: "",
      duration: "7:10",
      summary: "Review active offers, payment readiness, and customer-facing states before publishing an order link.",
      youtubeUrl: "",
      thumbnailUrl: "",
      featured: false
    }
  ];

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
    });
  }

  function youtubeId(value) {
    if (!value) return "";
    try {
      var parsed = new URL(value);
      var host = parsed.hostname.replace(/^www\./, "");
      if (host === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] || "";
      if (host === "youtube.com" || host === "m.youtube.com") {
        if (parsed.pathname === "/watch") return parsed.searchParams.get("v") || "";
        if (parsed.pathname.indexOf("/shorts/") === 0) return parsed.pathname.split("/")[2] || "";
        if (parsed.pathname.indexOf("/embed/") === 0) return parsed.pathname.split("/")[2] || "";
      }
    } catch (error) {
      return "";
    }
    return "";
  }

  function embedUrl(value) {
    var id = youtubeId(value);
    return id ? "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0" : "";
  }

  function thumbnailUrl(item) {
    if (item.thumbnailUrl) return item.thumbnailUrl;
    var id = youtubeId(item.youtubeUrl);
    return id ? "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg" : "";
  }

  function cardHtml(item, index) {
    var thumb = thumbnailUrl(item);
    var thumbHtml = thumb
      ? '<img src="' + escapeHtml(thumb) + '" alt="' + escapeHtml(item.title) + ' thumbnail" loading="lazy">'
      : '<div class="video-placeholder">Thumbnail appears after you add a YouTube link</div>';
    var label = item.label ? '<span class="tutorial-label">' + escapeHtml(item.label) + '</span>' : "";
    var duration = item.duration ? '<span class="tutorial-duration">' + escapeHtml(item.duration) + '</span>' : "";
    return '<article class="tutorial-card reveal on" role="button" tabindex="0" aria-label="Open tutorial: ' + escapeHtml(item.title) + '" data-video-index="' + index + '">' +
      '<div class="video-thumb">' + thumbHtml + '<span class="play-mark" aria-hidden="true"></span></div>' +
      '<div class="tutorial-meta"><small>Video</small><span class="tutorial-chip">' + escapeHtml(item.category) + '</span>' + label + duration + '</div>' +
      '<h2>' + escapeHtml(item.title) + '</h2>' +
      '<p>' + escapeHtml(item.summary) + '</p>' +
      '</article>';
  }

  function bindCards(root, modalId) {
    root.querySelectorAll("[data-video-index]").forEach(function (card) {
      function open() {
        openModal(Number(card.getAttribute("data-video-index")), modalId);
      }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
  }

  function openModal(index, modalId) {
    var item = tutorials[index];
    var modal = document.getElementById(modalId || "videoModal");
    if (!item || !modal) return;

    var title = modal.querySelector("#videoModalTitle");
    var frame = modal.querySelector("#videoModalFrame");
    var close = modal.querySelector("[data-video-close]");
    var url = embedUrl(item.youtubeUrl);
    if (title) title.textContent = item.title;
    if (frame) {
      frame.innerHTML = url
        ? '<iframe src="' + url + '" title="' + escapeHtml(item.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        : '<div class="modal-empty">Video coming soon. Add a YouTube link in tutorials.js to play it here.</div>';
    }
    modal.hidden = false;
    document.body.classList.add("modal-open");
    if (close) close.focus();
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId || "videoModal");
    if (!modal) return;
    var frame = modal.querySelector("#videoModalFrame");
    if (frame) frame.innerHTML = "";
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function bindModal(modalId) {
    var modal = document.getElementById(modalId || "videoModal");
    if (!modal || modal.getAttribute("data-bound") === "true") return;
    modal.setAttribute("data-bound", "true");
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.hasAttribute("data-video-close")) closeModal(modal.id);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) closeModal(modal.id);
    });
  }

  function renderPreview(options) {
    var grid = document.getElementById(options.gridId);
    if (!grid) return;
    var limit = options.limit || 3;
    var items = tutorials.filter(function (item) { return item.featured !== false; }).slice(0, limit);
    grid.innerHTML = items.map(function (item) {
      return cardHtml(item, tutorials.indexOf(item));
    }).join("");
    bindModal(options.modalId);
    bindCards(grid, options.modalId);
  }

  function renderLibrary(options) {
    var grid = document.getElementById(options.gridId);
    var tabs = document.getElementById(options.tabsId);
    var search = document.getElementById(options.searchId);
    var empty = document.getElementById(options.emptyId);
    if (!grid || !tabs || !search) return;

    var activeCategory = "All";
    var categories = ["All"].concat(tutorials.map(function (item) { return item.category; }).filter(function (category, index, all) {
      return all.indexOf(category) === index;
    }));

    function renderTabs() {
      tabs.innerHTML = categories.map(function (category) {
        var selected = category === activeCategory ? " on" : "";
        return '<button class="category-tab' + selected + '" type="button" data-category="' + escapeHtml(category) + '">' + escapeHtml(category) + '</button>';
      }).join("");
      tabs.querySelectorAll("[data-category]").forEach(function (button) {
        button.addEventListener("click", function () {
          activeCategory = button.getAttribute("data-category");
          render();
        });
      });
    }

    function matches(item) {
      var query = search.value.trim().toLowerCase();
      var inCategory = activeCategory === "All" || item.category === activeCategory;
      var haystack = [item.title, item.category, item.label, item.summary].join(" ").toLowerCase();
      return inCategory && (!query || haystack.indexOf(query) !== -1);
    }

    function render() {
      renderTabs();
      var visible = tutorials.filter(matches);
      grid.innerHTML = visible.map(function (item) {
        return cardHtml(item, tutorials.indexOf(item));
      }).join("");
      if (empty) empty.hidden = visible.length !== 0;
      bindCards(grid, options.modalId);
    }

    search.addEventListener("input", render);
    bindModal(options.modalId);
    render();
  }

  window.BingwaTutorials = {
    all: tutorials,
    renderPreview: renderPreview,
    renderLibrary: renderLibrary,
    openModal: openModal,
    closeModal: closeModal
  };
})();
