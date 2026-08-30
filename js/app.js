/* ===========================
   MAIN APPLICATION LOGIC
   =========================== */

class ProjectsBook {
    constructor() {
        this.projects = [];
        this.currentPage = 0;
        this.pages = ['home', 'projects', 'progress'];
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        this.init();
    }

    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.loadProjects();
        this.applyTheme();
        this.updateProgress();
    }

    setupDOM() {
        this.bookWrapper = document.querySelector('.book-wrapper');
        this.pageContainer = document.querySelector('.page-container');
        this.navbar = document.querySelector('.navbar');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.themeToggle = document.getElementById('theme-toggle');
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.querySelector('.modal-close');
        this.projectsGrid = document.getElementById('projects-grid');
    }

    setupEventListeners() {
        // Navigation
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.navigateToPage(e.currentTarget.dataset.page));
        });

        // Theme Toggle
        this.themeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Modal
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Page Controls
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', () => this.previousPage());
        });

        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', () => this.nextPage());
        });

        document.querySelectorAll('.contents-btn').forEach(btn => {
            btn.addEventListener('click', () => this.navigateToPage('projects'));
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousPage();
            if (e.key === 'ArrowRight') this.nextPage();
            if (e.key === 'Escape') this.closeModal();
        });
    }

    // ===========================
    // PAGE NAVIGATION
    // ===========================

    navigateToPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const page = document.getElementById(`page-${pageName}`);
        if (page) {
            page.classList.add('active');
        }

        // Update nav buttons
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageName) {
                btn.classList.add('active');
            }
        });

        // Update page index
        this.currentPage = this.pages.indexOf(pageName);

        // Update button states
        this.updatePageControls();
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.navigateToPage(this.pages[this.currentPage + 1]);
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.navigateToPage(this.pages[this.currentPage - 1]);
        }
    }

    updatePageControls() {
        const currentPageEl = document.querySelector('.page.active');
        if (!currentPageEl) return;

        const prevBtn = currentPageEl.querySelector('.prev-btn');
        const nextBtn = currentPageEl.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.pages.length - 1;
        }
    }

    // ===========================
    // PROJECT MANAGEMENT
    // ===========================

    loadProjects() {
        // Load from localStorage or use empty array
        const stored = localStorage.getItem('projects');
        this.projects = stored ? JSON.parse(stored) : this.getDefaultProjects();
        this.renderProjects();
    }

    getDefaultProjects() {
        // Return empty array - user will add projects
        return Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            number: i + 1,
            title: `Project ${String(i + 1).padStart(3, '0')}`,
            description: 'Click to edit project details',
            image: null,
            skills: [],
            learned: '',
            rating: 0,
            completed: false,
            date: new Date().toISOString()
        }));
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.updateProgress();
    }

    renderProjects() {
        if (!this.projectsGrid) return;

        this.projectsGrid.innerHTML = '';

        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            this.projectsGrid.appendChild(card);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        if (project.completed) card.classList.add('completed');

        const skillsHTML = project.skills.map(skill => 
            `<button class="skill-tag">${skill}</button>`
        ).join('');

        card.innerHTML = `
            <div class="project-header">
                <div class="project-number">PROJECT ${String(project.number).padStart(3, '0')}</div>
                <h3 class="project-title">${project.title}</h3>
            </div>
            <div class="project-image-container">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : `
                    <div class="project-image-placeholder">
                        <div class="project-image-placeholder::before">📷</div>
                        <span>Add Screenshot</span>
                    </div>
                `}
            </div>
            <div class="project-info">
                ${project.description}
            </div>
            ${skillsHTML ? `<div class="project-skills">${skillsHTML}</div>` : ''}
        `;

        card.addEventListener('click', () => this.openProjectModal(project));

        return card;
    }

    // ===========================
    // PROJECT MODAL
    // ===========================

    openProjectModal(project) {
        this.modalBody.innerHTML = `
            <h2 style="margin-bottom: var(--spacing-lg);">Project ${String(project.number).padStart(3, '0')}</h2>
            
            <form class="project-form">
                <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" class="form-input project-title-input" value="${project.title}" placeholder="Enter project title">
                </div>

                <div class="form-group">
                    <label class="form-label">Project Description</label>
                    <textarea class="form-textarea project-description-input" placeholder="What was this project about?">${project.description}</textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Project Screenshot</label>
                    <div class="file-upload-area" id="upload-area">
                        <div class="file-upload-icon">📷</div>
                        <div class="file-upload-text">Click to upload or drag and drop</div>
                        <input type="file" class="file-upload-input" accept="image/*">
                    </div>
                    ${project.image ? `
                        <div style="margin-top: var(--spacing-md);">
                            <img src="${project.image}" style="width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-light), var(--shadow-dark);">
                            <button type="button" class="control-btn" style="margin-top: var(--spacing-md); background-color: var(--color-error);" id="remove-image">Remove Image</button>
                        </div>
                    ` : ''}
                </div>

                <div class="form-group">
                    <label class="form-label">Skills Used</label>
                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm);">
                        <input type="text" class="form-input" id="skill-input" placeholder="Add skill (press Enter)" style="flex: 1; min-width: 150px;">
                        <button type="button" class="control-btn" id="add-skill">Add</button>
                    </div>
                    <div id="skills-list" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm); margin-top: var(--spacing-md);">
                        ${project.skills.map(skill => `
                            <button type="button" class="skill-tag selected" data-skill="${skill}">
                                ${skill} ✕
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">What I Learned</label>
                    <textarea class="form-textarea project-learned-input" placeholder="Describe what you learned from this project...">${project.learned}</textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Rating</label>
                    <div style="display: flex; gap: var(--spacing-md);">
                        ${[1, 2, 3, 4, 5].map(rating => `
                            <button type="button" class="control-btn project-rating" data-rating="${rating}" style="padding: var(--spacing-md); flex: 1; ${project.rating >= rating ? 'color: var(--color-accent);' : ''}">
                                ${'★'.repeat(rating)}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="form-group">
                    <label class="checkbox-neumorphic-wrapper" style="display: flex; align-items: center; gap: var(--spacing-md); cursor: pointer;">
                        <input type="checkbox" class="checkbox-neumorphic project-completed" ${project.completed ? 'checked' : ''}>
                        <span>Mark as Completed</span>
                    </label>
                </div>

                <div style="display: flex; gap: var(--spacing-lg);">
                    <button type="button" class="control-btn" id="save-project" style="flex: 1;">Save Project</button>
                    <button type="button" class="control-btn" id="cancel-project" style="flex: 1; opacity: 0.7;">Cancel</button>
                </div>
            </form>
        `;

        // Event listeners
        const saveBtn = this.modalBody.querySelector('#save-project');
        const cancelBtn = this.modalBody.querySelector('#cancel-project');
        const uploadArea = this.modalBody.querySelector('#upload-area');
        const fileInput = this.modalBody.querySelector('.file-upload-input');
        const addSkillBtn = this.modalBody.querySelector('#add-skill');
        const skillInput = this.modalBody.querySelector('#skill-input');
        const ratingBtns = this.modalBody.querySelectorAll('.project-rating');
        const removeImageBtn = this.modalBody.querySelector('#remove-image');

        saveBtn.addEventListener('click', () => this.saveProject(project));
        cancelBtn.addEventListener('click', () => this.closeModal());

        if (uploadArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragging');
            });
            uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragging'));
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragging');
                this.handleFileUpload(e.dataTransfer.files[0], project);
            });
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    this.handleFileUpload(e.target.files[0], project);
                }
            });
        }

        if (removeImageBtn) {
            removeImageBtn.addEventListener('click', () => {
                project.image = null;
                this.openProjectModal(project);
            });
        }

        addSkillBtn.addEventListener('click', () => this.addSkill(project, skillInput));
        skillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addSkill(project, skillInput);
            }
        });

        this.modalBody.querySelectorAll('.skill-tag.selected').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const skill = tag.dataset.skill;
                project.skills = project.skills.filter(s => s !== skill);
                this.openProjectModal(project);
            });
        });

        ratingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const rating = parseInt(btn.dataset.rating);
                project.rating = project.rating === rating ? 0 : rating;
                this.openProjectModal(project);
            });
        });

        this.modal.classList.add('active');
    }

    handleFileUpload(file, project) {
        const reader = new FileReader();
        reader.onload = (e) => {
            project.image = e.target.result;
            this.openProjectModal(project);
        };
        reader.readAsDataURL(file);
    }

    addSkill(project, skillInput) {
        const skill = skillInput.value.trim().toUpperCase();
        if (skill && !project.skills.includes(skill)) {
            project.skills.push(skill);
            skillInput.value = '';
            this.openProjectModal(project);
        }
    }

    saveProject(project) {
        const titleInput = this.modalBody.querySelector('.project-title-input');
        const descInput = this.modalBody.querySelector('.project-description-input');
        const learnedInput = this.modalBody.querySelector('.project-learned-input');
        const completedInput = this.modalBody.querySelector('.project-completed');

        project.title = titleInput.value || `Project ${String(project.number).padStart(3, '0')}`;
        project.description = descInput.value;
        project.learned = learnedInput.value;
        project.completed = completedInput.checked;

        this.saveProjects();
        this.renderProjects();
        this.closeModal();
    }

    closeModal() {
        this.modal.classList.remove('active');
    }

    // ===========================
    // PROGRESS TRACKING
    // ===========================

    updateProgress() {
        const completed = this.projects.filter(p => p.completed).length;
        const total = this.projects.length;
        const percentage = Math.round((completed / total) * 100);

        // Update progress bar
        const progressFill = document.getElementById('cover-progress');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        // Update progress text
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `${completed} / ${total} PROJECTS`;
        }

        // Update completed count
        const completedCount = document.getElementById('completed-count');
        if (completedCount) {
            completedCount.textContent = completed;
        }

        // Update stats
        const statCompleted = document.getElementById('stat-completed');
        const statRemaining = document.getElementById('stat-remaining');
        const progressNumber = document.getElementById('progress-number');

        if (statCompleted) statCompleted.textContent = completed;
        if (statRemaining) statRemaining.textContent = total - completed;
        if (progressNumber) progressNumber.textContent = percentage;

        // Update circle progress
        this.updateCircleProgress(percentage);
    }

    updateCircleProgress(percentage) {
        const circle = document.querySelector('.progress-circle-fill');
        if (!circle) return;

        const circumference = 2 * Math.PI * 90; // radius = 90
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = strokeDashoffset;
    }

    // ===========================
    // THEME MANAGEMENT
    // ===========================

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.applyTheme();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const app = new ProjectsBook();
    
    // Set initial page to home
    app.navigateToPage('home');
});
