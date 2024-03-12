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

    import_pokemon(donnees_pokemon){
        let allPokemons = {};
        let clesPokemon = donnees_pokemon.pokemon_id;
        allPokemons.push(clesPokemon);
    }
    toString() {
        const filteredPokemon = pokemon.filter((pokemon) => pokemon.form === "Normal");
        filteredPokemon.forEach((pokemon) => {  
            console.log(`Pokemon: ${pokemon.pokemon_name} - ${pokemon.pokemon_id} - ${pokemon.form} - ${pokemon.base_attack} - ${pokemon.base_defense} - ${pokemon.base_stamina}`);
        });
    }
}
/*
let pokemon1 = new Pokemon(1, "Bulbasaur", "Normal", 118, 111, 128);
alert(pokemon1.toString());

sourceDonnees = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";


alert(pokemon1.sourceDonnees);

function importData(){
    static allPokemons = {};

    allPokemons = fetch(sourceDonnees);


}

/* Pour importer les données, faire un objectProperty et dire que all_pokemons est un objet static. Vérifier aussi la condition que la forme du pokemon soit = "Normal" (cf : code de Mini)*/

