import "../files/pokemon.js";


export class Pokemon {
    static allPokemons = {};
    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina) {
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.form = form;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
    }

    import_pokemon(){
    }
    
    static getNormalPokemons(sourceDonnees){
        let donneesFiltreesPokemon = {};
        const PokemonsFiltres = sourceDonnees.filter((pokemon) => sourceDonnees.form === "Normal");
        PokemonsFiltres.forEach((pokemon) => {  
            donneesFiltreesPokemon.push(PokemonsFiltres);
        });
        return donneesFiltreesPokemon;
    }

    toString() {
        // const filteredPokemon = pokemon.filter((pokemon) => pokemon.form === "Normal");
        filteredPokemon.forEach((pokemon) => {  
            console.log(`Pokemon: ${pokemon.pokemon_name} - ${pokemon.pokemon_id} - ${pokemon.form} - ${pokemon.base_attack} - ${pokemon.base_defense} - ${pokemon.base_stamina}`);
        });
    }
}

/*
let pokemon1 = new Pokemon(1, "Bulbasaur", "Normal", 118, 111, 128);
alert(pokemon1.toString());

*/
/* Pour importer les données, faire un objectProperty et dire que all_pokemons est un objet static. Vérifier aussi la condition que la forme du pokemon soit = "Normal" (cf : code de Mini)*/
/*function import_data {
    static allPokemons = {};

    static async importData(sourceImport) {
        const sourceDonnees = sourceImport;

        try {
            const reponse = fetch(sourceDonnees);
            const donnees = reponse.json();
            if (Object.entries(this.allPokemons[3] === "Normal")){
                this.allPokemons = donnees.pokemon;
            }/*
            this.allPokemons = donnees.pokemon.filter((pokemon) => pokemon.form === "Normal");
            */
           /*
        } catch (erreurChargement) {
            console.error("Une erreur s'est produite lors de l'importation des données :", erreurChargement);
        }
    }
}
*/

// import_data.importData(/files/pokemon.js);