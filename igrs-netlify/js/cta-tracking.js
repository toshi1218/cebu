// Global CTA Click Handler
document.addEventListener('DOMContentLoaded', function () {
    const ctaElements = document.querySelectorAll('[data-cta]');

    ctaElements.forEach(element => {
        element.addEventListener('click', function (e) {
            const ctaId = this.getAttribute('data-cta');
            const pagePath = window.location.pathname;

            // GA4 Event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    cta_id: ctaId,
                    page_path: pagePath,
                    page_variant: 'standard'
                });
            }

            console.log('CTA Click:', ctaId, 'Page:', pagePath);
        });
    });
});
