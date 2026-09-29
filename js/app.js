/**
 * Presentation Layer & Application Controller
 * Dynamic CSR, State Management, Universal Modal & Event Handling
 */
document.addEventListener('DOMContentLoaded', () => {
  const App = {
    state: {
      profile: null,
      projects: [],
      services: [],
      activeFilter: 'all',
      ordersCount: 0
    },

    init() {
      this.initLocalStorage();
      this.loadAllData();
      this.bindEvents();
    },

    initLocalStorage() {
      const savedOrders = JSON.parse(localStorage.getItem('consultation_orders') || '[]');
      this.state.ordersCount = savedOrders.length;
      this.updateOrderBadge();
    },

    async loadAllData() {
      this.renderLoadingStates();
      try {
        const [profile, projects, services] = await Promise.all([
          ApiService.fetchProfile(),
          ApiService.fetchProjects(),
          ApiService.fetchServices()
        ]);

        this.state.profile = profile;
        this.state.projects = projects;
        this.state.services = services;

        this.renderProfileSection();
        this.renderProjectsSection();
        this.renderProjectsTable();
        this.renderServicesSection();
      } catch (error) {
        this.renderErrorFallback(error.message);
      }
    },

    renderLoadingStates() {
      const spinner = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Memuat data...</span>
          </div>
          <p class="text-muted mt-2 small">Sinkronisasi data asinkron...</p>
        </div>`;
      
      document.getElementById('projectsContainer').innerHTML = spinner;
      document.getElementById('servicesContainer').innerHTML = spinner;
    },

    renderErrorFallback(msg) {
      const alertHTML = `
        <div class="col-12">
          <div class="alert alert-danger rounded-4 p-4 my-3" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
            <strong>Gagal Memuat Data Layer:</strong> ${this.escapeHTML(msg)}. Silakan jalankan menggunakan Live Server.
          </div>
        </div>`;
      document.getElementById('projectsContainer').innerHTML = alertHTML;
      document.getElementById('servicesContainer').innerHTML = alertHTML;
    },

    renderProfileSection() {
      const p = this.state.profile;
      if (!p) return;

      document.getElementById('profileName').textContent = p.name;
      document.getElementById('profileRole').innerHTML = `<i class="bi bi-mortarboard-fill me-1 text-primary"></i>${this.escapeHTML(p.role)}`;
      document.getElementById('profileBio').textContent = p.bio;

      const skillsContainer = document.getElementById('skillsContainer');
      skillsContainer.innerHTML = p.skills.map(s => `
        <span class="skill-tag">
          <i class="bi ${s.icon} me-2 ${s.color}"></i>${this.escapeHTML(s.name)}
        </span>
      `).join('');

      document.getElementById('metricCompleted').textContent = p.metrics.completedProjects;
      document.getElementById('metricQuality').textContent = p.metrics.qualityStandard;
      document.getElementById('metricCss').textContent = p.metrics.cssVariables;
      document.getElementById('metricSpecificity').textContent = p.metrics.specificity;
    },

    renderProjectsSection() {
      const container = document.getElementById('projectsContainer');
      const filtered = this.state.activeFilter === 'all' 
        ? this.state.projects 
        : this.state.projects.filter(p => p.category === this.state.activeFilter);

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-folder-x fs-1 text-muted"></i>
            <p class="text-muted mt-2">Tidak ada proyek untuk kategori terpilih.</p>
          </div>`;
        return;
      }

      container.innerHTML = filtered.map(proj => `
        <div class="col">
          <article class="card h-100 project-card p-3">
            <div class="project-card-header ${proj.themeClass}">
              <span class="badge ${proj.badgeClass} fw-bold px-3 py-2 rounded-pill">
                <i class="bi bi-file-earmark-text me-1"></i>${this.escapeHTML(proj.categoryLabel)}
              </span>
              <span class="badge badge-soft-emerald fw-bold px-3 py-2 rounded-pill">
                <i class="bi bi-check2-circle me-1"></i>Selesai
              </span>
              <i class="bi ${proj.iconClass} project-icon-watermark" aria-hidden="true"></i>
            </div>
            <div class="card-body px-1 pt-2">
              <h3 class="card-title h5 fw-bold mb-2">${this.escapeHTML(proj.title)}</h3>
              <p class="card-text text-muted mb-3">${this.escapeHTML(proj.description)}</p>
              <div class="d-flex flex-wrap gap-1 mb-2">
                ${proj.tags.map(t => `<span class="badge bg-light text-secondary border">${this.escapeHTML(t)}</span>`).join('')}
              </div>
            </div>
            <div class="card-footer bg-transparent border-0 px-1 pt-0">
              <button class="btn btn-bright-outline w-100 fw-semibold btn-open-modal" data-id="${proj.id}">
                <i class="bi bi-arrow-up-right-circle me-2"></i>Lihat Detail Proyek
              </button>
            </div>
          </article>
        </div>
      `).join('');
    },

    renderProjectsTable() {
      const tbody = document.getElementById('projectsTableBody');
      tbody.innerHTML = this.state.projects.map((proj, idx) => `
        <tr>
          <td class="fw-bold text-center">${idx + 1}</td>
          <td class="fw-semibold text-dark">${this.escapeHTML(proj.title)}</td>
          <td><span class="badge ${proj.badgeClass}">${this.escapeHTML(proj.categoryLabel)}</span></td>
          <td>${this.escapeHTML(proj.role)}</td>
          <td><span class="badge badge-soft-emerald"><i class="bi bi-check2 me-1"></i>Selesai</span></td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3 btn-open-modal" data-id="${proj.id}">
              <i class="bi bi-eye me-1"></i>Buka
            </button>
          </td>
        </tr>
      `).join('');
    },

    renderServicesSection() {
      const container = document.getElementById('servicesContainer');
      container.innerHTML = this.state.services.map(s => `
        <div class="col-md-6">
          <article class="card h-100 service-card p-4">
            <div class="card-body p-2">
              <div class="service-icon-box ${s.bgGradient} text-white mb-4">
                <i class="bi ${s.icon} fs-3"></i>
              </div>
              <h3 class="h5 card-title fw-bold text-dark mb-2">${this.escapeHTML(s.title)}</h3>
              <p class="card-text text-muted">${this.escapeHTML(s.description)}</p>
              <ul class="service-feature-list">
                ${s.features.map(f => `<li><i class="bi bi-check-circle-fill"></i> ${this.escapeHTML(f)}</li>`).join('')}
              </ul>
            </div>
          </article>
        </div>
      `).join('');
    },

    openUniversalModal(projectId) {
      const proj = this.state.projects.find(p => p.id === projectId);
      if (!proj) return;

      document.getElementById('universalModalTitle').textContent = proj.title;
      document.getElementById('universalModalCategory').textContent = proj.categoryLabel;
      
      const modalHeader = document.getElementById('universalModalHeader');
      const themeMap = {
        'theme-purple': 'modal-header-gradient-1',
        'theme-cyan': 'modal-header-gradient-2',
        'theme-amber': 'modal-header-gradient-3',
        'theme-rose': 'modal-header-gradient-4'
      };
      modalHeader.className = `modal-header text-white p-4 ${themeMap[proj.themeClass] || 'modal-header-gradient-1'}`;

      const modalBody = document.getElementById('universalModalBody');
      modalBody.innerHTML = `
        <p class="text-muted">${this.escapeHTML(proj.description)}</p>
        <div class="modal-detail-box mt-3 mb-3">
          <div class="modal-meta-row">
            <span class="fw-bold text-dark"><i class="bi bi-person-badge text-primary me-2"></i>Peran Utama:</span>
            <span class="badge badge-soft-primary fw-semibold">${this.escapeHTML(proj.role)}</span>
          </div>
          <div class="modal-meta-row">
            <span class="fw-bold text-dark"><i class="bi bi-tools text-primary me-2"></i>Perangkat Pemodelan:</span>
            <span class="text-secondary fw-medium">${this.escapeHTML(proj.tools)}</span>
          </div>
          <div class="modal-meta-row">
            <span class="fw-bold text-dark"><i class="bi bi-clipboard-data text-primary me-2"></i>Fokus Analisis:</span>
            <span class="text-secondary fw-medium">${this.escapeHTML(proj.focus)}</span>
          </div>
          <div class="modal-meta-row">
            <span class="fw-bold text-dark"><i class="bi bi-check-circle-fill text-success me-2"></i>Hasil Akhir:</span>
            <span class="badge badge-soft-emerald fw-semibold">${this.escapeHTML(proj.deliverable)}</span>
          </div>
        </div>
        <h4 class="h6 fw-bold text-dark mt-3 mb-2"><i class="bi bi-card-checklist me-1 text-primary"></i>Pencapaian Kunci:</h4>
        <ul class="text-muted small mb-0 ps-3">
          ${proj.achievements.map(a => `<li>${this.escapeHTML(a)}</li>`).join('')}
        </ul>
      `;

      const modalEl = document.getElementById('universalProjectModal');
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    },

    bindEvents() {
      document.addEventListener('click', (e) => {
        const modalBtn = e.target.closest('.btn-open-modal');
        if (modalBtn) {
          const id = modalBtn.getAttribute('data-id');
          this.openUniversalModal(id);
        }

        const filterBtn = e.target.closest('.btn-filter');
        if (filterBtn) {
          document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
          filterBtn.classList.add('active');

          this.state.activeFilter = filterBtn.getAttribute('data-category');
          this.renderProjectsSection();
        }
      });

      const form = document.getElementById('consultationForm');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
          }

          const formData = new FormData(form);
          const payload = Object.fromEntries(formData.entries());
          const submitBtn = form.querySelector('button[type="submit"]');

          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

          try {
            await ApiService.submitServiceOrder(payload);
            
            const orders = JSON.parse(localStorage.getItem('consultation_orders') || '[]');
            orders.push({ ...payload, timestamp: new Date().toISOString() });
            localStorage.setItem('consultation_orders', JSON.stringify(orders));

            this.state.ordersCount = orders.length;
            this.updateOrderBadge();

            this.showToast('Permintaan Terkirim!', 'Konsultasi Anda telah disimpan.');
            form.reset();
            form.classList.remove('was-validated');
          } catch (err) {
            this.showToast('Gagal!', err.message, 'bg-danger');
          } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Kirim Permintaan Konsultasi';
          }
        });
      }
    },

    updateOrderBadge() {
      const badge = document.getElementById('orderCountBadge');
      if (badge) {
        badge.textContent = `${this.state.ordersCount} Pesanan Tersimpan`;
      }
    },

    showToast(title, message, bgHeader = 'bg-primary') {
      const toastEl = document.getElementById('liveToast');
      document.getElementById('toastTitle').textContent = title;
      document.getElementById('toastBody').textContent = message;
      document.getElementById('toastHeader').className = `toast-header text-white ${bgHeader}`;
      
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    },

    escapeHTML(str) {
      return String(str || '').replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
      })[m]);
    }
  };

  App.init();
});