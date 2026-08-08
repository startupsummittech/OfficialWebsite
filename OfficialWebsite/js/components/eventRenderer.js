// Reusable Event Renderer Component

export function renderEventCards(events, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cardsHtml = Object.keys(events).map(key => {
        const event = events[key];
        return `
            <a href="#event-${event.id}" class="card reveal page-router">
                <div class="card-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <span class="register-link">
                        Learn More & Register <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </a>`;
    }).join('');

    container.innerHTML = cardsHtml;
}

export function renderEventPages(events, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pagesHtml = Object.keys(events).map(key => {
        const event = events[key];

        // Overview Paragraphs
        const overviewHtml = event.overview && event.overview.length > 0 
            ? `<div class="event-overview">
                ${event.overview.map(p => `<p>${p}</p>`).join('')}
               </div>` 
            : '';

        // Details Grid Cards
        const detailsGridHtml = event.detailsGrid && event.detailsGrid.length > 0
            ? `<div class="event-details-grid">
                ${event.detailsGrid.map(item => `
                    <div class="detail-card">
                        <h3><i class="${item.icon}"></i> ${item.title}</h3>
                        ${item.val1 ? `<p>${item.val1}</p>` : ''}
                        ${item.val2 ? `<p>${item.val2}</p>` : ''}
                    </div>
                `).join('')}
               </div>`
            : '';

        // Highlights Section
        const highlightsHtml = event.highlights && event.highlights.length > 0
            ? `<div class="event-highlights">
                <h2>${event.highlightsTitle || 'The Workshop Experience'}</h2>
                ${event.highlightsIntro ? `<h3 style="text-align: center;">${event.highlightsIntro}</h3><br><br>` : ''}
                <div class="highlights-grid">
                    ${event.highlights.map(h => `
                        <div class="highlight-item">
                            <i class="${h.icon}"></i>
                            <p>${h.text}</p>
                        </div>
                    `).join('')}
                </div>
               </div>`
            : '';

        // Tracks Section
        const tracksHtml = event.tracks && event.tracks.length > 0
            ? `<div class="event-tracks">
                <h2>Hackathon Tracks</h2>
                ${event.tracksIntro ? `<p class="tracks-intro">${event.tracksIntro}</p>` : ''}
                <div class="tracks-container">
                    ${event.tracks.map(track => `
                        <div class="track-card">
                            <div class="track-header">
                                <div class="track-icon">${track.icon}</div>
                                <h3>${track.title}</h3>
                            </div>
                            <div class="track-content">
                                ${track.items.map(it => `<div class="track-item">• ${it}</div>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
               </div>`
            : '';

        // Timeline Section
        const timelineHtml = event.timeline && event.timeline.length > 0
            ? `<div class="event-timeline">
                <h2>Event Schedule</h2>
                <div class="timeline-list">
                    ${event.timeline.map(item => `
                        <div class="timeline-item">
                            <span class="time">${item.time}</span>
                            <span class="event">${item.event}</span>
                        </div>
                    `).join('')}
                </div>
               </div>`
            : '';

        // Modules Section
        const modulesHtml = event.modules && event.modules.length > 0
            ? `<div class="event-modules">
                <h2>Workshop Modules</h2>
                <div class="modules-grid">
                    ${event.modules.map(mod => `
                        <div class="module-item">
                            <i class="${mod.icon}"></i>
                            <h4>${mod.title}</h4>
                            <p>${mod.description}</p>
                        </div>
                    `).join('')}
                </div>
               </div>`
            : '';

        // Benefits Section
        const benefitsHtml = event.benefits && event.benefits.length > 0
            ? `<div class="event-benefits">
                <h2>${event.benefitsTitle || 'Why Participate?'}</h2>
                ${event.benefitsIntro ? `<h4>${event.benefitsIntro}</h4><br>` : ''}
                <ul>
                    ${event.benefits.map(b => `<li>${b}</li>`).join('')}
                </ul>
               </div>`
            : '';

        // Extra Sections (Team Structure, Bigger Picture, etc.)
        const extraSectionsHtml = event.extraSections && event.extraSections.length > 0
            ? event.extraSections.map(sec => `
                <div class="event-overview">
                    <h2 style="text-align: center;">${sec.title}</h2>
                    ${sec.content.map(c => `<p>${c}</p>`).join('')}
                </div>
              `).join('')
            : '';

        // QR Code & CTA Section
        const qrCodeHtml = event.qrCode 
            ? `<div class="qr-code-container">
                <img src="${event.qrCode}" alt="${event.name} QR Code" class="qr-code-img" />
                <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.5rem;">Scan QR code to register on Unstop</p>
               </div>` 
            : '';

        const ctaHtml = `
            <div class="event-register">
                <h2>${event.ctaTitle || 'Ready to Register?'}</h2>
                <p>${event.ctaDescription || 'Secure your spot for this event on Unstop.'}</p>
                ${qrCodeHtml}
                <a href="${event.unstopUrl}" target="_blank" rel="noopener noreferrer" class="btn register-btn">Register Now</a>
            </div>`;

        return `
            <section id="event-${event.id}" class="page">
                <div class="container">
                    <div class="event-detail-header">
                        <a href="#registration" class="back-link page-router"><i class="fas fa-arrow-left"></i> Back to Events</a>
                        <h1 class="event-title">${event.name}</h1>
                        <p class="event-subtitle">${event.subtitle}</p>
                    </div>
                    
                    <div class="event-content">
                        ${overviewHtml}
                        ${detailsGridHtml}
                        ${highlightsHtml}
                        ${tracksHtml}
                        ${timelineHtml}
                        ${modulesHtml}
                        ${benefitsHtml}
                        ${extraSectionsHtml}
                        ${ctaHtml}
                    </div>
                </div>
            </section>`;
    }).join('\n');

    container.innerHTML = pagesHtml;
}
