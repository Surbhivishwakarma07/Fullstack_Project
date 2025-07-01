import React, { useState, useEffect } from 'react';
import './index.css';
import { projects } from './projectsData';

const API_BASE = 'http://localhost:5000/api';

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="app">
      {currentView === 'landing' ? (
        <LandingPage setCurrentView={setCurrentView} />
      ) : (
        <AdminPanel setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

// Navigation Component
const Navigation = ({ setCurrentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>TechSolutions</h2>
        </div>
        <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('clients')} className="nav-link">Clients</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          <button onClick={() => setCurrentView('admin')} className="nav-link admin-link">Admin</button>
        </nav>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

// Landing Page Component
const LandingPage = ({ setCurrentView }) => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE}/clients`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        alert('Contact form submitted successfully!');
        setContactForm({ fullName: '', email: '', mobile: '', city: '' });
      }
    } catch (error) {
      alert('Error submitting form');
    }
    setLoading(false);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (response.ok) {
        alert('Successfully subscribed to newsletter!');
        setNewsletterEmail('');
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Error subscribing to newsletter');
    }
    setLoading(false);
  };

  return (
    <div className="landing-page">
      <Navigation setCurrentView={setCurrentView} />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to TechSolutions</h1>
          <p>We create amazing digital experiences and help businesses grow with innovative technology solutions.</p>
          <button className="hero-btn">Get Started</button>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <h3>Innovation Starts Here</h3>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About Us</h2>
            <p>Leading the way in digital transformation</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Story</h3>
              <p>With over a decade of experience in the technology industry, we have been helping businesses transform their digital presence and achieve their goals through innovative solutions.</p>
              <div className="stats">
                <div className="stat">
                  <h4>500+</h4>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h4>100+</h4>
                  <p>Happy Clients</p>
                </div>
                <div className="stat">
                  <h4>10+</h4>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="about-placeholder">
                <h4>Our Team</h4><image src="../4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive solutions for your business needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Web Development</h3>
              <p>Custom websites and web applications built with modern technologies</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Mobile Apps</h3>
              <p>Native and cross-platform mobile applications for iOS and Android</p>
            </div>
            <div className="service-card">
              <div className="service-icon">☁️</div>
              <h3>Cloud Solutions</h3>
              <p>Scalable cloud infrastructure and deployment solutions</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Beautiful and intuitive user interfaces and experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>Our Projects</h2>
            <p>Showcasing our latest work and achievements</p>
          </div>
          <div className="projects-grid">
            {Array.isArray(projects) && projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  <img src={`http://localhost:5000${project.image}`} alt={project.name} />
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <button className="read-more-btn">Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section id="clients" className="clients">
        <div className="container">
          <div className="section-header">
            <h2>Happy Clients</h2>
            <p>What our clients say about us</p>
          </div>
          <div className="clients-grid">
            {Array.isArray(projects) && clients.map((client) => (
              <div key={client._id} className="client-card">
                <div className="client-image">
                  <img src={`http://localhost:5000${client.image}`} alt={client.name} />
                </div>
                <div className="client-content">
                  <p>"{client.description}"</p>
                  <div className="client-info">
                    <h4>{client.name}</h4>
                    <span>{client.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>info@techsolutions.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 5588669911</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>123 Technology Street, India</p>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  value={contactForm.mobile}
                  onChange={(e) => setContactForm({...contactForm, mobile: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={contactForm.city}
                  onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay updated with our latest news and offers</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TechSolutions</h3>
              <p>Creating amazing digital experiences for businesses worldwide.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => document.getElementById('home').scrollIntoView()}>Home</button></li>
                <li><button onClick={() => document.getElementById('about').scrollIntoView()}>About</button></li>
                <li><button onClick={() => document.getElementById('services').scrollIntoView()}>Services</button></li>
                <li><button onClick={() => document.getElementById('projects').scrollIntoView()}>Projects</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>Cloud Solutions</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📧 info@techsolutions.com</p>
              <p>📞 +91 5588669911</p>
              <p>📍 123 Technology Street, India</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TechSolutions. All rights reserved.</p>
            <div className="admin-link-container">
              <button onClick={() => setCurrentView('admin')} className="admin-footer-link">
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null
  });

  const [clientForm, setClientForm] = useState({
    name: '',
    description: '',
    designation: '',
    image: null
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchClients(),
      fetchContacts(),
      fetchNewsletters()
    ]);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE}/clients`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE}/contacts`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(`${API_BASE}/newsletter`);
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', projectForm.name);
    formData.append('description', projectForm.description);
    if (projectForm.image) formData.append('image', projectForm.image);

    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Project added successfully!');
        setProjectForm({ name: '', description: '', image: null });
        setShowModal(false);
        fetchProjects();
      }
    } catch (error) {
      alert('Error adding project');
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', clientForm.name);
    formData.append('description', clientForm.description);
    formData.append('designation', clientForm.designation);
    if (clientForm.image) formData.append('image', clientForm.image);

    try {
      const response = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Client added successfully!');
        setClientForm({ name: '', description: '', designation: '', image: null });
        setShowModal(false);
        fetchClients();
      }
    } catch (error) {
      alert('Error adding client');
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-nav">
          <h1>Admin Panel</h1>
          <button onClick={() => setCurrentView('landing')} className="back-btn">
            Back to Website
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📁 Projects ({projects.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            👥 Clients ({clients.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            📧 Contacts ({contacts.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'newsletters' ? 'active' : ''}`}
            onClick={() => setActiveTab('newsletters')}
          >
            📰 Newsletter ({newsletters.length})
          </button>
        </div>

        <div className="tab-content">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Project Management</h2>
                <button onClick={() => openModal('project')} className="add-btn">
                  + Add Project
                </button>
              </div>
              <div className="admin-grid">
                {Array.isArray(projects) && projects.map((project) => (
                  <div key={project._id} className="admin-card">
                    <img src={`http://localhost:5000${project.image}`} alt={project.name} />
                    <div className="card-content">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Client Management</h2>
                <button onClick={() => openModal('client')} className="add-btn">
                  + Add Client
                </button>
              </div>
              <div className="admin-grid">
                {Array.isArray(projects) && clients.map((client) => (
                  <div key={client._id} className="admin-card client-card">
                    <img src={`http://localhost:5000${client.image}`} alt={client.name} />
                    <div className="card-content">
                      <h3>{client.name}</h3>
                      <span className="designation">{client.designation}</span>
                      <p>"{client.description}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Contact Form Submissions</h2>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>City</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.fullName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.city}</td>
                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Newsletter Tab */}
          {activeTab === 'newsletters' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Newsletter Subscribers</h2>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email Address</th>
                      <th>Subscription Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((newsletter) => (
                      <tr key={newsletter._id}>
                        <td>{newsletter.email}</td>
                        <td>{new Date(newsletter.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{modalType === 'project' ? 'Add New Project' : 'Add New Client'}</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">×</button>
            </div>

            {modalType === 'project' && (
              <form onSubmit={handleProjectSubmit} className="modal-form">
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    required
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectForm({...projectForm, image: e.target.files[0]})}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Project
                  </button>
                </div>
              </form>
            )}

            {modalType === 'client' && (
              <form onSubmit={handleClientSubmit} className="modal-form">
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    required
                    value={clientForm.designation}
                    onChange={(e) => setClientForm({...clientForm, designation: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Description/Testimonial</label>
                  <textarea
                    required
                    value={clientForm.description}
                    onChange={(e) => setClientForm({...clientForm, description: e.target.value})}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Client Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setClientForm({...clientForm, image: e.target.files[0]})}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Client
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;