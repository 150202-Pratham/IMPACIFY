const scrollUpBtn = document.querySelector('.scrollUp-btn');

// Show the button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('scrollUpBtn-active');
    } else {
        scrollUpBtn.classList.remove('scrollUpBtn-active');
    }
});

// Scroll to the top when the button is clicked
scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});


const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Mobile menu toggle
const navOpenBtn = document.querySelector('.navOpen-btn');
const navCloseBtn = document.querySelector('.navClose-btn');
const menuContent = document.querySelector('.menu-content');

navOpenBtn.addEventListener('click', () => {
    menuContent.classList.add('active');
});

navCloseBtn.addEventListener('click', () => {
    menuContent.classList.remove('active');
});

// Animation for quotes
window.addEventListener('DOMContentLoaded', () => {
    const quotes = document.querySelectorAll('.quote');
    
    quotes.forEach((quote, index) => {
        quote.style.animationDelay = `${index * 0.2}s`;
    });
});


// scroll reveal effects

ScrollReveal().reveal('.container_about_text', {
    duration: 1000,
    distance: '30px',
    origin: 'left',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 100,
    reset: false,
});

ScrollReveal().reveal('.container_about_illustrations', {
    duration: 1000,
    distance: '30px',
    origin: 'right',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 200,
    reset: false,
});

// Additional ScrollReveal effects
ScrollReveal().reveal('.about-imageContent', {
    duration: 1200,
    distance: '40px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 150,
    reset: false,
});

ScrollReveal().reveal('.about-details', {
    duration: 1200,
    distance: '40px',
    origin: 'top',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 250,
    reset: false,
});

ScrollReveal().reveal('.quote', {
    duration: 800,
    distance: '20px',
    origin: 'left',
    opacity: 0,
    easing: 'ease-in-out',
    interval: 200,
    reset: false,
});

ScrollReveal().reveal('.quote-action', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    easing: 'ease-in-out',
    delay: 300,
    reset: false,
});