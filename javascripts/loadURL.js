async function loadPokemonUrl(i , array){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + array;
    let response = await fetch(url);
    return response.json();
}

async function loadSpeciesUrl(){
    let speciesUrl = currentPokemon['species']['url'];
    let speciesResponse = await fetch(speciesUrl);
    return await speciesResponse.json();
}

async function loadEvolutionUrl(speciesResponseAsJson){
    let evolutionUrl = speciesResponseAsJson['evolution_chain']['url'];
    let evolutionResponse = await fetch(evolutionUrl);
    return await evolutionResponse.json();
}

 