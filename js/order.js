// Order page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Order page script loaded');
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Drink customization toggle
    const customizeToggles = document.querySelectorAll('.customize-toggle');
    console.log('Found customize toggles:', customizeToggles.length);
    
    customizeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            console.log('Toggle clicked');
            const panel = this.nextElementSibling;
            panel.classList.toggle('active');
            
            // Update button icon
            const icon = this.querySelector('i');
            if (panel.classList.contains('active')) {
                icon.classList.remove('fa-sliders-h');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-sliders-h');
            }
        });
    });
    
    // Extra shots counter
    const shotCounters = document.querySelectorAll('.shots-counter');
    console.log('Found shot counters:', shotCounters.length);
    
    shotCounters.forEach(counter => {
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const countDisplay = counter.querySelector('span');
        
        minusBtn.addEventListener('click', function() {
            let count = parseInt(countDisplay.textContent);
            if (count > 0) {
                countDisplay.textContent = count - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let count = parseInt(countDisplay.textContent);
            countDisplay.textContent = count + 1;
        });
    });
    
    // Quantity buttons
    const qtyButtons = document.querySelectorAll('.qty-btn');
    
    qtyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPlus = this.querySelector('.fa-plus') !== null;
            const countSpan = this.parentElement.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (isPlus) {
                countSpan.textContent = count + 1;
            } else if (count > 1) {
                countSpan.textContent = count - 1;
            }
        });
    });
}); 