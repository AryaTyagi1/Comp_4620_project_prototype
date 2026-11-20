// 1. Mapbox Access Token (set in token-Admin/config.js, which is gitignored)
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
// Starting point: UofM Administration Building (User location)
const ADMIN_BUILDING_COORD = [-97.1327, 49.8096];

// Strict street-following waypoints along main campus roads (Dafoe Rd & campus loops)
const campusPathways = {
    1: [ // Eckhardt-Gramatté Music Library
        ADMIN_BUILDING_COORD,
        [-97.1320, 49.8096],
        [-97.1312, 49.8096]
    ],
    2: [ // Elizabeth Dafoe Library Second Floor
        ADMIN_BUILDING_COORD,
        [-97.1327, 49.8092],
        [-97.1340, 49.8090]
    ],
    3: [ // Icelandic Library
        ADMIN_BUILDING_COORD,
        [-97.1327, 49.8092],
        [-97.1305, 49.8092],
        [-97.1300, 49.8110]
    ],
    4: [ // Asper Library / Drake Centre
        ADMIN_BUILDING_COORD,
        [-97.1327, 49.8092],
        [-97.1345, 49.8090],
        [-97.1360, 49.8070]
    ]
};

// 2. Mock Data with ultra-vibrant neon colors
//    Filter attributes:
//    distanceMins - walking minutes from Admin (used for distance filter + sorting)
//    maxGroup     - largest group the space comfortably fits (1 = solo only)
//    durations    - study lengths the space suits: 'short' (<1h), 'medium' (1-2h), 'long' (2h+)
//    noise        - noise levels you can find there: 'silent', 'quiet', 'talking'
//    deskOutlets  - outlets reachable from the tables
//    bookable     - has rooms/pods you can reserve
//    rating       - average student rating (matches space-details.js)
const spaces = [
    {
        id: 1, name: "Eckhardt-Gramatté Music Library", distance: "2 mins away", status: "Busy", time: "2 mins ago",
        lat: 49.8096, lng: -97.1312, statusClass: "status-busy", color: "#38BDF8",
        distanceMins: 2, maxGroup: 4, durations: ["short", "medium", "long"], noise: ["quiet", "talking"],
        deskOutlets: true, bookable: false, rating: 4.7
    },
    {
        id: 2, name: "Elizabeth Dafoe Library Second Floor", distance: "4 mins away", status: "Quiet", time: "2 hours ago",
        lat: 49.8090, lng: -97.1340, statusClass: "status-quiet", color: "#F87171",
        distanceMins: 4, maxGroup: 6, durations: ["short", "medium", "long"], noise: ["silent", "quiet"],
        deskOutlets: true, bookable: true, rating: 4.8
    },
    {
        id: 3, name: "Icelandic Library", distance: "7 mins away", status: "Moderate", time: "1 min ago",
        lat: 49.8110, lng: -97.1300, statusClass: "status-moderate", color: "#FACC15",
        distanceMins: 7, maxGroup: 1, durations: ["short", "medium"], noise: ["silent", "quiet"],
        deskOutlets: false, bookable: false, rating: 4.6
    },
    {
        id: 4, name: "Asper Library", distance: "10 mins away", status: "Free", time: "2 hours ago",
        lat: 49.8070, lng: -97.1360, statusClass: "status-quiet", color: "#4ADE80",
        distanceMins: 10, maxGroup: 8, durations: ["short", "medium", "long"], noise: ["quiet", "talking"],
        deskOutlets: true, bookable: true, rating: 4.5
    }
];

// Filter drawer state
const DEFAULT_FILTERS = {
    sort: 'distance',
    mode: 'solo',
    groupSize: 4,
    duration: null,
    noise: null,
    distance: 'any',
    outlet: false,
    bookable: false
};
const GROUP_SIZE_MIN = 2;
const GROUP_SIZE_MAX = 12;
let filterState = { ...DEFAULT_FILTERS };

let activeSpaceId = spaces[0].id;
let activeQuickRec = null;
let usingFallbackStyle = false;
let trailAnimationStarted = false;

// 3. Initialize the Map (v3 Standard Style)
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    center: ADMIN_BUILDING_COORD,
    zoom: 15.6,
    maxZoom: 19,
    pitch: 45,
    bearing: -20,
    antialias: true,
    fadeDuration: 0,
    maxTileCacheSize: 200
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');

// Tile error fallback resilience
map.on('error', (e) => {
    if (!usingFallbackStyle && e?.error?.message?.toLowerCase().includes('tile')) {
        usingFallbackStyle = true;
        map.setStyle('mapbox://styles/mapbox/dark-v11');
    }
});

const spaceList = document.getElementById('space-list');
const selectedTitle = document.getElementById('selected-title');
const selectedDistance = document.getElementById('selected-distance');
const selectedStatusText = document.getElementById('selected-status-text');
const searchInput = document.getElementById('search-input');
const quickChips = document.querySelectorAll('.quick-chip');
const filterTriggerBtn = document.getElementById('btn-open-filter-modal');
const popups = {};

function getBackgroundTrailFilter(selectedId) {
    return ['all', ['==', ['get', 'type'], 'trail'], ['!=', ['get', 'id'], selectedId]];
}

function getActiveTrailFilter(selectedId) {
    return ['all', ['==', ['get', 'type'], 'trail'], ['==', ['get', 'id'], selectedId]];
}

function getTrailLabelCoord(coords) {
    if (!Array.isArray(coords) || coords.length === 0) {
        return ADMIN_BUILDING_COORD;
    }
    if (coords.length === 1) {
        return coords[0];
    }
    const midIndex = Math.floor(coords.length / 2);
    const [lng1, lat1] = coords[midIndex - 1];
    const [lng2, lat2] = coords[midIndex];
    return [(lng1 + lng2) / 2, (lat1 + lat2) / 2];
}

// 4. Helper function for Study Space Pins (Teardrop)
function createPinImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
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

// 5. Helper function for User Starting Marker
function createUserPinImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(32, 32, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(32, 32, 22, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(32, 32, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(32, 27, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(32, 41, 9, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// 6. Synchronous GeoJSON Builder using Road-Following Waypoints + Always-Visible Trail Labels
function buildGeoJSON(filteredSpaces) {
    const features = [];

    features.push({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: ADMIN_BUILDING_COORD
        },
        properties: {
            type: 'user',
            name: 'UofM Administration Building (You are here)'
        }
    });

    filteredSpaces.forEach(space => {
        const pathwayCoordinates = campusPathways[space.id] || [
            ADMIN_BUILDING_COORD,
            [space.lng, space.lat]
        ];
        const labelCoord = getTrailLabelCoord(pathwayCoordinates);

        features.push({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: pathwayCoordinates
            },
            properties: {
                id: space.id,
                type: 'trail',
                color: space.color
            }
        });

        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: labelCoord
            },
            properties: {
                id: space.id,
                type: 'trail-label',
                label: space.distance,
                color: space.color
            }
        });

        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [space.lng, space.lat]
            },
            properties: {
                id: space.id,
                type: 'pin',
                name: space.name,
                status: space.status,
                color: space.color,
                icon: `pin-${space.color.replace('#', '')}`
            }
        });
    });

    return {
        type: 'FeatureCollection',
        features: features
    };
}

function addSpacesLayer() {
    const uniqueColors = [...new Set(spaces.map(s => s.color))];
    uniqueColors.forEach(color => {
        const imageId = `pin-${color.replace('#', '')}`;
        if (!map.hasImage(imageId)) {
            map.addImage(imageId, createPinImage(color), { pixelRatio: 2 });
        }
    });

    if (!map.hasImage('user-marker-icon')) {
        map.addImage('user-marker-icon', createUserPinImage(), { pixelRatio: 2 });
    }

    const geojson = buildGeoJSON(spaces);

    if (!map.getSource('spaces-source')) {
        map.addSource('spaces-source', {
            type: 'geojson',
            data: geojson
        });

        map.addLayer({
            id: 'spaces-trails',
            type: 'line',
            source: 'spaces-source',
            filter: getBackgroundTrailFilter(activeSpaceId),
            slot: 'middle',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': ['get', 'color'],
                'line-width': 7,
                'line-opacity': 0.45,
                'line-dasharray': [0, 2.0],
                'line-emissive-strength': 0.55
            }
        });

        map.addLayer({
            id: 'spaces-active-trail',
            type: 'line',
            source: 'spaces-source',
            filter: getActiveTrailFilter(activeSpaceId),
            slot: 'middle',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': ['get', 'color'],
                'line-width': 11,
                'line-opacity': 1.0,
                'line-dasharray': [0, 1.85],
                'line-emissive-strength': 1.0
            }
        });

        map.addLayer({
            id: 'spaces-trail-labels',
            type: 'symbol',
            source: 'spaces-source',
            filter: ['==', ['get', 'type'], 'trail-label'],
            slot: 'top',
            layout: {
                'text-field': ['get', 'label'],
                'text-font': ['DIN Pro Bold', 'Open Sans Bold', 'Arial Unicode MS Bold'],
                'text-size': [
                    'case',
                    ['==', ['get', 'id'], activeSpaceId],
                    13.5,
                    12
                ],
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-ignore-placement': true
            },
            paint: {
                'text-color': ['get', 'color'],
                'text-halo-color': '#0F172A',
                'text-halo-width': 2.5,
                'text-halo-blur': 0.5,
                'text-opacity': [
                    'case',
                    ['==', ['get', 'id'], activeSpaceId],
                    1.0,
                    0.88
                ],
                'text-emissive-strength': 1.0
            }
        });

        map.addLayer({
            id: 'spaces-symbols',
            type: 'symbol',
            source: 'spaces-source',
            filter: ['==', ['get', 'type'], 'pin'],
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-size': 0.8,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true
            }
        });

        map.addLayer({
            id: 'user-symbol',
            type: 'symbol',
            source: 'spaces-source',
            filter: ['==', ['get', 'type'], 'user'],
            layout: {
                'icon-image': 'user-marker-icon',
                'icon-size': 0.75,
                'icon-anchor': 'center',
                'icon-allow-overlap': true
            }
        });
    } else {
        map.getSource('spaces-source').setData(geojson);
        if (map.getLayer('spaces-trails')) {
            map.setFilter('spaces-trails', getBackgroundTrailFilter(activeSpaceId));
        }
        if (map.getLayer('spaces-active-trail')) {
            map.setFilter('spaces-active-trail', getActiveTrailFilter(activeSpaceId));
        }
        if (map.getLayer('spaces-trail-labels')) {
            map.setLayoutProperty('spaces-trail-labels', 'text-size', [
                'case',
                ['==', ['get', 'id'], activeSpaceId],
                13.5,
                12
            ]);
            map.setPaintProperty('spaces-trail-labels', 'text-opacity', [
                'case',
                ['==', ['get', 'id'], activeSpaceId],
                1.0,
                0.88
            ]);
        }
    }
}

// Live Pulsing Neon Animation Loop for Active Trail
let pulseDir = 1;
let animWidth = 11;
function animateActiveTrail() {
    if (map.isStyleLoaded() && map.getLayer('spaces-active-trail')) {
        animWidth += 0.05 * pulseDir;
        if (animWidth > 15) pulseDir = -1;
        if (animWidth < 10.5) pulseDir = 1;
        map.setPaintProperty('spaces-active-trail', 'line-width', animWidth);
    }
    requestAnimationFrame(animateActiveTrail);
}

// Official v3 Style Load Configuration
map.on('style.load', () => {
    map.setConfigProperty('basemap', 'lightPreset', 'night');
    map.setConfigProperty('basemap', 'showPointOfInterestLabels', true);
    map.setConfigProperty('basemap', 'showTransitLabels', true);

    try {
        map.setFog({
            'range': [0.5, 10],
            'color': '#0F172A',
            'space-color': '#0F172A',
            'horizon-blend': 0.1
        });
    } catch (e) {}

    addSpacesLayer();
});

map.on('load', () => {
    map.resize();
    addSpacesLayer();

    if (!trailAnimationStarted) {
        trailAnimationStarted = true;
        requestAnimationFrame(animateActiveTrail);
    }

    map.on('click', 'spaces-symbols', (e) => {
        const props = e.features[0].properties;
        const spaceObj = spaces.find(s => s.id === props.id);
        if (spaceObj) {
            selectSpace(spaceObj, [spaceObj.lng, spaceObj.lat]);
        }
    });

    map.on('click', 'user-symbol', () => {
        new mapboxgl.Popup({ offset: [0, -20], closeButton: false })
            .setLngLat(ADMIN_BUILDING_COORD)
            .setHTML(`<strong style="font-family: 'Poppins', sans-serif;">UofM Administration Building</strong><br><span style="color: #38BDF8; font-weight: 600;">● Your Starting Location</span>`)
            .addTo(map);
    });

    map.on('mouseenter', 'spaces-symbols', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'spaces-symbols', () => { map.getCanvas().style.cursor = ''; });
    map.on('mouseenter', 'user-symbol', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'user-symbol', () => { map.getCanvas().style.cursor = ''; });
});

window.addEventListener('resize', () => {
    map.resize();
});

// 7. Render Sidebar Cards
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
                <span style="color: #CBD5E1; font-weight: 400;">• Updated ${space.time}</span>
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
            window.open(`../page-html/space-details.html?id=${space.id}`, '_blank');
        });

        spaceList.appendChild(card);
    });
}

// 8. Centralized Selection Handler (Updates trail filters, label emphasis & zoom)
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

    if (map.getLayer('spaces-trails')) {
        map.setFilter('spaces-trails', getBackgroundTrailFilter(space.id));
    }
    if (map.getLayer('spaces-active-trail')) {
        map.setFilter('spaces-active-trail', getActiveTrailFilter(space.id));
    }
    if (map.getLayer('spaces-trail-labels')) {
        map.setLayoutProperty('spaces-trail-labels', 'text-size', [
            'case',
            ['==', ['get', 'id'], space.id],
            13.5,
            12
        ]);
        map.setPaintProperty('spaces-trail-labels', 'text-opacity', [
            'case',
            ['==', ['get', 'id'], space.id],
            1.0,
            0.88
        ]);
    }

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
        zoom: 17.8,
        pitch: 55,
        bearing: -20,
        padding: { top: 110, bottom: 20, left: 20, right: 20 },
        essential: true,
        duration: 2000
    });
}

// 9. Unified Filtering (search + quick chips + filter drawer + sorting)
const NOISE_RANK = { silent: 0, quiet: 1, talking: 2 };
const AVAILABILITY_RANK = { free: 0, quiet: 1, moderate: 2, busy: 3 };

function matchesDrawerFilters(space, f) {
    if (f.mode === 'group' && space.maxGroup < f.groupSize) return false;
    if (f.duration && !space.durations.includes(f.duration)) return false;
    if (f.noise && !space.noise.includes(f.noise)) return false;
    if (f.distance !== 'any' && space.distanceMins > Number(f.distance)) return false;
    if (f.outlet && !space.deskOutlets) return false;
    if (f.bookable && !space.bookable) return false;
    return true;
}

function sortSpaces(list, sortKey) {
    const byDistance = (a, b) => a.distanceMins - b.distanceMins;
    const quietest = s => Math.min(...s.noise.map(n => NOISE_RANK[n]));
    const availability = s => AVAILABILITY_RANK[s.status.toLowerCase()] ?? 99;

    const sorted = [...list];
    switch (sortKey) {
        case 'quiet':
            sorted.sort((a, b) => quietest(a) - quietest(b) || byDistance(a, b));
            break;
        case 'available':
            sorted.sort((a, b) => availability(a) - availability(b) || byDistance(a, b));
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating || byDistance(a, b));
            break;
        default:
            sorted.sort(byDistance);
    }
    return sorted;
}

function getFilteredSpaces() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = spaces.filter(space => {
        let matchesQuick = true;

        if (activeQuickRec === 'nearest') {
            matchesQuick = space.distanceMins <= 2;
        } else if (activeQuickRec === 'quiet') {
            matchesQuick = space.status.toLowerCase() === 'quiet';
        } else if (activeQuickRec === 'free') {
            matchesQuick = space.status.toLowerCase() === 'free';
        }

        const matchesSearch =
            space.name.toLowerCase().includes(query) ||
            space.status.toLowerCase().includes(query);

        return matchesQuick && matchesSearch && matchesDrawerFilters(space, filterState);
    });

    return sortSpaces(filtered, filterState.sort);
}

function applyFilters() {
    const filtered = getFilteredSpaces();

    renderSpaces(filtered);
    updateFilterSummary(filtered.length);

    if (map.getSource('spaces-source')) {
        const geojson = buildGeoJSON(filtered);
        map.getSource('spaces-source').setData(geojson);
    }

    Object.keys(popups).forEach(id => {
        if (!filtered.some(s => s.id === Number(id))) {
            popups[id].remove();
            delete popups[id];
        }
    });
}

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

searchInput.addEventListener('input', applyFilters);

// 9b. Filter Drawer
const mapArea = document.getElementById('map-area');
const filterDrawer = document.getElementById('filter-drawer');
const filterCountBadge = document.getElementById('filter-count-badge');
const filterApplyBtn = document.getElementById('filter-apply-btn');
const groupSizeGroup = document.getElementById('group-size-group');
const groupSizeValue = document.getElementById('group-size-value');
const groupSizeMinus = document.getElementById('group-size-minus');
const groupSizePlus = document.getElementById('group-size-plus');
const outletToggle = document.getElementById('filter-outlet');
const bookableToggle = document.getElementById('filter-bookable');

function isFilterDrawerOpen() {
    return filterDrawer.classList.contains('open');
}

function openFilterDrawer() {
    filterDrawer.classList.add('open');
    filterDrawer.setAttribute('aria-hidden', 'false');
    filterTriggerBtn.classList.add('active');
    mapArea.classList.add('filters-open');
}

function closeFilterDrawer() {
    filterDrawer.classList.remove('open');
    filterDrawer.setAttribute('aria-hidden', 'true');
    filterTriggerBtn.classList.remove('active');
    mapArea.classList.remove('filters-open');
}

// Number of filters that differ from the defaults (sort order doesn't count as a filter)
function countActiveFilters() {
    let count = 0;
    if (filterState.mode === 'group') count++;
    if (filterState.duration) count++;
    if (filterState.noise) count++;
    if (filterState.distance !== 'any') count++;
    if (filterState.outlet) count++;
    if (filterState.bookable) count++;
    return count;
}

function updateFilterSummary(resultCount) {
    const active = countActiveFilters();
    filterCountBadge.textContent = active;
    filterCountBadge.hidden = active === 0;

    filterApplyBtn.textContent = resultCount === 0
        ? 'No spaces match'
        : `Show ${resultCount} space${resultCount === 1 ? '' : 's'}`;
    filterApplyBtn.classList.toggle('empty', resultCount === 0);
}

// Push filterState into the drawer's buttons/toggles
function syncFilterUI() {
    filterDrawer.querySelectorAll('[data-filter]').forEach(row => {
        const key = row.dataset.filter;
        row.querySelectorAll('[data-value]').forEach(btn => {
            btn.classList.toggle('active', String(filterState[key]) === btn.dataset.value);
        });
    });

    groupSizeGroup.hidden = filterState.mode !== 'group';
    groupSizeValue.textContent = `${filterState.groupSize} people`;
    groupSizeMinus.disabled = filterState.groupSize <= GROUP_SIZE_MIN;
    groupSizePlus.disabled = filterState.groupSize >= GROUP_SIZE_MAX;

    outletToggle.checked = filterState.outlet;
    bookableToggle.checked = filterState.bookable;
}

function setFilter(key, value) {
    filterState[key] = value;
    syncFilterUI();
    applyFilters();
}

// Chip rows & segmented controls: single choice. Rows marked data-required always keep
// one option picked; the others can be cleared by clicking the active chip again.
filterDrawer.querySelectorAll('[data-filter]').forEach(row => {
    const key = row.dataset.filter;
    const required = row.dataset.required === 'true';

    row.querySelectorAll('[data-value]').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            const isActive = String(filterState[key]) === value;
            if (isActive && required) return;
            setFilter(key, isActive ? null : value);
        });
    });
});

groupSizeMinus.addEventListener('click', () => {
    setFilter('groupSize', Math.max(GROUP_SIZE_MIN, filterState.groupSize - 1));
});

groupSizePlus.addEventListener('click', () => {
    setFilter('groupSize', Math.min(GROUP_SIZE_MAX, filterState.groupSize + 1));
});

outletToggle.addEventListener('change', () => setFilter('outlet', outletToggle.checked));
bookableToggle.addEventListener('change', () => setFilter('bookable', bookableToggle.checked));

document.getElementById('filter-reset-btn').addEventListener('click', () => {
    filterState = { ...DEFAULT_FILTERS };
    syncFilterUI();
    applyFilters();
});

document.getElementById('filter-close-btn').addEventListener('click', closeFilterDrawer);
filterApplyBtn.addEventListener('click', closeFilterDrawer);

if (filterTriggerBtn) {
    filterTriggerBtn.addEventListener('click', () => {
        isFilterDrawerOpen() ? closeFilterDrawer() : openFilterDrawer();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFilterDrawerOpen()) {
        closeFilterDrawer();
    }
});

syncFilterUI();

// 10. Responsive Header Navigation Dropdown Toggle (...)
const dropdownWrapper = document.querySelector('.nav-dropdown-wrapper');
const moreBtn = document.querySelector('.nav-more-btn');

if (moreBtn && dropdownWrapper) {
    moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        dropdownWrapper.classList.remove('active');
    });
}

// Initial Render
applyFilters();