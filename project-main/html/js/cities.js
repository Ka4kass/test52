document.addEventListener('DOMContentLoaded', function() {
    // Get the region parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    
    // Define the cities by region with their featured products
    const citiesByRegion = {
        "Bayern": [
            { name: "", product: "Frauenkirche", price: 89.99 },
            { name: "Nürnberg", product: "Kaiserburg", price: 79.99 },
            { name: "Augsburg", product: "Rathaus", price: 69.99 },
            { name: "Regensburg", product: "Dom St. Peter", price: 74.99 },
            { name: "Würzburg", product: "Residenz", price: 84.99 }
        ],
        "Nordrhein-Westfalen": [
            { name: "Köln", product: "Kölner Dom", price: 99.99 },
            { name: "Düsseldorf", product: "Medienhafen", price: 89.99 },
            { name: "Dortmund", product: "Signal Iduna Park", price: 94.99 },
            { name: "Essen", product: "Zeche Zollverein", price: 79.99 },
            { name: "Bonn", product: "Altes Rathaus", price: 69.99 }
        ],
        "Berlin-Brandenburg": [
            { name: "Berlin", product: "Brandenburger Tor", price: 99.99 },
            { name: "Potsdam", product: "Schloss Sanssouci", price: 89.99 },
            { name: "Frankfurt an der Oder", product: "Rathaus", price: 69.99 }
        ],
        "Baden-Württemberg": [
            { name: "Hamburg", product: "Hamburger Hafen", price: 99.99 }
        ]
    };
    
    // Display the region name in the page title and heading
    const regionNameElements = document.querySelectorAll('#region-name, #region-title');
    regionNameElements.forEach(element => {
        if (element) {
            element.textContent = region || '';
        }
    });
    
    // Display the list of cities
    const citiesList = document.getElementById('cities-list');
    
    if (citiesList) {
        if (region && citiesByRegion[region]) {
            // Clear any existing content
            citiesList.innerHTML = '';
            
            // Add city cards for the selected region
            citiesByRegion[region].forEach((city, index) => {
                // Create product card HTML structure
                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';
                
                // Create anchor link to product page with query parameters
                const cityLink = document.createElement('a');
                cityLink.href = `product.html?name=${encodeURIComponent(city.product)}&city=${encodeURIComponent(city.name)}&price=${city.price}`;
                
                // Create product card inner structure
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Add product image
                const productImage = document.createElement('img');
                productImage.src = `/api/placeholder/400/500`;
                productImage.alt = `${city.product} in ${city.name}`;
                
                // Create product card content container
                const productContent = document.createElement('div');
                productContent.className = 'product-card-content';
                
                // Add product name heading
                const productName = document.createElement('h3');
                productName.textContent = city.product;
                
                // Add city name paragraph
                const cityName = document.createElement('p');
                cityName.textContent = city.name;
                
                // Add price span
                const priceSpan = document.createElement('span');
                priceSpan.className = 'price';
                priceSpan.textContent = `€${city.price.toFixed(2).replace('.', ',')}`;
                
                // Add "Add to Cart" button
                const addToCartBtn = document.createElement('button');
                addToCartBtn.className = 'add-to-cart-btn';
                addToCartBtn.onclick = function(e) {
                    e.preventDefault(); // Prevent navigation to product page
                    
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
                
                // Assemble the components
                productContent.appendChild(productName);
                productContent.appendChild(cityName);
                productContent.appendChild(priceSpan);
                productContent.appendChild(addToCartBtn);
                
                productCard.appendChild(productImage);
                productCard.appendChild(productContent);
                
                cityLink.appendChild(productCard);
                cityCard.appendChild(cityLink);
                citiesList.appendChild(cityCard);
            });
        } else {
            citiesList.innerHTML = '<p>Keine Region ausgewählt oder Region nicht gefunden</p>';
        }
    }
    
    // Initialize the order count display
    updateOrderCount();
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
            <span>${index + 1}. ${order.name} (${order.city}) - €${order.price.toFixed(2).replace('.', ',')}</span>
            <div class="remove-order" onclick="removeOrder(${index})">×</div>
        `;
        
        orderList.appendChild(orderItem);
        
        totalAmount += order.price;
    });
    
    // Update the total amount display
    orderTotal.textContent = `Summe: €${totalAmount.toFixed(2).replace('.', ',')}`;
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