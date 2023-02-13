const poke_container = document.querySelector('#poke_container');
const pokemon_number = 151;

const fetchPokemon = async () => {
	for (let i = 1; i <= pokemon_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

    const pokemonTypes = pokemon.types.map(type => type.type.name);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	
	
	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id
			.toString()
			.padStart(3, '0')}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            
			${pokemonTypes.map(type => `<div class="type-box ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`).join("")}
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);



	pokemonEl.addEventListener('click', () => {
		showPokemonDetails(pokemon);
	  });


	  function showPokemonDetails(pokemon) {
		const pokemonDetails = document.querySelector('#pokemon-details');
		const modal = document.querySelector('#modal');
		const closeModal = document.querySelector('#close-modal');
		pokemonDetails.classList.add("details");
		

		pokemonDetails.innerHTML = `
		<div class="title">
    <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
	</div>
	
	
  `;

		modal.style.display = 'block';

		closeModal.addEventListener('click', () => {
			modal.style.display = 'none';
		  });

		  window.addEventListener('click', event => {
			if (event.target === modal) {
			  modal.style.display = 'none';
			}
		  });
		}

}

fetchPokemon();





