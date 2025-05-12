function Submit() {
    const inputText = document.getElementById("inputArea");
    const inputValue = inputText.value.toLowerCase();

    // Remove previous error message or existing card if present
    const errorDiv = document.getElementById('error');
    const existingCardWrapper = document.getElementById('cardWrapper');

    if (errorDiv) errorDiv.remove();
    if (existingCardWrapper) existingCardWrapper.remove();

    getData(inputValue);
}

async function getData(data) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + data;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const json = await response.json();

        // Extract relevant data
        const name = json.name;
        const image = json.sprites.front_default;
        const type = json.types.map(type => type.type.name).join(', ');

        // Build card container
        const pokemonCard = document.createElement('div');
        pokemonCard.setAttribute('class', 'card mt-3');
        pokemonCard.setAttribute('style', 'width: 18rem;');

        // Image
        const pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('src', image);
        pokemonImage.setAttribute('class', 'card-img-top');
        pokemonImage.setAttribute('alt', name);

        // Card body and text
        const pokemonCardBody = document.createElement('div');
        pokemonCardBody.setAttribute('class', 'card-body');

        const pokemonName = document.createElement('h5');
        pokemonName.setAttribute('class', 'card-title');
        pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);

        const pokemonType = document.createElement('p');
        pokemonType.setAttribute('class', 'card-text');
        pokemonType.textContent = "Type: " + type.charAt(0).toUpperCase() + type.slice(1);

        // Assemble card
        pokemonCardBody.appendChild(pokemonName);
        pokemonCardBody.appendChild(pokemonType);
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonCardBody);

        // Center and insert into DOM
        const cardWrapper = document.createElement('div');
        cardWrapper.setAttribute('id', 'cardWrapper');
        cardWrapper.setAttribute('class', 'd-flex justify-content-center');
        cardWrapper.appendChild(pokemonCard);

        document.body.appendChild(cardWrapper);
        clearInput();

    } catch (error) {
        // Show error message if fetch fails
        console.error(error.message);
        const errorDiv = document.createElement('div');
        errorDiv.setAttribute('id', 'error');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '20px';
        errorDiv.setAttribute('class', 'mt-3');
        errorDiv.textContent = 'Pokemon not found';
        document.getElementById("pokemonForm").appendChild(errorDiv);
    }
}

// Clear the input field after submission
function clearInput() {
    const inputText = document.getElementById("inputArea");
    inputText.value = '';
}

// Listen for Enter key to trigger submission
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("inputArea");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.value.trim() !== "") {
                Submit();
            }
        }
    });
});
