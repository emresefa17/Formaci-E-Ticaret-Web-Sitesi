// Product data
const products = [
    {
        id: 1,
        name: "Manchester United Home Jersey 2023/24",
        category: "football",
        price: 89.99,
        image: "images/manu.jpeg",
        featured: true,
        description: "Official Manchester United home jersey for the 2023/24 season. Made with breathable fabric for maximum comfort."
    },
    {
        id: 2,
        name: "Los Angeles Lakers Jersey - LeBron James",
        category: "basketball",
        price: 99.99,
        image: "images/lakers.png",
        featured: true,
        description: "Official Los Angeles Lakers jersey featuring LeBron James' name and number. NBA authentic merchandise."
    },
    {
        id: 3,
        name: "Real Madrid Away Jersey 2023/24",
        category: "football",
        price: 89.99,
        image: "images/real.jpg",
        featured: true,
        description: "Official Real Madrid away jersey for the 2023/24 season. Sleek design with club crest."
    },
    {
        id: 4,
        name: "Custom Name & Number Jersey",
        category: "custom",
        price: 109.99,
        image: "images/custom1.jpg",
        featured: true,
        description: "Create your own custom jersey with personalized name and number. Available in various team designs."
    },
    {
        id: 5,
        name: "Chicago Bulls Retro Jersey - Michael Jordan",
        category: "basketball",
        price: 119.99,
        image: "images/bulls.jpeg",
        featured: false,
        description: "Retro Chicago Bulls jersey featuring Michael Jordan's iconic number 23. A classic piece of NBA history."
    },
    {
        id: 6,
        name: "FC Barcelona Home Jersey 2023/24",
        category: "football",
        price: 89.99,
        image: "images/barça.png",
        featured: false,
        description: "Official FC Barcelona home jersey for the 2023/24 season. Features the iconic blue and garnet stripes."
    },
    {
        id: 7,
        name: "Golden State Warriors Jersey - Stephen Curry",
        category: "basketball",
        price: 99.99,
        image: "images/golden.png",
        featured: false,
        description: "Official Golden State Warriors jersey featuring Stephen Curry's name and number. NBA authentic merchandise."
    },
    {
        id: 8,
        name: "Liverpool FC Home Jersey 2023/24",
        category: "football",
        price: 89.99,
        image: "images/lfc.jpeg",
        featured: false,
        description: "Official Liverpool FC home jersey for the 2023/24 season. You'll never walk alone."
    }
];

// Function to display featured products on the homepage
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    if (!featuredProductsContainer) return;
    
    const featuredProducts = products.filter(product => product.featured);
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <a href="product.html?id=${product.id}" title="View Details"><i class="fas fa-eye"></i></a>
                    <a href="#" title="Add to Wishlist"><i class="fas fa-heart"></i></a>
                </div>
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        featuredProductsContainer.appendChild(productCard);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Function to add product to cart
function addToCart(productId) {
    // Get current cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`${product.name} has been added to your cart!`);
}

// Function to update cart count in the header
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (!cartCountElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = itemCount;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    updateCartCount();
});