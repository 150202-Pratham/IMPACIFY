document.addEventListener('DOMContentLoaded', function() {
    console.log('Order page script loaded');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    const customizeToggles = document.querySelectorAll('.customize-toggle');
    console.log('Found customize toggles:', customizeToggles.length);
    
    customizeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            console.log('Toggle clicked');
            const panel = this.nextElementSibling;
            panel.classList.toggle('active');
            
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

    updateCartCount();
    displayCartItems();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Calculate total quantity of all items
        const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCount.textContent = totalQuantity;
    }
}

function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.summary-item span:nth-child(2)');
    const totalElement = document.querySelector('.total span:nth-child(2)');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalElement.textContent = "$0.00";
        totalElement.textContent = "$2.00";
        return;
    }

    cartContainer.innerHTML = '';

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/default-coffee.jpg'">
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

    cartContainer.addEventListener('click', function(e) {
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
            displayCartItems();
            updateCartCount();
        }
    });
}

const JSN = function htmlToJSON(element) {
    const obj = {}; 
    
    const titleElement = element.querySelector(".menu-card-title");
    const priceElement = element.querySelector(".discount-price");
    const imgElement = element.querySelector("img");

    if (titleElement) {
        obj.name = titleElement.textContent.trim();
    }

    if (priceElement) {
        obj.price = parseFloat(priceElement.textContent.replace('$', ''));
    }

    if (imgElement) {
        obj.image = imgElement.getAttribute("src");
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItemIndex = cart.findIndex(item => item.name === obj.name);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        obj.quantity = 1;
        cart.push(obj);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update both cart count and dropdown
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
    if (typeof window.updateCartDropdown === 'function') {
        window.updateCartDropdown();
    }
}

const menuCards = document.querySelectorAll(".menu-card");
menuCards.forEach(element => {
    element.addEventListener("click", () => {
        JSN(element);
    });
});

window.updateCartCount = updateCartCount;
window.displayCartItems = displayCartItems;

// Form submission handler
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    displayCartItems();
    
    // Show success message
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Reset form
    this.reset();
});

