/* ==============================
   Email links
   Addresses are assembled at runtime so they never
   appear in the page source for harvesting bots.
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-email-user]').forEach(link => {
        const address = `${link.dataset.emailUser}@${link.dataset.emailDomain}`;
        link.href = `mailto:${address}`;
        (link.querySelector('.email-text') || link).textContent = address;
    });
});
