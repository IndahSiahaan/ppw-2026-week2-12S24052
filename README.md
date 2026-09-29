# Refactoring Arsitektural Personal Portfolio & Service Portal (Week 4)

Tugas Praktikum Minggu 04 - Pemrograman dan Pengujian Web (12S3101)  
Program Studi Sarjana Sistem Informasi — Institut Teknologi Del  

## Identitas Mahasiswa
- **Nama:** Indah Triyuni Siahaan
- **NIM:** 12S24052
- **Kelas:** 13SI2
- **Live Deployment:** 
[https://indah324.github.io/ppw-2026-week4-12S24052/]
(https://indah324.github.io/ppw-2026-week4-12S24052/)

---

## 1. Pemodelan Arsitektur System C4 Container Diagram

```mermaid
graph TD
    user[User Browser]
    
    subgraph Presentation Tier
        HTMLShell[index.html - Static Shell]
        AppJS[js/app.js - Presentation Logic & DOM Rendering]
        Styles[css/custom-style.css & Bootstrap 5]
    end

    subgraph Data Access Layer
        APIService[js/api-services.js - Fetch API Provider]
    end

    subgraph Decoupled Data Tier
        JSON1[(data/profile.json)]
        JSON2[(data/projects.json)]
        JSON3[(data/services.json)]
    end

    subgraph Client State Persistence
        LocalStorage[(Browser LocalStorage)]
    end

    user -->|1. HTTP Request Shell| HTMLShell
    HTMLShell -->|2. Loads Scripts & CSS| AppJS
    AppJS -->|3. Async Fetch Call| APIService
    APIService -->|4. Get Data| JSON1
    APIService -->|4. Get Data| JSON2
    APIService -->|4. Get Data| JSON3
    AppJS -->|5. Universal Modal / CSR Render| user
    AppJS -->|6. Save Orders| LocalStorage