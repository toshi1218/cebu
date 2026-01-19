(function () {
  function getParam(name) {
    try { return new URLSearchParams(location.search).get(name); } catch (_) { return null; }
  }

  function getVariant() {
    const meta = document.querySelector('meta[name="ig-variant"]');
    if (meta && meta.content) return meta.content;

    const body = document.body;
    if (body && body.dataset && body.dataset.variant) return body.dataset.variant;

    return "unknown";
  }

  const debug = getParam("debug") === "1";

  document.addEventListener("click", function (e) {
    const el = e.target && e.target.closest ? e.target.closest("[data-ga]") : null;
    if (!el) return;

    const cta = el.getAttribute("data-ga");
    if (!cta) return;

    const payload = {
      cta_id: cta,
      page_variant: getVariant(),
      page_path: location.pathname,
      page_url: location.href
    };
    if (debug) payload.debug_mode = true;

    if (typeof window.gtag === "function") {
      window.gtag("event", "cta_click", payload);
      return;
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: "cta_click" }, payload));
    }
  });
})();
