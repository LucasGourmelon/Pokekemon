import {Pokemon} from '../data/class_pokemon.js';

const taille_page = 25;

var pokemon_tab = []; 

document.addEventListener('DOMContentLoaded', function() {
    // set_cookie('page',1);
    let page = get_cookie('page');
    
    if(page === ""){
        page = 1;
        set_cookie('page',page);
    }
    
    Pokemon.import_pokemon();
    
    initTypeOptions();
    initGenerationOptions();
    
    let generation = document.getElementById('generation').value;
    let type = document.getElementById('type').value;
    let nom = document.getElementById('nom').value;
    
    create_pokemeon_tab(Pokemon.all_pokemons,generation,type,nom);
    mise_a_jour_total_page();

    let filtres = document.getElementsByClassName('filtrageField');
    for (let i = 0; i < filtres.length; i++) {
        filtres[i].addEventListener('input', function(){
            set_cookie('page',1);
            mise_a_jour_filtrage();
        });
    }
    
    pokemon_show();

    document.getElementById('close_modale_button').addEventListener('click', close_modale);

    document.getElementById('page_suivante').addEventListener('click', function() {
        changer_page(true);
    });
    document.getElementById('page_precedente').addEventListener('click', function() {
        changer_page(false);
    });
});


function create_pokemeon_tab(pokemons,generation,type,nom){
    pokemon_tab = [];
    let cpt = 1;
    let nb_page = 1;
    
    if(generation !== "0"){
        pokemons = Object.values(pokemons).filter(pokemon => {
            return pokemon.generation == generation;
        });
    }

    if(type !== "0"){   
        pokemons = Object.values(pokemons).filter(pokemon => {
            return Object.values(pokemon.types).some(t => t.name === type);
        });
    }

    if(nom !== ""){
        pokemons = Object.values(pokemons).filter(pokemon => {
            return pokemon.pokemon_name.toLowerCase().includes(nom.toLowerCase());
        });
    }

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
}

function pokemon_show() {
    let page = get_cookie('page');

    let table = document.getElementById('table_pokemon');

    // gestion du depassement 
    if (parseInt(page) <= 1) {
        document.getElementById('page_precedente').disabled = true;
    }else if(parseInt(page) >= (pokemon_tab.length-1)){
        document.getElementById('page_suivante').disabled = true;
    }else{
        document.getElementById('page_precedente').disabled = false;
        document.getElementById('page_suivante').disabled = false;
    }

    // affichage du numéro de page
    document.getElementById('no_page').textContent = page;


    pokemon_tab[page].forEach(pokemon => {
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

        image.addEventListener('mouseover', function() {
            show_image_modale(pokemon.getIdForImage());
        });

        image.addEventListener('mouseout', function() {
            document.getElementById('modale_image').style.display = 'none';
        });

        row.addEventListener('click', function() {
            show_modale(pokemon);
        });
    });
}

function show_image_modale(id){
    document.getElementById('fenetre_modale_image').src = '../webp/images/' + id + '.webp';
    document.getElementById('modale_image').style.display = 'block';
}

function show_modale(pokemon){
    document.getElementById('modale').style.display = 'block';
    document.getElementById('modale_nom').textContent = pokemon.pokemon_name;
    Object.values(pokemon.attacks).forEach(attack => {
        let row;

        if(attack.is_charged_move){
            row = document.getElementById('modale_charged_attacks').insertRow(-1);
        }else{
            row = document.getElementById('modale_fast_attacks').insertRow(-1);
        }

        let move_id = row.insertCell(0);
        move_id.textContent = attack.move_id;

        let nom = row.insertCell(1);
        nom.textContent = attack.name;

        let type = row.insertCell(2);
        type.textContent = attack.type;

        let power = row.insertCell(3);
        power.textContent = attack.power;

        let duration = row.insertCell(4);
        duration.textContent = attack.duration;

        let energy_delta = row.insertCell(5);
        energy_delta.textContent = attack.energy_delta;

        if(attack.is_charged_move){
            let critical_chance = row.insertCell(6);
            critical_chance.textContent = attack.critical_chance;
            
            let stamina_loss_scaler = row.insertCell(7);
            stamina_loss_scaler.textContent = attack.stamina_loss_scaler;
        }else{
            let stamina_loss_scaler = row.insertCell(6);
            stamina_loss_scaler.textContent = attack.stamina_loss_scaler;
        }
    });
}

function close_modale(){
    document.getElementById('modale').style.display = 'none';
}

function clean_table() {
    let table = document.getElementById('table_pokemon');
    let nb_lignes = table.rows.length;
    for (let i = 1; i < nb_lignes; i++) {
        table.deleteRow(1);
    }
}

function changer_page(is_page_suivante){
    let page = get_cookie('page');

    if(is_page_suivante){
        page++;
    }else if(!is_page_suivante){
        page--;
    }
    
    set_cookie('page',page);

    clean_table();
    pokemon_show();
}


/** Gestion des cookies */
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

/** Fonctions de récupération des options des champs du formulaire de filtrage */
function initTypeOptions(){
    Object.values(Pokemon.getTypes()).forEach(type => {
        document.getElementById('type').innerHTML += "<option value='" + type.name + "'>" + type.name + "</option>";
    });
}

function initGenerationOptions(){
    Object.values(Pokemon.all_generations).forEach(generation => {
        if(generation === -1){
            generation = "Pas de génération";
        }
        document.getElementById('generation').innerHTML += "<option value='" + generation + "'>" + generation + "</option>";
    });
}

function mise_a_jour_filtrage(){
    let generation = document.getElementById('generation').value;
    let type = document.getElementById('type').value;
    let nom = document.getElementById('nom').value;

    clean_table();
    create_pokemeon_tab(Pokemon.all_pokemons,generation,type,nom);
    mise_a_jour_total_page();
    pokemon_show();
}

function mise_a_jour_total_page(){
    let total_page = pokemon_tab.length - 1;
    if(total_page === -1){
        total_page = 0;
        set_cookie('page',0);
    }
    document.getElementById('nb_total_pages').textContent = total_page; 
}