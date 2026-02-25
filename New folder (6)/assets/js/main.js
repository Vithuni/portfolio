// Theme toggle with localStorage persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = window.localStorage.getItem("theme");

  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  const applyTheme = (next) => {
    root.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  };

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
})();

// Mobile navigation
(function () {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("is-open");
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains("nav__link")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("is-open")) return;
    const target = event.target;
    if (
      target instanceof Node &&
      !menu.contains(target) &&
      !toggle.contains(target)
    ) {
      closeMenu();
    }
  });
})();

// Smooth scroll for internal links (with reduced-motion respect)
(function () {
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToHash = (hash) => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 72;

    window.scrollTo({
      top: y,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLAnchorElement)) return;
    const href = target.getAttribute("href") || "";
    if (!href.startsWith("#") || href === "#") return;
    const url = new URL(window.location.href);
    const currentPath = url.pathname;
    if (target.pathname !== currentPath || target.host !== url.host) return;

    event.preventDefault();
    scrollToHash(href);
  });
})();

// Scroll reveal animations and animated skill bars
(function () {
  const animatedEls = document.querySelectorAll("[data-animate]");
  const skillBars = document.querySelectorAll(".skill-bar");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedEls.forEach((el) => observer.observe(el));

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level =
              Number(bar.getAttribute("data-level") || "0") || 0;
            const fill = bar.querySelector(".skill-bar__fill");
            if (fill instanceof HTMLElement) {
              bar.setAttribute("data-animated", "true");
              requestAnimationFrame(() => {
                fill.style.width = `${Math.min(level, 100)}%`;
              });
            }
            skillObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.4 }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));
  } else {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
    skillBars.forEach((bar) => {
      const fill = bar.querySelector(".skill-bar__fill");
      if (fill instanceof HTMLElement) {
        fill.style.width = `${Math.min(
          Number(bar.getAttribute("data-level") || "0") || 0,
          100
        )}%`;
      }
    });
  }
})();

// Projects filter
(function () {
  const filterButtons = document.querySelectorAll(".chip--filter");
  const projects = document.querySelectorAll(".card--project");

  if (!filterButtons.length || !projects.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      filterButtons.forEach((b) => b.classList.remove("chip--filter-active"));
      btn.classList.add("chip--filter-active");

      projects.forEach((card) => {
        const category = (card.getAttribute("data-category") || "").split(" ");
        const show = filter === "all" || category.includes(filter);
        card.setAttribute("aria-hidden", String(!show));
        (card instanceof HTMLElement) &&
          (card.style.display = show ? "flex" : "none");
      });
    });
  });
})();

// Contact form (client-side validation demo)
(function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  if (!form || !success) return;

  const showError = (field, message) => {
    const container = field.closest(".form__field");
    if (!container) return;
    const error = container.querySelector(".form__error");
    if (error) error.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll(".form__error").forEach((el) => {
      el.textContent = "";
    });
    success.textContent = "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    if (!(name instanceof HTMLInputElement)) return;
    if (!(email instanceof HTMLInputElement)) return;
    if (!(message instanceof HTMLTextAreaElement)) return;

    let valid = true;

    if (!name.value.trim()) {
      valid = false;
      showError(name, "Please enter your name.");
    }

    if (!email.value.trim()) {
      valid = false;
      showError(email, "Please enter your email.");
    } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      valid = false;
      showError(email, "Please enter a valid email address.");
    }

    if (!message.value.trim()) {
      valid = false;
      showError(message, "Please enter a message.");
    }

    if (!valid) return;

    form.reset();
    success.textContent =
      "Thank you for your message. I will get back to you shortly.";
  });
})();

// Footer year + floating contact visibility
(function () {
  const yearEl = document.getElementById("year");
  const now = new Date();
  if (yearEl) {
    yearEl.textContent = String(now.getFullYear());
  }

  const floating = document.querySelector(".floating-contact");
  if (!floating || !(floating instanceof HTMLElement)) return;

  const toggleVisibility = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const hide = scrollY < 150;
    floating.dataset.hidden = hide ? "true" : "false";
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility);
})();

