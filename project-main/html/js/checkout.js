document.addEventListener("DOMContentLoaded", () => {
    const orderItemsList = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");

    // Отримуємо список товарів з LocalStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Якщо кошик порожній, показуємо повідомлення
    if (orders.length === 0) {
        orderItemsList.innerHTML = "<li>Your cart is empty</li>";
        totalPriceElement.textContent = "$0.00";
        return;
    }

    // Очищаємо список перед додаванням товарів
    orderItemsList.innerHTML = "";
    let totalAmount = 0;

    orders.forEach(order => {
        let listItem = document.createElement("li");
        listItem.textContent = `${order.name} - $${order.price.toFixed(2)}`;
        orderItemsList.appendChild(listItem);
        totalAmount += order.price;
    });

    // Оновлюємо загальну суму
    totalPriceElement.textContent = `$${totalAmount.toFixed(2)}`;
});
function getTotalAmount() {
    return document.getElementById("total-price").value;
}
let stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkoutForm");

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки

        // Отримуємо дані з форми
        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            payment: document.getElementById("payment").value,
            products: JSON.parse(localStorage.getItem("orders")) || []
        };

        // ✅ Зберігаємо в LocalStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // ✅ Надсилаємо замовлення у Telegram
        sendOrderToTelegram(userData);

        // ✅ Перенаправляємо на сторінку підтвердження
        window.location.href = "confirmation.html";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const stripe = Stripe("pk_test_51QzyvB045Es1ke66ebpdj4cFIvQft3ClhY6kgUSxLfc8plkJR2qAuNRVXnJdWRmS9xiJUsvFWVz4cqjFB2Zx2Zy200YpSYvJA2"); // Replace with your actual key
    const checkoutButton = document.getElementById("checkoutButton");
    const totalPrice = getTotalAmount();
 
    checkoutButton.addEventListener("click", () => {
        stripe.redirectToCheckout({
            lineItems: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Custom 3D Model",
                        },
                        unit_amount: totalPrice, // Dynamic price in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            successUrl: "https://yourwebsite.com/success",
            cancelUrl: "https://yourwebsite.com/cancel"
        }).then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        });
    });
});

