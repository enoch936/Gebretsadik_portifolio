// Main Application Class
class PortfolioApp {
  constructor() {
    this.init();
  }

  // Initialize all components
  init() {
    this.setupEventListeners();
    this.initBinaryRain();
    this.createTechIcons();
    this.initTypingEffect();
    this.loadSkills();
    this.loadCertifications();
    this.loadProjects();
    this.loadSocialLinks();
    this.setCurrentYear();
    this.initDarkMode();
    this.initSmoothScrolling();
  }

  // Setup event listeners
  setupEventListeners() {
    // Navigation toggle for mobile
    document.querySelector('.nav-toggle')?.addEventListener('click', () => this.toggleMenu());
    
    // Dark mode toggle
    document.querySelector('.dark-mode-toggle')?.addEventListener('click', () => this.toggleDarkMode());
    
    // Form submission
    document.getElementById('contactForm')?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        this.showSection(sectionId);
      });
    });
    
    // Download CV button
    document.getElementById('downloadCV')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showNotification('CV download will be available soon!');
    });
    
    // Window resize event
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.adjustMenu();
    });

    // Password visibility toggle
    document.getElementById('togglePassword')?.addEventListener('click', this.togglePasswordVisibility);
    
    // Password strength check
    document.getElementById('password')?.addEventListener('input', this.checkPasswordStrength);
  }

  // Binary Rain Animation
  initBinaryRain() {
    this.binaryCanvas = document.getElementById('binaryRain');
    if (!this.binaryCanvas) return;
    
    this.bgCtx = this.binaryCanvas.getContext('2d');
    this.drops = [];
    
    this.resizeCanvas();
    
    // Create initial drops
    for (let i = 0; i < 100; i++) {
      this.drops.push({
        x: Math.random() * this.binaryCanvas.width,
        y: Math.random() * this.binaryCanvas.height,
        speed: Math.random() * 3 + 1,
        text: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      });
    }
    
    // Start animation loop
    this.animateBinaryRain();
  }

  resizeCanvas() {
    if (!this.binaryCanvas) return;
    this.binaryCanvas.width = window.innerWidth;
    this.binaryCanvas.height = window.innerHeight;
  }

  animateBinaryRain() {
    if (!this.binaryCanvas || !this.bgCtx) return;
    
    this.bgCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.bgCtx.fillRect(0, 0, this.binaryCanvas.width, this.binaryCanvas.height);
    
    this.bgCtx.fillStyle = '#4cc9f0';
    this.bgCtx.font = '14px monospace';

    this.drops.forEach(drop => {
      this.bgCtx.fillText(drop.text, drop.x, drop.y);
      drop.y += drop.speed;
      
      if (drop.y > this.binaryCanvas.height) {
        drop.y = -20;
        drop.x = Math.random() * this.binaryCanvas.width;
        drop.text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
      }
    });
    
    requestAnimationFrame(() => this.animateBinaryRain());
  }

  // Tech Icons Animation
  createTechIcons() {
    const container = document.getElementById('techIcons');
    if (!container) return;
    
    const icons = ['💻', '🌐', '🔌', '📡', '💾', '📊', '⚙️', '🔒'];
    
    for (let i = 0; i < 20; i++) {
      const icon = document.createElement('div');
      icon.className = 'tech-icon';
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.animationDelay = `${Math.random() * 15}s`;
      container.appendChild(icon);
    }
  }

  // Typing Effect
  initTypingEffect() {
    this.typingElement = document.getElementById('typing');
    if (!this.typingElement) return;
    
    this.professions = ['Developer', 'Engineer', 'Designer', 'Student', 'Innovator'];
    this.professionIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    
    this.typeText();
  }

  typeText() {
    const currentProfession = this.professions[this.professionIndex];
    
    if (this.isDeleting) {
      this.typingElement.textContent = currentProfession.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingSpeed = 50;
    } else {
      this.typingElement.textContent = currentProfession.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingSpeed = 100;
    }
    
    if (!this.isDeleting && this.charIndex === currentProfession.length) {
      this.isDeleting = true;
      this.typingSpeed = 1500; // Pause at end
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.professionIndex = (this.professionIndex + 1) % this.professions.length;
      this.typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(() => this.typeText(), this.typingSpeed);
  }

  // Dynamic Content Loading
  loadSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    const skills = [
      { icon: 'fab fa-java', name: 'Java' },
      { icon: 'fab fa-python', name: 'Python' },
      { icon: 'fab fa-js', name: 'JavaScript' },
      { icon: 'fas fa-database', name: 'SQL' },
      { icon: 'fab fa-html5', name: 'HTML5' },
      { icon: 'fab fa-css3-alt', name: 'CSS3' },
      { icon: 'fab fa-react', name: 'React' },
      { icon: 'fab fa-node-js', name: 'Node.js' },
      { icon: 'fas fa-network-wired', name: 'Networking' },
      { icon: 'fas fa-server', name: 'System Design' },
      { icon: 'fas fa-mobile-alt', name: 'Responsive Design' },
      { icon: 'fas fa-code-branch', name: 'Git' }
    ];
    
    skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.innerHTML = `
        <i class="${skill.icon} skill-icon"></i>
        <span>${skill.name}</span>
      `;
      container.appendChild(skillItem);
    });
  }

  loadCertifications() {
    const container = document.getElementById('certificationsGrid');
    if (!container) return;
    
    const certifications = [
      { title: 'Oracle Certified Professional: Java SE Programmer', issuer: 'Oracle | 2023' },
      { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services | 2023' },
      { title: 'CCNA: Introduction to Networks', issuer: 'Cisco | 2022' }
    ];
    
    certifications.forEach(cert => {
      const certItem = document.createElement('div');
      certItem.className = 'certification-item';
      certItem.innerHTML = `
        <h4>${cert.title}</h4>
        <p>${cert.issuer}</p>
      `;
      container.appendChild(certItem);
    });
  }

  loadProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    
    const projects = [
      { 
        image: 'image1.png', 
        title: 'Flight Reservation System', 
        description: 'Complete OOP-based system with user authentication, booking management, and admin dashboard.',
        tags: ['Java', 'OOP', 'Swing'],
        links: [
          { icon: 'fab fa-github', text: 'View Code', url: '#' },
          { icon: 'fas fa-external-link-alt', text: 'Live Demo', url: '#' }
        ]
      },
      { 
        image: 'images2.png', 
        title: 'Data Structures Project', 
        description: 'Implemented with efficient data structures for optimal performance and memory management.',
        tags: ['C++', 'Data Structures', 'Algorithms'],
        links: [
          { icon: 'fab fa-github', text: 'View Code', url: '#' }
        ]
      },
      { 
        image: 'images3.jpeg', 
        title: 'Crime Management System', 
        description: 'Database-driven application with complex queries, reports, and data visualization.',
        tags: ['MySQL', 'Oracle', 'Java'],
        links: [
          { icon: 'fab fa-github', text: 'View Code', url: '#' }
        ]
      },
      { 
        image: 'images4.jpeg', 
        title: 'Network Simulation', 
        description: 'Simulated network environment with dynamic routing protocols and traffic analysis.',
        tags: ['Cisco', 'RIP', 'OSPF', 'BGP'],
        links: [
          { icon: 'fas fa-file-pdf', text: 'View Report', url: '#' }
        ]
      }
    ];
    
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      
      // Create tags HTML
      const tagsHTML = project.tags.map(tag => 
        `<span class="project-tag">${tag}</span>`
      ).join('');
      
      // Create links HTML
      const linksHTML = project.links.map(link => 
        `<a href="${link.url}" class="project-link"><i class="${link.icon}"></i> ${link.text}</a>`
      ).join('');
      
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">${tagsHTML}</div>
          <div class="project-links">${linksHTML}</div>
        </div>
      `;
      
      container.appendChild(projectCard);
    });
  }

  loadSocialLinks() {
    const container = document.getElementById('socialLinks');
    if (!container) return;
    
    const socialLinks = [
      { icon: 'fab fa-github', url: 'https://github.com/enoch936' },
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/gebret' },
      { icon: 'fab fa-telegram', url: 'https://t.me/@hennizgondar' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com/gebret' }
    ];
    
    socialLinks.forEach(link => {
      const socialLink = document.createElement('a');
      socialLink.className = 'social-link';
      socialLink.href = link.url;
      socialLink.target = '_blank';
      socialLink.innerHTML = `<i class="${link.icon}"></i>`;
      container.appendChild(socialLink);
    });
  }

  // Navigation Functions
  toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    navMenu.classList.toggle('active');
    const icon = document.querySelector('.nav-toggle i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  }

  adjustMenu() {
    if (window.innerWidth > 768) {
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) navMenu.classList.remove('active');
      
      const icon = document.querySelector('.nav-toggle i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  }

  showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-menu li a[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    // Close menu on mobile
    if (window.innerWidth <= 768) {
      this.toggleMenu();
    }
    
    // Smooth scroll to top of section
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }

  initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Dark Mode Toggle
  initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
      const icon = document.querySelector('.dark-mode-toggle i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) {
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
    
    this.showNotification(
      document.body.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled'
    );
  }

  // Form Handling
  async handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name')?.value.trim(),
      email: document.getElementById('email')?.value.trim(),
      message: document.getElementById('message')?.value.trim(),
      password: document.getElementById('password')?.value
    };

    if (!formData.name || !formData.email || !formData.message || !formData.password) {
      this.showNotification('Please fill all fields', true);
      return;
    }

    if (formData.password.length < 8 || this.getPasswordStrength(formData.password) === "Weak") {
      this.showNotification('Password must be at least 8 characters and stronger than weak', true);
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.showNotification('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      this.showNotification('Error sending message. Please try again.', true);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");
    if (!passwordField || !toggleIcon) return;
    
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleIcon.textContent = "🙈";
    } else {
      passwordField.type = "password";
      toggleIcon.textContent = "👁️";
    }
  }

  checkPasswordStrength() {
    const password = document.getElementById("password")?.value;
    const strengthDisplay = document.getElementById("passwordStrength");
    if (!password || !strengthDisplay) return;
    
    const strength = this.getPasswordStrength(password);
    strengthDisplay.textContent = "Strength: " + strength;

    switch (strength) {
      case "Weak":
        strengthDisplay.style.color = "red";
        break;
      case "Medium":
        strengthDisplay.style.color = "orange";
        break;
      case "Strong":
        strengthDisplay.style.color = "green";
        break;
    }
  }

  getPasswordStrength(password) {
    if (!password || password.length < 8) return "Weak";

    let strength = 0;
    if (/[a-z]/.test(password)) strength++; // lowercase
    if (/[A-Z]/.test(password)) strength++; // uppercase
    if (/[0-9]/.test(password)) strength++; // number
    if (/[\W_]/.test(password)) strength++; // special character

    if (strength >= 4) return "Strong";
    if (strength >= 2) return "Medium";
    return "Weak";
  }

  // Utility Functions
  showNotification(message, isError = false) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});