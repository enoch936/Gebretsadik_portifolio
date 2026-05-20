class PortfolioApp {
  constructor() {
    this.projects = [];
    this.activeTag = 'All';
    this.professions = ['Developer', 'Cybersecurity Learner', 'Engineer', 'Problem Solver'];
    this.professionIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initTheme();
    this.initBinaryRain();
    this.createTechIcons();
    this.initTypingEffect();
    this.loadQuickStats();
    this.loadSkills();
    this.loadCertifications();
    this.loadProjects();
    this.loadSocialLinks();
    this.setCurrentYear();
  }

  setupEventListeners() {
    document.querySelector('.nav-toggle')?.addEventListener('click', () => this.toggleMenu());
    document.querySelector('.dark-mode-toggle')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('contactForm')?.addEventListener('submit', (event) => this.handleFormSubmit(event));
    document.getElementById('downloadCV')?.addEventListener('click', (event) => {
      event.preventDefault();
      this.showNotification('CV download will be available soon!');
    });

    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('href')?.replace('#', '');
        if (sectionId) this.showSection(sectionId);
      });
    });

    document.getElementById('projectSearch')?.addEventListener('input', () => this.renderProjects());
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const preferredLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && preferredLight)) {
      document.body.classList.add('light');
    }
    this.updateThemeIcon();
  }

  toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    this.updateThemeIcon();
    this.showNotification(document.body.classList.contains('light') ? 'Light mode enabled' : 'Dark mode enabled');
  }

  updateThemeIcon() {
    const icon = document.querySelector('.dark-mode-toggle i');
    if (!icon) return;

    const inLightMode = document.body.classList.contains('light');
    icon.classList.toggle('fa-moon', !inLightMode);
    icon.classList.toggle('fa-sun', inLightMode);
  }

  initBinaryRain() {
    this.binaryCanvas = document.getElementById('binaryRain');
    if (!this.binaryCanvas) return;

    this.bgCtx = this.binaryCanvas.getContext('2d');
    this.drops = [];
    this.resizeCanvas();

    for (let i = 0; i < 100; i += 1) {
      this.drops.push({
        x: Math.random() * this.binaryCanvas.width,
        y: Math.random() * this.binaryCanvas.height,
        speed: Math.random() * 3 + 1,
        text: String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)),
      });
    }

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

    this.drops.forEach((drop) => {
      this.bgCtx.fillText(drop.text, drop.x, drop.y);
      drop.y += drop.speed;

      if (drop.y > this.binaryCanvas.height) {
        drop.y = -20;
        drop.x = Math.random() * this.binaryCanvas.width;
      }
    });

    requestAnimationFrame(() => this.animateBinaryRain());
  }

  createTechIcons() {
    const container = document.getElementById('techIcons');
    if (!container) return;

    const icons = ['💻', '🌐', '🔌', '📡', '💾', '📊', '⚙️', '🔒'];
    icons.forEach((iconText, index) => {
      const icon = document.createElement('div');
      icon.className = 'tech-icon';
      icon.textContent = iconText;
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.animationDelay = `${(index % 8) * 0.4}s`;
      container.appendChild(icon);
    });
  }

  initTypingEffect() {
    this.typingElement = document.getElementById('typing');
    if (!this.typingElement) return;
    this.typeText();
  }

  typeText() {
    const currentProfession = this.professions[this.professionIndex];
    this.charIndex += this.isDeleting ? -1 : 1;
    this.typingElement.textContent = currentProfession.substring(0, this.charIndex);

    if (!this.isDeleting && this.charIndex === currentProfession.length) {
      this.isDeleting = true;
      setTimeout(() => this.typeText(), 1000);
      return;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.professionIndex = (this.professionIndex + 1) % this.professions.length;
    }

    setTimeout(() => this.typeText(), this.isDeleting ? 55 : 100);
  }

  loadQuickStats() {
    const stats = [
      { label: 'Projects', value: '10+' },
      { label: 'Technologies', value: '12+' },
      { label: 'Focus', value: 'AI + Security' },
    ];

    const container = document.getElementById('quickStats');
    if (!container) return;

    container.innerHTML = stats
      .map((stat) => `<div class="stat-card"><strong>${stat.value}</strong><span>${stat.label}</span></div>`)
      .join('');
  }

  loadSkills() {
    const skills = ['Java', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'React', 'Node.js', 'Networking', 'Git', 'Linux'];
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    skills.forEach((skill) => {
      const element = document.createElement('div');
      element.className = 'skill-item';
      element.innerHTML = `<span>${skill}</span>`;
      container.appendChild(element);
    });
  }

  loadCertifications() {
    const certifications = [
      { title: 'Oracle Java SE', issuer: 'Oracle | 2023' },
      { title: 'AWS Cloud Practitioner', issuer: 'AWS | 2023' },
      { title: 'CCNA Intro to Networks', issuer: 'Cisco | 2022' },
    ];

    const container = document.getElementById('certificationsGrid');
    if (!container) return;

    certifications.forEach((certification) => {
      const item = document.createElement('div');
      item.className = 'certification-item';
      item.innerHTML = `<h4>${certification.title}</h4><p>${certification.issuer}</p>`;
      container.appendChild(item);
    });
  }

  loadProjects() {
    this.projects = [
      { image: 'image1.png', title: 'Flight Reservation System', description: 'OOP-based system with authentication and booking management.', tags: ['Java', 'OOP'] },
      { image: 'images2.png', title: 'Data Structures Project', description: 'Optimized algorithms and memory-aware structures.', tags: ['C++', 'Algorithms'] },
      { image: 'images3.jpeg', title: 'Crime Management System', description: 'Database-driven platform with reporting tools.', tags: ['MySQL', 'Java'] },
      { image: 'images4.jpeg', title: 'Network Simulation', description: 'Routing simulation and traffic analysis lab.', tags: ['Cisco', 'Networking'] },
    ];

    this.renderProjectFilters();
    this.renderProjects();
  }

  renderProjectFilters() {
    const container = document.getElementById('projectFilters');
    if (!container) return;

    const tags = ['All', ...new Set(this.projects.flatMap((project) => project.tags))];
    container.innerHTML = tags
      .map((tag) => `<button class="filter-btn ${tag === this.activeTag ? 'active' : ''}" data-tag="${tag}">${tag}</button>`)
      .join('');

    container.querySelectorAll('.filter-btn').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTag = button.dataset.tag;
        this.renderProjectFilters();
        this.renderProjects();
      });
    });
  }

  renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    const query = document.getElementById('projectSearch')?.value?.toLowerCase() || '';
    const filtered = this.projects.filter((project) => {
      const matchesTag = this.activeTag === 'All' || project.tags.includes(this.activeTag);
      const searchable = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();
      return matchesTag && searchable.includes(query);
    });

    container.innerHTML =
      filtered
        .map(
          (project) => `
          <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}</div>
            </div>
          </div>
        `,
        )
        .join('') || '<p>No matching projects found.</p>';
  }

  loadSocialLinks() {
    const links = [
      { icon: 'fab fa-github', url: 'https://github.com/enoch936' },
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/gebret' },
    ];

    const container = document.getElementById('socialLinks');
    if (!container) return;

    links.forEach((link) => {
      const element = document.createElement('a');
      element.className = 'social-link';
      element.href = link.url;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
      element.innerHTML = `<i class="${link.icon}"></i>`;
      container.appendChild(element);
    });
  }

  toggleMenu() {
    document.querySelector('.nav-menu')?.classList.toggle('active');
  }

  showSection(sectionId) {
    document.querySelectorAll('section').forEach((section) => section.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');

    document.querySelectorAll('.nav-menu a').forEach((link) => link.classList.remove('active'));
    document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      this.showNotification('Please fill all fields', true);
      return;
    }

    this.showNotification('Message sent successfully!');
    event.target.reset();
  }

  showNotification(message, isError = false) {
    document.querySelectorAll('.notification').forEach((notification) => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2500);
  }

  setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
