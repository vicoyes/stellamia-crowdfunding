(function () {
    const consentCookieName = "stellamia_analytics_consent";
    const measurementId = "G-LRTH1PY8NP";

    function getConsent() {
        const consentCookie = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith(`${consentCookieName}=`));

        return consentCookie ? consentCookie.split("=")[1] : null;
    }

    function saveConsent(value) {
        const maxAge = 60 * 60 * 24 * 180;
        document.cookie = `${consentCookieName}=${value}; Max-Age=${maxAge}; Path=/; Domain=.stellamia.eu; SameSite=Lax; Secure`;
    }

    function loadAnalytics() {
        if (window.stellamiaAnalyticsLoaded) {
            return;
        }

        window.stellamiaAnalyticsLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", measurementId, { anonymize_ip: true });

        const googleAnalytics = document.createElement("script");
        googleAnalytics.async = true;
        googleAnalytics.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(googleAnalytics);

        document.querySelectorAll("script[data-analytics-src]").forEach((script) => {
            const analyticsScript = document.createElement("script");
            analyticsScript.src = script.dataset.analyticsSrc;
            analyticsScript.async = true;
            document.body.appendChild(analyticsScript);
        });
    }

    function removeBanner() {
        document.getElementById("cookie-consent")?.remove();
    }

    function chooseConsent(value) {
        saveConsent(value);
        removeBanner();

        if (value === "accepted") {
            loadAnalytics();
        } else if (window.stellamiaAnalyticsLoaded) {
            window.location.reload();
        }
    }

    function showBanner() {
        removeBanner();

        const banner = document.createElement("section");
        banner.id = "cookie-consent";
        banner.className = "cookie-consent";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-labelledby", "cookie-consent-title");
        banner.innerHTML = `
            <div class="cookie-consent__content">
                <div class="cookie-consent__text">
                    <h2 id="cookie-consent-title">Cookie-Einstellungen</h2>
                    <p>Wir verwenden optionale Analyse-Cookies von Google Analytics und Zoho, um zu verstehen, wie diese Website genutzt wird. Du kannst zustimmen oder ablehnen. Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
                </div>
                <div class="cookie-consent__actions">
                    <button type="button" class="cookie-consent__button cookie-consent__button--secondary" data-cookie-choice="rejected">Ablehnen</button>
                    <button type="button" class="cookie-consent__button cookie-consent__button--primary" data-cookie-choice="accepted">Alle akzeptieren</button>
                </div>
            </div>
        `;

        banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
            button.addEventListener("click", () => chooseConsent(button.dataset.cookieChoice));
        });

        document.body.appendChild(banner);
        banner.querySelector("[data-cookie-choice='accepted']").focus();
    }

    document.querySelectorAll("[data-cookie-settings]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            showBanner();
        });
    });

    if (getConsent() === "accepted") {
        loadAnalytics();
    } else if (getConsent() !== "rejected") {
        showBanner();
    }
}());
