// --- 1. LOADING SCREEN LOGIC ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800); 
    }, 2000); 
});

// --- 2. NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll ke Menu
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// --- 3. 3D GLASS TILT EFFECT ---
function tiltEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(element) {
    element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
}

// --- 4. CART & DRAWER LOGIC ---
let cart = [];

function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    renderCart();
}

function addToCart(name, price) {
    cart.push({ id: Date.now(), name, price });
    
    // Update Badge
    document.getElementById('cart-badge').innerText = cart.length;
    
    // Animasi Icon Cart
    const icon = document.querySelector('.cart-icon');
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);

    if(!document.getElementById('cart-drawer').classList.contains('open')) {
        toggleCart();
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const btnCheckout = document.getElementById('btn-checkout');
    
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888; margin-top:50px;">Belum ada racikan yang dipilih.</p>';
        btnCheckout.disabled = true;
    } else {
        btnCheckout.disabled = false;
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${formatRupiah(item.price)}</p>
                    </div>
                    <button class="btn-remove" onclick="removeItem(${index})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
        });
    }
    totalEl.innerText = formatRupiah(total);
}

function removeItem(index) {
    cart.splice(index, 1);
    document.getElementById('cart-badge').innerText = cart.length;
    renderCart();
}

// --- 5. CHECKOUT & RECEIPT ANIMATION ---
function processCheckout() {
    const btnCheckout = document.getElementById('btn-checkout');
    btnCheckout.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...';
    btnCheckout.disabled = true;

    setTimeout(() => {
        toggleCart();
        
        btnCheckout.innerHTML = 'CHECKOUT';
        
        // Kode antrean khusus Coffershop (Menggunakan C-)
        const queue = 'C-' + Math.floor(Math.random() * 90 + 10);
        document.getElementById('queue-number').innerText = queue;
        
        document.getElementById('receipt-modal').style.display = 'flex';
        
        cart = [];
        document.getElementById('cart-badge').innerText = '0';
        
    }, 2500);
}

function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}