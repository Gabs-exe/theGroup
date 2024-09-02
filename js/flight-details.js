// Parse query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const flightId = urlParams.get('flight');
const fromLocation = urlParams.get('from');
const toLocation = urlParams.get('to');
const departDate = urlParams.get('depart');
const returnDate = urlParams.get('return');
const passengers = urlParams.get('passengers');

// Display flight details
const flightDetailsDiv = document.getElementById('flight-details');

flightDetailsDiv.innerHTML = `
  <p><strong>Flight ID:</strong> ${flightId}</p>
  <p><strong>From:</strong> ${fromLocation}</p>
  <p><strong>To:</strong> ${toLocation}</p>
  <p><strong>Depart Date:</strong> ${departDate}</p>
  <p><strong>Return Date:</strong> ${returnDate ? returnDate : 'N/A'}</p>
  <p><strong>Passengers:</strong> ${passengers}</p>
`;

// Handle Next button click
document.getElementById('next-btn').addEventListener('click', () => {
  window.location.href = `passenger-details.html?flight=${flightId}&from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&depart=${encodeURIComponent(departDate)}&return=${encodeURIComponent(returnDate)}&passengers=${encodeURIComponent(passengers)}`;
});
