var quantity = document.getElementById("quantity");
quantity.addEventListener('keyup', ()=>{
	getPokemons(quantity.value);
})

function getPokemons(quantity){
	fetch("https://pokeapi.co/api/v2/pokemon?limit="+quantity)
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
                        var pokemonsBoxes = document.querySelector(".pokemon-boxes");
						pokemonsBoxes.innerHTML = "";
                        pokemons.map((val) => {
                            pokemonsBoxes.innerHTML +=
                                `
								<div class="pokemon-box col m-3 rounded shadow-sm" style="--bs-bg-opacity: 0.1; text-transform:capitalize;">
                            		<h3 class="pt-4">` + val.name + `</h3>
                            		<img style="width: 140px" src="`+val.img+`">
                        		</div>
							`;
                        });
                    }
                });
        });
    });
}

getPokemons(9);