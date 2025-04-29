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
    cart.forEach(item => {
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
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
});