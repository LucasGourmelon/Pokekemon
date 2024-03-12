import "../files/pokemon_type.js"
import "../files/type_effectiveness.js"

class Type {
    constructor(type_attack, type_defense){
        this.type_attack = type_attack;
        this.type_defense = type_defense;        
    }

    getEffectiveness(){
        return type_effectiveness[this.type_attack][this.type_defense];
    }

    type_effectiveness(){
        return type_effectiveness;
    }

    toString(){
        return `Type: ${this.type_attack} - ${this.type_defense}`;
    }
}