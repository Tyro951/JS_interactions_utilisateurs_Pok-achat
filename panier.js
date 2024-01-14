document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cartItems');

    function removeFromCart(pokemonId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(pokemon => pokemon.id !== pokemonId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsList = document.getElementById('cartItems');
        cartItemsList.innerHTML = '';

        cart.forEach((pokemon) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Vous aimez : ${pokemon.name}`;

            const imageElement = document.createElement('img');
            imageElement.src = pokemon.sprite;
            imageElement.alt = pokemon.name;
            listItem.appendChild(imageElement);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#128465;';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                removeFromCart(pokemon.id);
            });
            listItem.appendChild(deleteButton);

            cartItemsList.appendChild(listItem);
        });
    }
    displayCart();
});
