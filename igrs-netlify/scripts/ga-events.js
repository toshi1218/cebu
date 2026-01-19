// GA4 Event Tracking for Lead Actions
// Tracks phone clicks, LINE clicks, and thank-you page loads

(function () {
    'use strict';

    // Check if gtag is available
    function isGtagAvailable() {
        return typeof gtag === 'function';
    }

    // Get current page info
    function getPageInfo() {
        return {
            page_location: window.location.href,
            page_path: window.location.pathname
        };
    }

    // Track phone click events
    function trackPhoneClicks() {
        document.addEventListener('click', function (e) {
            const target = e.target.closest('a[href^="tel:"]');
            if (target && isGtagAvailable()) {
                const phoneNumber = target.getAttribute('href');
                gtag('event', 'phone_click', {
                    ...getPageInfo(),
                    link_url: phoneNumber
                });
            }
        });
    }

    // Track LINE click events
    function trackLineClicks() {
        document.addEventListener('click', function (e) {
            const target = e.target.closest('a');
            if (target) {
                const href = target.getAttribute('href') || '';
                if ((href.includes('line.me') || href.includes('lin.ee')) && isGtagAvailable()) {
                    gtag('event', 'line_click', {
                        ...getPageInfo(),
                        link_url: href
                    });
                }
            }
        });
    }

    // Track thank-you page load
    function trackThankYouPage() {
        if (window.location.pathname.includes('thank-you') && isGtagAvailable()) {
            gtag('event', 'lead_submit', getPageInfo());
        }
    }

    // Initialize tracking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            trackPhoneClicks();
            trackLineClicks();
            trackThankYouPage();
        });
    } else {
        trackPhoneClicks();
        trackLineClicks();
        trackThankYouPage();
    }
})();
