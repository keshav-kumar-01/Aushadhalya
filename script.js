// Database simulation (In real app, this would be SQL database)
const DB = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    products: [
        // Ayurvedic
        { id: 1, name: 'Ashwagandha Capsules', category: 'ayurvedic', price: 299, icon: '🌿', description: 'Premium ashwagandha root extract for stress relief and vitality', features: ['100% natural extract', 'Reduces stress', 'Boosts energy', 'Improves sleep quality'] },
        { id: 2, name: 'Triphala Powder', category: 'ayurvedic', price: 199, icon: '🍃', description: 'Traditional digestive aid from three fruits', features: ['Improves digestion', 'Natural detoxifier', 'Rich in antioxidants', 'Supports immunity'] },
        { id: 3, name: 'Tulsi Drops', category: 'ayurvedic', price: 149, icon: '🌱', description: 'Holy basil extract for immunity and wellness', features: ['Boosts immunity', 'Reduces inflammation', 'Stress relief', 'Respiratory health'] },
        { id: 4, name: 'Chyawanprash', category: 'ayurvedic', price: 349, icon: '🥄', description: 'Traditional immunity booster with 40+ herbs', features: ['Immunity booster', '40+ herbs', 'Rich in vitamin C', 'Improves metabolism'] },

        // Homeopathic
        { id: 5, name: 'Arnica Montana 30C', category: 'homeopathic', price: 129, icon: '💊', description: 'For bruises, soreness and muscle pain relief', features: ['Reduces bruising', 'Muscle pain relief', 'Post-surgery healing', 'Safe and gentle'] },
        { id: 6, name: 'Belladonna 200C', category: 'homeopathic', price: 139, icon: '🔴', description: 'For fever and inflammation management', features: ['Fever management', 'Reduces inflammation', 'Headache relief', 'Fast-acting'] },
        { id: 7, name: 'Nux Vomica 30C', category: 'homeopathic', price: 119, icon: '🌰', description: 'For digestive issues and stress', features: ['Digestive aid', 'Stress relief', 'Hangover remedy', 'Liver support'] },
        { id: 8, name: 'Calendula Cream', category: 'homeopathic', price: 179, icon: '🧴', description: 'Healing cream for cuts and skin irritation', features: ['Wound healing', 'Skin irritation', 'Natural ingredients', 'No side effects'] },

        // Supplements
        { id: 9, name: 'Vitamin D3 5000 IU', category: 'supplements', price: 499, icon: '☀️', description: 'High-potency vitamin D for bone health', features: ['Bone health', 'Immune support', 'Mood enhancement', 'Heart health'] },
        { id: 10, name: 'Omega-3 Fish Oil', category: 'supplements', price: 699, icon: '🐟', description: 'Premium fish oil for heart and brain health', features: ['Heart health', 'Brain function', 'Joint support', 'Anti-inflammatory'] },
        { id: 11, name: 'Multivitamin Complex', category: 'supplements', price: 599, icon: '💊', description: 'Complete daily nutrition in one capsule', features: ['All essential vitamins', 'Energy boost', 'Immunity support', 'Antioxidant rich'] },
        { id: 12, name: 'Protein Powder', category: 'supplements', price: 1299, icon: '🥤', description: 'Whey protein isolate for muscle building', features: ['25g protein per serving', 'Muscle building', 'Quick absorption', 'Great taste'] },

        // General Medicine
        { id: 13, name: 'Paracetamol 500mg', category: 'general', price: 49, icon: '💊', description: 'Fast-acting pain and fever relief', features: ['Pain relief', 'Fever reduction', 'Fast-acting', 'Trusted formula'] },
        { id: 14, name: 'Antacid Tablets', category: 'general', price: 89, icon: '🔵', description: 'Quick relief from acidity and heartburn', features: ['Instant relief', 'Neutralizes acid', 'Soothing formula', 'Mint flavor'] },
        { id: 15, name: 'Cough Syrup', category: 'general', price: 129, icon: '🍯', description: 'Effective cough relief with honey base', features: ['Soothes throat', 'Reduces cough', 'Honey-based', 'Non-drowsy'] },
        { id: 16, name: 'Antiseptic Cream', category: 'general', price: 79, icon: '🩹', description: 'Prevents infection in minor cuts and wounds', features: ['Prevents infection', 'Promotes healing', 'Soothing effect', 'Dermatologically tested'] },
    ],
    orders: JSON.parse(localStorage.getItem('orders')) || []
};

// Current state
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentCategory = '';
let currentProduct = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isRegisterMode = false;

// Pages
const pages = {
    auth: document.getElementById('authPage'),
    home: document.getElementById('homePage'),
    products: document.getElementById('productsPage'),
    productDetail: document.getElementById('productDetailPage'),
    cart: document.getElementById('cartPage'),
    success: document.getElementById('successPage'),
    profile: document.getElementById('profilePage')
};

function init() {
    updateCartCount();
    window.addEventListener('hashchange', handleRouting);
    if (currentUser) {
        // Show logout button
        document.getElementById('logoutBtn').classList.remove('hidden');

        // Display personalized welcome message if on home page
        if (window.location.hash === '' || window.location.hash === '#home') {
            displayWelcomeMessage();
        }

    } else {
        showPage('auth');
        // Clear hash on logout or no user
        history.replaceState(null, null, ' ');
        return;
    }
    handleRouting(); // handle initial route

    // Add event listener for profile link nav
    document.getElementById('profileLink').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = '#profile';
    });
}

// Routing handler
function handleRouting() {
    const hash = window.location.hash || '';
    if (!currentUser) {
        showPage('auth');
        return;
    }
    if (hash.startsWith('#category/')) {
        const category = hash.split('#category/')[1];
        currentCategory = category;
        showProducts(category);
        clearWelcomeMessage();
    } else if (hash.startsWith('#product/')) {
        const productId = parseInt(hash.split('#product/')[1]);
        if (!isNaN(productId)) {
            showProductDetail(productId);
            clearWelcomeMessage();
        } else {
            showPage('home');
            displayWelcomeMessage();
        }
    } else if (hash === '#cart') {
        showCart();
        clearWelcomeMessage();
    } else if (hash === '#profile') {
        showProfile();
        clearWelcomeMessage();
    } else if (hash === '#home' || hash === '') {
        showPage('home');
        displayWelcomeMessage();
    } else {
        showPage('home');
        displayWelcomeMessage();
    }
}

// Show/hide pages
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.add('hidden'));
    pages[pageName].classList.remove('hidden');
}

// Personalized welcome message functions
function displayWelcomeMessage() {
    const welcomeElem = document.getElementById('personalWelcome');
    if (welcomeElem && currentUser) {
        welcomeElem.textContent = `Welcome, ${currentUser.username}!`;
    }
}

function clearWelcomeMessage() {
    const welcomeElem = document.getElementById('personalWelcome');
    if (welcomeElem) {
        welcomeElem.textContent = '';
    }
}

// Authentication form submit handling
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (isRegisterMode) {
        // Registration validation
        if (!username || !password || !email || !confirmPassword) {
            alert('All fields are required for registration.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userExists = DB.users.find(u => u.username === username);
        if (userExists) {
            alert('Username already exists!');
            return;
        }

        const newUser = { id: Date.now(), username, password, email };
        DB.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(DB.users));
        alert('Registration successful! Please login.');
        toggleAuthMode();

    } else {
        // Login validation
        if (!username || !password) {
            alert('Username and Password are required for login.');
            return;
        }

        const user = DB.users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.getElementById('logoutBtn').classList.remove('hidden');
            showPage('home');
            displayWelcomeMessage();
        } else {
            alert('Invalid credentials!');
        }
    }
});

// Toggle between Login and Register modes
document.getElementById('switchLink').addEventListener('click', function(e) {
    e.preventDefault();
    toggleAuthMode();
});

function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {
        document.getElementById('authTitle').textContent = 'Register for MediShop';
        document.getElementById('authBtn').textContent = 'Register';
        document.getElementById('switchText').textContent = 'Already have an account?';
        document.getElementById('switchLink').textContent = 'Login';
        document.getElementById('emailGroup').classList.remove('hidden');
        document.getElementById('confirmPasswordGroup').classList.remove('hidden');
        document.getElementById('email').required = true;
        document.getElementById('confirmPassword').required = true;
        // Clear fields for registration mode
        document.getElementById('email').value = '';
        document.getElementById('confirmPassword').value = '';
    } else {
        document.getElementById('authTitle').textContent = 'Login to MediShop';
        document.getElementById('authBtn').textContent = 'Login';
        document.getElementById('switchText').textContent = "Don't have an account?";
        document.getElementById('switchLink').textContent = 'Register';
        document.getElementById('emailGroup').classList.add('hidden');
        document.getElementById('confirmPasswordGroup').classList.add('hidden');
        document.getElementById('email').required = false;
        document.getElementById('confirmPassword').required = false;
        // Clear fields for login mode
        document.getElementById('email').value = '';
        document.getElementById('confirmPassword').value = '';
    }
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('logoutBtn').classList.add('hidden');
    showPage('auth');
    clearWelcomeMessage();
    history.replaceState(null, null, ' ');
});

// Product category click using event delegation
document.querySelector('.categories').addEventListener('click', function(e) {
    const card = e.target.closest('.category-card');
    if (!card) return;
    const category = card.dataset.category;
    window.location.hash = 'category/' + category;
});

// Fix product card click issue (attach event on product card div, exclude add to cart button)
// Event delegation on productsGrid
document.getElementById('productsGrid').addEventListener('click', function(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const addToCartClicked = e.target.classList.contains('add-to-cart-btn');
    if (!addToCartClicked) {
        const productNameElem = card.querySelector('.product-name');
        const productName = productNameElem ? productNameElem.textContent : '';
        const product = DB.products.find(p => p.name === productName);
        if (product) {
            window.location.hash = 'product/' + product.id;
        }
    }
});

 // Show products by category with pagination (limit and load more)
let productsDisplayLimit = 12; // max products to display initially
let productsDisplayedCount = 0;
let currentProductList = [];

function showProducts(category) {
    currentProductList = DB.products.filter(p => p.category === category);
    productsDisplayedCount = 0;

    const grid = document.getElementById('productsGrid');
    const title = document.getElementById('categoryTitle');

    const categoryNames = {
        ayurvedic: 'Ayurvedic Medicines',
        homeopathic: 'Homeopathic Medicines',
        supplements: 'Supplements',
        general: 'General Medicines'
    };

    title.textContent = categoryNames[category] || 'Products';
    grid.innerHTML = '';

    // Render first batch
    renderProductBatch();

    showPage('products');
}

// Render the next batch of products (max productsDisplayLimit)
function renderProductBatch() {
    const grid = document.getElementById('productsGrid');

    // Remove existing load more button if present
    const existingLoadMore = document.getElementById('loadMoreBtn');
    if (existingLoadMore) {
        existingLoadMore.remove();
    }

    const toDisplay = currentProductList.slice(productsDisplayedCount, productsDisplayedCount + productsDisplayLimit);
    toDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                window.location.hash = 'product/' + product.id;
            }
        });
        grid.appendChild(card);
    });

    productsDisplayedCount += toDisplay.length;

    // If more products remain, add "Load More" button
    if (productsDisplayedCount < currentProductList.length) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'loadMoreBtn';
        loadMoreBtn.className = 'btn';
        loadMoreBtn.style.width = '100%';
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.addEventListener('click', function() {
            renderProductBatch();
        });
        grid.appendChild(loadMoreBtn);
    }
}

// Adjust search functionality to work with pagination
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    currentProductList = DB.products.filter(p => p.category === currentCategory);
    const filtered = currentProductList.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    productsDisplayedCount = 0;
    currentProductList = filtered;

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No products found</p>';
        return;
    }

    renderProductBatch();
});

// Search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const allProducts = DB.products.filter(p => p.category === currentCategory);
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
    );

    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No products found</p>';
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                showProductDetail(product.id);
            }
        });
        grid.appendChild(card);
    });
});

// Show product detail
function showProductDetail(productId) {
    const product = DB.products.find(p => p.id === productId);
    currentProduct = product;

    document.getElementById('detailImage').textContent = product.icon;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailPrice').textContent = `₹${product.price}`;
    document.getElementById('detailDescription').textContent = product.description;

    const featuresList = document.getElementById('detailFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById('quantityInput').value = 1;
    showPage('productDetail');
}

// Quantity controls
document.getElementById('decreaseQty').addEventListener('click', function() {
    const input = document.getElementById('quantityInput');
    if (input.value > 1) input.value = parseInt(input.value) - 1;
});

document.getElementById('increaseQty').addEventListener('click', function() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
});

// Buy now button with login check
document.getElementById('buyNowBtn').addEventListener('click', function() {
    if (!currentUser) {
        alert('Please login to buy products.');
        showPage('auth');
        return;
    }
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCart(currentProduct.id, quantity);
    showCart();
});

// Add to cart function with login check
function addToCart(productId, quantity = 1) {
    if (!currentUser) {
        alert('Please login to add items to the cart.');
        showPage('auth');
        return;
    }

    const product = DB.products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show cart
document.getElementById('cartIcon').addEventListener('click', showCart);

function showCart() {
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="empty-cart"><h3>Your cart is empty</h3><p>Add some products to get started!</p></div>';
        showPage('cart');
        return;
    }

    let total = 0;
    let itemsHTML = '<div class="cart-items">';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p style="color: var(--gray);">₹${item.price} each</p>
                </div>
                <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                <div class="cart-item-price">₹${itemTotal}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    itemsHTML += '</div>';

    const summaryHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>₹${total}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping:</span>
                <span>Free</span>
            </div>
            <div class="cart-summary-row cart-total">
                <span>Total:</span>
                <span>₹${total}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
        </div>
    `;

    cartContent.innerHTML = itemsHTML + summaryHTML;
    showPage('cart');
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// Checkout with login check
function checkout() {
    if (!currentUser) {
        alert('Please login to proceed to checkout.');
        showPage('auth');
        return;
    }

    const orderId = 'ORD' + Date.now();
    const order = {
        id: orderId,
        user: currentUser.username,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };

    DB.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(DB.orders));

    document.getElementById('orderId').textContent = orderId;

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    showPage('success');
}


// Continue shopping after checkout
document.getElementById('continueShopping').addEventListener('click', function() {
    showPage('home');
});

// Show profile page with transactions
function showProfile() {
    showPage('profile');

    const transactionsBody = document.getElementById('transactionsBody');
    const noTransactionsMessage = document.getElementById('noTransactionsMessage');

    // Clear previous rows
    transactionsBody.innerHTML = '';

    // Filter orders related to currentUser
    const userOrders = DB.orders.filter(order => order.user === currentUser.username);

    if (userOrders.length === 0) {
        noTransactionsMessage.classList.remove('hidden');
        document.getElementById('transactionsTable').classList.add('hidden');
        return;
    } else {
        noTransactionsMessage.classList.add('hidden');
        document.getElementById('transactionsTable').classList.remove('hidden');
    }

    // Generate rows for orders
    userOrders.forEach(order => {
        const tr = document.createElement('tr');

        // Format date nicely
        const orderDate = new Date(order.date).toLocaleString();

        // Summary of items: name x qty
        const itemsSummary = order.items.map(item => `${item.name} x${item.quantity}`).join(', ');

        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${orderDate}</td>
            <td>₹${order.total}</td>
            <td>${itemsSummary}</td>
        `;

        transactionsBody.appendChild(tr);
    });
}

// Back navigation
document.getElementById('backToHome').addEventListener('click', function(e) {
    e.preventDefault();
    showPage('home');
});

document.getElementById('backToProducts').addEventListener('click', function(e) {
    e.preventDefault();
    showProducts(currentCategory);
});

document.getElementById('backFromCart').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentCategory) {
        showProducts(currentCategory);
    } else {
        showPage('home');
    }
});

document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault();
    if (currentUser) {
        showPage('home');
    }
});

// Initialize the app
init();
