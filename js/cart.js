// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const cartCountElement = document.querySelector('.cart-count');
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in the header
    function updateCartCount() {
        if (!cartCountElement) return;
        
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }
    
    // Function to update cart in localStorage and refresh display
    function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Refresh the cart display
        displayCart();
    }
    
    // Display cart
    function displayCart() {
        if (!cartContainer) return;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="cart-empty">
                    <p>Your cart is empty.</p>
                    <a href="shop.html" class="btn">Continue Shopping</a>
                </div>
            `;
            return;
        }
        
        // Calculate cart totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0; // $10 shipping
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;
        
        cartContainer.innerHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="cart-items">
                    <!-- Cart items will be inserted here -->
                </tbody>
            </table>
            
            <div class="row">
                <div class="col-md-6">
                    <a href="shop.html" class="continue-shopping"><i class="fas fa-arrow-left"></i> Continue Shopping</a>
                </div>
                <div class="col-md-6">
                    <div class="cart-summary">
                        <h2>Order Summary</h2>
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>$${shipping.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Tax (10%)</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        `;
        
        const cartItemsContainer = document.getElementById('cart-items');
        
        // Add each cart item to the table
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="cart-product">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-product-info">
                            <h3>${item.name}</h3>
                        </div>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="cart-quantity">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" data-index="${index}">
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><i class="fas fa-trash cart-remove" data-index="${index}"></i></td>
            `;
            
            cartItemsContainer.appendChild(tr);
        });
        
        // Add event listeners for quantity changes and remove buttons
        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity < 10) {
                    cart[index].quantity += 1;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.cart-quantity input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const quantity = parseInt(this.value);
                
                if (quantity >= 1 && quantity <= 10) {
                    cart[index].quantity = quantity;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.cart-remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
        
        // Add event listener for checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                alert('Checkout functionality will be implemented soon!');
            });
        }
    }
    
    // Initialize cart display
    updateCartCount();
    displayCart();
});