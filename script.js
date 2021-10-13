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
								id: pokemonSingle.id,
                                name: val.name,
                                img: pokemonSingle.sprites.front_default,
								type: (pokemonSingle.types[0].type.name)
                            });
                            if (pokemons.length == quantity) {
                                pokemons.map((val) => {
                                    pokemonsBoxes.innerHTML +=`
								
								
								
								
								<div class="pokemon-box shadow-sm rounded col m-2 text-center" style="text-transform: capitalize;">
                            		<h3 class="">` +
                                        val.name +
                                        `</h3>
                            		<img style="min-height:150px" src="` +
                                        val.img +
                                        `">
                        			<div class="btn-group flex-column" style="display:flex; width:140px; margin:auto;">
                        				<button type="button" class="btn btn-primary dropdown-toggle m-2" data-bs-toggle="dropdown" aria-expanded="false">See info</button>
                        				<ul class="dropdown-menu">
                            				<li>
                                				<p class="dropdown-item my-0 disabled text-black">Pokemon #` + val.id + `</p>
                                				<p class="dropdown-item my-0 disabled text-black">Primary type: ` + val.type + `</p>
                            				</li>
                        				</ul>
                    				</div>
								</div>
							`;
                                });
                            }
                        });
                });
            });
    } else {
        pokemonsBoxes.innerHTML = `
			<div class="pokemon-box">
                <h3 class="">No pokemons were found</h3>
                <img style="max-height:150px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe6%2F80%2F2d%2Fe6802d9c0538e25efed9d1cdf3414af9.gif&f=1&nofb=1">
			</div>
		`;
    }
}

getPokemons(1);
