import {Pokemon} from '../data/class_pokemon.js';

const taille_page = 25;

document.addEventListener('DOMContentLoaded', function() {
    // set_cookie('page',1);
    let page = get_cookie('page');

    if(page === ""){
        page = 1;
        set_cookie('page',page);
    }

    Pokemon.import_pokemon();

    let pokemon_tab = create_pokemeon_tab(Pokemon.all_pokemons);
    let total_page = pokemon_tab.length - 1;
    document.getElementById('nb_total_pages').textContent = total_page; 
    
    
    pokemon_show(pokemon_tab);
    
    
    document.getElementById('page_suivante').addEventListener('click', function() {
        changer_page(pokemon_tab,true);
    });
    document.getElementById('page_precedente').addEventListener('click', function() {
        changer_page(pokemon_tab,false);
    });
});


function create_pokemeon_tab(pokemons){
    let pokemon_tab = [];
    let cpt = 1;
    let nb_page = 1;
    
    Object.values(pokemons).forEach(pokemon => {
        if(!(nb_page in pokemon_tab)){
            pokemon_tab[nb_page] = [];
        }
        pokemon_tab[nb_page].push(pokemon);
        cpt++;
        
        if(cpt > taille_page){
            nb_page++;
            cpt = 1;
        }
    });

    return pokemon_tab;
}

function pokemon_show(tab_pokemons) {
    let page = get_cookie('page');

    let table = document.getElementById('table_pokemon');

    // gestion du depassement 
    if (parseInt(page) <= 1) {
        document.getElementById('page_precedente').disabled = true;
    }else if(parseInt(page) >= (tab_pokemons.length-1)){
        document.getElementById('page_suivante').disabled = true;
    }else{
        document.getElementById('page_precedente').disabled = false;
        document.getElementById('page_suivante').disabled = false;
    }

    // affichage du numéro de page
    document.getElementById('no_page').textContent = page;

    tab_pokemons[page].forEach(pokemon => {
        let row = table.insertRow(-1);
        let id = row.insertCell(0);
        id.textContent = pokemon.pokemon_id;

        let nom = row.insertCell(1);
        nom.textContent = pokemon.pokemon_name;

        let generation = row.insertCell(2);
        generation.textContent = pokemon.generation;

        let types = row.insertCell(3);
        types.textContent = pokemon.typesToString();

        let endurance = row.insertCell(4);
        endurance.textContent = pokemon.base_stamina;

        let pts_base_attaque = row.insertCell(5);
        pts_base_attaque.textContent = pokemon.base_attack;

        let pts_base_defense = row.insertCell(6);
        pts_base_defense.textContent = pokemon.base_defense;

        let image = row.insertCell(7);
        image.innerHTML = "<img src='../webp/thumbnails/" + pokemon.getIdForImage() + ".webp'>";  
    });
}

function clean_table() {
    let table = document.getElementById('table_pokemon');
    let nb_lignes = table.rows.length;
    for (let i = 1; i < nb_lignes; i++) {
        table.deleteRow(1);
    }
}

function changer_page(pokemon_tab,is_page_suivante){
    let page = get_cookie('page');

    if(is_page_suivante){
        page++;
    }else{
        page--;
    }

    set_cookie('page',page);

    clean_table();
    pokemon_show(pokemon_tab);
}

function set_cookie(name,value){
    document.cookie = name + "=" + value;
}

function get_cookie(name){
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++){
        let cookie = cookies[i];
        let cookie_name = cookie.split('=')[0];
        let cookie_value = cookie.split('=')[1];
        if(cookie_name === name){
            return cookie_value;
        }
    }
    return "";
}
