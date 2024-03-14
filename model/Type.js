import "../files/pokemon_type.js"
import "../files/type_effectiveness.js"

export class Type {
    constructor(nomType){
        this.nomType = nomType;
        this.all_types = type_effectiveness;
    }

    getEffectiveness(typeDefense){
        return type_effectiveness[this.nomType][this.type_defense];
    }

    toString(){
        return `Type: ${this.type_attack}`;
    }
}