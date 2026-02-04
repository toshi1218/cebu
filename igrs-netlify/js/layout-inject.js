document.addEventListener('DOMContentLoaded', () => {
    const getPath = (path) => {
        const slashCount = (location.pathname.match(/\//g) || []).length;
        let depth = slashCount - 1;
        if (depth < 0) depth = 0;

        let prefix = './';
        if (depth > 0) {
            prefix = '../'.repeat(depth);
        }
        return prefix + path;
    };

    const initNav = () => {
        var menuToggle = document.getElementById('menuToggle');
        var navMobile = document.getElementById('navMobile');

        if (menuToggle && navMobile) {
            // Avoid duplicate listeners if possible, but safe here
            menuToggle.addEventListener('click', function () {
                navMobile.classList.toggle('active');
            });
        }

        var labels = document.querySelectorAll('.mobile-nav-label');
        labels.forEach(function (label) {
            label.addEventListener('click', function () {
                var submenu = label.nextElementSibling;
                if (submenu && submenu.classList.contains('mobile-submenu')) {
                    submenu.classList.toggle('open');
                }
            });
        });
    };

    const inject = async (id, file) => {
        const el = document.getElementById(id);
        if (!el) return;
        try {
            const resp = await fetch(getPath('partials/' + file));
            if (resp.ok) {
                const html = await resp.text();
                // Avoid overwriting if SEO content is already present (e.g. from static build)
                if (id === 'site-header' && el.querySelector('header')) return;
                if (id === 'site-footer' && el.querySelector('footer')) return;

                el.innerHTML = html;
                if (id === 'site-header') {
                    // Initialize navigation after header injection
                    initNav();
                }
            }
        } catch (e) {
            console.error('Inject error:', e);
        }
    };

    inject('site-header', 'header.html');
    inject('site-footer', 'footer.html');
});
