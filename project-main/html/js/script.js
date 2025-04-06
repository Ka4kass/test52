document.addEventListener('DOMContentLoaded', function() {
    // Get product parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const cityName = urlParams.get('city');
    const productPrice = urlParams.get('price');
    
    // Update product details on the page
    document.title = productName + " - " + cityName + " | Versity";
    
    // Find and update product elements
    const productTitleElement = document.querySelector('.product-title');
    const productCityElement = document.querySelector('.product-city');
    const productPriceElement = document.querySelector('.product-price');
    const productImageElement = document.querySelector('.product-image');
    
    if (productTitleElement) productTitleElement.textContent = productName;
    if (productCityElement) productCityElement.textContent = cityName;
    if (productPriceElement) productPriceElement.textContent = `€${parseFloat(productPrice).toFixed(2).replace('.', ',')}`;
    if (productImageElement) productImageElement.src = `/api/placeholder/400/500`;
    
    // Set up the order button
    const orderButton = document.getElementById('orderProduct');
    if (orderButton) {
        orderButton.onclick = function() {
            const product = {
                name: productName,
                city: cityName,
                price: parseFloat(productPrice),
                image: `/api/placeholder/400/500`
            };
            
            addToCart(product);
        };
    }
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            loadProducts(products);
            loadProductDetails(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});

function loadProducts(products) {
    const productContainer = document.getElementById("productList");
    if (!productContainer) return;

    products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <span>${product.name} (${product.city}) - $${product.price.toFixed(2)}</span>
            <button onclick='selectProduct(${index})'>Деталі</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Функція збереження вибраного товару та перехід на сторінку товару
function selectProduct(index) {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            localStorage.setItem("selectedProduct", JSON.stringify(products[index]));
            window.location.href = "product-details.html"; // Перенаправлення на сторінку
        });
}

function loadProductDetails(products) {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.getElementById("product-price").textContent = `$${selectedProduct.price}`;
    document.getElementById("product-city").textContent = `Місто: ${selectedProduct.city}`;

    // Оновлення кнопки замовлення
    const orderButton = document.getElementById("orderProduct");
    orderButton.setAttribute("data-name", selectedProduct.name);
    orderButton.setAttribute("data-price", selectedProduct.price);
}

// Додавання товару у кошик
document.getElementById("orderProduct")?.addEventListener("click", function () {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(selectedProduct);
    localStorage.setItem("orders", JSON.stringify(orders));

    updateOrderList();
    openModal();
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            loadProductDetails(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));
});

function loadProductDetails(products) {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!selectedProduct) return;

    document.getElementById("product-name").textContent = selectedProduct.name;
    document.getElementById("product-description").textContent = selectedProduct.description;
    document.getElementById("product-city").textContent = `Місто: ${selectedProduct.city}`;
    document.getElementById("product-price").textContent = `$${selectedProduct.price}`;

    const imageElement = document.querySelector(".product-image img");
    imageElement.src = selectedProduct.image;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("orderProduct")?.addEventListener("click", function () {
        const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
        if (!selectedProduct) return;

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(selectedProduct);
        localStorage.setItem("orders", JSON.stringify(orders));

        updateOrderList();
        openModal();
    });

    updateOrderList();
});
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

function updateOrderList() {
    const orderList = document.getElementById("orderList");
    const orderCount = document.getElementById("orderCount");
    const orderTotal = document.getElementById("orderTotal");
    
    if (!orderList) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orderList.innerHTML = "";
    let totalAmount = 0;

    orders.forEach((order, index) => {
        if (!order || !order.name || isNaN(order.price)) return;

        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <span>${index + 1}. ${order.name} (${order.city}) - $${order.price.toFixed(2)}</span>
            <div onclick="removeOrder(${index})">×</div>
        `;
        orderList.appendChild(orderItem);

        totalAmount += order.price;
    });

    orderCount.textContent = orders.length;
    orderTotal.textContent = `Загальна сума: $${totalAmount.toFixed(2)}`;
}

function removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderList();
}
function openModal() {
    const orderModal = document.getElementById("orderModal");
    orderModal.classList.add("open");

    updateOrderList();
}
// Функція для отримання параметрів з URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        city: params.get("city"),
        price: params.get("price"),
    };
}

// Отримуємо дані про продукт
const product = getQueryParams();

// Вставляємо дані в HTML
document.addEventListener("DOMContentLoaded", () => {
    if (product.name) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-city").textContent = product.city;
        document.getElementById("product-price").textContent = `€${product.price}`;
    }
});


function closeModal() {
    const orderModal = document.getElementById("orderModal");
    orderModal.classList.remove("open");

    updateOrderList();
}

document.getElementById("closeModal")?.addEventListener("click", closeModal);
document.getElementById("clearOrders")?.addEventListener("click", () => {
    localStorage.removeItem("orders");
    updateOrderList();
});

document.getElementById("continueOrder")?.addEventListener("click", () => {
    const totalAmount = document.getElementById("orderTotal").textContent.replace("Загальна сума: $", "").trim();
    window.location.href = `checkout.html?total=${encodeURIComponent(totalAmount)}`;
});


document.addEventListener("DOMContentLoaded", function () {
    const orderButton = document.getElementById("orderProduct");

    if (orderButton) {
        orderButton.addEventListener("click", function () {
            const product = {
                name: orderButton.getAttribute("data-name") || "Unknown",
                city: document.getElementById("product-city").textContent.replace("Місто: ", ""),
                price: parseFloat(orderButton.getAttribute("data-price")) || 0
            };

            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(product);
            localStorage.setItem("orders", JSON.stringify(orders));

            alert(`Товар "${product.name}" додано в кошик!`);
            updateOrderCount();
        });
    }

    function updateOrderCount() {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        document.getElementById("orderCount").textContent = orders.length;
    }

    updateOrderCount();
});
// 1. Отримуємо параметр ID з URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// 2. Завантажуємо JSON з продуктами
fetch("products.json")
  .then(response => response.json())
  .then(products => {
    // 3. Знаходимо продукт по ID
    const product = products.find(p => p.id == productId);

    if (product) {
      document.querySelector(".product-title").textContent = product.name;
      document.querySelector(".product-image").src = product.image;
      document.querySelector(".product-city").textContent = product.city;
      document.querySelector(".product-price").textContent = `€${product.price}`;
    } else {
      document.querySelector(".product-info").innerHTML = "<p>Продукт не знайдено</p>";
    }
  });
