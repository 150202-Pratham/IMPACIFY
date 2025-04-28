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





document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.summary-item span:nth-child(2)');
    const totalElement = document.querySelector('.total span:nth-child(2)');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalElement.textContent = "$0.00";
        totalElement.textContent = "$2.00";
        return;
    }

    cartItemsContainer.innerHTML = '';

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="quantity">
                        <button class="qty-btn minus" data-name="${item.name}"><i class="fas fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-name="${item.name}"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + 2).toFixed(2)}`;

    // Quantity button functionality
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.qty-btn')) {
            const btn = e.target.closest('.qty-btn');
            const itemName = btn.dataset.name;
            const item = cart.find(i => i.name === itemName);
            if (btn.classList.contains('plus')) {
                item.quantity++;
            } else if (btn.classList.contains('minus')) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(i => i.name !== itemName);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // reload to update UI
        }
    });
});
