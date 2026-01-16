/**
 * Mobile Pro - Phase 1 & 2
 * Phase 1: トップページ判定して is-home クラスを付与
 * Phase 2: サービス詳細ページの長文セクションをアコーディオン化
 */
(function () {
    'use strict';

    // Phase 1: トップページ判定
    const isHomePage =
        location.pathname === '/' ||
        location.pathname === '/index.html' ||
        location.pathname.endsWith('/index.html');

    if (isHomePage) {
        document.body.classList.add('is-home');
    }

    // Phase 2: サービス詳細ページのアコーディオン化（モバイルのみ）
    if (window.innerWidth <= 768 && !isHomePage) {
        // アコーディオン化対象のセクション（h2見出しで判定）
        const accordionTargets = [
            'アポスティーユとは何か',
            '対応事例',
            'ご依頼時に必要な情報',
            'PSA書類とは',
            'NBIクリアランスとは',
            '取得の流れ',
            'よくある質問'
        ];

        document.addEventListener('DOMContentLoaded', function () {
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const h2 = section.querySelector('h2');
                if (!h2) return;

                const h2Text = h2.textContent.trim();

                // 対象セクションかチェック
                const shouldAccordion = accordionTargets.some(target =>
                    h2Text.includes(target)
                );

                if (shouldAccordion) {
                    // セクション内のコンテンツを取得（h2以外）
                    const contentSection = section.querySelector('.content-section');
                    if (!contentSection) return;

                    const content = contentSection.cloneNode(true);
                    const h2Clone = content.querySelector('h2');
                    if (h2Clone) h2Clone.remove();

                    // details/summary要素を作成
                    const details = document.createElement('details');
                    details.className = 'service-accordion';

                    const summary = document.createElement('summary');
                    summary.textContent = h2Text;

                    const accordionContent = document.createElement('div');
                    accordionContent.className = 'accordion-content';
                    accordionContent.appendChild(content);

                    details.appendChild(summary);
                    details.appendChild(accordionContent);

                    // 元のcontent-sectionを置き換え
                    contentSection.innerHTML = '';
                    contentSection.appendChild(details);
                }
            });
        });
    }
})();
