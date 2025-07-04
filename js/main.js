// ==============================
// JS Chính - main.js (BẢN CẬP NHẬT HOÀN CHỈNH)
// ==============================

document.addEventListener("DOMContentLoaded", function() {

    // 1. Load Header và Footer
    const loadComponent = (id, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                const targetElement = document.getElementById(id);
                if (targetElement) {
                    targetElement.innerHTML = data;
                }
                if (id === 'header-placeholder') {
                    setupHeader();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    loadComponent('header-placeholder', '/includes/header.html');
    loadComponent('footer-placeholder', '/includes/footer.html');

    
    // 2. Thiết lập Header
    const setupHeader = () => {
        const navbar = document.getElementById('main-navbar');
        if (!navbar) return;

        // Active Menu
        const navLinks = navbar.querySelectorAll('.navbar-nav .nav-link');
        const currentPage = window.location.pathname;
        navLinks.forEach(link => {
            if (new URL(link.href).pathname === currentPage) {
                link.classList.add('active');
            }
        });

        // Sticky Header
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Language Switcher Logic
        const langSwitcher = navbar.querySelector('.lang-switcher');
        if (langSwitcher) {
            const isEnglish = currentPage.includes('/index-en.html') || currentPage.includes('/pages-en/');
            const viLink = langSwitcher.querySelector('a[href*="vi"]');
            const enLink = langSwitcher.querySelector('a[href*="en"]');
            
            if (isEnglish) {
                enLink.classList.add('active');
                viLink.classList.remove('active');
                viLink.href = currentPage.replace('/index-en.html', '/index-vi.html').replace('/pages-en/', '/pages-vi/');
            } else {
                viLink.classList.add('active');
                enLink.classList.remove('active');
                enLink.href = currentPage.replace('/index-vi.html', '/index-en.html').replace('/pages-vi/', '/pages-en/');
            }
        }

        // *** LOGIC MỚI: KHÓA CUỘN KHI MỞ MENU MOBILE ***
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse) {
            navbarCollapse.addEventListener('show.bs.collapse', function () {
                document.body.classList.add('mobile-menu-open');
            });
            navbarCollapse.addEventListener('hide.bs.collapse', function () {
                document.body.classList.remove('mobile-menu-open');
            });
        }
    };

    // 3. Khởi tạo AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // 4. Khởi tạo Simple Lightbox cho trang Gallery
    if (document.querySelector('.gallery-grid')) {
        new SimpleLightbox('.gallery-grid a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    }

    // 5. Counter-Up Animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const counters = statsSection.querySelectorAll('.counter');
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace('+', ''));
                    let current = 0;
                    const increment = target / 100;
                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCount();
                });
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
});