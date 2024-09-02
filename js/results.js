// Parse query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const fromLocation = urlParams.get('from');
const toLocation = urlParams.get('to');
const departDate = urlParams.get('depart');
const returnDate = urlParams.get('return');
const passengers = urlParams.get('passengers');

// Display the results based on user input
const resultsDiv = document.getElementById('results');

resultsDiv.innerHTML = `
  <p><strong>From:</strong> ${fromLocation}</p>
  <p><strong>To:</strong> ${toLocation}</p>
  <p><strong>Depart Date:</strong> ${departDate}</p>
  <p><strong>Return Date:</strong> ${returnDate ? returnDate : 'N/A'}</p>
  <p><strong>Passengers:</strong> ${passengers}</p>
  <h3>Available Flights</h3>
  <ul id="flight-list">
    <li data-flight="101">Flight 101: ${fromLocation} to ${toLocation} on ${departDate} - $200</li>
    <li data-flight="102">Flight 102: ${fromLocation} to ${toLocation} on ${departDate} - $250</li>
    <li data-flight="103">Flight 103: ${fromLocation} to ${toLocation} on ${departDate} - $300</li>
  </ul>
`;

// Add event listener to handle flight selection
document.getElementById('flight-list').addEventListener('click', function (event) {
  const flightItem = event.target;
  if (flightItem.tagName === 'LI') {
    const flightId = flightItem.getAttribute('data-flight');
    // Redirect to flight details page
    window.location.href = `flight-details.html?flight=${flightId}&from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&depart=${encodeURIComponent(departDate)}&return=${encodeURIComponent(returnDate)}&passengers=${encodeURIComponent(passengers)}`;
  }
});
