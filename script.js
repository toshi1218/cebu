/**
 * Cebu Web Design - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // モバイルナビゲーション
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // メニューリンクをクリックしたらメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ========================================
    // ヘッダースクロール効果
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ========================================
    // スムーズスクロール
    // ========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // スクロールアニメーション
    // ========================================
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .work-card, .pricing-card, .flow-item'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animateElements.forEach(function(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease ' + (index % 3) * 0.1 + 's, transform 0.6s ease ' + (index % 3) * 0.1 + 's';
        observer.observe(element);
    });

    // ========================================
    // お問い合わせフォーム
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // フォームデータの取得
            const formData = new FormData(contactForm);
            const data = {};

            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // バリデーション
            const name = data.name ? data.name.trim() : '';
            const email = data.email ? data.email.trim() : '';
            const message = data.message ? data.message.trim() : '';

            if (!name) {
                showNotification('お名前を入力してください', 'error');
                return;
            }

            if (!email) {
                showNotification('メールアドレスを入力してください', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('正しいメールアドレスを入力してください', 'error');
                return;
            }

            if (!message) {
                showNotification('お問い合わせ内容を入力してください', 'error');
                return;
            }

            // 送信ボタンを無効化
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';

            // 送信シミュレーション（実際のプロジェクトではAPIに送信）
            setTimeout(function() {
                showNotification('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // メールアドレスバリデーション
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知表示
    function showNotification(message, type) {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 通知要素を作成
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = '\
            <span class="notification-message">' + message + '</span>\
            <button class="notification-close">&times;</button>\
        ';

        // スタイルを設定
        notification.style.cssText = '\
            position: fixed;\
            bottom: 20px;\
            right: 20px;\
            padding: 16px 24px;\
            background: ' + (type === 'success' ? '#10b981' : '#ef4444') + ';\
            color: #fff;\
            border-radius: 8px;\
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\
            display: flex;\
            align-items: center;\
            gap: 12px;\
            z-index: 9999;\
            animation: slideIn 0.3s ease;\
            max-width: 400px;\
        ';

        // アニメーション用スタイルを追加
        const style = document.createElement('style');
        style.textContent = '\
            @keyframes slideIn {\
                from { transform: translateX(100%); opacity: 0; }\
                to { transform: translateX(0); opacity: 1; }\
            }\
            @keyframes slideOut {\
                from { transform: translateX(0); opacity: 1; }\
                to { transform: translateX(100%); opacity: 0; }\
            }\
        ';
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // 閉じるボタン
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = '\
            background: none;\
            border: none;\
            color: #fff;\
            font-size: 20px;\
            cursor: pointer;\
            padding: 0;\
            line-height: 1;\
        ';

        closeButton.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 300);
        });

        // 自動で閉じる
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // ========================================
    // 数値カウントアップアニメーション
    // ========================================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = function(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ========================================
    // ナビゲーションのアクティブ状態
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(function(navItem) {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === '#' + sectionId) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ========================================
    // 画像の遅延読み込み
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
});
