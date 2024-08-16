document.addEventListener('DOMContentLoaded', () => {
    fetch('https://gist.githubusercontent.com/getfixedboy/ec3b5c1810a229ae906f67c694bf9d17/raw/1cf4910ef40ccbefb6c87f56e3015dff5e0ea125/Products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const container = document.getElementById('product-container');

            for(const product of products) {
                const card = createCard(product)
    
                container.appendChild(card);
            }
        })
        .catch(error => console.error('Error loading products:', error));
});


function createCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="footer">
            <div class="price">${product.price}</div>
            <button>У кошик</button>
        </div>
    `;

    return card
}