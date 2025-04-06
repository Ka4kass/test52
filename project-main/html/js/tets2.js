document.addEventListener('DOMContentLoaded', function() {
    // Define all cities with their featured products in a structured format
    const cities = [
        { name: "Berlin", product: "Berliner Fernsehturm", price: 29.00, description: "Ein ikonisches 3D-Modell des berühmten Fernsehturms im Herzen Berlins, detailgetreu nachgebildet.", scale: "1:200", parts: 245, region: "Berlin-Brandenburg", image: "./img/test.jpg" },
        { name: "Köln", product: "Kölner Dom", price: 24.00, description: "Detailreiches 3D-Modell der gotischen Kathedrale, eines der bekanntesten Wahrzeichen Deutschlands.", scale: "1:300", parts: 310, region: "Nordrhein-Westfalen", image: "/api/placeholder/400/500" },
        { name: "Hamburg", product: "Hamburger Hafen", price: 28.00, description: "Urbanes 3D-Modell der maritimen Landschaft Hamburgs mit detaillierten Hafenelementen.", scale: "1:500", parts: 275, region: "Hamburg", image: "/api/placeholder/400/500" },
        { name: "München", product: "Frauenkirche", price: 26.00, description: "Präzises 3D-Modell der berühmten Münchner Frauenkirche mit ihren charakteristischen Zwiebeltürmen.", scale: "1:250", parts: 230, region: "Bayern", image: "/api/placeholder/400/500" },
        { name: "Nürnberg", product: "Kaiserburg", price: 23.00, description: "Detailliertes 3D-Modell der historischen Kaiserburg mit Blick über die Altstadt.", scale: "1:220", parts: 260, region: "Bayern", image: "/api/placeholder/400/500" },
        { name: "Augsburg", product: "Rathaus", price: 21.50, description: "Elegantes 3D-Modell des Renaissance-Rathauses mit seinem goldenen Saal.", scale: "1:200", parts: 195, region: "Bayern", image: "/api/placeholder/400/500" },
        { name: "Regensburg", product: "Dom St. Peter", price: 25.50, description: "Fein ausgearbeitetes 3D-Modell des gotischen Doms St. Peter.", scale: "1:280", parts: 320, region: "Bayern", image: "/api/placeholder/400/500" },
        { name: "Würzburg", product: "Residenz", price: 24.50, description: "Detailgetreues 3D-Modell des UNESCO-Weltkulturerbes mit barocken Elementen.", scale: "1:350", parts: 285, region: "Bayern", image: "/api/placeholder/400/500" },
        { name: "Düsseldorf", product: "Medienhafen", price: 27.00, description: "Modernes 3D-Modell der architektonisch beeindruckenden Hafenlandschaft.", scale: "1:400", parts: 240, region: "Nordrhein-Westfalen", image: "/api/placeholder/400/500" },
        { name: "Dortmund", product: "Signal Iduna Park", price: 31.00, description: "Detailliertes 3D-Modell des größten Fußballstadions Deutschlands.", scale: "1:600", parts: 350, region: "Nordrhein-Westfalen", image: "/api/placeholder/400/500" },
        { name: "Potsdam", product: "Schloss Sanssouci", price: 27.50, description: "Elegantes 3D-Modell des berühmten Sommerschlosses Friedrichs des Großen.", scale: "1:250", parts: 265, region: "Berlin-Brandenburg", image: "/api/placeholder/400/500" }
    ];
    
    // Group cities by region for easier access
    const citiesByRegion = cities.reduce((acc, city) => {
        if (!acc[city.region]) {
            acc[city.region] = [];
        }
        acc[city.region].push(city.name);
        return acc;
    }, {});
    
    // Handle product selection display
    const productSelection = document.querySelector('.product-selection');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = urlParams.get('city');
    const selectedRegion = urlParams.get('region');
    
    // Update page title based on selection
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        if (selectedCity) {
            sectionTitle.textContent = `Produkte aus ${selectedCity}`;
        } else if (selectedRegion) {
            sectionTitle.textContent = `Produkte aus ${selectedRegion}`;
        } else {
            sectionTitle.textContent = "Alle Städte";
        }
    }
    
    if (productSelection) {
        // Clear any existing content
        productSelection.innerHTML = '';
        
        // Filter cities based on URL parameters
        let displayCities = cities;
        if (selectedCity) {
            displayCities = cities.filter(city => city.name === selectedCity);
        } else if (selectedRegion) {
            displayCities = cities.filter(city => city.region === selectedRegion);
        }
        
        // Add product items for filtered cities
        displayCities.forEach((city) => {
            // Create product item HTML structure
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // Create product item inner structure
            const productHTML = `
                <div class="product-image">
                    <img src="${city.image}" alt="${city.product}">
                </div>
                <div class="product-info">
                    <h3>${city.product}</h3>
                    <p class="location">${city.name}</p>
                    <p class="description">${city.description}</p>
                    <div class="product-meta">
                        <span class="price">${city.price.toFixed(2).replace('.', ',')} €</span>
                        <span class="detail">Maßstab: ${city.scale} | Teile: ${city.parts}</span>
                    </div>
                </div>
            `;
            
            productItem.innerHTML = productHTML;
            
            // Add "Add to Cart" button
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.textContent = 'In den Warenkorb';
            addToCartBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Create product object for the cart
                const product = {
                    name: city.product,
                    city: city.name,
                    price: city.price,
                    image: city.image
                };
                
                // Add product to cart
                addToCart(product);
                
                return false;
            };
            
            // Append the button to the product-info div
            productItem.querySelector('.product-info').appendChild(addToCartBtn);
            
            // Make whole product item clickable for product details
            productItem.addEventListener('click', function(e) {
                if (!e.target.classList.contains('add-to-cart')) {
                    window.location.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}&image=${encodeURIComponent(city.image)}&scale=${encodeURIComponent(city.scale)}&parts=${city.parts}&description=${encodeURIComponent(city.description)}`;
                }
            });
            
            productSelection.appendChild(productItem);
        });
        
        // Show message if no products found
        if (displayCities.length === 0) {
            const noProducts = document.createElement('div');
            noProducts.className = 'no-products';
            noProducts.textContent = 'Keine Produkte gefunden';
            productSelection.appendChild(noProducts);
        }
    }
    
    // Handle product detail page
    const productDetail = document.querySelector('.product-detail');
    if (productDetail && window.location.pathname.includes('product.html')) {
        const productName = urlParams.get('name');
        const productCity = urlParams.get('city');
        const productPrice = parseFloat(urlParams.get('price') || 0);
        const productImage = urlParams.get('image');
        const productScale = urlParams.get('scale');
        const productParts = urlParams.get('parts');
        const productDescription = urlParams.get('description');
        
        if (productName) {
            // Update page title
            document.title = `${productName} - Versity`;
            
            // Create product detail HTML
            productDetail.innerHTML = `
                <div class="container">
                    <div class="product-detail-content">
                        <div class="product-image">
                            <img src="${productImage}" alt="${productName}">
                        </div>
                        <div class="product-info">
                            <h1>${productName}</h1>
                            <p class="location">${productCity}</p>
                            <p class="description">${productDescription}</p>
                            <div class="product-meta">
                                <span class="price">${productPrice.toFixed(2).replace('.', ',')} €</span>
                                <span class="detail">Maßstab: ${productScale} | Teile: ${productParts}</span>
                            </div>
                            <button id="addToCartDetail" class="add-to-cart">In den Warenkorb</button>
                            <div class="product-additional-info">
                                <h3>Produktdetails</h3>
                                <p>Dieses hochwertige 3D-Modell ist perfekt für Architekturliebhaber und Sammler. Hergestellt aus langlebigem Material, bietet es ein authentisches Abbild des originalen Bauwerks.</p>
                                <h3>Lieferung</h3>
                                <p>Versand innerhalb Deutschlands: 3-5 Werktage</p>
                                <p>Internationaler Versand: 7-14 Werktage</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listener to the "Add to Cart" button on product detail page
            const addToCartDetailBtn = document.getElementById('addToCartDetail');
            if (addToCartDetailBtn) {
                addToCartDetailBtn.addEventListener('click', function() {
                    // Create product object for the cart
                    const product = {
                        name: productName,
                        city: productCity,
                        price: productPrice,
                        image: productImage
                    };
                    
                    // Add product to cart
                    addToCart(product);
                });
            }
        }
    }
    
    // Handle region pages
    const citiesList = document.getElementById('cities-list');
    if (citiesList && selectedRegion) {
        // Clear existing content
        citiesList.innerHTML = '';
        
        // Display cities for the selected region
        if (citiesByRegion[selectedRegion]) {
            citiesByRegion[selectedRegion].forEach(cityName => {
                const cityLink = document.createElement('a');
                cityLink.href = `products.html?city=${encodeURIComponent(cityName)}`;
                cityLink.textContent = cityName;
                cityLink.className = 'city-card';
                citiesList.appendChild(cityLink);
            });
        } else {
            citiesList.innerHTML = '<p>Keine Städte gefunden</p>';
        }
    }
    
    // Initialize the shopping cart functionality
    initShoppingCart();
});

// Function to initialize shopping cart functionality
function initShoppingCart() {
    // Initialize the order count display
    updateOrderCount();
    
    // Setup modal functionality
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const clearOrdersBtn = document.getElementById('clearOrders');
    const continueOrderBtn = document.getElementById('continueOrder');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener('click', function() {
            localStorage.removeItem('orders');
            updateOrderList();
            updateOrderCount();
        });
    }
    
    if (continueOrderBtn) {
        continueOrderBtn.addEventListener('click', function() {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    }
    
    // If we're on the product.html page, update the product display
    const urlParams = new URLSearchParams(window.location.search);
    const productName = document.getElementById('product-name');
    const productCity = document.getElementById('product-city');
    const productPrice = document.getElementById('product-price');
    
    if (productName && productCity && productPrice && window.location.pathname.includes('product.html')) {
        productName.textContent = urlParams.get('name') || 'Produktname';
        productCity.textContent = urlParams.get('city') || '';
        const price = parseFloat(urlParams.get('price') || 0);
        productPrice.textContent = `${price.toFixed(2).replace('.', ',')} €`;
    }
}

// Function to add product to cart
function addToCart(product) {
    // Validate product object
    if (!product || !product.name || isNaN(product.price)) {
        console.error('Invalid product data');
        return;
    }
    
    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add the new product to orders
    orders.push(product);
    
    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Update the cart display
    updateOrderList();
    updateOrderCount();
    
    // Open the modal
    openModal();
    
    // Show confirmation message
    showNotification(`${product.name} wurde zum Warenkorb hinzugefügt`);
}

// Function to show a notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Function to update the order count in the header
function updateOrderCount() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderCountElement = document.getElementById('orderCount');
    if (orderCountElement) {
        orderCountElement.textContent = orders.length;
    }
}

// Function to update the order list in the modal
function updateOrderList() {
    const orderList = document.getElementById('orderList');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderList || !orderTotal) return;
    
    // Get orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Clear the current list
    orderList.innerHTML = '';
    
    // Calculate total
    let totalAmount = 0;
    
    if (orders.length === 0) {
        orderList.innerHTML = '<p class="empty-cart">Ihr Warenkorb ist leer</p>';
    } else {
        // Add each order to the list
        orders.forEach((order, index) => {
            if (!order || !order.name || isNaN(order.price)) return;
            
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            
            orderItem.innerHTML = `
                <span>${index + 1}. ${order.name} (${order.city}) - ${order.price.toFixed(2).replace('.', ',')} €</span>
                <div class="remove-order" data-index="${index}">×</div>
            `;
            
            orderList.appendChild(orderItem);
            
            totalAmount += order.price;
        });
        
        // Add event listeners to remove buttons
        const removeButtons = orderList.querySelectorAll('.remove-order');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeOrder(index);
            });
        });
    }
    
    // Update the total amount display
    orderTotal.textContent = `Summe: ${totalAmount.toFixed(2).replace('.', ',')} €`;
}

// Function to remove an order from the cart
function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (index >= 0 && index < orders.length) {
        const removedProduct = orders[index];
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        updateOrderList();
        updateOrderCount();
        
        // Show confirmation message
        showNotification(`${removedProduct.name} wurde aus dem Warenkorb entfernt`);
    }
}

// Function to open the modal
function openModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.classList.add('open');
        orderModal.style.visibility = 'visible';
        orderModal.style.opacity = '1';

        // Update order list when opening modal
        updateOrderList();
    }
}

// Function to close the modal
function closeModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.classList.remove('open');
        orderModal.style.visibility = 'hidden';
        orderModal.style.opacity = '0';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Get the nav toggle button and the navigation element
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    // Add click event listener to the toggle button
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            // Toggle a class on the nav element to show/hide it
            nav.classList.toggle('active');
            
            // Optionally, toggle a class on the button itself to show it's active
            navToggle.classList.toggle('active');
        });
    }
});



// Make functions available globally
window.addToCart = addToCart;
window.updateOrderList = updateOrderList;
window.updateOrderCount = updateOrderCount;
window.removeOrder = removeOrder;
window.openModal = openModal;
window.closeModal = closeModal;