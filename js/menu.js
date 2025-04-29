// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Calculate total quantity of all items
        const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCount.textContent = totalQuantity;
    }
    updateCartDropdown();
}

// Update cart dropdown content
function updateCartDropdown() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.querySelector('.cart-items-list');
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        return;
    }

    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-dropdown-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/default-coffee.jpg'">
            <div class="cart-dropdown-item-details">
                <div class="cart-dropdown-item-name">${item.name}</div>
                <div class="cart-dropdown-item-quantity">Quantity: ${item.quantity || 1}</div>
            </div>
        </div>
    `).join('');
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Initialize cart count and dropdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Add event listener for clear cart button
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});

// Make functions available globally
window.updateCartCount = updateCartCount;
window.clearCart = clearCart;
window.updateCartDropdown = updateCartDropdown; 