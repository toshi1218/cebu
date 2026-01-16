/* /js/mobile-upgrade.js */
(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // LINE URL configuration - easily changeable
  const LINE_URL = "https://line.me/R/ti/p/@igrs";

  // ===== Mobile Nav: overlay + full-screen panel + ESC + scroll lock =====
  const panel =
    qs(".nav-mobile") ||
    qs("#nav-mobile") ||
    qs('[data-nav="mobile"]');

  const btn =
    qs(".mobile-menu") ||
    qs("#mobile-menu") ||
    qs('button[aria-label*="メニュー"]') ||
    qs('button[aria-label*="menu" i]');

  if (panel && btn) {
    // Create overlay (once)
    let overlay = qs(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      overlay.hidden = true;
      document.body.appendChild(overlay);
    }

    // A11y attrs
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "mobile-nav-panel");
    panel.id = panel.id || "mobile-nav-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-hidden", "true");
    panel.tabIndex = -1;

    let lastFocused = null;

    const getFocusable = () =>
      qsa('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
        .filter(el => !el.hasAttribute("disabled") && el.offsetParent !== null);

    const openNav = () => {
      lastFocused = document.activeElement;
      document.body.classList.add("nav-open");
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("is-visible"));

      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");

      // Focus first item
      const focusables = getFocusable();
      (focusables[0] || panel).focus();
    };

    const closeNav = () => {
      document.body.classList.remove("nav-open");
      overlay.classList.remove("is-visible");
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");

      // Delay hide overlay to match fade
      setTimeout(() => {
        overlay.hidden = true;
      }, 200);

      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    const isOpen = () => document.body.classList.contains("nav-open");

    btn.addEventListener("click", () => (isOpen() ? closeNav() : openNav()));
    overlay.addEventListener("click", closeNav);

    document.addEventListener("keydown", (e) => {
      if (!isOpen()) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeNav();
        return;
      }

      // Focus trap (minimal)
      if (e.key === "Tab") {
        const f = getFocusable();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ===== FAQ: auto accordion (no HTML rewrite needed) =====
  // Target: sequences like <h3>Q1....</h3><p>answer...</p>...
  const faqHeadings = qsa("h3, h4").filter(h => {
    const t = (h.textContent || "").trim();
    return /^Q\s*\d+[\.\：\:]/i.test(t) || /^Q\s*\d+/i.test(t);
  });

  if (faqHeadings.length) {
    faqHeadings.forEach((h, idx) => {
      const parent = h.parentElement;
      if (!parent) return;

      // If already wrapped, skip
      if (h.closest("details.faq-item")) return;

      const details = document.createElement("details");
      details.className = "faq-item";
      if (idx === 0) details.open = true;

      const summary = document.createElement("summary");
      summary.className = "faq-q";
      summary.textContent = (h.textContent || "").trim();
      details.appendChild(summary);

      const content = document.createElement("div");
      content.className = "faq-a";

      // Move nodes after heading until next Q heading / section heading
      let node = h.nextSibling;
      while (node) {
        const next = node.nextSibling;

        if (node.nodeType === 1) {
          const tag = node.tagName.toUpperCase();
          const txt = (node.textContent || "").trim();
          const isNextQ = (tag === "H3" || tag === "H4") && (/^Q\s*\d+/i.test(txt));
          const isSectionBreak = tag === "H2";
          if (isNextQ || isSectionBreak) break;
        }

        // Keep non-empty text nodes too
        content.appendChild(node);
        node = next;
      }

      details.appendChild(content);
      parent.insertBefore(details, h);
      parent.removeChild(h);
    });
  }

  // ===== Bottom Navigation Optimization =====
  const bottomNav = qs('.mobile-bottom-nav');
  if (bottomNav) {
    // Remove phone link completely
    const phoneLink = qs('.mobile-bottom-nav-item[href^="tel:"]');
    if (phoneLink) {
      phoneLink.remove();
    }

    // Update LINE link to use constant
    const lineLink = qs('.mobile-bottom-nav-item[href*="line.me"]');
    if (lineLink) {
      lineLink.href = LINE_URL;
    }

    // Add active state for current page
    const currentPath = window.location.pathname;
    const navItems = qsa('.mobile-bottom-nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPath || (currentPath === '/' && href === '/')) {
        item.classList.add('active');
      }
    });
  }
})();
