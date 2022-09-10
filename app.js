const poke_container = document.querySelector('#poke_container');
const pokemon_number = 150;

const fetchPokemon = async () => {
	for (let i = 1; i <= pokemon_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
    console.log(pokemon)
};

fetchPokemon();