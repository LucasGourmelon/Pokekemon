import {Pokemon} from '../data/class_pokemon.js';

document.addEventListener('DOMContentLoaded', function() {
    Pokemon.import_pokemon();
    pokemon_show(Pokemon.all_pokemons);
});


function pokemon_show(pokemons) {
    let table = document.getElementById('table_pokemon');
    console.log(Object.values(pokemons));
    Object.values(pokemons).forEach(pokemon => {
        let row = table.insertRow(-1);
        let id = row.insertCell(0);
        id.textContent = pokemon.pokemon_id;

        let nom = row.insertCell(1);
        nom.textContent = pokemon.pokemon_name;

        let generation = row.insertCell(2);
        generation.textContent = pokemon.generation;

        let types = row.insertCell(3);
        types.textContent = pokemon.typesToString();

        let endurance = row.insertCell(4);
        endurance.textContent = pokemon.base_stamina;

        let pts_base_attaque = row.insertCell(5);
        pts_base_attaque.textContent = pokemon.base_attack;

        let pts_base_defense = row.insertCell(6);
        pts_base_defense.textContent = pokemon.base_defense;

        let image = row.insertCell(7);
        image.innerHTML = "<img src='../webp/thumbnails/" + pokemon.getIdForImage() + ".webp'>";
    });
}