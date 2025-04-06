class ModalPage {
    constructor({
        titleText,
        messageText,
        confirmText,
        cancelText,
    }) {
        this.titleText = titleText;
        this.messageText = messageText;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
        this.modalElem = document.getElementById("orderModal"); // Використовуємо існуюче модальне вікно
        this.orders = []; // Масив для зберігання замовлень

        // Додаємо обробник подій для кліку за межами модального вікна
        if (this.modalElem) {
            this.modalElem.addEventListener("click", (event) => {
                if (event.target === this.modalElem) {
                    this.closeModal(); // Закрити модальне вікно при кліку на фон
                }
            });
        }

        // Додаємо обробник подій для кнопки "Continue to Order"
        const continueButton = document.getElementById("continueToOrder");
        if (continueButton) {
            continueButton.addEventListener("click", () => {
                this.continueToOrder(); // Перенаправити на сторінку оформлення замовлення
            });
        }
    }

    // Додати товар до списку замовлень
    addOrder(productName, productPrice) {
        this.orders.push({ name: productName, price: productPrice });
        this.updateOrderList(); // Оновити список замовлень
    }

    // Видалити товар зі списку замовлень
    removeOrder(index) {
        this.orders.splice(index, 1); // Видалити елемент за індексом
        this.updateOrderList(); // Оновити список замовлень
    }

    // Оновити список замовлень у модальному вікні
    updateOrderList() {
        const orderList = document.getElementById("orderList");
        if (orderList) {
            orderList.innerHTML = ""; // Очистити список

            // Додати кожен товар до списку
            this.orders.forEach((order, index) => {
                const orderItem = document.createElement("div");
                orderItem.classList.add("order-item");

                const orderText = document.createElement("span");
                orderText.textContent = `${order.name} - $${order.price}`;
                orderItem.appendChild(orderText);

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", () => {
                    this.removeOrder(index); // Видалити товар при кліку
                });
                orderItem.appendChild(removeButton);

                orderList.appendChild(orderItem);
            });
        }
    }

    // Відкрити модальне вікно
    createAndOpen() {
        if (this.modalElem) {
            // Показати модальне вікно
            this.modalElem.style.display = "flex";
            setTimeout(() => {
                this.modalElem.classList.add("open");
            }, 10);
        }
    }

    // Закрити модальне вікно
    closeModal() {
        if (this.modalElem) {
            this.modalElem.classList.remove("open");
            setTimeout(() => {
                this.modalElem.style.display = "none"; // Приховати модальне вікно
            }, 400);
        }
    }

    // Перенаправити на сторінку оформлення замовлення
    continueToOrder() {
        if (this.orders.length > 0) {
            // Зберегти замовлення в localStorage
            localStorage.setItem("orders", JSON.stringify(this.orders));
            // Перенаправити на сторінку оформлення замовлення
            window.location.href = "payment.html";
        } else {
            alert("Ваш кошик порожній. Додайте товари перед оформленням замовлення.");
        }
    }
}
// Отримуємо всі кнопки замовлення
const orderButtons = document.querySelectorAll(".orderProduct");

orderButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productName = document.getElementById('product-name').textContent;
        const productPrice = document.getElementById('product-price').textContent.replace('$', '').trim();
        
        console.log(`Замовлення: ${productName} за ${productPrice}`);
        
        // Додаємо товар у localStorage або модальне вікно
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ name: productName, price: parseFloat(productPrice) });
        localStorage.setItem("orders", JSON.stringify(orders));

        alert(`Товар "${productName}" додано у кошик!`);
    });
});


// Ініціалізація модального вікна
const modal = new ModalPage({
    titleText: "Ваші замовлення",
    messageText: "Тут відображаються ваші замовлення.",
    confirmText: "Підтвердити",
    cancelText: "Скасувати",
});

document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Запобігаємо конфлікту з іншими скриптами
        const productName = button.getAttribute("data-name");
        const productPrice = button.getAttribute("data-price");

        console.log("Модальне вікно додає товар:", { productName, productPrice });

        if (!productName || !productPrice || isNaN(parseFloat(productPrice))) {
            console.error("Некоректні дані у modal.js:", { productName, productPrice });
            return;
        }

        modal.addOrder(productName, parseFloat(productPrice));
        modal.createAndOpen();
    });
});



// Відкрити модальне вікно при кліку на іконку кошика
document.getElementById("openModal")?.addEventListener("click", () => {
    modal.createAndOpen();
});