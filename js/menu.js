// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        // Calculate total quantity of all items
        const totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCount.textContent = totalQuantity;
    }
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Initialize cart count when page loads
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