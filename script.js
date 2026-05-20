class PortfolioApp {
  constructor() {
    this.projects = [];
    this.activeTag = 'All';
    this.init();
  }

  init() {
    this.setupEventListeners();
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
    document.querySelector('.dark-mode-toggle')?.addEventListener('click', () => this.toggleDarkMode());
    document.getElementById('contactForm')?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    document.getElementById('downloadCV')?.addEventListener('click', (e) => { e.preventDefault(); this.showNotification('CV download will be available soon!'); });
    document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.showSection(link.getAttribute('href').substring(1)); }));
    document.getElementById('projectSearch')?.addEventListener('input', () => this.renderProjects());
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  initBinaryRain() { this.binaryCanvas = document.getElementById('binaryRain'); if (!this.binaryCanvas) return; this.bgCtx = this.binaryCanvas.getContext('2d'); this.drops = []; this.resizeCanvas(); for (let i = 0; i < 100; i++) this.drops.push({ x: Math.random() * this.binaryCanvas.width, y: Math.random() * this.binaryCanvas.height, speed: Math.random() * 3 + 1, text: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)) }); this.animateBinaryRain(); }
  resizeCanvas() { if (!this.binaryCanvas) return; this.binaryCanvas.width = window.innerWidth; this.binaryCanvas.height = window.innerHeight; }
  animateBinaryRain() { if (!this.binaryCanvas || !this.bgCtx) return; this.bgCtx.fillStyle = 'rgba(0,0,0,0.05)'; this.bgCtx.fillRect(0, 0, this.binaryCanvas.width, this.binaryCanvas.height); this.bgCtx.fillStyle = '#4cc9f0'; this.bgCtx.font = '14px monospace'; this.drops.forEach(drop => { this.bgCtx.fillText(drop.text, drop.x, drop.y); drop.y += drop.speed; if (drop.y > this.binaryCanvas.height) { drop.y = -20; drop.x = Math.random() * this.binaryCanvas.width; }}); requestAnimationFrame(() => this.animateBinaryRain()); }

  createTechIcons() { const container = document.getElementById('techIcons'); if (!container) return; ['💻','🌐','🔌','📡','💾','📊','⚙️','🔒'].forEach((_,i)=>{ const icon=document.createElement('div'); icon.className='tech-icon'; icon.textContent=['💻','🌐','🔌','📡','💾','📊','⚙️','🔒'][i%8]; icon.style.left=`${Math.random()*100}%`; icon.style.top=`${Math.random()*100}%`; icon.style.animationDelay=`${Math.random()*15}s`; container.appendChild(icon);}); }
  initTypingEffect() { this.typingElement = document.getElementById('typing'); if (!this.typingElement) return; this.professions = ['Developer', 'Cybersecurity Learner', 'Engineer', 'Problem Solver']; this.professionIndex=0; this.charIndex=0; this.isDeleting=false; this.typeText(); }
  typeText() { const current = this.professions[this.professionIndex]; this.charIndex += this.isDeleting ? -1 : 1; this.typingElement.textContent = current.substring(0, this.charIndex); if (!this.isDeleting && this.charIndex === current.length) { this.isDeleting = true; setTimeout(()=>this.typeText(), 1000); return; } if (this.isDeleting && this.charIndex === 0) { this.isDeleting = false; this.professionIndex = (this.professionIndex + 1) % this.professions.length; } setTimeout(()=>this.typeText(), this.isDeleting ? 50 : 100); }

  loadQuickStats() { const stats = [{label:'Projects', value:'10+'},{label:'Technologies', value:'12+'},{label:'Focus', value:'AI + Security'}]; const c = document.getElementById('quickStats'); if (!c) return; c.innerHTML = stats.map(s=>`<div class="stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>`).join(''); }
  loadSkills() { const container = document.getElementById('skillsContainer'); if (!container) return; ['Java','Python','JavaScript','SQL','HTML5','CSS3','React','Node.js','Networking','Git','Linux'].forEach(s => { const el = document.createElement('div'); el.className='skill-item'; el.innerHTML=`<span>${s}</span>`; container.appendChild(el); }); }
  loadCertifications() { const container = document.getElementById('certificationsGrid'); if (!container) return; [{ title: 'Oracle Java SE', issuer: 'Oracle | 2023' },{ title: 'AWS Cloud Practitioner', issuer: 'AWS | 2023' },{ title: 'CCNA Intro to Networks', issuer: 'Cisco | 2022' }].forEach(cert => { const certItem=document.createElement('div'); certItem.className='certification-item'; certItem.innerHTML=`<h4>${cert.title}</h4><p>${cert.issuer}</p>`; container.appendChild(certItem);}); }

  loadProjects() {
    this.projects = [
      { image:'image1.png', title:'Flight Reservation System', description:'OOP-based system with authentication and booking management.', tags:['Java','OOP'] },
      { image:'images2.png', title:'Data Structures Project', description:'Optimized algorithms and memory-aware structures.', tags:['C++','Algorithms'] },
      { image:'images3.jpeg', title:'Crime Management System', description:'Database-driven platform with reporting tools.', tags:['MySQL','Java'] },
      { image:'images4.jpeg', title:'Network Simulation', description:'Routing simulation and traffic analysis lab.', tags:['Cisco','Networking'] }
    ];
    this.renderProjectFilters();
    this.renderProjects();
  }

  renderProjectFilters() {
    const container = document.getElementById('projectFilters');
    if (!container) return;
    const tags = ['All', ...new Set(this.projects.flatMap(p => p.tags))];
    container.innerHTML = tags.map(tag => `<button class="filter-btn ${tag===this.activeTag?'active':''}" data-tag="${tag}">${tag}</button>`).join('');
    container.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => { this.activeTag = btn.dataset.tag; this.renderProjectFilters(); this.renderProjects(); }));
  }

  renderProjects() {
    const container = document.getElementById('projectsGrid'); if (!container) return;
    const query = document.getElementById('projectSearch')?.value?.toLowerCase() || '';
    const filtered = this.projects.filter(p => (this.activeTag === 'All' || p.tags.includes(this.activeTag)) && (`${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(query)));
    container.innerHTML = filtered.map(p => `<div class="project-card"><img src="${p.image}" alt="${p.title}" class="project-image"><div class="project-info"><h3>${p.title}</h3><p>${p.description}</p><div class="project-tags">${p.tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div></div></div>`).join('') || '<p>No matching projects found.</p>';
  }

  loadSocialLinks() { const c = document.getElementById('socialLinks'); if (!c) return; [{icon:'fab fa-github',url:'https://github.com/enoch936'},{icon:'fab fa-linkedin',url:'https://linkedin.com/in/gebret'}].forEach(link=>{const a=document.createElement('a'); a.className='social-link'; a.href=link.url; a.target='_blank'; a.rel='noopener noreferrer'; a.innerHTML=`<i class="${link.icon}"></i>`; c.appendChild(a);}); }

  toggleMenu() { document.querySelector('.nav-menu')?.classList.toggle('active'); }
  showSection(id) { document.querySelectorAll('section').forEach(s=>s.classList.remove('active')); document.getElementById(id)?.classList.add('active'); document.querySelectorAll('.nav-menu a').forEach(a=>a.classList.remove('active')); document.querySelector(`.nav-menu a[href="#${id}"]`)?.classList.add('active'); }
  toggleDarkMode() { document.body.classList.toggle('dark'); this.showNotification(document.body.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled'); }

  async handleFormSubmit(e) { e.preventDefault(); const name=document.getElementById('name')?.value.trim(); const email=document.getElementById('email')?.value.trim(); const message=document.getElementById('message')?.value.trim(); if(!name||!email||!message){this.showNotification('Please fill all fields', true); return;} this.showNotification('Message sent successfully!'); e.target.reset(); }
  showNotification(message, isError = false) { document.querySelectorAll('.notification').forEach(n=>n.remove()); const notification=document.createElement('div'); notification.className=`notification ${isError ? 'error' : 'success'}`; notification.textContent=message; document.body.appendChild(notification); setTimeout(()=>notification.remove(),2500); }
  setCurrentYear() { const y=document.getElementById('currentYear'); if (y) y.textContent = new Date().getFullYear(); }
}

document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
