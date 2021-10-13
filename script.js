var quantity = document.getElementById("quantity");
quantity.addEventListener("keyup", () => {
    if (quantity.value > 0) {
        quantity.classList.remove("is-invalid");
        quantity.classList.add("is-valid");
        getPokemons(quantity.value);
    } else {
        quantity.classList.remove("is-valid");
        quantity.classList.add("is-invalid");
        getPokemons(quantity.value);
    }
});

function getPokemons(quantity) {
    var pokemonsBoxes = document.querySelector(".pokemon-boxes");
    if (quantity > 0) {
        pokemonsBoxes.innerHTML = "";
        fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantity)
            .then((response) => response.json())
            .then((allpokemon) => {
                var pokemons = [];
                allpokemon.results.map((val) => {
                    fetch(val.url)
                        .then((response) => response.json())
                        .then((pokemonSingle) => {
                            pokemons.push({
                                name: val.name,
                                img: pokemonSingle.sprites.front_default,
                            });
                            if (pokemons.length == quantity) {
                                pokemons.map((val) => {
                                    pokemonsBoxes.innerHTML +=
                                        `
								<div class="pokemon-box col m-3 rounded shadow-sm" style="--bs-bg-opacity: 0.1; text-transform:capitalize;">
                            		<h3 class="pt-4">` +
                                        val.name +
                                        `</h3>
                            		<img style="width: 140px" src="` +
                                        val.img +
                                        `">
                        		</div>
							`;
                                });
                            }
                        });
                });
            });
    } else {
        pokemonsBoxes.innerHTML = `
			<div class="pokemon-box col m-3 rounded" style="--bs-bg-opacity: 0.1; text-transform:capitalize;">
                <h3 class="pt-4">No pokemons were found</h3>
                <img style="width: 100px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe6%2F80%2F2d%2Fe6802d9c0538e25efed9d1cdf3414af9.gif&f=1&nofb=1">
            </div>
		`;
    }
}

getPokemons(9);
