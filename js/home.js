// Clear localStorage + sessionStorage then initialise the content
localStorage.clear(); // legacy workaround. Use sessionStorage for instance purposes
sessionStorage.clear();

let flightData = fetchFlightData();
async function fetchFlightData() {
    const response = await fetch('js/flightdata.json');
    console.log(response.json().JSON);
    return response.json();
}

// console.log(flightData);

// Add event listener to each menu button
const menuButtons = document.querySelectorAll('.menu-item');
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

document.getElementById('book-flight-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const fromLocation = document.getElementById('from-location').value;
    const toLocation = document.getElementById('to-location').value;
    const departDate = document.getElementById('depart-date').value;
    const returnDate = document.getElementById('return-date').value;
    const passengers = document.getElementById('passengers').value;

    // save form data to sessionStorage
    sessionStorage.setItem('flightInfo', JSON.stringify({ fromLocation, toLocation, departDate, returnDate, passengers }));

    // Redirect to results page 
    window.location.href = `results.html`;
});

