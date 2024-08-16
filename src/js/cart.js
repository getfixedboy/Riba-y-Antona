let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = calculateTotalPrice(cart);

document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById("cart-button");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const checkoutButton = document.getElementById("checkout-button");

    document.addEventListener('productsLoaded', function() {
        document.querySelectorAll(".buy-button").forEach(button => {
            button.addEventListener("click", function() {
                const product = button.getAttribute("data-product");
                const price = parseInt(button.getAttribute("data-price"));
                cart.push({ product, price });
                totalPrice += price;

                saveCart();

                updateCart();
            });
        });

        updateCart();
    });

    cartButton.addEventListener("click", function() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", function() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    checkoutButton.addEventListener("click", function(event) {
        if (cart.length === 0) {
            event.preventDefault();
            alert("Ваш кошик порожній! Додайте товари перед оформленням замовлення.");
        }
    });

});

function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsList.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.product} - ${item.price} грн.`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "✖";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", function() {
                removeFromCart(index);
            });

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });

        totalPriceElement.textContent = `Сума: ${totalPrice} грн.`;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);

    updateCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}