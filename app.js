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
		pokemonDetails.classList.add("container");

		const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
		const imageSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id.toString().padStart(3, '0')}.png`;
		const height = pokemon.height;
		const weight = pokemon.weight;
		const abilities = pokemon.abilities.map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(", ");
		const descriptionUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`;

		fetch(descriptionUrl)
			.then(res => res.json())
			.then(data => {
				const description = data.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text.replace(/\u00A0/g, ' ');

				pokemonDetails.innerHTML = `
			<div class="row row-margin mb-3">
				<div class="col text-center">
					<h3 class="name">${name}</h3>
				</div>
				
			</div>
			<div class="row row-margin mb-3">
   			 <div class="col-5">
      			<img src="${imageSrc}" alt="${name}" class="pokemon-sprite">
    		</div>
    	<div class="col-7">
			<div class="row row-margin mb-3">
			<div class="col">
				<div class="description">
				<p>${description}</p>
				</div>
			</div>
		</div>
      
      <div class="row row-margin mb-3">
        <div class="col">
          <div class="stats">
            <div class="row row-margin mb-1">
              <div class="col">
                <span class="stats-title"> Height </span>
              </div>
              <div class="col">
                <span class="stats-title"> Category </span>
              </div>
            </div>
            <div class="row row-margin mb-3">
              <div class="col">
                <span> ${height / 10} kg </span>
              </div>
              <div class="col">
                <span> Category </span>
              </div>
            </div>
            <div class="row row-margin mb-1">
              <div class="col">
                <span class="stats-title"> Weight </span>
              </div>
              <div class="col">
                <span class="stats-title"> Abilites </span>
              </div>
            </div>
            <div class="row row-margin mb-3">
              <div class="col">
                <span> ${weight / 10} kg </span>
              </div>
              <div class="col">
                <span> ${abilities} </span>
              </div>
            </div>
            <div class="row row-margin mb-1">
              <div class="col">
                <span class="stats-title"> Gender </span>
              </div>
            </div>
            <div class="row row-margin mb-3">
              <div class="col">
                <span> Gender </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-margin mb-1">
        <div class="col">
          Type
        </div>
      </div>
      <div class="row row-margin mb-3">
        <div class="col">
          ${pokemonTypes.map(type => `<div class="type-box ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`).join("")}
        </div>
      </div>
	  <div class="row">
				<div class="col">
				Evolutions
				</div>
	  </div>
    </div>
  </div>
			`;
			});

		modal.style.display = 'block';

		window.addEventListener('click', event => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		});
	}

}

fetchPokemon();





