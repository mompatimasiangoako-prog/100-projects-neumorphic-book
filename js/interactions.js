/* ===========================
   INTERACTION ENHANCEMENTS
   Microinteractions & Effects
   =========================== */

class InteractionManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupRippleEffects();
        this.setupButtonAnimations();
        this.setupCardAnimations();
        this.setupProgressAnimations();
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
    }

    // ===========================
    // RIPPLE EFFECT
    // ===========================

    setupRippleEffects() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn-raised, .control-btn, .nav-btn, .skill-tag');
            if (!button) return;

            // Create ripple
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ===========================
    // BUTTON ANIMATIONS
    // ===========================

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.control-btn, .btn-raised, .nav-btn');

        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.classList.add('press-animation');
            });

            button.addEventListener('mouseup', () => {
                button.classList.remove('press-animation');
            });

            button.addEventListener('mouseleave', () => {
                button.classList.remove('press-animation');
            });
        });
    }

    // ===========================
    // CARD ANIMATIONS
    // ===========================

    setupCardAnimations() {
        const cards = document.querySelectorAll('.project-card, .stat-card, .raised');

        cards.forEach((card, index) => {
            // Stagger animation
            card.style.animationDelay = `${index * 50}ms`;
            card.classList.add('fade-in');

            // Hover elevation
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // ===========================
    // PROGRESS ANIMATIONS
    // ===========================

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');

        progressBars.forEach(bar => {
            bar.classList.add('progressPulse');

            // Animate width change
            const observer = new MutationObserver(() => {
                bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            observer.observe(bar, { attributes: true, attributeFilter: ['style'] });
        });

        // Animate progress circle
        this.animateProgressCircle();
    }

    animateProgressCircle() {
        const circle = document.querySelector('.progress-circle-fill');
        if (!circle) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    circle.style.transition = 'stroke-dashoffset 1s ease-out';
                }
            });
        });

        observer.observe(circle);
    }

    // ===========================
    // KEYBOARD SHORTCUTS
    // ===========================

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
            }

            // Alt + S: Search
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const searchBtn = document.querySelector('[data-page="search"]');
                if (searchBtn) searchBtn.click();
            }
        });
    }

    // ===========================
    // ACCESSIBILITY
    // ===========================

    setupAccessibility() {
        // Focus visible for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // ARIA labels
        this.updateAriaLabels();
    }

    updateAriaLabels() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const label = btn.querySelector('.label').textContent;
            btn.setAttribute('aria-label', label);
        });

        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Project ${index + 1}`);

            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }
}

// ===========================
// SMOOTH SCROLL
// ===========================

class SmoothScroll {
    constructor() {
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===========================
// PAGE TRANSITION
// ===========================

class PageTransition {
    constructor() {
        this.setupTransitions();
    }

    setupTransitions() {
        const pages = document.querySelectorAll('.page');

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const page = mutation.target;
                    if (page.classList.contains('active')) {
                        page.style.animation = 'fadeIn 0.5s ease-out';
                    }
                }
            });
        });

        pages.forEach(page => {
            observer.observe(page, { attributes: true });
        });
    }
}

// ===========================
// PERFORMANCE MONITORING
// ===========================

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.logPerformance();
        this.setupLazyLoading();
    }

    logPerformance() {
        if (window.performance) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

class Notification {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: var(--color-surface);
            color: var(--color-text-primary);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-light), var(--shadow-dark);
            z-index: 3000;
            animation: slideInFromRight 0.3s ease-out;
            font-family: var(--font-body);
            font-size: 14px;
        `;

        if (type === 'success') {
            notification.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid var(--color-error)';
        } else if (type === 'warning') {
            notification.style.borderLeft = '4px solid var(--color-warning)';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// ===========================
// EXPORT UTILITIES
// ===========================

class ExportUtils {
    static exportJSON() {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const dataStr = JSON.stringify(projects, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        this.downloadFile(dataBlob, 'projects.json');
    }

    static exportCSV() {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        let csv = 'Number,Title,Description,Skills,Learned,Rating,Completed\n';

        projects.forEach(project => {
            csv += `${project.number},"${project.title}","${project.description}","${project.skills.join(', ')}","${project.learned}",${project.rating},${project.completed}\n`;
        });

        const dataBlob = new Blob([csv], { type: 'text/csv' });
        this.downloadFile(dataBlob, 'projects.csv');
    }

    static downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    static importJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const projects = JSON.parse(e.target.result);
                localStorage.setItem('projects', JSON.stringify(projects));
                Notification.show('Projects imported successfully!', 'success');
                location.reload();
            } catch (error) {
                Notification.show('Error importing projects', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new InteractionManager();
    new SmoothScroll();
    new PageTransition();
    new PerformanceMonitor();

    // Log initialization
    console.log('✨ 100 Projects Neumorphic Book initialized');
});

// Export for external use
window.ProjectsBook = {
    Notification,
    ExportUtils
};
