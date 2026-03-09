document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // Interactive active links are handled in HTML currently, but this provides backup logic
    const currentLocation = location.href;
    const navItemLinks = document.querySelectorAll('.nav-menu a');
    const navLength = navItemLinks.length;
    for (let i = 0; i < navLength; i++) {
        if (navItemLinks[i].href === currentLocation) {
            navItemLinks[i].className = "active";
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
