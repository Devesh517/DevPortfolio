// ===================================================================
// DEVESH DHANWANI - PORTFOLIO INTERACTION ENGINE
// Clean, Modular, Production-Safe JavaScript
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Smooth scrolling with fixed navbar compensation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const handleScrollSpy = () => {
        const scrollPos = window.pageYOffset + 220;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    // 5. Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Intersection Observer for Scroll Animations
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        animObserver.observe(el);
    });

    // 7. Dynamic Role Typing / Rotating Effect
    const roleTextEl = document.getElementById('roleText');
    if (roleTextEl) {
        const roles = [
            "Software Developer & Problem Solver",
            "Java & Spring Boot Engineer",
            "Full-Stack Web & Desktop Developer",
            "Relational Database & API Specialist"
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeRole() {
            const currentRole = roles[roleIdx];
            if (isDeleting) {
                roleTextEl.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 40;
            } else {
                roleTextEl.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIdx === currentRole.length) {
                typingSpeed = 2200; // Pause at full text
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(typeRole, typingSpeed);
        }

        setTimeout(typeRole, 800);
    }

    // 8. Skill Category Filters
    function showCard(card) {
        card.style.display = 'flex';
        card.classList.remove('card-enter');
        void card.offsetWidth; // restart animation
        card.classList.add('card-enter');
    }

    function hideCard(card) {
        card.classList.remove('card-enter');
        card.style.display = 'none';
    }

    const skillFilters = document.querySelectorAll('#skillFilters .filter-tab');
    const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

    if (skillFilters.length && skillCards.length) {
        skillFilters.forEach(button => {
            button.addEventListener('click', () => {
                skillFilters.forEach(b => b.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filter === 'all' || cardCategory === filter) {
                        showCard(card);
                    } else {
                        hideCard(card);
                    }
                });
            });
        });
    }

    // 9. Project Category Filters (All / Full-Stack & Web / Java & Desktop / Python)
    const projectFilters = document.querySelectorAll('#projectFilters .filter-tab');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');

    if (projectFilters.length && projectCards.length) {
        projectFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                projectFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const activeFilter = btn.getAttribute('data-filter') || 'all';

                projectCards.forEach(card => {
                    const categories = (card.getAttribute('data-category') || '').split(/\s+/);
                    if (activeFilter === 'all' || categories.includes(activeFilter)) {
                        showCard(card);
                    } else {
                        hideCard(card);
                    }
                });
            });
        });
    }

    // 10. Certificate Modal / Lightbox System
    const certModal = document.getElementById('certModal');
    const modalCertImg = document.getElementById('modalCertImg');
    const modalCertTitle = document.getElementById('modalCertTitle');
    const modalCertIssuer = document.getElementById('modalCertIssuer');
    const modalCertLink = document.getElementById('modalCertLink');
    const modalCertClose = document.getElementById('modalCertClose');

    window.openCertModal = function(imgSrc, title, issuer, verifyLink) {
        if (!certModal) return;
        modalCertImg.src = imgSrc;
        modalCertTitle.textContent = title;
        modalCertIssuer.textContent = `Issued by: ${issuer}`;
        modalCertLink.href = verifyLink;
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalCertClose) {
        modalCertClose.addEventListener('click', closeCertModal);
    }

    const modalCertDismiss = document.getElementById('modalCertDismiss');
    if (modalCertDismiss) {
        modalCertDismiss.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
        }
    });

    // 11. Subtle Button Ripple Effect
    document.querySelectorAll('.btn, .nav-btn, .project-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyle);
});

// Loading screen fade-out
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    }
});

// Theme Toggle Functionality (Dark / Light)
(function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = body.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        if (themeLabel) {
            themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
        }
    }
})();

// =============================================
// Liquid Glass Effect
// =============================================
(function () {
    'use strict';

    function smoothStep(a, b, t) {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return t * t * (3 - 2 * t);
    }
    function length(x, y) { return Math.sqrt(x * x + y * y); }
    function roundedRectSDF(x, y, width, height, radius) {
        const qx = Math.abs(x) - width + radius;
        const qy = Math.abs(y) - height + radius;
        return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    }
    function texture(x, y) { return { type: 't', x, y }; }
    function generateId() { return 'lg-' + Math.random().toString(36).substr(2, 9); }

    class Shader {
        constructor(options = {}) {
            this.width = options.width || 100;
            this.height = options.height || 100;
            this.fragment = options.fragment || ((uv) => texture(uv.x, uv.y));
            this.canvasDPI = 1;
            this.id = generateId();
            this.offset = 10;
            this.mouse = { x: 0, y: 0 };
            this.mouseUsed = false;
            this.createElement();
            this.setupEventListeners();
            this.updateShader();
        }

        createElement() {
            this.container = document.createElement('div');
            this.container.className = 'liquid-lens';
            this.container.style.cssText = `
                position: fixed; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: ${this.width}px; height: ${this.height}px;
                overflow: hidden; border-radius: 150px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 -10px 25px inset rgba(0,0,0,0.15);
                cursor: grab;
                backdrop-filter: url(#${this.id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1);
                z-index: 9999; pointer-events: auto;
            `;

            this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.svg.setAttribute('width', '0');
            this.svg.setAttribute('height', '0');
            this.svg.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;';

            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', `${this.id}_filter`);
            filter.setAttribute('filterUnits', 'userSpaceOnUse');
            filter.setAttribute('colorInterpolationFilters', 'sRGB');
            filter.setAttribute('x', '0'); filter.setAttribute('y', '0');
            filter.setAttribute('width', this.width.toString());
            filter.setAttribute('height', this.height.toString());

            this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
            this.feImage.setAttribute('id', `${this.id}_map`);
            this.feImage.setAttribute('width', this.width.toString());
            this.feImage.setAttribute('height', this.height.toString());

            this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
            this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
            this.feDisplacementMap.setAttribute('in2', `${this.id}_map`);
            this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
            this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

            filter.appendChild(this.feImage);
            filter.appendChild(this.feDisplacementMap);
            defs.appendChild(filter);
            this.svg.appendChild(defs);

            this.canvas = document.createElement('canvas');
            this.canvas.width = this.width * this.canvasDPI;
            this.canvas.height = this.height * this.canvasDPI;
            this.canvas.style.display = 'none';
            this.context = this.canvas.getContext('2d');
        }

        constrainPosition(x, y) {
            return {
                x: Math.max(this.offset, Math.min(window.innerWidth - this.width - this.offset, x)),
                y: Math.max(this.offset, Math.min(window.innerHeight - this.height - this.offset, y))
            };
        }

        setupEventListeners() {
            let isDragging = false, startX, startY, initialX, initialY;

            this.container.addEventListener('mousedown', (e) => {
                isDragging = true;
                this.container.style.cursor = 'grabbing';
                startX = e.clientX; startY = e.clientY;
                const rect = this.container.getBoundingClientRect();
                initialX = rect.left; initialY = rect.top;
                e.preventDefault();
            });

            this.container.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                isDragging = true;
                this.container.style.cursor = 'grabbing';
                const touch = e.touches[0];
                startX = touch.clientX; startY = touch.clientY;
                const rect = this.container.getBoundingClientRect();
                initialX = rect.left; initialY = rect.top;
                e.preventDefault();
            }, { passive: false });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    const c = this.constrainPosition(initialX + e.clientX - startX, initialY + e.clientY - startY);
                    this.container.style.left = c.x + 'px';
                    this.container.style.top = c.y + 'px';
                    this.container.style.transform = 'none';
                }
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = (e.clientX - rect.left) / rect.width;
                this.mouse.y = (e.clientY - rect.top) / rect.height;
                if (this.mouseUsed) this.updateShader();
            });

            document.addEventListener('touchmove', (e) => {
                if (isDragging && e.touches.length === 1) {
                    const touch = e.touches[0];
                    const c = this.constrainPosition(initialX + touch.clientX - startX, initialY + touch.clientY - startY);
                    this.container.style.left = c.x + 'px';
                    this.container.style.top = c.y + 'px';
                    this.container.style.transform = 'none';
                    e.preventDefault();
                }
                const rect = this.container.getBoundingClientRect();
                const touch = e.touches[0];
                if (touch) {
                    this.mouse.x = (touch.clientX - rect.left) / rect.width;
                    this.mouse.y = (touch.clientY - rect.top) / rect.height;
                    if (this.mouseUsed) this.updateShader();
                }
            }, { passive: false });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                this.container.style.cursor = 'grab';
            });

            document.addEventListener('touchend', () => {
                isDragging = false;
                this.container.style.cursor = 'grab';
            });

            window.addEventListener('resize', () => {
                const rect = this.container.getBoundingClientRect();
                const c = this.constrainPosition(rect.left, rect.top);
                this.container.style.left = c.x + 'px';
                this.container.style.top = c.y + 'px';
                this.container.style.transform = 'none';
            });
        }

        updateShader() {
            const mouseProxy = new Proxy(this.mouse, {
                get: (t, p) => { this.mouseUsed = true; return t[p]; }
            });
            this.mouseUsed = false;

            const w = this.width * this.canvasDPI;
            const h = this.height * this.canvasDPI;
            const data = new Uint8ClampedArray(w * h * 4);
            let maxScale = 0;
            const rawValues = [];

            for (let i = 0; i < data.length; i += 4) {
                const x = (i / 4) % w;
                const y = Math.floor(i / 4 / w);
                const pos = this.fragment({ x: x / w, y: y / h }, mouseProxy);
                const dx = pos.x * w - x;
                const dy = pos.y * h - y;
                maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
                rawValues.push(dx, dy);
            }
            maxScale *= 0.5;

            let idx = 0;
            for (let i = 0; i < data.length; i += 4) {
                data[i]     = (rawValues[idx++] / maxScale + 0.5) * 255;
                data[i + 1] = (rawValues[idx++] / maxScale + 0.5) * 255;
                data[i + 2] = 0;
                data[i + 3] = 255;
            }

            this.context.putImageData(new ImageData(data, w, h), 0, 0);
            this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL());
            this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString());
        }

        appendTo(parent) { parent.appendChild(this.svg); parent.appendChild(this.container); }
        destroy() { this.svg.remove(); this.container.remove(); this.canvas.remove(); }
    }

    function createLiquidGlass() {
        if (window.liquidGlass) return;
        const shader = new Shader({
            width: 300, height: 200,
            fragment: (uv) => {
                const ix = uv.x - 0.5, iy = uv.y - 0.5;
                const d = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
                const displacement = smoothStep(0.8, 0, d - 0.15);
                const scaled = smoothStep(0, 1, displacement);
                return texture(ix * scaled + 0.5, iy * scaled + 0.5);
            }
        });
        shader.appendTo(document.body);
        window.liquidGlass = shader;
    }

    function destroyLiquidGlass() {
        if (window.liquidGlass) {
            window.liquidGlass.destroy();
            delete window.liquidGlass;
        }
    }

    const glassBtn = document.getElementById('glassToggleBtn');
    const glassLabel = document.getElementById('glassLabel');

    function setGlass(on) {
        if (on) {
            createLiquidGlass();
            document.body.setAttribute('data-glass', 'on');
            if (glassLabel) glassLabel.textContent = 'Glass On';
            if (glassBtn) glassBtn.title = 'Disable glass effect';
        } else {
            destroyLiquidGlass();
            document.body.removeAttribute('data-glass');
            if (glassLabel) glassLabel.textContent = 'Glass';
            if (glassBtn) glassBtn.title = 'Enable glass effect';
        }
    }

    if (glassBtn) {
        glassBtn.addEventListener('click', () => setGlass(!window.liquidGlass));
    }
})();
