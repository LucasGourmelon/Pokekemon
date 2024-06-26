import { Type } from "./class_type.js";
import { Attack } from "./class_attack.js";

export class Pokemon {
    static all_pokemons = {};
    static all_generations = {};

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina,generation) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._types = {};
        this._attacks = {};
        this._generation = generation;
        this._level = 1;
    }
    
    static import_pokemon() {        
        pokemon.filter(pokemon => pokemon.form == "Normal")
        .forEach((pokemon) => {

            let generation_pokemon = Pokemon.getGeneration(pokemon.pokemon_name);

            let p = new Pokemon(
                pokemon.pokemon_id,
                pokemon.pokemon_name,
                pokemon.form,
                pokemon.base_attack,
                pokemon.base_defense,
                pokemon.base_stamina,
                generation_pokemon,
            );
            Pokemon.all_pokemons[pokemon.pokemon_id] = p;

            p.updateStatsByLevel();

            let types_pokemon = pokemon_type.find((type) => type.form == "Normal" && type.pokemon_id == pokemon.pokemon_id).type;
                types_pokemon.forEach(type => {
                if(!(type in Type.all_types)){
                    Type.all_types[type] = new Type(type);
                }
                p.types[type] = Type.all_types[type];
            });

            // Ajout des générations pour le filtrage
            Pokemon.all_generations[generation_pokemon] = generation_pokemon;
            
            let moves_of_pokemon = pokemon_moves.find((move) => move.pokemon_name == pokemon.pokemon_name && move.form == "Normal");

            const createMoves = (moves, moveType,is_charged_move) => {
                moves.forEach((move) => {
                    let findMove = moveType.find((m) => m.name === move);
                    if (findMove !== undefined){
                        if(!(findMove.move_id in Attack.all_attacks)) {
                            Attack.all_attacks[findMove.move_id] = Attack.createAttack(findMove, is_charged_move);
                        }
                        p.attacks[findMove.move_id] = Attack.all_attacks[findMove.move_id];
                    }
                });
            };

            createMoves(moves_of_pokemon.charged_moves, charged_moves,true);
            createMoves(moves_of_pokemon.fast_moves, fast_moves,false);
            
            Pokemon.all_pokemons[p.id] = p;
        });
    }

    typesToString(){
        let types = "";
        for(let type in this._types){
            types += type + " ";
        }
        return types;
    }

    attacksToString(){
        let attacks = "";
        for(let attack in this._attacks){
            attacks += attack + " ";
        }
        return attacks;
    }

    getIdForImage(){
        switch((this._pokemon_id.toString()).length){
            case 1:
                return "00" + this._pokemon_id;
            case 2:
                return "0" + this._pokemon_id;
            default:
                return this._pokemon_id;
        }
    }

    upgradeLevel(){
        this._level += 0.5;
    }

    setLevel(level){
        this._level = level;
    }

    updateStatsByLevel(){
        let cp = cp_multiplier.find((cp) => cp.level == this._level).multiplier;
        this._base_attack = Math.floor(this._base_attack * cp);
        this._base_defense = Math.floor(this._base_defense * cp);
        this._base_stamina = Math.floor(this._base_stamina * cp);
    }

    static getGeneration(pokemon_name){
        for(let gen in generation){
            for(let i = 0; i < generation[gen].length; i++){
                if(generation[gen][i].name == pokemon_name){
                    return gen;
                }
            }
        }
        return -1;
    };
    
    static getTypes(){
        return Type.all_types;
    }

    static getAttacks(){
        return Attack.all_attacks;
    }
    
    toString() {
        Object.values(Pokemon.all_pokemons).forEach((pokemon) => {  
            return `Pokemon: ${pokemon.pokemon_name} - ${pokemon.pokemon_id} - ${pokemon.form} - ${pokemon.base_attack} - ${pokemon.base_defense} - ${pokemon.base_stamina}`;
        });
    }

    get pokemon_id() {
        return this._pokemon_id;
    }

    get pokemon_name() {
        return this._pokemon_name;
    }

    get form() {
        return this._form;
    }

    get base_attack() {
        return this._base_attack;
    }

    get base_defense() {
        return this._base_defense;
    }

    get base_stamina() {
        return this._base_stamina;
    }

    get types() {
        return this._types;
    }

    get attacks() {
        return this._attacks;
    }

    get generation() {
        return this._generation;
    }

    get level() {
        return this._level;
    }
}