document.addEventListener('DOMContentLoaded', function() {
    // Define all cities with their featured products in a flat list
    const cities = [
        { 
            name: "Berlin", 
            product: "Berliner Fernsehturm", 
            price: 29.00, 
            description: "Ein ikonisches 3D-Modell des berühmten Fernsehturms im Herzen Berlins, detailgetreu nachgebildet.", 
            scale: "1:200", 
            parts: 24,
            image: "./img/test2.jpg"
        },
        { 
            name: "Köln", 
            product: "Kölner Dom", 
            price: 24.00, 
            description: "Detailreiches 3D-Modell der gotischen Kathedrale, eines der bekanntesten Wahrzeichen Deutschlands.", 
            scale: "1:300", 
            parts: 310,
            image: "img/products/koeln/dom.jpg"
        },
        { 
            name: "Hamburg", 
            product: "Hamburger Hafen", 
            price: 28.00, 
            description: "Urbanes 3D-Modell der maritimen Landschaft Hamburgs mit detaillierten Hafenelementen.", 
            scale: "1:500", 
            parts: 275,
            image: "img/products/hamburg/hafen.jpg"
        },
        { 
            name: "München", 
            product: "Frauenkirche", 
            price: 26.00, 
            description: "Präzises 3D-Modell der berühmten Münchner Frauenkirche mit ihren charakteristischen Zwiebeltürmen.", 
            scale: "1:250", 
            parts: 230,
            image: "img/products/muenchen/frauenkirche.jpg"
        },
        { 
            name: "Nürnberg", 
            product: "Kaiserburg", 
            price: 23.00, 
            description: "Detailliertes 3D-Modell der historischen Kaiserburg mit Blick über die Altstadt.", 
            scale: "1:220", 
            parts: 260,
            image: "img/products/nuernberg/kaiserburg.jpg"
        },
        { 
            name: "Augsburg", 
            product: "Rathaus", 
            price: 21.50, 
            description: "Elegantes 3D-Modell des Renaissance-Rathauses mit seinem goldenen Saal.", 
            scale: "1:200", 
            parts: 195,
            image: "img/products/augsburg/rathaus.jpg"
        },
        { 
            name: "Regensburg", 
            product: "Dom St. Peter", 
            price: 25.50, 
            description: "Fein ausgearbeitetes 3D-Modell des gotischen Doms St. Peter.", 
            scale: "1:280", 
            parts: 320,
            image: "img/products/regensburg/dom.jpg"
        },
        { 
            name: "Würzburg", 
            product: "Residenz", 
            price: 24.50, 
            description: "Detailgetreues 3D-Modell des UNESCO-Weltkulturerbes mit barocken Elementen.", 
            scale: "1:350", 
            parts: 285,
            image: "img/products/wuerzburg/residenz.jpg"
        },
        { 
            name: "Düsseldorf", 
            product: "Medienhafen", 
            price: 27.00, 
            description: "Modernes 3D-Modell der architektonisch beeindruckenden Hafenlandschaft.", 
            scale: "1:400", 
            parts: 240,
            image: "img/products/duesseldorf/medienhafen.jpg"
        },
        { 
            name: "Dortmund", 
            product: "Signal Iduna Park", 
            price: 31.00, 
            description: "Detailliertes 3D-Modell des größten Fußballstadions Deutschlands.", 
            scale: "1:600", 
            parts: 350,
            image: "img/products/dortmund/signal-iduna-park.jpg"
        },
        { 
            name: "Potsdam", 
            product: "Schloss Sanssouci", 
            price: 27.50, 
            description: "Elegantes 3D-Modell des berühmten Sommerschlosses Friedrichs des Großen.", 
            scale: "1:250", 
            parts: 265,
            image: "img/products/potsdam/sanssouci.jpg"
        }
    ];
    
    // Display the list of cities in the product-selection section
    const productSelection = document.querySelector('.product-selection');
    
    if (productSelection) {
        // Clear any existing content
        productSelection.innerHTML = '';
        
        // Add product items for all cities
        cities.forEach((city) => {
            // Create product item HTML structure
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // Create anchor link wrapper for the product
            const productLink = document.createElement('a');
            productLink.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}`;
            
            // Create product item inner structure
            const productHTML = `
                <div class="product-image">
                    <img src="image" alt="${city.product}">
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
                e.preventDefault(); // Prevent navigation to product page
                e.stopPropagation(); // Prevent event bubbling
                
                // Create product object for the cart
                const product = {
                    name: city.product,
                    city: city.name,
                    price: city.price,
                    image: `/api/placeholder/400/500`
                };
                
                // Add product to cart
                addToCart(product);
                
                return false;
            };
            
            // Append the button to the product-info div
            productItem.querySelector('.product-info').appendChild(addToCartBtn);
            
            // Make whole product item clickable except the button
            productItem.addEventListener('click', function(e) {
                if (!e.target.classList.contains('add-to-cart')) {
                    window.location.href = productLink.href;
                }
            });
            
            productSelection.appendChild(productItem);
        });
    }
    
    // Update page title
    document.querySelector('.section-title').textContent = "Alle Städte";
    
    // Initialize the order count display
    updateOrderCount();
    
    // Setup modal functionality
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const clearOrdersBtn = document.getElementById('clearOrders');
    
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
});

// Function to add product to cart
function addToCart(product) {
    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Add the new product to orders
    orders.push(product);
    
    // Save updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    
    // Update the cart display
    updateOrderList();
    updateOrderCount();
    
    // Open the modal
    openModal();
}

// Function to update the order count in the header
function updateOrderCount() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderCountElement = document.getElementById("orderCount");
    if (orderCountElement) {
        orderCountElement.textContent = orders.length;
    }
}

// Function to update the order list in the modal
function updateOrderList() {
    const orderList = document.getElementById("orderList");
    const orderTotal = document.getElementById("orderTotal");
    
    if (!orderList || !orderTotal) return;
    
    // Get orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Clear the current list
    orderList.innerHTML = "";
    
    // Calculate total
    let totalAmount = 0;
    
    // Add each order to the list
    orders.forEach((order, index) => {
        if (!order || !order.name || isNaN(order.price)) return;
        
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        
        orderItem.innerHTML = `
            <span>${index + 1}. ${order.name} (${order.city}) - ${order.price.toFixed(2).replace('.', ',')} €</span>
            <div class="remove-order" onclick="removeOrder(${index})">×</div>
        `;
        
        orderList.appendChild(orderItem);
        
        totalAmount += order.price;
    });
    
    // Update the total amount display
    orderTotal.textContent = `Summe: ${totalAmount.toFixed(2).replace('.', ',')} €`;
}

// Function to remove an order from the cart
function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    updateOrderList();
    updateOrderCount();
}

// Function to open the modal
function openModal() {
    const orderModal = document.getElementById("orderModal");
    if (orderModal) {
        orderModal.classList.add("open");
        orderModal.style.visibility = "visible";
        orderModal.style.opacity = "1";

        // Update order list when opening modal
        updateOrderList();
    }
}

// Function to close the modal
function closeModal() {
    const orderModal = document.getElementById("orderModal");
    if (orderModal) {
        orderModal.classList.remove("open");
        orderModal.style.visibility = "hidden";
        orderModal.style.opacity = "0";
    }
}


// Make sure these functions are available globally
window.addToCart = addToCart;
window.updateOrderList = updateOrderList;
window.updateOrderCount = updateOrderCount;
window.removeOrder = removeOrder;
window.openModal = openModal;
window.closeModal = closeModal;