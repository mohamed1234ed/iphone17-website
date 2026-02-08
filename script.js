// عناصر الصفحة
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const parallaxImgs = document.querySelectorAll('.parallax');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// ألوان لكل Section
const sectionColors = {
    hero: '#5ac8fa',
    features: '#ffd966',
    gallery: '#ff7f50',
    reviews: '#7fffd4',
    buy: '#9370db'
};

// Fade-in للـsections
function revealSections() {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if(top < windowHeight - 100) section.classList.add('visible');
    });
}

// تحديث Navbar، الأزرار، Parallax، Highlight
function onScroll() {
    revealSections();

    // Shrink Navbar
    if(window.scrollY > 50){
        navbar.classList.add('small');
    } else {
        navbar.classList.remove('small');
    }

    // Scroll Top Button
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

    // Parallax effect
    parallaxImgs.forEach(img => {
        img.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    });

    // Highlight nav link و تغيير لون Navbar
    let current = '';
    sections.forEach(section => {
        if(window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').substring(1) === current) link.classList.add('active');
    });

    if(current) {
        navbar.style.backgroundColor = sectionColors[current] + 'cc';
    }
}

// Smooth scrolling للـnav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        if(navLinksContainer.classList.contains('open')) navLinksContainer.classList.remove('open');
    });
});

// Scroll to Top button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
});

// Event Listeners
window.addEventListener('scroll', onScroll);
window.addEventListener('load', revealSections);
