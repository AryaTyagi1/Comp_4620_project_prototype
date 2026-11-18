// 1. Mapbox Access Token
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// 2. Mock Data with corresponding colors & outlet availability
const spaces = [
    { id: 1, name: "Eckhardt-Gramatté Music Library", distance: "2 mins away", status: "Busy", time: "2 mins ago", lat: 49.8096, lng: -97.1312, statusClass: "status-busy", color: "#3B82F6", hasOutlets: false },
    { id: 2, name: "Elizabeth Dafoe Library Second Floor", distance: "4 mins away", status: "Quiet", time: "2 hours ago", lat: 49.8090, lng: -97.1340, statusClass: "status-quiet", color: "#EF4444", hasOutlets: true },
    { id: 3, name: "Icelandic Library", distance: "7 mins away", status: "Moderate", time: "1 min ago", lat: 49.8110, lng: -97.1300, statusClass: "status-moderate", color: "#F59E0B", hasOutlets: false },
    { id: 4, name: "Asper Library", distance: "10 mins away", status: "Free", time: "2 hours ago", lat: 49.8070, lng: -97.1360, statusClass: "status-quiet", color: "#10B981", hasOutlets: true }
];

let activeSpaceId = spaces[0].id;
let activeQuickRec = null; // Tracks 'nearest', 'quiet', 'free', or null

// 3. Initialize the Map (Capped zoom/pitch to prevent 3D tile clipping)
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    config: {
        basemap: {
            lightPreset: 'night',
            showPointOfInterestLabels: true,
            showTransitLabels: true
        }
    },
    center: [spaces[0].lng, spaces[0].lat],
    zoom: 15.6,
    maxZoom: 15.8,
    pitch: 48,
    bearing: -20,
    antialias: true
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');

const spaceList = document.getElementById('space-list');
const selectedTitle = document.getElementById('selected-title');
const selectedDistance = document.getElementById('selected-distance');
const selectedStatusText = document.getElementById('selected-status-text');
const searchInput = document.getElementById('search-input');
const quickChips = document.querySelectorAll('.quick-chip');
const filterTriggerBtn = document.getElementById('btn-open-filter-modal');
const popups = {};

// 4. Helper function to generate an upright teardrop icon for Mapbox GPU rendering
function createPinImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(32, 28, 24, Math.PI, 0, false);
    ctx.bezierCurveTo(56, 42, 40, 56, 32, 72);
    ctx.bezierCurveTo(24, 56, 8, 42, 8, 28);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowColor = 'transparent';
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(32, 28, 8, 0, Math.PI * 2, true);
    ctx.fill();

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function buildGeoJSON(filteredSpaces) {
    return {
        type: 'FeatureCollection',
        features: filteredSpaces.map(space => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [space.lng, space.lat]
            },
            properties: {
                id: space.id,
                name: space.name,
                status: space.status,
                color: space.color,
                icon: `pin-${space.color.replace('#', '')}`
            }
        }))
    };
}

map.on('load', () => {
    const uniqueColors = [...new Set(spaces.map(s => s.color))];
    uniqueColors.forEach(color => {
        const imageId = `pin-${color.replace('#', '')}`;
        const imageData = createPinImage(color);
        map.addImage(imageId, imageData, { pixelRatio: 2 });
    });

    map.addSource('spaces-source', {
        type: 'geojson',
        data: buildGeoJSON(spaces)
    });

    map.addLayer({
        id: 'spaces-symbols',
        type: 'symbol',
        source: 'spaces-source',
        layout: {
            'icon-image': ['get', 'icon'],
            'icon-size': 0.8,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true
        }
    });

    map.on('click', 'spaces-symbols', (e) => {
        const feature = e.features[0];
        const props = feature.properties;
        const coords = feature.geometry.coordinates.slice();
        const spaceObj = spaces.find(s => s.id === props.id);

        if (spaceObj) {
            selectSpace(spaceObj, coords);
        }
    });

    map.on('mouseenter', 'spaces-symbols', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'spaces-symbols', () => {
        map.getCanvas().style.cursor = '';
    });
});

// 5. Render Sidebar Cards
function renderSpaces(listToRender = spaces) {
    spaceList.innerHTML = '';

    if (listToRender.length === 0) {
        spaceList.innerHTML = `<div class="empty-state">No study spaces match your selection.</div>`;
        return;
    }

    listToRender.forEach((space) => {
        const card = document.createElement('div');
        card.className = `space-card ${space.id === activeSpaceId ? 'active' : ''}`;
        card.dataset.id = space.id;
        
        card.innerHTML = `
            <div class="card-header">
                <div class="space-title-group">
                    <span>${space.name}</span>
                </div>
                <div class="space-meta-group">
                    <span class="divider">|</span>
                    <span class="color-dot" style="background-color: ${space.color};" title="${space.status}"></span>
                    <span>${space.distance}</span>
                </div>
            </div>
            <div class="status">
                <span class="status-pill ${space.statusClass}">● ${space.status}</span> 
                <span style="color: var(--text-light); font-weight: 400;">• Updated ${space.time}</span>
            </div>
            <div class="card-footer">
                <button class="more-info-btn">More Info →</button>
            </div>
        `;

        card.addEventListener('click', () => {
            selectSpace(space, [space.lng, space.lat]);
        });

        const infoBtn = card.querySelector('.more-info-btn');
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            alert(`Opening detailed information for: ${space.name}`);
        });

        spaceList.appendChild(card);
    });
}

// 6. Centralized Selection Handler
function selectSpace(space, coords) {
    activeSpaceId = space.id;

    document.querySelectorAll('.space-card').forEach(c => {
        c.classList.toggle('active', Number(c.dataset.id) === space.id);
    });

    const activeCard = document.querySelector(`.space-card[data-id="${space.id}"]`);
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    selectedTitle.innerText = space.name;
    selectedDistance.innerText = space.distance;
    selectedStatusText.innerText = space.status;

    Object.values(popups).forEach(p => p.remove());

    const popup = new mapboxgl.Popup({ offset: [0, -35], closeButton: false })
        .setLngLat(coords)
        .setHTML(`
            <strong style="font-family: 'Poppins', sans-serif;">${space.name}</strong><br>
            <span style="color: ${space.color}; font-weight: 600;">● ${space.status}</span>
        `)
        .addTo(map);

    popups[space.id] = popup;

    map.flyTo({
        center: coords,
        zoom: 15.7,
        pitch: 48,
        bearing: -20,
        padding: { top: 110, bottom: 20, left: 20, right: 20 },
        essential: true,
        duration: 2000
    });
}

// 7. Unified Filtering (Scrollable Recommendations + Search Bar + Map Pins)
function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = spaces.filter(space => {
        let matchesQuick = true;

        if (activeQuickRec === 'nearest') {
            matchesQuick = space.id === 1 || space.distance.includes('2 mins');
        } else if (activeQuickRec === 'quiet') {
            matchesQuick = space.status.toLowerCase() === 'quiet';
        } else if (activeQuickRec === 'free') {
            matchesQuick = space.status.toLowerCase() === 'free';
        }

        const matchesSearch =
            space.name.toLowerCase().includes(query) ||
            space.status.toLowerCase().includes(query);

        return matchesQuick && matchesSearch;
    });

    renderSpaces(filtered);

    // Sync Mapbox pins with filtered spaces
    if (map.getSource('spaces-source')) {
        map.getSource('spaces-source').setData(buildGeoJSON(filtered));
    }

    // Close open popup if its space was filtered out
    Object.keys(popups).forEach(id => {
        if (!filtered.some(s => s.id === Number(id))) {
            popups[id].remove();
            delete popups[id];
        }
    });
}

// Scrollable Recommendation Chip Listeners (Toggle active state)
quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const recType = chip.dataset.quick;

        if (chip.classList.contains('active')) {
            chip.classList.remove('active');
            activeQuickRec = null;
        } else {
            quickChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeQuickRec = recType;
        }

        applyFilters();
    });
});

// Live Search Input Listener
searchInput.addEventListener('input', applyFilters);

// Advanced Filter Trigger Button Listener
if (filterTriggerBtn) {
    filterTriggerBtn.addEventListener('click', () => {
        alert("Opening the extensive Advanced Filter modal/drawer.");
    });
}

// Initial Render
renderSpaces();