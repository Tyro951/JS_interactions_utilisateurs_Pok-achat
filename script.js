document.addEventListener("DOMContentLoaded", () => {
    const settings = {
        loop: true,
        speed: 700,
        autoplay: {
            delay: 3000, 
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }

    };

    const swiper = new Swiper(".mySwiper", settings);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then((response) => response.json())
    .then((data) => {
        const allPokemon = data.results;

        const shuffledResults = shuffleArray(allPokemon);
        const selectedPokemon = shuffledResults.slice(0, 10);

        const list = document.createElement("ul");
        list.classList.add("pokemon-grid");

        selectedPokemon.forEach((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((pokemonData) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("pokemon-item");


                    const nameElement = document.createElement("h3");
                    nameElement.textContent = pokemonData.name;


                    const imageElement = document.createElement("img");
                    imageElement.src = pokemonData.sprites.front_default;
                    imageElement.alt = pokemonData.name;


                    const voirPlusBtn = document.createElement("button");
                    voirPlusBtn.textContent = "Voir plus";
                    voirPlusBtn.classList.add("voir_plus_btn");


                    listItem.appendChild(nameElement);
                    listItem.appendChild(imageElement);
                    listItem.appendChild(voirPlusBtn);


                    list.appendChild(listItem);
 
                });
        });
    
        document.querySelector("#container").appendChild(list);
    });
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
        
});


