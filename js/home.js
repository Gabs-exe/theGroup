// Load locations from a text file
fetch('js/locations.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })

    .then(data => {
        const locations = data.split('\n').map(item => item.trim());
        initAutocomplete('from-location', locations);
        initAutocomplete('to-location', locations);
    });

// Initialize autocomplete function
function initAutocomplete(inputId, locations) {
    const input = document.getElementById(inputId);
    input.addEventListener('input', function () {
        const suggestions = locations.filter(location =>
            location.toLowerCase().startsWith(this.value.toLowerCase())
        );
        showSuggestions(this, suggestions);
    });
}

// Show suggestions under the input field
function showSuggestions(input, suggestions) {
    const list = document.createElement('ul');
    list.style.position = 'absolute';
    list.style.backgroundColor = 'white';
    list.style.border = '1px solid #ccc';
    list.style.maxHeight = '150px';
    list.style.overflowY = 'auto';
    list.style.width = input.offsetWidth + 'px';
    list.style.marginTop = '0';
    list.style.paddingLeft = '10px';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        listItem.style.padding = '5px';
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', function () {
            input.value = this.textContent;
            list.innerHTML = '';
        });
        list.appendChild(listItem);
    });

    clearSuggestions();
    input.parentNode.appendChild(list);
}

// Clear suggestions
function clearSuggestions() {
    const oldList = document.querySelector('ul');
    if (oldList) oldList.remove();
}

document.addEventListener('click', function (e) {
    if (!e.target.matches('input')) {
        clearSuggestions();
    }
});

// Get all menu buttons
const menuButtons = document.querySelectorAll('.menu-item');

// Add event listener to each menu button
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove selected class from all buttons
        menuButtons.forEach(btn => btn.classList.remove('selected'));
        // Add selected class to the clicked button
        button.classList.add('selected');

        // Show/hide forms based on the clicked button
        if (button.id === 'book-flight-btn') {
            document.getElementById('book-flight-form').style.display = 'block';
            document.getElementById('manage-booking-form').style.display = 'none';
            document.getElementById('check-in-form-container').style.display = 'none';
        } else if (button.id === 'manage-booking-btn') {
            document.getElementById('book-flight-form').style.display = 'none';
            document.getElementById('manage-booking-form').style.display = 'block';
            document.getElementById('check-in-form-container').style.display = 'none';
        } else if (button.id === 'check-in-btn') {
            document.getElementById('book-flight-form').style.display = 'none';
            document.getElementById('manage-booking-form').style.display = 'none';
            document.getElementById('check-in-form-container').style.display = 'block';
        } else if (button.id === 'flight-status-btn') {
            // You can add functionality for flight status button here
            console.log('Flight status button clicked');
        }
    });
});

// Get the sign-in button and sign-up modal
const signInBtn = document.getElementById('sign-in-btn');
const signUpModal = document.getElementById('sign-up-modal');
const signUpModalClose = document.getElementById('sign-up-modal-close');

// Add an event listener to the sign-in button
signInBtn.addEventListener('click', () => {
    // Show the sign-up modal
    signUpModal.style.display = 'block';

    // Apply blur only to the container and top-strip, not the entire body
    document.querySelector('.top-strip').classList.add('blur');
    document.querySelector('.container').classList.add('blur');

    // Focus on the sign-up form
    document.getElementById('email').focus();
});

// Add an event listener to the sign-up modal close button
signUpModalClose.addEventListener('click', () => {
    // Hide the sign-up modal
    signUpModal.style.display = 'none';

    // Remove the blur from the container and top-strip
    document.querySelector('.top-strip').classList.remove('blur');
    document.querySelector('.container').classList.remove('blur');
});

// Get the password input and show-password checkbox
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');

// Add an event listener to the show-password checkbox
showPasswordCheckbox.addEventListener('change', () => {
    // Toggle the type attribute between 'password' and 'text'
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});


