const spacesData = {
    1: {
        name: "Eckhardt-Gramatté Music Library",
        zoneTag: "Desautels 2F",
        description: "Calm acoustic study space on the 2nd floor of Desautels Faculty of Music with padded seating, natural light, and quiet tables.",
        rating: 4.7,
        reviewCount: 14,
        distance: "2 mins away",
        status: "Busy right now",
        location: "Desautels Faculty of Music • 2nd Floor",
        address: "150 Dafoe Rd, Winnipeg, MB R3T 2N2",
        hours: "M–F 8:00 AM – 4:00 PM",
        verifiedCount: 2,
        darkRgb: "58, 34, 22",
        midRgb: "148, 96, 62",
        specs: {
            seating: "50 seats, 3 tables",
            comfort: "Padded chairs",
            outlets: "24 outlets (wall & desk)",
            noise: "Moderate / Quiet corner",
            hours: "M–F 8:00 AM – 4:00 PM",
            access: "eduroam | Wheelchair friendly"
        },
        descriptions: {
            seating: "Mix of individual study carrels and shared reading tables.",
            comfort: "Cushioned seats suited for multi-hour study sessions.",
            outlets: "Located along north perimeter walls and center table strips.",
            noise: "Low conversation allowed near entry; silent alcoves in back.",
            hours: "Closed on weekends and statutory university holidays.",
            access: "Strong campus signal with step-free elevator access."
        },
        photos: [
            {
                src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
                caption: "1 / 3 • MAIN STUDY & READING AREA",
                darkRgb: "58, 34, 22",
                midRgb: "148, 96, 62"
            },
            {
                src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
                caption: "2 / 3 • QUIET STACKS & WINDOW TABLES",
                darkRgb: "48, 28, 18",
                midRgb: "134, 84, 54"
            },
            {
                src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                caption: "3 / 3 • GROUP WORK & OUTLET ZONE",
                darkRgb: "18, 42, 68",
                midRgb: "56, 118, 168"
            }
        ],
        comments: [
            {
                id: 101,
                author: "Maya R.",
                handle: "@mayar_mb",
                rating: 5,
                time: "18 mins ago",
                timestamp: 1732050000000,
                likes: 9,
                liked: false,
                text: "Padded chairs are super comfortable for long study sessions, just gets busy right before afternoon classes.",
                replies: [
                    {
                        author: "Noah B.",
                        handle: "@noahb",
                        time: "9 mins ago",
                        text: "Agreed—around 12:30 PM the back tables fill up fast."
                    }
                ]
            },
            {
                id: 102,
                author: "Devon K.",
                handle: "@devonk_uofm",
                rating: 4,
                time: "2 hours ago",
                timestamp: 1732044000000,
                likes: 5,
                liked: false,
                text: "Easy walk from Admin and reliable Wi-Fi. Grab a desk near the wall if you need an outlet.",
                replies: []
            }
        ]
    },
    2: {
        name: "Elizabeth Dafoe Library Second Floor",
        zoneTag: "Dafoe 2F",
        description: "Spacious central campus study floor featuring long reading tables, quiet alcoves, and easy access to reference desks.",
        rating: 4.8,
        reviewCount: 29,
        distance: "4 mins away",
        status: "Quiet right now",
        location: "Elizabeth Dafoe Library • 2nd Floor",
        address: "25 Chancellors Cir, Winnipeg, MB R3T 2N2",
        hours: "M–F 7:30 AM – 10:00 PM",
        verifiedCount: 4,
        darkRgb: "64, 24, 28",
        midRgb: "164, 74, 78",
        specs: {
            seating: "120 seats, 18 tables",
            comfort: "Ergonomic study chairs",
            outlets: "68 outlets (desk & floor)",
            noise: "Quiet study zone",
            hours: "M–F 7:30 AM – 10:00 PM",
            access: "eduroam | Elevator & ramp access"
        },
        descriptions: {
            seating: "Long group tables alongside quiet solo reading carrels.",
            comfort: "Adjustable ergonomic chairs across main study rows.",
            outlets: "Frequent floor and desk outlets along table centers.",
            noise: "Designated quiet floor with minimal group chatter.",
            hours: "Extended evening hours Monday through Friday.",
            access: "Full elevator access from main entrance and ramps."
        },
        photos: [
            {
                src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
                caption: "1 / 2 • SECOND FLOOR READING HALL",
                darkRgb: "64, 24, 28",
                midRgb: "164, 74, 78"
            },
            {
                src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
                caption: "2 / 2 • LAPTOP & RESEARCH TABLES",
                darkRgb: "20, 38, 66",
                midRgb: "64, 114, 174"
            }
        ],
        comments: [
            {
                id: 201,
                author: "Priya S.",
                handle: "@priyas",
                rating: 5,
                time: "35 mins ago",
                timestamp: 1732049000000,
                likes: 12,
                liked: false,
                text: "Very peaceful atmosphere and plenty of table space if you arrive before noon.",
                replies: []
            }
        ]
    },
    3: {
        name: "Icelandic Library",
        zoneTag: "Dafoe 3F",
        description: "Intimate, character-rich reading room with focused study lighting and a calm environment for reading and writing.",
        rating: 4.6,
        reviewCount: 11,
        distance: "7 mins away",
        status: "Moderate right now",
        location: "Elizabeth Dafoe Library • 3rd Floor",
        address: "25 Chancellors Cir, Winnipeg, MB R3T 2N2",
        hours: "M–F 9:00 AM – 5:00 PM",
        verifiedCount: 1,
        darkRgb: "62, 46, 16",
        midRgb: "168, 128, 52",
        specs: {
            seating: "36 seats, 6 tables",
            comfort: "Wooden & cushioned chairs",
            outlets: "18 outlets (perimeter)",
            noise: "Moderate / Focused",
            hours: "M–F 9:00 AM – 5:00 PM",
            access: "eduroam | Elevator access"
        },
        descriptions: {
            seating: "Compact reading room with six shared study tables.",
            comfort: "Classic wood frames with seat pads for steady reading.",
            outlets: "Wall outlets spaced along outer reading room walls.",
            noise: "Calm, low-traffic room best for independent reading.",
            hours: "Daytime schedule Monday to Friday.",
            access: "Accessible via Dafoe 3rd-floor elevator."
        },
        photos: [
            {
                src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
                caption: "1 / 2 • ICELANDIC READING COLLECTION",
                darkRgb: "62, 46, 16",
                midRgb: "168, 128, 52"
            },
            {
                src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
                caption: "2 / 2 • ARCHIVE & STUDY TABLES",
                darkRgb: "56, 36, 20",
                midRgb: "152, 102, 64"
            }
        ],
        comments: [
            {
                id: 301,
                author: "Liam T.",
                handle: "@liamt",
                rating: 5,
                time: "1 hour ago",
                timestamp: 1732047000000,
                likes: 6,
                liked: false,
                text: "Great tucked-away spot when you want fewer distractions.",
                replies: []
            }
        ]
    },
    4: {
        name: "Asper Library",
        zoneTag: "Drake Centre",
        description: "Bright, modern study and collaboration space with open seating, power access, and plenty of room during off-peak hours.",
        rating: 4.5,
        reviewCount: 19,
        distance: "10 mins away",
        status: "Free right now",
        location: "Drake Centre • Asper School of Business",
        address: "181 Freedman Cres, Winnipeg, MB R3T 5V4",
        hours: "M–F 8:00 AM – 8:00 PM",
        verifiedCount: 3,
        darkRgb: "18, 52, 36",
        midRgb: "54, 146, 98",
        specs: {
            seating: "84 seats, 12 tables",
            comfort: "Padded task chairs",
            outlets: "52 outlets (tables & walls)",
            noise: "Open / Collaborative",
            hours: "M–F 8:00 AM – 8:00 PM",
            access: "eduroam | Step-free & accessible"
        },
        descriptions: {
            seating: "Open tables and collaborative pods for solo or group work.",
            comfort: "Padded task seating suited for laptops and notebooks.",
            outlets: "Built-in power strips on study tables plus wall plugs.",
            noise: "Lively collaboration areas alongside quieter side tables.",
            hours: "Open until 8:00 PM on weekdays.",
            access: "Level entry throughout Drake Centre and library."
        },
        photos: [
            {
                src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
                caption: "1 / 2 • OPEN STUDY & COLLABORATION AREA",
                darkRgb: "18, 52, 36",
                midRgb: "54, 146, 98"
            },
            {
                src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                caption: "2 / 2 • GROUP WORKSTATIONS",
                darkRgb: "16, 48, 56",
                midRgb: "52, 134, 152"
            }
        ],
        comments: [
            {
                id: 401,
                author: "Hannah W.",
                handle: "@hannahw",
                rating: 4,
                time: "2 hours ago",
                timestamp: 1732042000000,
                likes: 7,
                liked: false,
                text: "Lots of open seats right now and clean tables with good lighting.",
                replies: []
            }
        ]
    }
};

const params = new URLSearchParams(window.location.search);
const spaceId = Number(params.get("id")) || 1;
const space = spacesData[spaceId] || spacesData[1];

let photoIndex = 0;
let selectedRating = 5;
let verifiedCount = space.verifiedCount;
let commentSortMode = "top";
const openReplyBoxes = new Set();

const photoEl = document.getElementById("space-photo");
const backdropWashEl = document.getElementById("ambient-color-wash");
const slideBadgeEl = document.getElementById("slide-counter-badge");
const dotsContainerEl = document.getElementById("carousel-dots");
const btnModePhotos = document.getElementById("btn-mode-photos");
const btnModeFloorplan = document.getElementById("btn-mode-floorplan");
const photosPane = document.getElementById("photos-pane");
const floorplanPane = document.getElementById("floorplan-pane");

function applyDirectionalBackdrop(darkRgb, midRgb) {
    document.documentElement.style.setProperty("--ambient-dark-rgb", darkRgb);
    document.documentElement.style.setProperty("--ambient-mid-rgb", midRgb);
    if (backdropWashEl) {
        backdropWashEl.style.background = `
            radial-gradient(
                circle at 22% 52%,
                rgba(${darkRgb}, 0.92) 0%,
                rgba(${midRgb}, 0.56) 36%,
                rgba(${midRgb}, 0.14) 62%,
                transparent 82%
            )
        `;
    }
}

function sampleImageColor(imgElement, fallbackDarkRgb, fallbackMidRgb) {
    try {
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgElement, 0, 0, 24, 24);
        const data = ctx.getImageData(0, 0, 24, 24).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        if (count > 0) {
            const avgR = r / count;
            const avgG = g / count;
            const avgB = b / count;

            const darkR = Math.max(12, Math.round(avgR * 0.48));
            const darkG = Math.max(14, Math.round(avgG * 0.48));
            const darkB = Math.max(20, Math.round(avgB * 0.48));

            const midR = Math.min(235, Math.round(avgR * 0.85 + 38));
            const midG = Math.min(238, Math.round(avgG * 0.85 + 42));
            const midB = Math.min(244, Math.round(avgB * 0.85 + 48));

            applyDirectionalBackdrop(`${darkR}, ${darkG}, ${darkB}`, `${midR}, ${midG}, ${midB}`);
            return;
        }
    } catch (_) {
        // Fallback when canvas pixel read is restricted by CORS
    }
    applyDirectionalBackdrop(fallbackDarkRgb, fallbackMidRgb);
}

function renderDots() {
    dotsContainerEl.innerHTML = space.photos.map((_, idx) => `
        <button type="button" class="carousel-dot ${idx === photoIndex ? "active" : ""}" data-idx="${idx}" aria-label="Photo ${idx + 1}"></button>
    `).join("");

    dotsContainerEl.querySelectorAll(".carousel-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            photoIndex = Number(dot.dataset.idx);
            updatePhotoSlide();
        });
    });
}

function updatePhotoSlide() {
    const currentPhoto = space.photos[photoIndex] || space.photos[0];
    slideBadgeEl.textContent = currentPhoto.caption;
    applyDirectionalBackdrop(
        currentPhoto.darkRgb || space.darkRgb,
        currentPhoto.midRgb || space.midRgb
    );

    photoEl.onload = () => sampleImageColor(
        photoEl,
        currentPhoto.darkRgb || space.darkRgb,
        currentPhoto.midRgb || space.midRgb
    );
    photoEl.onerror = () => applyDirectionalBackdrop(
        currentPhoto.darkRgb || space.darkRgb,
        currentPhoto.midRgb || space.midRgb
    );
    photoEl.src = currentPhoto.src;

    renderDots();
}

function updateVerifiedLabel() {
    document.getElementById("checkin-verified-text").innerHTML =
        `Verified by ${verifiedCount} student${verifiedCount === 1 ? "" : "s"} recently <span class="mini-pipe">|</span> Tap matching tags`;
}

function getSortedComments() {
    const copy = [...space.comments];
    if (commentSortMode === "newest") {
        return copy.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
    return copy.sort((a, b) => (b.likes || 0) - (a.likes || 0));
}

function renderComments() {
    const listEl = document.getElementById("comments-list");
    const badgeEl = document.getElementById("comments-count-badge");
    badgeEl.textContent = `${space.comments.length} comment${space.comments.length === 1 ? "" : "s"}`;

    const sorted = getSortedComments();

    listEl.innerHTML = sorted.map(c => {
        const initials = c.author
            .split(" ")
            .map(part => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

        const repliesHtml = (c.replies || []).map(r => {
            const rInitials = r.author
                .split(" ")
                .map(part => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
            return `
                <div class="yt-reply-item">
                    <span class="yt-reply-avatar">${rInitials}</span>
                    <div class="yt-reply-body">
                        <div class="yt-reply-meta">
                            <span class="comment-author">${r.author}</span>
                            <span class="yt-handle">${r.handle || "@student"}</span>
                            <span class="comment-time">${r.time}</span>
                        </div>
                        <p class="yt-reply-text">${r.text}</p>
                    </div>
                </div>
            `;
        }).join("");

        const isReplyOpen = openReplyBoxes.has(c.id);

        return `
            <article class="yt-comment-thread" data-comment-id="${c.id}">
                <span class="comment-avatar">${initials}</span>
                <div class="yt-comment-main">
                    <div class="yt-comment-header">
                        <span class="comment-author">${c.author}</span>
                        <span class="yt-handle">${c.handle || "@student"}</span>
                        <span class="comment-time">${c.time}</span>
                        <span class="comment-stars">${"★".repeat(c.rating)}</span>
                    </div>
                    <p class="comment-text">${c.text}</p>

                    <div class="yt-comment-actions">
                        <button type="button" class="yt-action-chip like-btn ${c.liked ? "liked" : ""}" data-id="${c.id}">
                            <span>👍</span>
                            <span class="like-count">${c.likes || 0}</span>
                        </button>
                        <button type="button" class="yt-action-chip reply-toggle-btn" data-id="${c.id}">
                            Reply${c.replies && c.replies.length ? ` (${c.replies.length})` : ""}
                        </button>
                    </div>

                    ${(repliesHtml || isReplyOpen) ? `
                        <div class="yt-replies-box">
                            ${repliesHtml}
                            ${isReplyOpen ? `
                                <form class="yt-reply-form" data-id="${c.id}">
                                    <input type="text" class="yt-reply-input" placeholder="Add a reply..." required>
                                    <button type="submit" class="yt-reply-submit">Reply</button>
                                </form>
                            ` : ""}
                        </div>
                    ` : ""}
                </div>
            </article>
        `;
    }).join("");

    // Bind like buttons
    listEl.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const target = space.comments.find(item => item.id === id);
            if (!target) return;
            target.liked = !target.liked;
            target.likes = Math.max(0, (target.likes || 0) + (target.liked ? 1 : -1));
            renderComments();
        });
    });

    // Bind reply toggle buttons
    listEl.querySelectorAll(".reply-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            if (openReplyBoxes.has(id)) {
                openReplyBoxes.delete(id);
            } else {
                openReplyBoxes.add(id);
            }
            renderComments();
            const input = listEl.querySelector(`.yt-reply-form[data-id="${id}"] .yt-reply-input`);
            if (input) input.focus();
        });
    });

    // Bind reply forms
    listEl.querySelectorAll(".yt-reply-form").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = Number(form.dataset.id);
            const input = form.querySelector(".yt-reply-input");
            const replyText = input.value.trim();
            if (!replyText) return;

            const target = space.comments.find(item => item.id === id);
            if (!target) return;
            target.replies = target.replies || [];
            target.replies.push({
                author: "You",
                handle: "@you",
                time: "Just now",
                text: replyText
            });
            renderComments();
        });
    });
}

function populateSpaceDetails() {
    document.title = `${space.name} — SpaceFinder | UManitoba`;
    document.getElementById("slide-zone-label").textContent = space.zoneTag;
    document.getElementById("space-title").textContent = space.name;
    document.getElementById("space-description").textContent = space.description;
    document.getElementById("hero-rating-pill").textContent = `★ ${space.rating.toFixed(1)} Rating`;
    document.getElementById("hero-distance-pill").textContent = space.distance;
    document.getElementById("hero-status-pill").textContent = `● ${space.status}`;

    btnModePhotos.textContent = `Photos (${space.photos.length})`;

    document.getElementById("attr-location-title").textContent = space.location;
    document.getElementById("attr-live-status").textContent = space.status;
    document.getElementById("attr-address").innerHTML = `${space.address} <span class="mini-pipe">|</span> <span id="attr-hours-inline">${space.hours}</span> <span class="mini-pipe">|</span> <span class="updated-stamp">Updated 2 mins ago</span>`;
    document.getElementById("attr-rating-chip").textContent = `★ ${space.rating.toFixed(1)} (${space.reviewCount})`;
    document.getElementById("attr-distance-chip").textContent = space.distance;

    document.getElementById("spec-seating").textContent = space.specs.seating;
    document.getElementById("spec-comfort").textContent = space.specs.comfort;
    document.getElementById("spec-outlets").textContent = space.specs.outlets;
    document.getElementById("spec-noise").textContent = space.specs.noise;
    document.getElementById("spec-hours").textContent = space.specs.hours;
    document.getElementById("spec-access").textContent = space.specs.access;

    const d = space.descriptions || {};
    document.getElementById("desc-seating").textContent = d.seating || "";
    document.getElementById("desc-comfort").textContent = d.comfort || "";
    document.getElementById("desc-outlets").textContent = d.outlets || "";
    document.getElementById("desc-noise").textContent = d.noise || "";
    document.getElementById("desc-hours").textContent = d.hours || "";
    document.getElementById("desc-access").textContent = d.access || "";

    updateVerifiedLabel();
    document.getElementById("floorplan-title").textContent = `${space.name} — Floor Plan`;

    document.getElementById("avg-rating-value").textContent = space.rating.toFixed(1);
    document.getElementById("review-count-label").textContent = `Based on ${space.reviewCount} student reviews`;

    updatePhotoSlide();
    renderComments();
}

// Navigation & Media Controls
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../page-html/index.html";
});

btnModePhotos.addEventListener("click", () => {
    btnModePhotos.classList.add("active");
    btnModeFloorplan.classList.remove("active");
    photosPane.classList.add("active");
    floorplanPane.classList.remove("active");
});

btnModeFloorplan.addEventListener("click", () => {
    btnModeFloorplan.classList.add("active");
    btnModePhotos.classList.remove("active");
    floorplanPane.classList.add("active");
    photosPane.classList.remove("active");
});

document.getElementById("prev-photo-btn").addEventListener("click", () => {
    photoIndex = (photoIndex - 1 + space.photos.length) % space.photos.length;
    updatePhotoSlide();
});

document.getElementById("next-photo-btn").addEventListener("click", () => {
    photoIndex = (photoIndex + 1) % space.photos.length;
    updatePhotoSlide();
});

// Check-In Panel & Condition Tags
document.querySelectorAll(".condition-tag").forEach(tagBtn => {
    tagBtn.addEventListener("click", () => {
        tagBtn.classList.toggle("active");
    });
});

const checkinSubcard = document.getElementById("checkin-subcard");
if (checkinSubcard) {
    checkinSubcard.addEventListener("click", (e) => {
        if (e.target.closest(".condition-tag, .confirm-checkin-btn")) return;
        checkinSubcard.classList.toggle("selected");
    });
}

const confirmCheckinBtn = document.getElementById("confirm-checkin-btn");
confirmCheckinBtn.addEventListener("click", () => {
    const isNowConfirmed = confirmCheckinBtn.classList.toggle("confirmed");
    confirmCheckinBtn.textContent = isNowConfirmed ? "Checked In ✓" : "Confirm Check-In";
    verifiedCount = isNowConfirmed ? space.verifiedCount + 1 : space.verifiedCount;
    updateVerifiedLabel();
    if (checkinSubcard) {
        checkinSubcard.classList.toggle("selected", isNowConfirmed);
    }
});

document.getElementById("rate-room-btn").addEventListener("click", () => {
    document.getElementById("comment-input").focus();
});

document.getElementById("directions-btn").addEventListener("click", () => {
    window.location.href = `../page-html/index.html?focus=${spaceId}`;
});

// Sort Toggle (Top / Newest)
document.querySelectorAll(".yt-sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        commentSortMode = btn.dataset.sort;
        document.querySelectorAll(".yt-sort-btn").forEach(b => b.classList.toggle("active", b === btn));
        renderComments();
    });
});

// Star Picker & Comment Submission
const starButtons = document.querySelectorAll("#star-picker .star-btn");
starButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedRating = Number(btn.dataset.value);
        starButtons.forEach(s => {
            s.classList.toggle("active", Number(s.dataset.value) <= selectedRating);
        });
    });
});

const commentInput = document.getElementById("comment-input");
document.getElementById("cancel-comment-btn").addEventListener("click", () => {
    commentInput.value = "";
});

document.getElementById("comment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (!text) return;

    space.comments.unshift({
        id: Date.now(),
        author: "You",
        handle: "@you",
        rating: selectedRating,
        time: "Just now",
        timestamp: Date.now(),
        likes: 0,
        liked: false,
        text,
        replies: []
    });

    space.reviewCount += 1;
    document.getElementById("review-count-label").textContent = `Based on ${space.reviewCount} student reviews`;
    document.getElementById("attr-rating-chip").textContent = `★ ${space.rating.toFixed(1)} (${space.reviewCount})`;

    commentInput.value = "";
    renderComments();
});

populateSpaceDetails();