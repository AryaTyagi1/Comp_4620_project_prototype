(function () {
    "use strict";

    var ABOUT_SECTION_HTML = [
        '<section class="sf-about-section" id="sf-about-section" aria-label="About Space Scout">',
        '  <div class="sf-about-wrap">',
        '    <div class="sf-about-grid">',
        '      <div class="sf-about-brand">',
        '        <div class="sf-about-brand-top">',
        '          <span class="sf-about-badge" aria-hidden="true">S&amp;S</span>',
        '          <div>',
        '            <h2>Space Scout</h2>',
        '            <p>Find your perfect study space—anytime.</p>',
        '          </div>',
        '        </div>',
        '        <p class="sf-about-copy">',
        '          Space Scout helps University of Manitoba students discover quiet study spots, collaborative tables, power outlets, and room details across campus—with smooth navigation between the map, list, and room info views.',
        '        </p>',
        '      </div>',
        '      <div class="sf-about-cards">',
        '        <article class="sf-about-card">',
        '          <h3>Campus Discovery</h3>',
        '          <p>Browse study spaces by location, walk time, seating capacity, noise level, and open hours from the map or list view.</p>',
        '        </article>',
        '        <article class="sf-about-card">',
        '          <h3>Live Room Info</h3>',
        '          <p>Check room specifications, recent student check-ins, and reviews before heading to your next study session.</p>',
        '        </article>',
        '        <article class="sf-about-card">',
        '          <h3>Next Release</h3>',
        '          <p><strong>Saved</strong> spaces and <strong>Report A Space</strong> are part of our upcoming release and are not yet implemented in this prototype.</p>',
        '        </article>',
        '        <article class="sf-about-card">',
        '          <h3>Contact us</h3>',
        '          <ul class="sf-about-contact-list">',
        '            <li>✉ <a href="mailto:support@email.com">support@email.com</a></li>',
        '            <li>📞 <a href="tel:+1234567890">+1 (234) 567-890</a></li>',
        '            <li>📍 <span>400 University Centre, Winnipeg, R3T 2N2</span></li>',
        '          </ul>',
        '        </article>',
        '      </div>',
        '    </div>',
        '    <hr class="sf-about-rule">',
        '    <div class="sf-about-bottom">',
        '      <p>© 2026 Space Scout. All rights reserved.</p>',
        '      <div class="sf-about-socials">',
        '        <a href="#sf-about-section" class="sf-about-social-link" aria-label="X">𝕏</a>',
        '        <a href="#sf-about-section" class="sf-about-social-link" aria-label="Instagram">◎</a>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");

    function ensureAboutSection() {
        var existing = document.getElementById("sf-about-section");
        if (existing) return existing;

        if (document.body) {
            document.body.insertAdjacentHTML("beforeend", ABOUT_SECTION_HTML);
        }
        return document.getElementById("sf-about-section");
    }

    function scrollToAboutSection() {
        var section = ensureAboutSection();
        if (!section) return;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function ensurePopupModal() {
        var backdrop = document.getElementById("sf-popup-backdrop");
        if (backdrop) return backdrop;

        backdrop = document.createElement("div");
        backdrop.className = "sf-popup-backdrop";
        backdrop.id = "sf-popup-backdrop";
        backdrop.hidden = true;
        backdrop.innerHTML = [
            '<div class="sf-popup-card" role="dialog" aria-modal="true" aria-labelledby="sf-popup-title">',
            '  <button type="button" class="sf-popup-close" id="sf-popup-close" aria-label="Close popup">✕</button>',
            '  <div class="sf-coming-pill"><span class="sf-coming-dot"></span><span>Coming Soon • Next Release</span></div>',
            '  <div class="sf-popup-icon" id="sf-popup-icon" aria-hidden="true">✨</div>',
            '  <h3 class="sf-popup-title" id="sf-popup-title">Coming Soon</h3>',
            '  <p class="sf-popup-text" id="sf-popup-text">This feature is not yet implemented and will be available in the next release.</p>',
            '  <div class="sf-progress-track" aria-hidden="true"><div class="sf-progress-bar"></div></div>',
            '  <span class="sf-popup-sub">Not yet implemented in this prototype</span>',
            '  <button type="button" class="sf-popup-btn" id="sf-popup-btn">Okay</button>',
            '</div>'
        ].join("");

        document.body.appendChild(backdrop);

        function hidePopup() {
            backdrop.hidden = true;
        }

        backdrop.addEventListener("click", function (e) {
            if (e.target === backdrop) hidePopup();
        });

        var closeBtn = document.getElementById("sf-popup-close");
        var okBtn = document.getElementById("sf-popup-btn");
        if (closeBtn) closeBtn.addEventListener("click", hidePopup);
        if (okBtn) okBtn.addEventListener("click", hidePopup);

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !backdrop.hidden) hidePopup();
        });

        return backdrop;
    }

    function showComingSoonPopup(featureName) {
        var backdrop = ensurePopupModal();
        var titleEl = document.getElementById("sf-popup-title");
        var textEl = document.getElementById("sf-popup-text");
        var iconEl = document.getElementById("sf-popup-icon");

        var lower = featureName.toLowerCase();
        if (iconEl) iconEl.textContent = lower.indexOf("saved") !== -1 ? "🔖" : "📝";
        if (titleEl) titleEl.textContent = featureName + " — Coming Soon";
        if (textEl) {
            textEl.innerHTML =
                "<strong>" + featureName + "</strong> is not yet implemented in this prototype. It will be available in the <strong>next release</strong>.";
        }

        backdrop.hidden = false;
    }

    function bindHeaderItems() {
        ensureAboutSection();
        var items = document.querySelectorAll("header nav a, header nav button");

        items.forEach(function (el) {
            if (el.dataset.sfBound === "true") return;
            var label = (el.textContent || "").trim().toLowerCase();

            if (label === "saved" || label === "report a space") {
                el.dataset.sfBound = "true";
                el.addEventListener("click", function (e) {
                    e.preventDefault();
                    showComingSoonPopup(el.textContent.trim());
                });
            } else if (label === "about") {
                el.dataset.sfBound = "true";
                if (el.tagName === "A") {
                    el.setAttribute("href", "#sf-about-section");
                }
                el.addEventListener("click", function (e) {
                    e.preventDefault();
                    scrollToAboutSection();
                });
            }
        });
    }

    function init() {
        ensureAboutSection();
        ensurePopupModal();
        bindHeaderItems();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();