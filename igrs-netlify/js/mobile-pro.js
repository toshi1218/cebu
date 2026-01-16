/**
 * Mobile Pro - Phase 1
 * トップページ判定して is-home クラスを付与
 */
(function () {
    'use strict';

    // トップページ判定
    const isHomePage =
        location.pathname === '/' ||
        location.pathname === '/index.html' ||
        location.pathname.endsWith('/index.html');

    if (isHomePage) {
        document.body.classList.add('is-home');
    }
})();
