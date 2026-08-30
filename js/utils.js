/* ===========================
   UTILITY FUNCTIONS
   =========================== */

/**
 * Format date to readable string
 */
function formatDate(date) {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Get completion percentage
 */
function getCompletionPercentage(completed, total) {
    return Math.round((completed / total) * 100);
}

/**
 * Get projects by skill
 */
function getProjectsBySkill(projects, skill) {
    return projects.filter(p => p.skills.includes(skill.toUpperCase()));
}

/**
 * Get unique skills from all projects
 */
function getAllSkills(projects) {
    const skills = new Set();
    projects.forEach(p => {
        p.skills.forEach(s => skills.add(s));
    });
    return Array.from(skills).sort();
}

/**
 * Search projects by title or description
 */
function searchProjects(projects, query) {
    const q = query.toLowerCase();
    return projects.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
    );
}

/**
 * Get projects by rating
 */
function getProjectsByRating(projects, rating) {
    return projects.filter(p => p.rating === rating);
}

/**
 * Get average rating
 */
function getAverageRating(projects) {
    if (projects.length === 0) return 0;
    const sum = projects.reduce((acc, p) => acc + p.rating, 0);
    return (sum / projects.length).toFixed(1);
}

/**
 * Get most used skills
 */
function getMostUsedSkills(projects, limit = 5) {
    const skillCount = {};
    projects.forEach(p => {
        p.skills.forEach(s => {
            skillCount[s] = (skillCount[s] || 0) + 1;
        });
    });
    
    return Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([skill, count]) => ({ skill, count }));
}

/**
 * Debounce function for search
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Clone deep object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Format project statistics
 */
function getProjectStats(projects) {
    return {
        total: projects.length,
        completed: projects.filter(p => p.completed).length,
        remaining: projects.filter(p => !p.completed).length,
        percentage: getCompletionPercentage(projects.filter(p => p.completed).length, projects.length),
        averageRating: getAverageRating(projects),
        topSkills: getMostUsedSkills(projects, 10),
        skillsUsed: getAllSkills(projects).length
    };
}

/**
 * Export utilities object
 */
window.ProjectUtils = {
    formatDate,
    getCompletionPercentage,
    getProjectsBySkill,
    getAllSkills,
    searchProjects,
    getProjectsByRating,
    getAverageRating,
    getMostUsedSkills,
    debounce,
    throttle,
    deepClone,
    getProjectStats
};
