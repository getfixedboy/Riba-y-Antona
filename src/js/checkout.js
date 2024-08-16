document.addEventListener("DOMContentLoaded", function() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - ${item.price} грн.`;
        cartItemsList.appendChild(li);
    });

    totalPriceElement.textContent = `Разом: ${totalPrice} грн.`;

    document.getElementById("checkout-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        alert(`Замовлення оформлено на ім'я: ${name}\nТелефон: ${phone}\nАдреса: ${address}`);

        localStorage.removeItem('cart');
        cartItemsList.innerHTML = '';
        totalPriceElement.textContent = 'Разом: 0 грн.';
        window.location.replace('/index.html')
    });
});