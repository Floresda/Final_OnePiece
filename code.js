$(document).ready(function() {
    let characters = [];

    function displayCharacters() {
        $('#charactersList').empty();
        characters.forEach(function(character, index) {
            const card = $('<div class="characterCard">').html(`
                <h3>${character.name}</h3>
                <p>Devil Fruit: ${character.devilFruit ? character.devilFruit : 'None'}</p>
                <button class="viewBtn" data-index="${index}">View</button>
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            `);
            $('#charactersList').append(card);
        });
    }

    function fetchCharacters() {
        const settings = {
            url: 'https://one-piece2.p.rapidapi.com/v2/getAllCharacters',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
                'X-RapidAPI-Host': 'one-piece2.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function(response) {
            characters = response.data;
            displayCharacters();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('AJAX Request Failed:', textStatus, errorThrown);
        });
    }

    fetchCharacters();

    $('#characterForm').submit(function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const devilFruit = $('#devilFruit').val();
        const newCharacter = { name, devilFruit };
        characters.push(newCharacter);
        displayCharacters();
        $('#characterForm')[0].reset();
    });

    $(document).on('click', '.editBtn', function() {
        const index = $(this).data('index');
        const character = characters[index];
        $('#name').val(character.name);
        $('#devilFruit').val(character.devilFruit);
        $('#submitBtn').hide();
        $('#updateBtn').show().data('index', index);
        $('#cancelBtn').show();
        $('#formContainer').slideDown();
    });

    $('#updateBtn').click(function() {
        const index = $(this).data('index');
        characters[index].name = $('#name').val();
        characters[index].devilFruit = $('#devilFruit').val();
        displayCharacters();
        $('#characterForm')[0].reset();
        $('#submitBtn').show();
        $('#updateBtn').hide();
        $('#cancelBtn').hide();
        $('#formContainer').slideUp();
    });

    $('#cancelBtn').click(function() {
        $('#characterForm')[0].reset();
        $('#submitBtn').show();
        $('#updateBtn').hide();
        $('#cancelBtn').hide();
        $('#formContainer').slideUp();
    });

    $(document).on('click', '.deleteBtn', function() {
        const index = $(this).data('index');
        characters.splice(index, 1);
        displayCharacters();
    });

    $(document).on('click', '.viewBtn', function() {
        const index = $(this).data('index');
        const character = characters[index];
        alert(`Name: ${character.name}\nDevil Fruit: ${character.devilFruit ? character.devilFruit : 'None'}`);
    });
});
