import "../files/pokemon.js";

class Pokemon {
    $
}

const txt = '{ "nom" : "Jupiter",
"lunes": ["Europe", "Ganymède", "Io"],
"attributs": { "rayon": 69911,
 "tellurique": false,
"gravité": null }
}
;
let planete = JSON.parse(pokemon);
console.log(planete.base_attack[0]); // Jupiter
console.log(planete.base_defense[]); // Io
console.log(planete.attributs.rayon); // 69911

"base_attack": 251,
"base_defense": 505,
"base_stamina": 452,
"form": "Eternamax",
"pokemon_id": 890,
"pokemon_name": "Eternatus"