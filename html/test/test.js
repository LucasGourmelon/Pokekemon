import {Pokemon} from '../data/class_pokemon.js';
import {Type} from '../data/class_type.js';
import {Attack} from '../data/class_attack.js';

Pokemon.import_pokemon();


/* getPokemonByType */ 
function getPokemonsByType(typeName){
    return Object.values(Pokemon.all_pokemons).filter((p) => {
        return typeName in p.types;
    });
}

document.getElementById("getPokemonsByType").addEventListener("click", () => {
    let inputValue = document.getElementById("commonField").value;
    console.table(getPokemonsByType(inputValue));
});

/* getPokemonByAttack */
function getPokemonsByAttack(attackName) {
    return Object.values(Pokemon.all_pokemons).filter((p) => {
        return Object.values(p.attacks).some((a) => {
            return a.name === attackName;
        });
    });
}

document.getElementById("getPokemonsByAttack").addEventListener("click", () => {
    let inputValue = document.getElementById("commonField").value;
    console.table(getPokemonsByAttack(inputValue));
});

/* getAttacksByType */
function getAttacksByType(typeName){
    return Object.values(Attack.all_attacks).filter((a) => {
        return a.type === typeName;
    });
}

document.getElementById("getAttacksByType").addEventListener('click',() => {
    let inputValue = document.getElementById("commonField").value;
    console.table(getAttacksByType(inputValue));
});

/* sortPokemonByName */  
function sortPokemonByName(){
    return Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return a.pokemon_name.localeCompare(b.pokemon_name);
    });
}   

document.getElementById("sortPokemonByName").addEventListener('click',() => {
    let inputValue = document.getElementById("commonField").value;
    console.table(sortPokemonByName());
});

/* sortPokemonByStamina */
function sortPokemonByStamina(){
    return Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return a.base_stamina - b.base_stamina;
    });
}

document.getElementById("sortPokemonByStamina").addEventListener('click',() => {
    let inputValue = document.getElementById("commonField").value;
    console.table(sortPokemonByStamina());
});

/* getWeakestEnemies */
function getWeakestEnemies(attackName) {
    const attack = Object.values(Attack.all_attacks).find(a => a.name === attackName);
    if (!attack) return [];

    let maxEffectiveness = 0;
    let weakestEnemies = [];

    for (const pokemon of Object.values(Pokemon.all_pokemons)) {
        let totalEffectiveness = 1;

        for (const typeName in pokemon.types) {
            const pokemonType = Type.all_types[typeName];
            const attackType = Type.all_types[attack.type];

            if (pokemonType.name in attackType.effectiveness) {
                totalEffectiveness *= attackType.effectiveness[pokemonType.name];
            }
        }

        if (totalEffectiveness >= maxEffectiveness) {
            if (totalEffectiveness > maxEffectiveness) {
                 maxEffectiveness = totalEffectiveness;
                weakestEnemies = [];
            }
            weakestEnemies.push(pokemon);
        }
    }

    return weakestEnemies;
}

document.getElementById("getWeakestEnemies").addEventListener('click',() => {
    let inputValue = document.getElementById("commonField").value;
    console.table(getWeakestEnemies(inputValue));
});

function getBestAttacksForEnemy(name) {
    const lowerCaseName = name.toLowerCase();

    // Find the pokemon ID directly by its name
    const pokemon = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.pokemon_name.toLowerCase() === lowerCaseName);

    if (!pokemon) return [];

    const effectivenessMap = {};

    // Calculate attack effectiveness
    for (const attack of Object.values(Attack.all_attacks)) {
        let effectiveness = 1;

        for (const typeName in pokemon.types) {
            const type = Type.all_types[typeName];
            if (type.effectiveness[attack.type]) {
                effectiveness *= type.effectiveness[attack.type];
            }
        }

        if (effectiveness > 1) {
            effectivenessMap[attack.type] = effectiveness;
        }
    }

    // Sort the attack types based on effectiveness
    const bestAttackTypes = Object.keys(effectivenessMap).sort((a, b) => effectivenessMap[b] - effectivenessMap[a]);

    return bestAttackTypes;
}


document.getElementById("getBestAttacksForEnemy").addEventListener('click',() => {
    let inputValue = document.getElementById("commonField").value;
    console.table(getBestAttacksForEnemy(inputValue));
});
