document.addEventListener("DOMContentLoaded", () => {
    let pokemonData;
    let shinyMode = false;

    function addToCart(pokemon) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const spriteUrl = shinyMode ? pokemon.sprites.front_shiny || pokemon.sprites.front_default : pokemon.sprites.front_default;
        cart.push({
            id: pokemon.id,
            name: pokemon.name,
            sprite: spriteUrl,
            shinyMode: shinyMode,
            sprites: pokemon.sprites
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");

    const typeColors = {
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC"
    };

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((data) => {
                pokemonData = data;

                const detailsContainer = document.getElementById("pokemonDetails");

                const card = document.createElement("div");
                card.classList.add("pokemon-card");

                const nameElement = document.createElement("h2");
                nameElement.textContent = pokemonData.name;

                const typesElement = document.createElement("p");
                const types = pokemonData.types.map((type) => type.type.name);
                const primaryType = types[0];
                typesElement.textContent = `Type: ${types.join(", ")}`;

                const backgroundColor = typeColors[primaryType] || "#FFFFFF";

                card.style.backgroundColor = backgroundColor;

                const imageElement = document.createElement("img");
                imageElement.src = pokemonData.sprites.front_default;
                imageElement.alt = pokemonData.name;

                const detailsElement = document.createElement("p");
                detailsElement.textContent = `Height: ${pokemonData.height} | Weight: ${pokemonData.weight}`;

                const shinyButton = document.createElement("button");
                shinyButton.textContent = "Toggle Shiny";
                shinyButton.classList.add("shiny-button");

                shinyButton.addEventListener("click", () => {
                    shinyMode = !shinyMode;

                    if (shinyMode) {
                        imageElement.src = pokemonData.sprites.front_shiny || pokemonData.sprites.front_default;
                    } else {
                        imageElement.src = pokemonData.sprites.front_default;
                    }

                    shinyButton.textContent = shinyMode ? "Shiny " : "Shiny Normal";
                });

                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Ajouter au panier";
                addToCartButton.classList.add("add-to-cart-button");

                addToCartButton.addEventListener("click", () => {
                    if (pokemonData) {
                        addToCart({
                            id: pokemonData.id,
                            name: pokemonData.name,
                            sprite: shinyMode ? pokemonData.sprites.front_shiny || pokemonData.sprites.front_default : pokemonData.sprites.front_default,
                            shinyMode: shinyMode,
                            sprites: pokemonData.sprites
                        });

                        alert(`Le Pokémon ${pokemonData.name} a été ajouté au panier!`);

                        window.location.href = "panier.html";
                    } else {
                        console.error("Pokemon details not available.");
                    }
                });

                card.appendChild(nameElement);
                card.appendChild(typesElement);
                card.appendChild(imageElement);
                card.appendChild(detailsElement);
                card.appendChild(shinyButton);
                card.appendChild(addToCartButton);

                detailsContainer.appendChild(card);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon details:", error);
            });
    } else {
        console.error("Pokemon ID not provided.");
    }
});
