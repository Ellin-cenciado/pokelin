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
        return output.slice(0,-1); //Saco la ultima coma :)
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

let Michi = new Pokemon('Michi',1000,100,attack1,attack2,attack3,attack4,attack5);
let Picho = new Pokemon('Picho',1000,100,attack1,attack2,attack3,attack4,attack5);


console.log(Michi.showActions());
console.log(Picho.showActions());

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
    while (pokemon1._currentHealth * pokemon2._currentHealth * pokemon1._stamina * pokemon2._stamina > 0){

        //Muestro la vida de cada pokemon al inicio de cada round.
        
        console.log(`${pokemon1._name}: ${pokemon1._currentHealth} HP | ${pokemon1._stamina} SP`);
        console.log(`${pokemon2._name}: ${pokemon2._currentHealth} HP | ${pokemon2._stamina} SP`);

        //Action es la eleccion del jugador. Inicio del round

        let action = 0;

        if(playerTurn){

            action = parseInt(prompt(`What ${pokemon1._name} doin'?\n ${pokemon1.showActions()}`)); //Agregar info de ataques y pokemon.        

            switch(pokemon1._actions[action]._type){
                case 0:
                    pokemon2._currentHealth -= pokemon1._actions[action]._resource;
                    pokemon1._stamina -= pokemon1._actions[action]._cost;
                    console.log(`${pokemon1._name} ha usado ${pokemon1._actions[action]._name}!!`);
                    
                break;
                case 1:
                    pokemon1._currentHealth += pokemon1._actions[action]._resource;
                    pokemon1._stamina -= pokemon1._actions[action]._cost;
                    console.log(`${pokemon1._name} se ha recuperado ${pokemon1._actions[action]._resource} puntos de vida!!`);
                break;
                case 2:
                    pokemon1._stamina += pokemon1._actions[action]._resource;
                    console.log(`${pokemon1._name} ha descansado y recupero ${pokemon1._actions[action]._resource} puntos de stamina`);
                break;
                }
            playerTurn = false;
        }
        else{

            action = Math.floor(Math.random() * (pokemon2._actions.length - 1) + 1);
            switch (pokemon2._actions[action]._type){
                case 0:
                    pokemon1._currentHealth -= pokemon2._actions[action]._resource;
                    pokemon2._stamina -= pokemon2._actions[action]._cost;
                    console.log(`${pokemon2._name} ha usado ${pokemon2._actions[action]._name}!!`);
                break;
                case 1:
                    pokemon2._currentHealth += pokemon2._actions[action]._resource;
                    pokemon2._stamina -= pokemon2._actions[action]._cost;
                    console.log(`${pokemon2._name} se ha recuperado ${pokemon2._actions[action]._resource} puntos de vida!!`);
                break;
                case 2:
                    pokemon2._stamina += pokemon2._actions[action]._resource;
                    console.log(`${pokemon2._name} ha descansado y recupero ${pokemon2._actions[action]._resource} puntos de stamina`);
                break;
            }
            playerTurn = true;
        }
    }
    let winner = pokemon1._health * pokemon1._stamina <= 0 ? pokemon2 : pokemon1;
    console.log(`El ganador es: ${winner._name}`);
}
