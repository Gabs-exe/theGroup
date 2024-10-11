// Clear localStorage + sessionStorage then initialise the content
localStorage.clear(); // legacy workaround. Use sessionStorage for instance purposes
sessionStorage.clear();

async function fetchFlightData() {
    const response = await fetch('js/flightdata.json');
    let object = await response.json();
    // console.log(object.route[1].to[1]) //testing
    return object;
}
const flightData = fetchFlightData();

const routeSelectFrom = document.getElementById('from-location');
const routeSelectTo = document.getElementById('to-location');
routeSelectFrom.addEventListener('change', () => {
    flightData.then(data => {
        // console.log(data.route[routeSelectFrom.value]);
        for (let option of routeSelectTo.options) {
            option.hidden = true;
        }

        // Show only the destinations that are available from the selected origin
        for (let from in data.route[routeSelectFrom.value].to) {
            console.log(data.route[routeSelectFrom.value].to[from].destination);
            for (let selected in routeSelectTo.options) {
                if (routeSelectTo.options[selected].value == data.route[routeSelectFrom.value].to[from].destination) {
                    routeSelectTo.options[selected].hidden = false;
                }
            }
        }
    });
});

const departDateInput = document.getElementById('depart-date');
const returnDateInput = document.getElementById('return-date');

var timer;
var timerCountdown = 1250;
// Set the default date to today
departDateInput.valueAsDate = new Date();
departDateInput.min = new Date().toISOString().split('T')[0];
returnDateInput.min = new Date().toISOString().split('T')[0];

departDateInput.addEventListener('change', () => {
    const departDate = new Date(departDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    returnDateInput.min = departDate.toISOString().split('T')[0];

    clearTimeout(timer);
    timer = setTimeout(() => {
        if (departDateInput.value < new Date().toISOString().split('T')[0]) {
            alert('Departure date must be today or later.');
        }

        if (departDate > returnDate) {
            alert('Departure date cannot be after return date.');
        }
    }, timerCountdown);
});

returnDateInput.addEventListener('change', () => {
    const departDate = new Date(departDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    returnDateInput.min = departDate.toISOString().split('T')[0];

    clearTimeout(timer);
    timer = setTimeout(() => {
        if (departDate > returnDate) {
            alert('Departure date cannot be after return date.');
        }
    }, timerCountdown);
});

// Disable the return date input if the one-way checkbox is checked
const oneWayCheckbox = document.getElementById('one-way');
oneWayCheckbox.addEventListener('change', () => {checkState()});

function checkState() { 
    if (oneWayCheckbox.checked) {
        returnDateInput.disabled = true;
        returnDateInput.value = '';
        returnDateInput.classList.add('not-used');
    } else {
        returnDateInput.disabled = false;
        returnDateInput.classList.remove('not-used');
    }
}

// Call checkState on page load to ensure the correct state is set
window.addEventListener('pageshow', () => {
    checkState();
});

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
    const fromLocation = document.getElementById('from-location').selectedOptions[0].getAttribute('data-alt');
    const toLocation = document.getElementById('to-location').value;
    const departDate = document.getElementById('depart-date').value;
    const returnDate = document.getElementById('return-date').value;
    const passengers = document.getElementById('passengers').value;
    const oneWayOrReturn = document.getElementById('one-way').checked;

    // Validate the values from the form (check date validity)
    const departDateCheck = new Date(departDateInput.value);
    const returnDateCheck = new Date(returnDateInput.value);

    console.log(fromLocation, toLocation);
    if (returnDateCheck < departDateCheck) {
        alert('Departure date cannot be after return date.');
        return;
    }

    if (oneWayOrReturn === false && returnDate === '') {
        alert('Return date is required.');
        return;
    }

    // save form data to sessionStorage
    sessionStorage.setItem('flightInfo', JSON.stringify({ fromLocation, toLocation, departDate, returnDate, passengers, oneWayOrReturn }));

    // Redirect to results page 
    window.location.href = `flight-selection.html`;
});

