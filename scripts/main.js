function scrollToSignup() {
    document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setFormCity(form) {
    const city = new URLSearchParams(window.location.search).get("city");
    form.elements.CONTACTCF1.value = city && city.trim() ? city.slice(0, 255) : "none";
}

function validateZohoForm(form) {
    const accountName = form.elements["Account Name"];
    const lastName = form.elements["Last Name"];
    const email = form.elements.Email;
    const consent = form.querySelector(".privacy-consent");
    const consentError = form.querySelector(".earlybird-consent-error");

    if (!accountName.value.trim()) {
        alert("Kunde-Name darf nicht leer sein.");
        accountName.focus();
        return false;
    }

    if (!lastName.value.trim()) {
        alert("Nachname darf nicht leer sein.");
        lastName.focus();
        return false;
    }

    if (!email.value.trim() || !email.checkValidity()) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        email.focus();
        return false;
    }

    if (!consent.checked) {
        consent.setAttribute("aria-invalid", "true");
        consentError.classList.add("is-visible");
        consent.focus();
        return false;
    }

    consent.setAttribute("aria-invalid", "false");
    consentError.classList.remove("is-visible");

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("service") === "smarturl" && !form.elements.service) {
        const smartUrlField = document.createElement("input");
        smartUrlField.type = "hidden";
        smartUrlField.name = "service";
        smartUrlField.value = "smarturl";
        form.appendChild(smartUrlField);
    }

    return true;
}

function clearPrivacyError(event) {
    const consent = event.currentTarget;
    const error = consent.closest(".earlybird-consent-group").querySelector(".earlybird-consent-error");
    if (consent.checked) {
        consent.setAttribute("aria-invalid", "false");
        error.classList.remove("is-visible");
    }
}

function submitZohoForm(event) {
    const form = event.currentTarget;
    if (!validateZohoForm(form)) {
        event.preventDefault();
        return;
    }

    form.querySelector(".formsubmit").disabled = true;

}

document.querySelectorAll(".edition-card-cta").forEach((button) => {
    button.addEventListener("click", scrollToSignup);
});

document.querySelectorAll(".zoho-webform").forEach((form) => {
    setFormCity(form);
    form.addEventListener("submit", submitZohoForm);
    form.querySelector(".privacy-consent").addEventListener("change", clearPrivacyError);
});
