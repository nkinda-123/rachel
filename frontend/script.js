const backendUrl = window.backendUrl || 'http://localhost:3000/api';
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

// Function to load and update portfolio data
async function loadPortfolioData() {
  try {
    const response = await fetch(`${backendUrl}/portfolio`);
    const data = await response.json();
    
    // Update hero section
    document.getElementById('hero-name').textContent = `Hi, I'm ${data.name}.`;
    document.getElementById('eyebrow').textContent = data.role;
    
    // Update about section
    document.getElementById('about-text').textContent = data.about;
    
    // Update contact info
    document.getElementById('contact-email').textContent = data.contact.email;
    document.getElementById('contact-location').textContent = data.contact.location;
    
    // Update skills dynamically
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && data.skills) {
      skillsContainer.innerHTML = data.skills.map(skill => `
        <article>
          <h3>${skill.title}</h3>
          <p>${skill.description}</p>
        </article>
      `).join('');
    }
    
    // Update qualifications dynamically
    const qualsList = document.getElementById('qualifications-list');
    if (qualsList && data.qualifications) {
      qualsList.innerHTML = data.qualifications.map(qual => `<li>${qual}</li>`).join('');
    }
    
    // Update projects dynamically
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = data.projects.map(project => `
        <article>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </article>
      `).join('');
    }
    
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Load portfolio data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
  // Refresh portfolio data every 2 seconds to sync with admin changes
  setInterval(loadPortfolioData, 2000);
});

// Handle contact form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  status.textContent = 'Sending message...';

  try {
    const response = await fetch(`${backendUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unable to send the message');
    }

    status.textContent = 'Message sent successfully!';
    form.reset();
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
});
