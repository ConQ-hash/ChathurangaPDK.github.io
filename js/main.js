// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Initialize projects if on projects page
    if (document.getElementById('projectsGrid')) {
        loadProjects();
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Load projects dynamically
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Sample projects data - you can replace this with your actual projects
    const projects = [
        {
            title: "Mechatronics System Integration",
            description: "Developed an integrated mechatronics system combining mechanical, electronic, and software components for automated manufacturing.",
            tags: ["Mechatronics", "Automation", "R&D"],
            link: "projects/mechatronics-integration.html"
        },
        {
            title: "Signal Processing Research",
            description: "Research project focusing on signal processing techniques for improving system reliability and performance in industrial applications.",
            tags: ["Signal Processing", "Research", "Electronics"],
            link: "projects/signal-processing.html"
        },
        {
            title: "System Troubleshooting Framework",
            description: "Developed a systematic approach to troubleshooting complex electromechanical systems, reducing downtime by 40%.",
            tags: ["Troubleshooting", "System Design", "Problem Solving"],
            link: "projects/troubleshooting-framework.html"
        }
    ];
    
    // Clear existing content except the sample project
    const existingProjects = projectsGrid.children;
    for (let i = existingProjects.length - 1; i > 0; i--) {
        existingProjects[i].remove();
    }
    
    // Add projects to grid
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => window.location.href = project.link;
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    return card;
}

// Utility functions for project management
const ProjectManager = {
    // Add a new project
    addProject: function(project) {
        // This would typically save to a database or local storage
        console.log('Adding project:', project);
        loadProjects(); // Reload projects display
    },
    
    // Remove a project
    removeProject: function(projectId) {
        console.log('Removing project:', projectId);
        loadProjects(); // Reload projects display
    },
    
    // Update a project
    updateProject: function(projectId, updatedProject) {
        console.log('Updating project:', projectId, updatedProject);
        loadProjects(); // Reload projects display
    }
};

// Export for use in other files
window.ProjectManager = ProjectManager;