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




// scroll reveral files 

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