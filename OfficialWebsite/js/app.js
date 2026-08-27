import { Data } from './data/eventsData.js';
import { renderEventCards, renderEventPages } from './components/eventRenderer.js';

document.addEventListener('DOMContentLoaded', () => {

    const Templates = {
        personCard: (p) => `<div class="card person-card reveal"><div class="img-wrapper"><img src="${p.image && p.image.startsWith('photos/') ? p.image : `https://images.unsplash.com/photo-${p.image || '1535713875002-d1d0cf377fde'}?q=80&w=300&fit=crop&crop=faces`}" alt="${p.name}"></div><h3>${p.name}</h3>${p.title ? `<p>${p.title}</p>` : ''}</div>`,
        timelineItem: (s) => `<div class="schedule-timeline-item reveal" data-category="${s.category}"><div class="schedule-timeline-content"><div class="card"><span class="schedule-timeline-tag">${s.category.replace("-"," ").toUpperCase()} - ${s.time}</span><h3>${s.title}</h3><p><strong>Venue:</strong> ${s.venue || 'TBA'}</p><p>${s.speaker}</p></div></div></div>`,
        galleryItem: (g) => `<div class="gallery-item reveal"><img src="${g.src}" alt="${g.category} Gallery" onerror="this.style.background='linear-gradient(135deg, rgba(56, 116, 255, 0.1) 0%, rgba(142, 68, 173, 0.05) 100%)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.minHeight='200px'; this.style.border='2px dashed var(--border-color)'; this.innerHTML='<div style=\\'text-align:center; padding:2rem; color:var(--text-secondary);\\' ><i class=\\'fas fa-image\\' style=\\'font-size:3rem; margin-bottom:1rem; opacity:0.3;\\'></i><p>${g.category}<br><small>Coming Soon</small></p></div>'; this.onerror=null;"></div>`,
        filterButton: (f, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${f.split(" ")[0].toLowerCase()}">${f}</button>`
    };

    const render = (containerId, template, data) => { 
        const el = document.getElementById(containerId); 
        if(el && data) el.innerHTML = data.map(template).join(''); 
    };
    
    const renderFacultyWithSubheadings = () => {
        const container = document.getElementById('committee-faculty');
        if (!container) return;

        const facultyList = Data.organizers.faculty;
        let html = '';

        const categoryOrder = [
            { id: 'patron', title: 'Patrons' },
            { id: 'advisory' , title: 'Advisory Committee'},
            { id: 'convenor', title: 'Convenors' },
            { id: 'dei', title: 'Directorate of Entrepreneurship and Innovation' },
            { id: 'coconvenor', title: 'Co-Convenors' },
            { id: 'coordinator', title: 'Coordinators' },
            { id: 'professional', title: 'Professional Bodies' }
        ];

        categoryOrder.forEach(category => {
            const members = facultyList.filter(m => m.category === category.id);
            if (members.length > 0) {
                html += `<div class="committee-category-box reveal">`;
                html += `<h3 class="committee-subheading">${category.title}</h3>`;
                html += `<div class="team-grid">`;
                html += members.map(Templates.personCard).join('');
                html += `</div>`;
                html += `</div>`;
            }
        });

        container.innerHTML = html;
    };

    const renderGalleryWithSubheadings = () => {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        const galleryList = Data.gallery;
        let html = '';

        const categories = [...new Set(galleryList.map(item => item.category))];

        categories.forEach(category => {
            const items = galleryList.filter(m => m.category === category);
            if (items.length > 0) {
                html += `<div class="committee-category-box reveal">`;
                html += `<h3 class="committee-subheading">${category}</h3>`;
                html += `<div class="gallery-grid">`;
                html += items.map(Templates.galleryItem).join('');
                html += `</div>`;
                html += `</div>`;
            }
        });

        container.innerHTML = html;
    };

    // Render Student Committee
    render('committee-students', Templates.personCard, Data.organizers.students);
    renderFacultyWithSubheadings();
    renderGalleryWithSubheadings();
    
    // Render Schedule
    render('timeline-all', Templates.timelineItem, Data.schedule.all);
    render('timeline-workshops', Templates.timelineItem, Data.schedule.workshop);
    render('timeline-idea', Templates.timelineItem, Data.schedule.pitch);
    render('timeline-panel', Templates.timelineItem, Data.schedule.panel);
    render('timeline-hackathon', Templates.timelineItem, Data.schedule.hackathon);
    render('schedule-filters', Templates.filterButton, Data.filters);
    
    // Render Dynamic Event Pages and Registration Cards
    renderEventCards(Data.events, 'events-grid-container');
    renderEventPages(Data.events, 'dynamic-event-pages');
    
    // Aurora Blob Movement
    const blob = document.getElementById("aurora-blob");
    if (blob) { 
        window.addEventListener('pointermove', e => {
            blob.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 3000, fill: "forwards" });
        }); 
    }
    
    // Router logic
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link.page-router');

    const showPage = (targetId) => {
        const globeContainer = document.getElementById('three-canvas-container');
        const targetPage = document.querySelector(targetId); 
        if (!targetPage) return;
        
        if (globeContainer) {
            globeContainer.style.display = (targetId === '#home' || targetId === '#schedule') ? 'block' : 'none';
        }

        pages.forEach(p => p.classList.remove('active'));
        targetPage.classList.add('active');
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === targetId));
        window.scrollTo(0,0);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { 
                if (entry.isIntersecting) { 
                    entry.target.classList.add('visible'); 
                    observer.unobserve(entry.target); 
                } 
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };
    
    document.body.addEventListener('click', e => { 
        const routerLink = e.target.closest('.page-router'); 
        if (routerLink) { 
            const targetHref = routerLink.getAttribute('href');
            if (targetHref && targetHref.startsWith('#')) {
                e.preventDefault(); 
                showPage(targetHref); 
                window.location.hash = targetHref;
            }
        }
    });
    
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Schedule Filters
    const scheduleFilters = document.getElementById('schedule-filters');
    if (scheduleFilters) {
        scheduleFilters.addEventListener('click', e => {
            if (e.target.matches('.filter-btn')) {
                scheduleFilters.querySelector('.filter-btn.active')?.classList.remove('active');
                e.target.classList.add('active');
                
                document.querySelectorAll('.schedule-tab-content').forEach(content => content.classList.remove('active'));
                
                const filter = e.target.dataset.filter;
                const filterMap = {
                    'all': 'schedule-all',
                    'allevents': 'schedule-all',
                    'workshops': 'schedule-workshops',
                    'idea': 'schedule-idea',
                    'panel': 'schedule-panel',
                    'hackathon': 'schedule-hackathon'
                };
                
                const targetTab = filterMap[filter] || 'schedule-all';
                document.getElementById(targetTab)?.classList.add('active');
            }
        });
    }
    
    // Committee Filters
    const committeeFilters = document.getElementById('committee-filters');
    if (committeeFilters) {
        committeeFilters.addEventListener('click', e => {
            if (e.target.matches('.filter-btn')) {
                committeeFilters.querySelector('.filter-btn.active')?.classList.remove('active');
                e.target.classList.add('active');
                const filter = e.target.dataset.filter;
                document.querySelectorAll('.committee-tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(`committee-${filter}`)?.classList.add('active');
            }
        });
    }
    
    showPage(window.location.hash || '#home');

    // Mobile Menu Hamburger Logic
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Three.js Scene Setup
function createAuroraGradientTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size/2, size/2, size/4, size/2, size/2, size/2);
    gradient.addColorStop(0, '#3874FF');
    gradient.addColorStop(0.5, '#8E44AD');
    gradient.addColorStop(1, '#E91E63');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
}

function initThreeJSScene() {
    const container = document.getElementById('three-canvas-container');
    if (!container || container.querySelector('canvas') || typeof THREE === 'undefined') return;
    
    const isMobile = window.innerWidth <= 768;
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance"
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(pixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xabffc8, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const globeGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const globeMaterial = new THREE.MeshStandardMaterial({
        map: createAuroraGradientTexture(),
        wireframe: true,
        transparent: true,
        opacity: 0.9
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const particleGroup = new THREE.Group();
    const particleMaterial = new THREE.MeshBasicMaterial({
        map: createAuroraGradientTexture(),
        transparent: true,
        opacity: 0.85
    });
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleCount = isMobile ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 3 + Math.random();
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        particleGroup.add(particle);
    }
    scene.add(particleGroup);
    camera.position.z = 8;
    let mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.0005;
        particleGroup.rotation.y -= 0.001;
        scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.02;
        scene.rotation.x += (-mouse.y * 0.2 - scene.rotation.x) * 0.02;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

document.addEventListener('DOMContentLoaded', initThreeJSScene);

// Global Brochure Modal Functions
window.openBrochure = function(eventName) {
    const modal = document.getElementById('brochureModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) {
        alert('Error: Modal not found. Please refresh the page.');
        return;
    }
    
    let imagePath = '';
    switch(eventName) {
        case 'pravartan':
            imagePath = 'photos/Pravartan.png';
            break;
        case 'thalir':
            imagePath = 'photos/Thalir.png';
            break;
        case 'tharangam':
            imagePath = 'photos/Tharanga Sangamam.png';
            break;
        case 'bharatbuild':
            imagePath = 'photos/Bharat Build.png';
            break;
        case 'finsmart':
            imagePath = 'photos/FinSmart.png';
            break;
        case 'pasumai':
            imagePath = 'photos/Pasumai.png';
            break;
        default:
            alert('Brochure coming soon!');
            return;
    }
    
    modalImage.src = imagePath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    modalImage.onerror = function() {
        alert('Error loading brochure image. Please check if the file exists.');
        window.closeBrochure();
    };
};

window.closeBrochure = function() {
    const modal = document.getElementById('brochureModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('brochureModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) window.closeBrochure();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.closeBrochure();
    });
});
