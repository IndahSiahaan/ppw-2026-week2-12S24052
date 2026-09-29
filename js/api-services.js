/**
 * Data Access Layer - Service API Provider
 * Menangani komunikasi HTTP Asinkron menggunakan Fetch API
 */
class ApiService {
  static async fetchProfile() {
    return this._fetchJson('./data/profile.json');
  }

  static async fetchProjects() {
    return this._fetchJson('./data/projects.json');
  }

  static async fetchServices() {
    return this._fetchJson('./data/services.json');
  }

  static async submitServiceOrder(payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          success: true,
          message: 'Permintaan konsultasi berhasil diproses.',
          timestamp: new Date().toISOString(),
          data: payload
        });
      }, 800);
    });
  }

  static async _fetchJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[API Network Error] Gagal memuat ${url}:`, error);
      throw error;
    }
  }
}