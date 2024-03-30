export class Attack{
    static all_attacks = [];
    
    constructor(move_id, name, type, power, duration, energy_delta, critical_chance, stamina_loss_scaler,charged_move){
        this._move_id = move_id;
        this._name = name;
        this._type = type;
        this._power = power;
        this._duration = duration;
        this._energy_delta = energy_delta;
        this._critical_chance = critical_chance;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._is_charged_move = charged_move;
    }
    
    toString(){
        allAttacks.keys = this.move_id;
        return "Attack : " + this.name + " - Type : " + this.type + " - Power : " + this.power + " - Duration : " + this.duration + " - Energy Delta : " + this.energy_delta + " - Critical Chance : " + this.critical_chance + " - Stamina Loss Scaler : " + this.stamina_loss_scaler;
    }

    static createAttack(move,is_charged_move) {
        let cc = null;
        if (move.critical_chance) {
            cc = move.critical_chance;
        }

        return new Attack(move.move_id, move.name, move.type, move.power, move.duration, move.energy_delta, cc, move.stamina_loss_scaler,is_charged_move);
    }    

    get name(){
        return this._name;
    }

    get type(){
        return this._type;
    }

    get power(){
        return this._power;
    }

    get duration(){
        return this._duration;
    }

    get energy_delta(){
        return this._energy_delta;
    }

    get critical_chance(){
        return this._critical_chance;
    }

    get stamina_loss_scaler(){
        return this._stamina_loss_scaler;
    }

    get move_id(){
        return this._move_id;
    }

    get is_charged_move(){
        return this._is_charged_move;
    }
}