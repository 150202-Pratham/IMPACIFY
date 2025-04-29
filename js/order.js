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
}); 


const JSN = function htmlToJSON(element) {
    let children = element.children;
    const obj = {}; 
    
    Array.from(children).forEach(child => {
        if (child) { 
            if (child.classList.contains("menu-card-content")) {
                const titleElement = child.querySelector(".menu-card-title");
                const priceElement = child.querySelector(".discount-price");
                const imgElement = element.querySelector("img");

                if (titleElement) {
                    obj.Item_Name = titleElement.innerHTML;
                }

                if (priceElement) {
                    obj.Item_Price = priceElement.innerHTML;
                }

                if (imgElement) {
                    obj.Item_Image = imgElement.getAttribute("src");
                }
            }
        }
    });
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.Item_Name === obj.Item_Name && 
        item.Item_Price === obj.Item_Price
    );
    
    if (existingItemIndex !== -1) {
        // Item exists, update quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // New item, add to cart with quantity 1
        obj.quantity = 1;
        cart.push(obj);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}


const menuCards = document.querySelectorAll(".menu-card");
menuCards.forEach(element => {
    element.addEventListener("click", () => {
        JSN(element);
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

   
    cartContainer.innerHTML = '';

 
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.Item_Image}" alt="${item.Item_Name}">
            <div class="item-details">
                <h3>${item.Item_Name}</h3>
                <p class="price">${item.Item_Price}</p>
                <div class="quantity">
                    <button class="qty-btn minus" data-index="${index}"><i class="fas fa-minus"></i></button>
                    <span class="qty-value">${item.quantity || 1}</span>
                    <button class="qty-btn plus" data-index="${index}"><i class="fas fa-plus"></i></button>
                </div>
                <div class="customize-section">
                    <button class="customize-toggle">
                        <i class="fas fa-sliders-h"></i>
                        Customize Drink
                    </button>
                    <div class="customization-panel">
                        <div class="custom-option">
                            <label><i class="fas fa-temperature-high"></i> Temperature</label>
                            <div class="option-choices">
                                <input type="radio" id="hot${index}" name="temp${index}" value="hot" checked>
                                <label for="hot${index}">Hot</label>
                                <input type="radio" id="iced${index}" name="temp${index}" value="iced">
                                <label for="iced${index}">Iced</label>
                            </div>
                        </div>
                        <div class="custom-option">
                            <label><i class="fas fa-coffee"></i> Strength</label>
                            <select class="strength-select">
                                <option value="regular">Regular</option>
                                <option value="strong">Strong</option>
                                <option value="extra-strong">Extra Strong</option>
                            </select>
                        </div>
                        <div class="custom-option">
                            <label><i class="fas fa-glass-whiskey"></i> Size</label>
                            <select class="size-select">
                                <option value="small">Small (8 oz)</option>
                                <option value="medium" selected>Medium (12 oz)</option>
                                <option value="large">Large (16 oz)</option>
                                <option value="extra-large">Extra Large (20 oz)</option>
                            </select>
                        </div>
                        <div class="custom-option">
                            <label><i class="fas fa-tint"></i> Milk Options</label>
                            <select class="milk-select">
                                <option value="whole">Whole Milk</option>
                                <option value="skim">Skim Milk</option>
                                <option value="oat">Oat Milk (+$0.50)</option>
                                <option value="almond">Almond Milk (+$0.50)</option>
                                <option value="soy">Soy Milk (+$0.50)</option>
                            </select>
                        </div>
                        <div class="custom-option">
                            <label><i class="fas fa-plus-circle"></i> Extra Shots</label>
                            <div class="shots-counter">
                                <button class="counter-btn minus"><i class="fas fa-minus"></i></button>
                                <span>0</span>
                                <button class="counter-btn plus"><i class="fas fa-plus"></i></button>
                                <span class="price-note">(+$0.75/shot)</span>
                            </div>
                        </div>
                        <div class="custom-option">
                            <label><i class="fas fa-comment"></i> Special Instructions</label>
                            <textarea placeholder="Any special requests? (Extra hot, light ice, etc.)"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update quantity buttons functionality
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const isPlus = this.classList.contains('plus');
            const countSpan = this.parentElement.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (isPlus) {
                count++;
                cart[index].quantity = count;
            } else if (count > 1) {
                count--;
                cart[index].quantity = count;
            } else {
                // Remove item if quantity becomes 0
                cart.splice(index, 1);
                this.closest('.cart-item').remove();
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartTotals();
        });
    });
});


function updateCartTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    const deliveryFee = 2.00;

    cartItems.forEach(item => {
        try {
            const priceText = item.querySelector('.price').textContent;
            const quantity = parseInt(item.querySelector('.qty-value').textContent) || 1;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
            subtotal += price * quantity;


            const milkSelect = item.querySelector('.milk-select');
            if (milkSelect) {
                const selectedMilk = milkSelect.value;
                if (['oat', 'almond', 'soy'].includes(selectedMilk)) {
                    subtotal += 0.50 * quantity;
                }
            }

            const shotsCount = parseInt(item.querySelector('.shots-counter span').textContent) || 0;
            subtotal += 0.75 * shotsCount * quantity;
        } catch (error) {
            console.error('Error calculating price for item:', error);
        }
    });


    const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
    const totalElement = document.querySelector('.summary-item.total span:last-child');
    
    if (subtotalElement && totalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
    }
}


function setupEventListeners() {
 

   
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
            updateCartTotals();
        });
    });

    const shotCounters = document.querySelectorAll('.shots-counter');
    shotCounters.forEach(counter => {
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const countDisplay = counter.querySelector('span');
        
        minusBtn.addEventListener('click', function() {
            let count = parseInt(countDisplay.textContent);
            if (count > 0) {
                countDisplay.textContent = count - 1;
                updateCartTotals();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let count = parseInt(countDisplay.textContent);
            countDisplay.textContent = count + 1;
            updateCartTotals();
        });
    });

    const milkSelects = document.querySelectorAll('.milk-select');
    milkSelects.forEach(select => {
        select.addEventListener('change', function() {
            updateCartTotals();
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {

    

    setupEventListeners();
    

    updateCartTotals();
});