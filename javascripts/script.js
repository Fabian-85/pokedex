let pokemonNames = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];
let backgroundForPokemonType = [];
let currentPokemon;
let catchPokemon = [];
for (let i = 0; i < 151; i++) {
    catchPokemon.push(false);
}
load();


let loadPokemonFrom = 0;
let loadPokemonTo = 20;

async function loadPokemon() {
    document.getElementById('loadPokemon').disabled = true;
    loadPokemonSection();
    document.getElementById('loadPokemon').disabled = false;
}

async function loadPokemonSection() {
    for (loadPokemonFrom; loadPokemonFrom < loadPokemonTo; loadPokemonFrom++) {
        if (loadPokemonFrom > 150) {
            break;
        }
        currentPokemon = await loadPokemonUrl(loadPokemonFrom, pokemonNames[loadPokemonFrom]);
        renderPokemons(loadPokemonFrom);
        loadPokeball(loadPokemonFrom);

    }
    loadPokemonTo += 20;
}

async function loadPokemonSectionWithFilter(filter) {
    document.getElementById('pokedex').innerHTML = '';
    if (filter.length > 2) {
        document.getElementById('loadPokemon').disabled = true;
        filterPokemon(filter);
    } else {
        document.getElementById('loadPokemon').disabled = false;
        removeFilter();
    }
}

async function filterPokemon(filter) {
    for (let i = 0; i < loadPokemonTo; i++) {
        if (i > 150) {
            break;
        }
        if (pokemonNames[i].toLowerCase().includes(filter)) {
            currentPokemon = await loadPokemonUrl(i, pokemonNames[i]);
            renderPokemons(i);
            loadPokeball(i);
        }
    }
}

async function removeFilter() {
    for (let i = 0; i < loadPokemonTo; i++) {
        if (i > 150) {
            break;
        }
        currentPokemon = await loadPokemonUrl(i, pokemonNames[i]);
        renderPokemons(i);
        loadPokeball(i);
    }
}

function filter() {
    let filter = document.getElementById('search').value;
    filter = filter.toLowerCase();
    loadPokemonSectionWithFilter(filter);
}

function renderPokemons(i) {
    let pokemonName = currentPokemon['name'];
    let sprite = currentPokemon['sprites']['other']['home']['front_default'];
    let firstType = currentPokemon['types'][0]['type']['name'];
    let secondType;
    try {
        secondType = currentPokemon['types'][1]['type']['name'];
    } catch (error) {
        secondType = null;
    }
    document.getElementById('pokedex').innerHTML += loadPokemonsHTML(pokemonName, sprite, firstType, secondType, i);
    if (!secondType) {
        document.getElementById(`onlyOneType${i}`).classList.add('d-none');
    }
}

function changePokeball(i) {
    let pokeball;
    if (catchPokemon[i] == true) {
        pokeball = './img/pokeball.png';
        document.getElementById(`catch${i}`).src = pokeball;
        catchPokemon[i] = false;
        changePokeballDialog(i, pokeball);
    } else {
        pokeball = './img/pokeballRed.png';
        document.getElementById(`catch${i}`).src = pokeball;
        catchPokemon[i] = true;
        changePokeballDialog(i, pokeball);
    }
    save();
}

function changePokeballDialog(i, pokeball) {
    try {
        document.getElementById(`catchForDialog${i}`).src = pokeball;
    } catch (e) { }
}



function loadPokeball(i) {
    if (catchPokemon[i] == true) {
        pokeball = './img/pokeballRed.png';
        document.getElementById(`catch${i}`).src = pokeball;
    } else {
        pokeball = './img/pokeball.png';
        document.getElementById(`catch${i}`).src = pokeball;
    }
}

function loadPokeballForDialog(i) {
    if (catchPokemon[i] == true) {
        pokeball = './img/pokeballRed.png';
        document.getElementById(`catchForDialog${i}`).src = pokeball;
    } else {
        pokeball = './img/pokeball.png';
        document.getElementById(`catchForDialog${i}`).src = pokeball;
    }
}

function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

function dontCloseDialog(event) {
    event.stopPropagation();
}

async function selectedPokemon(i) {
    document.getElementById('dialog').classList.remove('d-none');
    if (i == 0) {
        document.getElementById('arrowBack').innerHTML = loadPlaceholderHTML();
        document.getElementById('arrowFront').innerHTML = loadArrowForwardHTML(i);
    } else if (i == (pokemonNames.length - 1)) {
        document.getElementById('arrowBack').innerHTML = loadArrowBackHTML(i);
        document.getElementById('arrowFront').innerHTML = loadPlaceholderHTML();
    } else {
        document.getElementById('arrowBack').innerHTML = loadArrowBackHTML(i);
        document.getElementById('arrowFront').innerHTML = loadArrowForwardHTML(i);
    }
    currentPokemon = await loadPokemonUrl(i, pokemonNames[i]);
    renderPokemon(i);
}

function renderPokemon(i) {
    let pokemonName = currentPokemon['name'];
    let sprite = currentPokemon['sprites']['other']['home']['front_default'];
    let firstType = currentPokemon['types'][0]['type']['name'];
    let secondType;
    try {
        secondType = currentPokemon['types'][1]['type']['name'];
    } catch (error) {
        secondType = null;
    }
    document.getElementById('pokemonHeader').innerHTML = loadPokemonHTML(pokemonName, sprite, firstType, secondType, i);
    if (!secondType) {
        document.getElementById('onlyOneType').classList.add('d-none');
    }
    loadPokeballForDialog(i);
    loadDetailsInfo();
}

function loadDetailsInfo() {
    document.getElementById('category').innerHTML = loadCategoriesHTML();
    loadAboutSection();
}

async function loadAboutSection() {
    document.getElementById('informationAboutPokemon').classList.remove('changeFlexDirectionForEvolutionSection');
    let height = currentPokemon['height'] / 10;
    let weight = currentPokemon['weight'] / 10;
    let abilities = loadAbilties();
    let speciesResponseAsJson = await loadSpeciesUrl();
    let eggGroups = loadEggGroups(speciesResponseAsJson);
    let pokedexEntry = speciesResponseAsJson['flavor_text_entries'][25]['flavor_text'];
    document.getElementById('informationAboutPokemon').innerHTML = loadAboutSectionHTML(height, weight, abilities, eggGroups, pokedexEntry);
}

function loadAbilties() {
    let abilities = [];
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let ability = currentPokemon['abilities'][i]['ability']['name'];
        abilities.push(ability);
    }
    return abilities;
}

function loadEggGroups(speciesResponseAsJson) {
    let eggGroups = [];
    for (let i = 0; i < speciesResponseAsJson['egg_groups'].length; i++) {
        let eggGroup = speciesResponseAsJson['egg_groups'][i]['name'];
        eggGroups.push(eggGroup);
    }
    return eggGroups;
}

function loadStatsSection() {
    document.getElementById('informationAboutPokemon').classList.add('changeFlexDirectionForEvolutionSection');
    document.getElementById('informationAboutPokemon').innerHTML = loadChartContainerHTML();
    let statsName = [];
    let stats = [];
    let color = ['#FF0000', '#F08030', '#F8D030', '#6890F0', '#78C850', '#F85888'];
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        statsName.push(currentPokemon['stats'][i]['stat']['name']);
        stats.push(currentPokemon['stats'][i]['base_stat']);
    }
    loadChart(statsName, stats, color);
}

async function loadEvolutionSection() {
    document.getElementById('informationAboutPokemon').classList.add('changeFlexDirectionForEvolutionSection');
    let speciesResponseAsJson = await loadSpeciesUrl();
    let evolutionResponseAsJson = await loadEvolutionUrl(speciesResponseAsJson);
    let evolutionSeries = [];
    addEvolutionToArray(evolutionSeries, evolutionResponseAsJson);
    let evolutionLength = evolutionSeries.length - 1;
    document.getElementById('informationAboutPokemon').innerHTML = '<div class="evolutionSection" id="evolutionSection"></div>';
    for (let i = 0; i < evolutionSeries.length; i++) {
        currentPokemon = await loadPokemonUrl(i, evolutionSeries[i]);
        let sprite = currentPokemon['sprites']['other']['home']['front_default'];
        document.getElementById('evolutionSection').innerHTML += loadEvolutionHTML(i, sprite);
    }
    document.getElementById(`arrow${evolutionLength}`).classList.add('d-none');
}

function addEvolutionToArray(evolutionSeries, evolutionResponseAsJson) {
    let firstEvolution = evolutionResponseAsJson['chain']['species']['name'];
    evolutionSeries.push(firstEvolution);
    let secondEvolution;
    try {
        secondEvolution = evolutionResponseAsJson['chain']['evolves_to'][0]['species']['name'];
        evolutionSeries.push(secondEvolution);
    } catch (e) { }
    let thirdEvolution;
    try {
        thirdEvolution = evolutionResponseAsJson['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
        evolutionSeries.push(thirdEvolution);
    } catch (e) { }
}

function save() {
    localStorage.setItem('catchPokemon', JSON.stringify(catchPokemon));
}

function load() {
    let catchPokemonAsText = localStorage.getItem('catchPokemon');
    if (catchPokemonAsText) {
        catchPokemon = JSON.parse(catchPokemonAsText);
    }
}




