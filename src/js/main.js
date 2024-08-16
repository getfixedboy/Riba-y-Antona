document.addEventListener('DOMContentLoaded', () => {
    fetch('https://gist.githubusercontent.com/aleksandr-bash/ca203cc8adda2ac6f8c19fa35a626686/raw/ed11a04984de068801fe5090d66b2b6a0fe48994/sushi.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const container = document.getElementById('product-container');

            for(const product of products) {
                const card = createCard(product)
    
                container.appendChild(card);
            }
        })
        .catch(error => console.error('Error loading products:', error))
        .finally(() => {document.dispatchEvent(new Event('productsLoaded'));});
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
            <button class="buy-button" data-product="${product.name}" data-price="${product.price}">У кошик</button>
        </div>
    `;

    return card
}