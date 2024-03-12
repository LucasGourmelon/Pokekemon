import "../files/pokemon.js";

class Pokemon {
    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.form = form;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
    }

    toString() {
        const filteredPokemon = pokemon.filter((pokemon) => pokemon.form !== "Normal");
        filteredPokemon.forEach((pokemon) => {  
            console.log(`Pokemon: ${pokemon.pokemon_name} - ${pokemon.pokemon_id} - ${pokemon.form} - ${pokemon.base_attack} - ${pokemon.base_defense} - ${pokemon.base_stamina}`);
        });
    }
}

let pokemon1 = new Pokemon(1, "Bulbasaur", "Normal", 118, 111, 128);
alert(pokemon1.toString());