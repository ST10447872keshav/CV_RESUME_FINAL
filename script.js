document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------
    // Mobile Navigation Toggle
    // ------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        const links = document.querySelectorAll('.nav-links li');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) &&
            !navLinks.contains(e.target) &&
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // ------------------------------------------------------------
    // Smooth Scroll
    // ------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ------------------------------------------------------------
    // Scroll Animations
    // ------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .skill-category, .project-card, .section-title, .about-text, .about-img');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ------------------------------------------------------------
    // Contact Form (EmailJS Integration)
    // ------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            const params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
                .then(() => {
                    alert("Your message has been sent successfully.");
                    contactForm.reset();
                })
                .catch((err) => {
                    console.error("EmailJS Error:", err);
                    alert("Failed to send message. Please try again later.");
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
});
