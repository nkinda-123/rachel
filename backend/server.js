const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const portfolio = {
  name: 'Rachel',
  role: 'Data Scientist',
  about: 'Passionate data scientist with expertise in machine learning, data visualization, and statistical analysis. I transform raw data into actionable insights.',
  skills: [
    { title: 'Python & Data', description: 'Pandas, NumPy, Scikit-learn, data wrangling and EDA.' },
    { title: 'Machine Learning', description: 'Classification, regression, clustering, deep learning models.' },
    { title: 'Data Visualization', description: 'Matplotlib, Seaborn, Plotly, dashboards and storytelling.' },
    { title: 'SQL & Databases', description: 'Data querying, analysis, and database optimization.' }
  ],
  qualifications: [
    "Master's degree in Data Science or related field.",
    "Experience with machine learning pipelines and model deployment.",
    "Strong statistical foundation and problem-solving skills."
  ],
  projects: [
    {
      title: 'Predictive Analytics Model',
      description: 'Built a machine learning model for customer churn prediction with 87% accuracy.',
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Created an interactive dashboard to monitor KPIs and business metrics in real-time.',
    },
    {
      title: 'NLP Text Classification',
      description: 'Implemented a text classification model for sentiment analysis on customer reviews.',
    }
  ],
  contact: {
    email: 'rachel@example.com',
    location: 'Data Science Professional',
  },
};

app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});

app.put('/api/portfolio', (req, res) => {
  const { name, role, about, email, location } = req.body;
  
  if (name) portfolio.name = name;
  if (role) portfolio.role = role;
  if (about) portfolio.about = about;
  if (email) portfolio.contact.email = email;
  if (location) portfolio.contact.location = location;
  
  console.info('Portfolio updated:', portfolio);
  res.json({ status: 'success', data: portfolio });
});

app.post('/api/portfolio/skill', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  
  portfolio.skills.push({ title, description });
  console.info('Skill added:', { title, description });
  res.json({ status: 'success', skills: portfolio.skills });
});

app.put('/api/portfolio/skill/:index', (req, res) => {
  const { index } = req.params;
  const { title, description } = req.body;
  
  if (index < 0 || index >= portfolio.skills.length) {
    return res.status(400).json({ error: 'Invalid skill index.' });
  }
  
  if (title) portfolio.skills[index].title = title;
  if (description) portfolio.skills[index].description = description;
  
  res.json({ status: 'success', skills: portfolio.skills });
});

app.post('/api/portfolio/qualification', (req, res) => {
  const { qualification } = req.body;
  
  if (!qualification) {
    return res.status(400).json({ error: 'Qualification is required.' });
  }
  
  portfolio.qualifications.push(qualification);
  res.json({ status: 'success', qualifications: portfolio.qualifications });
});

app.put('/api/portfolio/qualification/:index', (req, res) => {
  const { index } = req.params;
  const { qualification } = req.body;
  
  if (index < 0 || index >= portfolio.qualifications.length) {
    return res.status(400).json({ error: 'Invalid qualification index.' });
  }
  
  if (qualification) portfolio.qualifications[index] = qualification;
  
  res.json({ status: 'success', qualifications: portfolio.qualifications });
});

app.post('/api/portfolio/project', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  
  portfolio.projects.push({ title, description });
  res.json({ status: 'success', projects: portfolio.projects });
});

app.put('/api/portfolio/project/:index', (req, res) => {
  const { index } = req.params;
  const { title, description } = req.body;
  
  if (index < 0 || index >= portfolio.projects.length) {
    return res.status(400).json({ error: 'Invalid project index.' });
  }
  
  if (title) portfolio.projects[index].title = title;
  if (description) portfolio.projects[index].description = description;
  
  res.json({ status: 'success', projects: portfolio.projects });
});

app.delete('/api/portfolio/skill/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= portfolio.skills.length) {
    return res.status(400).json({ error: 'Invalid skill index.' });
  }
  const removed = portfolio.skills.splice(index, 1);
  console.info('Skill removed:', removed[0]);
  res.json({ status: 'success', skills: portfolio.skills });
});

app.delete('/api/portfolio/qualification/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= portfolio.qualifications.length) {
    return res.status(400).json({ error: 'Invalid qualification index.' });
  }
  const removed = portfolio.qualifications.splice(index, 1);
  console.info('Qualification removed:', removed[0]);
  res.json({ status: 'success', qualifications: portfolio.qualifications });
});

app.delete('/api/portfolio/project/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= portfolio.projects.length) {
    return res.status(400).json({ error: 'Invalid project index.' });
  }
  const removed = portfolio.projects.splice(index, 1);
  console.info('Project removed:', removed[0]);
  res.json({ status: 'success', projects: portfolio.projects });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.info('Contact form submitted:', { name, email, message });
  res.json({ status: 'success', message: 'Contact request received.' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});