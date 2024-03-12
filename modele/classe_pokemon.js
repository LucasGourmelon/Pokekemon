import "../files/pokemon.js";
/*
class Pokemon {
    $
}

const txt = '{ "nom" : "Jupiter",
"lunes": ["Europe", "Ganymède", "Io"],
"attributs": { "rayon": 69911,
 "tellurique": false,
"gravité": null }
}
;*/
let planete = JSON.parse(pokemon);
console.log(planete.base_attack[0]); // Jupiter
console.log(planete.base_defense[00]); // Io
console.log(planete.base_stamina[0]); // 69911
console.log(planete.form[0]);

