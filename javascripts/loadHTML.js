function loadPokemonsHTML(pokemonName, sprite, firstType, secondType, i) {
    return `
    <div class="card ${firstType}Background"  > 
    <div class="spaceBtw">
    <h2 onclick="selectedPokemon(${i})" class="pointer">${pokemonName}</h2>
    <img onclick="changePokeball(${i})" id="catch${i}" class="catchSmall pointer" src="./img/pokeball.png" alt="">
    </div>
    <div class="types"> 
    <div class="${firstType} type">${firstType}</div>
    <div id="onlyOneType${i}" class="${secondType} type">${secondType}</div>
    </div>
    <img onclick="selectedPokemon(${i})" class="pokemonSpriteSmall pointer" src="${sprite}" alt="">
    </div>
    `
}


function loadPokemonHTML(pokemonName, sprite, firstType, secondType, i) {
    return `
    <div class=" detailedCardImg ${firstType}Background"> 
    <div class="spaceBtw">
    <h2>${pokemonName}</h2>
    <img onclick="changePokeball(${i})" id="catchForDialog${i}" class="catchSmall pointer" src="./img/pokeball.png" alt="">

    </div>
    <div class="types"> 
    <div class="${firstType} type">${firstType}</div>
    <div id="onlyOneType" class="${secondType} type">${secondType}</div>

    </div>
    <img class="pokemonSpriteBig" src="${sprite}" alt="">
    </div>
    `
}

function loadCategoriesHTML() {
    return `
    <h3 onclick="loadAboutSection()" class="pointer">About</h3>
    <h3 onclick="loadStatsSection()" class="pointer">Base Stats</h3>
    <h3 onclick="loadEvolutionSection()" class="pointer">Evolution</h3>
    `;
}

function loadAboutSectionHTML(height, weight, abilities, eggGroups, pokedexEntry) {
    return `
    <p class="pokedexEntry"> ${pokedexEntry}</p>
    <table class="pokemonPropertyTable">
        <tr>
            <td>Höhe:</td>
            <td>${height}m</td>
        </tr>
        <tr>
            <td>Gewicht: </td>
            <td>${weight}g </td>
        </tr>
        <tr>
            <td>Fähigkeiten: </td>
            <td>${abilities} </td>
        </tr>
        <tr>
            <td>Eigruppen: </td>
            <td>${eggGroups} </td>
        </tr>
    </table>
    `;
}

function loadChartContainerHTML() {
    return `
    <div class="pokemonStats">
    <canvas id="myChart"></canvas>
    </div>`;
}

function loadEvolutionHTML(i, sprite) {
    return `
    <img class="pokemonEvolutionSprite" src="${sprite}" alt="">
    <img class="ecolutionArrow" id="arrow${i}" src="./img/arrow.png" alt="">
    `;
}

function loadArrowForwardHTML(i) {
    return `
    <img class="arrow" onclick="selectedPokemon(${i + 1})" src="./img/arrowForwardW.png" alt="">
    `;
}

function loadArrowBackHTML(i) {
   return `
    <img class="arrow" onclick="selectedPokemon(${i - 1})" src="./img/arrowBackwardW.png" alt="">
    `;
}

function loadPlaceholderHTML() {
    return `
     <div class="arrowPlaceholder"></div>
     `;
 }