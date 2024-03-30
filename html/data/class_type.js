export class Type {name
    static all_types = {};

    constructor(name){
        this._name = name;
        this._effectiveness = type_effectiveness[name];
    }

    getEffectiveness(typeDefense){
        return this.effectiveness[typeDefense];
    }

    get name(){
        return this._name;
    }

    get effectiveness(){
        return this._effectiveness;
    }

    toString(){
        return `Type: ${this.type_attack}`;
    }
}