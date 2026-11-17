// 1. Mapbox Access Token
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// 2. Mock Data with corresponding colors
const spaces = [
    { id: 1, name: "Eckhardt-Gramatté Music Library", distance: "2 mins away", status: "Busy", time: "2 mins ago", lat: 49.8096, lng: -97.1312, statusClass: "status-busy", color: "#3B82F6" }, // Blue
    { id: 2, name: "Elizabeth Dafoe Library Second Floor", distance: "4 mins away", status: "Quiet", time: "2 hours ago", lat: 49.8090, lng: -97.1340, statusClass: "status-quiet", color: "#EF4444" }, // Red
    { id: 3, name: "Icelandic Library", distance: "7 mins away", status: "Moderate", time: "1 min ago", lat: 49.8110, lng: -97.1300, statusClass: "status-moderate", color: "#F59E0B" }, // Yellow/Orange
    { id: 4, name: "Asper Library", distance: "10 mins away", status: "Free", time: "2 hours ago", lat: 49.8070, lng: -97.1360, statusClass: "status-quiet", color: "#10B981" }  // Green
];

// 3. Initialize the Map
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
    zoom: 16,
    pitch: 60,
    bearing: -20,
    antialias: true
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');

const spaceList = document.getElementById('space-list');
const selectedTitle = document.getElementById('selected-title');
const selectedDistance = document.getElementById('selected-distance');
const popups = {};

// 4. Helper function to generate an upright teardrop icon for Mapbox GPU rendering
function createPinImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    // Draw Drop Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    // Draw Teardrop Body
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(32, 28, 24, Math.PI, 0, false);
    ctx.bezierCurveTo(56, 42, 40, 56, 32, 72);
    ctx.bezierCurveTo(24, 56, 8, 42, 8, 28);
    ctx.closePath();
    ctx.fill();
    
    // Clear shadow for crisp border and inner dot
    ctx.shadowColor = 'transparent';
    ctx.stroke();

    // Draw Inner White Dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(32, 28, 8, 0, Math.PI * 2, true);
    ctx.fill();

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

map.on('load', () => {
    // Register custom teardrop icons for each color into Mapbox
    const uniqueColors = [...new Set(spaces.map(s => s.color))];
    uniqueColors.forEach(color => {
        const imageId = `pin-${color.replace('#', '')}`;
        const imageData = createPinImage(color);
        map.addImage(imageId, imageData, { pixelRatio: 2 });
    });

    // Convert mock data into GeoJSON format for the GPU layer
    const geojsonFeatures = spaces.map(space => ({
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
    }));

    // Add source
    map.addSource('spaces-source', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: geojsonFeatures
        }
    });

    // Add GPU Symbol Layer (Locks pins perfectly to the map canvas like Google Maps)
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

    // Create interactive click popups for the symbols
    map.on('click', 'spaces-symbols', (e) => {
        const feature = e.features[0];
        const props = feature.properties;
        const coords = feature.geometry.coordinates.slice();
        const spaceObj = spaces.find(s => s.id === props.id);
        const index = spaces.findIndex(s => s.id === props.id);

        selectSpace(spaceObj, index, coords);
    });

    // Change cursor on hover over pins
    map.on('mouseenter', 'spaces-symbols', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'spaces-symbols', () => {
        map.getCanvas().style.cursor = '';
    });
});

// 5. Render Sidebar Cards
function renderSpaces() {
    spaces.forEach((space, index) => {
        const card = document.createElement('div');
        card.className = `space-card ${index === 0 ? 'active' : ''}`;
        
        card.innerHTML = `
            <div class="card-header">
                <span class="space-title-container">
                    <span>${space.name}</span>
                    <span class="divider">|</span>
                    <span class="color-dot" style="background-color: ${space.color};" title="${space.status}"></span>
                </span>
                <span>${space.distance}</span>
            </div>
            <div class="status">
                <span class="${space.statusClass}">●</span> ${space.status} • Updated ${space.time}
            </div>
            <div class="card-footer">
                <button class="more-info-btn">More Info →</button>
            </div>
        `;

        card.addEventListener('click', () => {
            selectSpace(space, index, [space.lng, space.lat]);
        });

        const infoBtn = card.querySelector('.more-info-btn');
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            alert(`Opening detailed information for: ${space.name}`);
        });

        spaceList.appendChild(card);
    });
}

// Centralized selection handler
function selectSpace(space, index, coords) {
    document.querySelectorAll('.space-card').forEach(c => c.classList.remove('active'));
    const cards = document.querySelectorAll('.space-card');
    if (cards[index]) {
        cards[index].classList.add('active');
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    selectedTitle.innerText = space.name;
    selectedDistance.innerText = space.distance;

    // Close any open popups, open new one
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
        zoom: 16.5,
        pitch: 62,
        bearing: -20,
        essential: true,
        duration: 2000
    });
}

renderSpaces();