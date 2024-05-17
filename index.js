document.addEventListener('DOMContentLoaded', () => {
    displayAllProjects();
});

function createProject() {
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;

    if (projectName.trim() === '') {
        alert('Project name cannot be empty');
        return;
    }

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    let lastId = localStorage.getItem('lastId') || 0;
    const newProject = { 
        id: ++lastId,
        name: projectName,
        description: projectDescription
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('lastId', lastId);

    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = ''; // Clear description field after project creation
    displayAllProjects();
}

function displayAllProjects() {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = `${project.id}: ${project.name}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteProject(project.id);
        li.appendChild(deleteBtn);
        projectList.appendChild(li);
    });
}

function deleteProject(projectId) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Reset lastId
    let lastId = projects.length > 0 ? projects[projects.length - 1].id : 0;
    localStorage.setItem('lastId', lastId);
    
    displayAllProjects();
}


function viewProject() {
    const projectId = parseInt(document.getElementById('viewProjectId').value, 10);
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects.find(project => project.id === projectId);

    const projectDetails = document.getElementById('projectDetails');
    if (project) {
        projectDetails.innerHTML = `
            <h3>Project Details</h3>
            <p><strong>ID:</strong> ${project.id}</p>
            <p><strong>Name:</strong> ${project.name}</p>
            <p><strong>Description:</strong> ${project.description}</p>
        `;
    } else {
        projectDetails.textContent = 'Project not found';
    }
}
