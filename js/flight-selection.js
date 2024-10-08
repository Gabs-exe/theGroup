// Parse query parameters from sessionStorage
const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
console.log(flightInfo);

const fromLocation = flightInfo.fromLocation;
const toLocation = flightInfo.toLocation;
const departDate = flightInfo.departDate;
const returnDate = flightInfo.returnDate;
const passengers = flightInfo.passengers;
const oneWayOrReturn = flightInfo.oneWayOrReturn;

async function fetchFlightData() {
  const response = await fetch('js/flightdata.json');
  let object = await response.json();
  return object;
}
const flightData = fetchFlightData();

const routeSelectFrom = document.getElementById('from-location');
for (let option of routeSelectFrom.options) {
    if (option.getAttribute('data-alt') === fromLocation) {
        option.selected = true;
        break;
    }
}
const routeSelectTo = document.getElementById('to-location');
routeSelectTo.value = toLocation;
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

window.onload = function() {
    // Perform any actions needed on page load
    console.log('Page has fully loaded');
    // Example: Populate flight list or any other initialization
    flightData.then(data => {
        const flightSelectDiv = document.getElementById('flight-select');
        data.route[fromLocation].forEach(flight => {
            const flightInfoDiv = document.createElement('div');
            flightInfoDiv.classList.add('flight-info');

            const airlineInfo = document.createElement('p');
            airlineInfo.textContent = `${flight.airline} - ${flight.flightNumber}`;
            flightInfoDiv.appendChild(airlineInfo);

            const departureTime = document.createElement('p');
            departureTime.textContent = `Departure: ${flight.departureTime}`;
            flightInfoDiv.appendChild(departureTime);

            const returnTime = document.createElement('p');
            returnTime.textContent = `Return: ${flight.returnTime}`;
            flightInfoDiv.appendChild(returnTime);

            flightSelectDiv.appendChild(flightInfoDiv);
        });
    });
};

// Add event listener to handle flight selection
document.getElementById('flight-list').addEventListener('click', function (event) {
  const flightItem = event.target;
  if (flightItem.tagName === 'LI') {
    const flightId = flightItem.getAttribute('data-flight');
    // Redirect to flight details page
    window.location.href = `flight-details.html?flight=${flightId}&from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&depart=${encodeURIComponent(departDate)}&return=${encodeURIComponent(returnDate)}&passengers=${encodeURIComponent(passengers)}`;
  }
});
