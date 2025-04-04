
const products = {
    nikon: [
        {
            id: 1,
            name: "Nikon D850",
            description: "Cámara DSLR full-frame con resolución de 45.7MP y 4K UHD.",
            price: 45999,
            image: "images/Nikon D850.jpg"
        },
        {
            id: 2,
            name: "Nikon Z6 II",
            description: "Cámara mirrorless full-frame con sensor de 24.5MP y doble procesador.",
            price: 38999,
            image: "images/Nikon Z6 II.jpg"
        },
        {
            id: 3,
            name: "Nikon D3500",
            description: "Cámara DSLR para principiantes con sensor APS-C de 24.2MP.",
            price: 8999,
            image: "images/Nikon D3500.jpg"
        },
        {
            id: 4,
            name: "Nikon Coolpix P1000",
            description: "Cámara bridge con zoom óptico de 125x y 4K UHD.",
            price: 21999,
            image: "images/Nikon Coolpix P1000.jpg"
        },
        {
            id: 13,
            name: "Nikon Z50",
            description: "Cámara mirrorless APS-C compacta con sensor de 20.9MP y 4K UHD.",
            price: 24999,
            image: "images/Nikon Z50.jpg"
        },
        {
            id: 14,
            name: "Nikon D780",
            description: "Cámara DSLR full-frame con sensor de 24.5MP y doble sistema AF.",
            price: 42999,
            image: "images/Nikon D780.jpg"
        }
    ],
    canon: [
        {
            id: 5,
            name: "Canon EOS R5",
            description: "Cámara mirrorless full-frame con 8K RAW y estabilización de 8 stops.",
            price: 68999,
            image: "images/Canon EOS R5.jpg"
        },
        {
            id: 6,
            name: "Canon EOS 90D",
            description: "Cámara DSLR APS-C con sensor de 32.5MP y 4K sin crop.",
            price: 24999,
            image: "images/Canon EOS 90D.jpg"
        },
        {
            id: 7,
            name: "Canon EOS Rebel T7",
            description: "Cámara DSLR para principiantes con 24.1MP y Wi-Fi.",
            price: 8999,
            image: "images/Canon EOS Rebel T7.jpg"
        },
        {
            id: 8,
            name: "Canon PowerShot SX70 HS",
            description: "Cámara bridge con zoom óptico 65x y 4K UHD.",
            price: 14999,
            image: "images/Canon PowerShot SX70 HS.jpg"
        },
        {
            id: 15,
            name: "Canon EOS R6",
            description: "Cámara mirrorless full-frame con sensor de 20.1MP y 4K 60p.",
            price: 52999,
            image: "images/Canon EOS R6.jpg"
        },
        {
            id: 16,
            name: "Canon EOS M50 Mark II",
            description: "Cámara mirrorless APS-C con sensor de 24.1MP y 4K UHD.",
            price: 17999,
            image: "images/Canon EOS M50 Mark II.jpg"
        }
    ],
    olympus: [
        {
            id: 9,
            name: "Olympus OM-D E-M1 Mark III",
            description: "Cámara mirrorless Micro Four Thirds con estabilización de 7.5 stops.",
            price: 32999,
            image: "images/Olympus OM-D E-M1 Mark III.jpg"
        },
        {
            id: 10,
            name: "Olympus PEN E-PL10",
            description: "Cámara mirrorless compacta con sensor de 16.1MP y pantalla táctil abatible.",
            price: 12999,
            image: "images/Olympus PEN E-PL10.jpg"
        },
        {
            id: 11,
            name: "Olympus Tough TG-6",
            description: "Cámara resistente a golpes, agua y frío con 4K UHD.",
            price: 10999,
            image: "images/Olympus Tough TG-6.jpg"
        },
        {
            id: 12,
            name: "Olympus OM-D E-M5 Mark II",
            description: "Cámara mirrorless compacta con sensor de 20.4MP y 4K.",
            price: 24999,
            image: "images/Olympus OM-D E-M5 Mark II.jpg"
        },
        {
            id: 17,
            name: "Olympus OM-D E-M10 Mark IV",
            description: "Cámara mirrorless compacta con sensor de 20.3MP y 4K.",
            price: 18999,
            image: "images/Olympus OM-D E-M10 Mark IV.jpg"
        },
        {
            id: 18,
            name: "Olympus Zuiko 12-40mm f/2.8 PRO",
            description: "Lente zoom profesional para sistema Micro Four Thirds.",
            price: 21999,
            image: "images/Olympus Zuiko.jpg"
        }
    ]
};


let cart = [];

// Elementos del DOM
const mainContent = document.getElementById('main-content');
const cartModal = document.getElementById('cart-modal');
const productModal = document.getElementById('product-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const productDetailContent = document.getElementById('product-detail-content');
const checkoutItemsContainer = document.getElementById('checkout-items');
const checkoutTotalElement = document.getElementById('checkout-total');


window.addEventListener('beforeunload', () => {
    localStorage.removeItem('user');
});


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (new Date().getTime() < parsedCart.expiry) {
            cart = parsedCart.items;
            updateCart();
        } else {
            localStorage.removeItem('cart');
        }
    }
}


document.getElementById('login-btn').addEventListener('click', () => {
    const username = prompt("Ingrese su nombre (opcional)");
    if (username) {
        localStorage.setItem('user', username);
        document.getElementById('user-status').textContent = `Bienvenido, ${username}`;
    }
});


function showCategory(category) {
    if (category === 'inicio') {
        showHome();
        return;
    }
    
    const categoryProducts = products[category];
    let html = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    html += '<div class="products-container">';
    
    categoryProducts.forEach(product => {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toLocaleString('es-MX')} MXN</span>
                        <button class="add-to-cart" onclick="showProductDetail(${product.id})">+</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    mainContent.innerHTML = html;
}


function showHome() {
    const html = `
        <div class="welcome-section">
            <h2>Bienvenido a nuestra tienda de cámaras</h2>
            <p class="welcome-subtitle">Explora nuestras marcas premium de fotografía profesional</p>
            <div class="brands-container">
                <div class="brand-card" onclick="showCategory('nikon')">
                    <div class="brand-logo-container">
                        <img src="images/nikon.jpg" alt="Nikon" class="brand-logo">
                    </div>
                    <h3 class="brand-title">Nikon</h3>
                    <p class="brand-description">Innovación y calidad profesional</p>
                </div>
                <div class="brand-card" onclick="showCategory('canon')">
                    <div class="brand-logo-container">
                        <img src="images/canon.jpg" alt="Canon" class="brand-logo">
                    </div>
                    <h3 class="brand-title">Canon</h3>
                    <p class="brand-description">Tecnología líder en imagen</p>
                </div>
                <div class="brand-card" onclick="showCategory('olympus')">
                    <div class="brand-logo-container">
                        <img src="images/olympus.jpg" alt="Olympus" class="brand-logo">
                    </div>
                    <h3 class="brand-title">Olympus</h3>
                    <p class="brand-description">Precisión y portabilidad</p>
                </div>
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
}


function showProductDetail(productId) {
    // Buscar el producto en todas las categorías
    let product = null;
    for (const category in products) {
        const foundProduct = products[category].find(p => p.id === productId);
        if (foundProduct) {
            product = foundProduct;
            break;
        }
    }
    
    if (!product) return;
    
    productDetailContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        <h3 class="product-detail-title">${product.name}</h3>
        <p class="product-detail-price">$${product.price.toLocaleString('es-MX')} MXN</p>
        <p class="product-detail-description">${product.description}. Esta cámara ofrece características avanzadas para fotógrafos profesionales y entusiastas. Incluye conectividad Wi-Fi, pantalla táctil abatible y capacidad para grabar video en alta definición.</p>
        <div class="quantity-controls">
            <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
            <input type="number" class="quantity-input" value="1" min="1" id="product-quantity">
            <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        <div class="action-buttons">
            <button class="back-btn" onclick="hideProductModal()">Volver</button>
            <button class="pay-btn" onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
    `;
    
    productModal.style.display = 'flex';
}


function changeQuantity(change) {
    const quantityInput = document.getElementById('product-quantity');
    let quantity = parseInt(quantityInput.value) + change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
}


function addToCart(productId) {
    const quantityInput = document.getElementById('product-quantity');
    const quantity = parseInt(quantityInput.value);
    
   
    let product = null;
    for (const category in products) {
        const foundProduct = products[category].find(p => p.id === productId);
        if (foundProduct) {
            product = foundProduct;
            break;
        }
    }
    
    if (!product) return;
    
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCart();
    hideProductModal();
}


function updateCart() {
  
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
   
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toLocaleString('es-MX')} c/u</span>
                </div>
                <div class="cart-item-controls">
                    <span class="decrease-item" onclick="updateCartItem(${index}, -1)">−</span>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <span class="increase-item" onclick="updateCartItem(${index}, 1)">+</span>
                    <span class="remove-item" onclick="removeFromCart(${index})">✖</span>
                </div>
                <span class="cart-item-total">$${itemTotal.toLocaleString('es-MX')}</span>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html || '<p>Tu carrito está vacío</p>';
    cartTotalElement.textContent = `$${total.toLocaleString('es-MX')}`;
    
   
    const cartWithExpiry = {
        items: cart,
        expiry: new Date().getTime() + 3600000 // 1 hora
    };
    localStorage.setItem('cart', JSON.stringify(cartWithExpiry));
}


function updateCartItem(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        updateCart();
    }
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    updateCart();
    cartModal.style.display = 'flex';
}

function hideCart() {
    cartModal.style.display = 'none';
}

function hideProductModal() {
    productModal.style.display = 'none';
}

function checkout() {
    let html = `
        <h3>Verifica tu compra</h3>
        <div class="checkout-items-list">
    `;
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="checkout-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${itemTotal.toLocaleString('es-MX')}</span>
            </div>
        `;
    });
    
    html += `</div>`;
    
    checkoutItemsContainer.innerHTML = html;
    checkoutTotalElement.textContent = `$${total.toLocaleString('es-MX')}`;
    
    hideCart();
    checkoutModal.style.display = 'flex';
}

function hideCheckout() {
    checkoutModal.style.display = 'none';
}

function completePurchase() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const user = localStorage.getItem('user');
    
    let html = `
        <div class="receipt">
            <h3>¡Compra realizada con éxito!</h3>
            ${user ? `<p>Cliente: ${user}</p>` : ''}
            <ul class="purchased-items">
    `;
    
    cart.forEach(item => {
        html += `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-MX')}</li>`;
    });
    
    html += `
            </ul>
            <p><strong>Total pagado: $${total.toLocaleString('es-MX')} MXN</strong></p>
            <button class="confirmation-btn" onclick="hideCheckout(); showHome()">Aceptar</button>
        </div>
    `;
    
    checkoutItemsContainer.innerHTML = html;
    localStorage.removeItem('cart');
    cart = [];
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('user')) {
        document.getElementById('user-status').textContent = 
            `Bienvenido, ${localStorage.getItem('user')}`;
    }
    loadCart();
    showHome();
});