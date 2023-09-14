console.log("The battle starts!");
console.log("Choose ur pokemon");

class Pokemon{
    static pokemonCounter = 0;
    constructor(name,maxhealth,stamina,...actions){
        this._name = name;
        this._maxhealth = maxhealth;
        this._currentHealth = maxhealth;
        this._stamina = stamina;
        this._actions = actions;
        this.idPokemon = ++Pokemon.pokemonCounter;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get maxhealth(){
        return this._maxhealth;
    }

    //No set maxhealth (i dont have a good reason to create a set method neither have one to not do so am just not doing it)

    get currentHealth(){
        return this._currentHealth;
    }
    set health(health){
        this.__currentHealth = health;
    }
    get stamina(){
        return this._stamina;
    }
    set stamina(stamina){
        this._stamina = stamina;
    }

    showActions(){
        let output = 'Actions: \n ';
        for(let i = 0; i < this._actions.length ; i++){
            output = `${output} ${this._actions[i]._name}\n  ${this._actions[i].ActionTypeString}: ${this._actions[i]._resource}\n  Cost: ${this._actions[i]._cost}\n` ;
        }
        return output.slice(0,-2); //Saco la ultima coma :)
    }

    toString(){
        return `Pokemon: ${this._name}\nHealth: ${this._health}\n`
    }
}

class Action{ //Got any suggestion?
    static ActionCounter = 0;
    constructor(name, resource, type, cost){
        this._name = name;
        this._resource = resource;
        this._type = type;
        switch(this._type){
            case 0:
            case 1:
                return this._cost = cost;
            default:
                return this._cost = "-";
        }
        this.idAction = ++Action.ActionCounter;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get resource(){
        return this._resource;
    }
    set resource(resource){
        this._resource = resource;
    }
    get type(){
        return this._type;
    }
    get typeString(){
        switch(this._type){
            case 0:
                return "Attack";
            case 1:
                return "Heal";
            case 2:
                return "Rest";
            default:
                return "Unknown";
        }
    }
    get ActionTypeString(){
        switch(this._type){
            case 0:
                return "Damage";
            case 1:
                return "Heal";
            case 2:
                return "Stamina";
            default:
                return "Unknown";
        }
    }
    set type(type){
        this._type = type;
    }
    get cost(){
        return this._cost;
    }
    set cost(cost){
        this._cost = cost;
    }
    toString(){
        return  `   ${this._name}\n   Resource: ${this._resource}\n   Type: ${this.typeString}`; 
    }
}

let attack1 = new Action('attack 1',100,0,20);
let attack2 = new Action('attack 2',100,1,20);
let attack3 = new Action('attack 3',100,2,20);
let attack4 = new Action('attack 4',100,0,20);
let attack5 = new Action('attack 5',100,1,20);

let Michi = new Pokemon('Michi',100,100,attack1,attack2,attack3,attack4,attack5);



console.log(Michi.showActions());

//let attackExample = new Action("attack",22,0,30);
//console.log(attackExample.toString());

function initiateBattle(pokemon1, pokemon2){ 
/* 
*rehacer el sistema de pelea
    ------soporte para multiples acciones------ DONE
    *** cambiar pokemon2... por una funcion action(pokemon2) -> pokemon2 es un target (no se como implementar esto, tampoco estoy seguro de cuanta utilidad seria)
    --cambiar como funcionan las acciones para recuperar stamina
*/

let playerTurn = true;
    while (pokemon1._currentHealth > 0 && pokemon2._currentHealth > 0) {

        //Muestro la vida de cada pokemon al inicio de cada round.
        console.log(`${pokemon1._name}: ${pokemon1._currentHealth} HP`);
        console.log(`${pokemon2._name}: ${pokemon2._currentHealth} HP`);

        //Action es la eleccion del jugador. Inicio del round

        let action = 0;
        if(playerTurn){
            action = parseInt(prompt(`What ${pokemon1._name} doin'?\n ${pokemon1.showActions()}`)); //Agregar info de ataques y pokemon.        
            //checkActionType(pokemon1,action);
            switch(pokemon1._actions[action].type){
                case 0:
                    
            }
            
        }

    else{
            action = Math.floor(Math.random() * 2 + 1);
            switch (action) {
                case 1:
                    if(pokemon2._action1._cost == 0){
                        pokemon2._stamina += pokemon2._action1._damage
                        console.log(`${pokemon2._name} stamina has been replenished by ${pokemon2._action1.damage} points, now has ${pokemon2._stamina} stamina`);
                        playerTurn = true;
                    }else
                    if(pokemon2._stamina >= pokemon2._action1._cost){
                        pokemon2._stamina -= pokemon2._action1._cost;
                        pokemon1._health -= pokemon2._action1._damage;
                        console.log(`${pokemon1._name} opponent took ${pokemon2.action1._damage} damage!!`);
                    }
                    playerTurn = true;
                    break;
                case 2:
                    if(pokemon2._action2._cost == 0){
                        pokemon2._stamina += pokemon2._action2._damage
                        console.log(`${pokemon2._name} stamina has been replenished by ${pokemon2._action2.damage} points, now has ${pokemon2._stamina} stamina`);
                        playerTurn = true;
                    }else
                    if(pokemon2._stamina >= pokemon2._action2._cost){
                        pokemon2._stamina -= pokemon2._action2._cost;
                        pokemon1._health -= pokemon2._action2._damage;
                        console.log(`${pokemon1._name} opponent took ${pokemon2.action2._damage} damage!!`);
                    }
                    playerTurn = true;
                    break;
                default:
                    console.log("La accion es invalida");
                    break;
            }
        }
    }
    let winner = pokemon1._health == 0 ? pokemon2 : pokemon1;
    console.log(`El ganador es: ${winner._name}`);
}

/* function checkActionType(pokemon,action){
    return (pokemon._actions[action].type);
} */






























/* class Attack extends Action{
    static AttackCounter = 0;
    constructor(name,resource,cost){
        super(name,resource);
        this._cost = cost;
    }
    get cost(){
        return this._cost;
    }
    set cost(cost){
        this._cost = cost;
    }
    attack(objective){
        objective._currentHealth = objective._currentHealth - this._resource;
    }
}

class Passive extends Action{
    static PassiveCounter = 0;
    constructor(name,resource){
        super(name,resource);
    }
    heal(objective){
        objective._currentHealth = objective._currentHealth + this._resource;
    }
    rest(objective){
        objective._stamina = objective._stamina + this._resource;
    }
} */
