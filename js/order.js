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




const JSN = function htmlToJSON(element){
    
    let children = element.children;
    const obj = {}; 
    // passes an array to children containing all the nodes / children element of the div passed in the function arguments.
    Array.from(children).forEach(child=>{
        
        if (child) { 
            

            if (child.classList.contains("menu-card-content")) {
                const titleElement = child.querySelector(".menu-card-title");
                const priceElement = child.querySelector(".discount-price");
                const imgElement = child.querySelector("img");

        
                if (titleElement) {
                    obj.Item_Name = titleElement.innerHTML;
                    
                }

           
                if (priceElement) {
                    obj.Item_Price = priceElement.innerHTML;
                    
                }

                
                if (imgElement) {
                    obj.Item_Image = imgElement.getAttribute("src");
                    console.log("Item Image:", obj.Item_Image);
                }
            }
        }
    });
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cart.push(obj);

    
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log("Cart Saved:", cart);
    
   
}





let elemntos = document.querySelectorAll(".menu-card");
elemntos.forEach(element=>{
    element.addEventListener("click", () =>{
        JSN(element)});
})





window.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    // Clear any existing content
    cartContainer.innerHTML = '';

    // Create and append cart items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.Item_Image}" alt="${item.Item_Name}">
            <div class="item-details">
                <h3>${item.Item_Name}</h3>
                <p class="price">${item.Item_Price}</p>
                <div class="quantity">
                    <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                    <span class="qty-value">1</span>
                    <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
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

    // Add event listener for customize toggle buttons
    const customizeToggles = document.querySelectorAll('.customize-toggle');
    customizeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
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
});