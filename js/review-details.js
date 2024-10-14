document.addEventListener('DOMContentLoaded', () => {
  // Retrieve flight details from sessionStorage
  let flightInfo;
  try {
    flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
    if (!flightInfo) {
      throw new Error('No flight info found in sessionStorage');
    }
  } catch (error) {
    console.error('Error retrieving flight info:', error);
    alert('Error: No flight information found. Please go back and select your flight.');
    window.location.href = 'flight-selection.html'; // Replace with your actual flight selection page
    throw error;
  }

  const { flightId, departDate, returnDate, oneWayOrReturn } = flightInfo;

  // Retrieve selected flight from and to from sessionStorage
  const selectedFlightFrom = JSON.parse(sessionStorage.getItem('selectedFlightFrom'));
  const selectedFlightTo = JSON.parse(sessionStorage.getItem('selectedFlightTo'));

  // Display flight details (departure)
  const flightDetailsDiv = document.getElementById('flight-details');
  flightDetailsDiv.innerHTML = `
    <p><strong>From:</strong> ${selectedFlightFrom?.fromLocation || 'N/A'}</p>
    <p><strong>To:</strong> ${selectedFlightFrom?.toLocation || 'N/A'}</p>
    <p><strong>Depart Date:</strong> ${departDate || 'N/A'}</p>
  `;

  // If it's a return trip, show the return flight details
  if (!oneWayOrReturn && selectedFlightTo && returnDate) {
    flightDetailsDiv.innerHTML += `
      -----------------------------------------------------------
      <p><strong>From:</strong> ${selectedFlightTo?.fromLocation || 'N/A'}</p>
      <p><strong>To:</strong> ${selectedFlightTo?.toLocation || 'N/A'}</p>
      <p><strong>Return Date:</strong> ${returnDate || 'N/A'}</p>
    `;
  }

  // Retrieve passenger details from sessionStorage
  const passengerDetails = JSON.parse(sessionStorage.getItem('passengerDetails'));
  const passengerDetailsDiv = document.getElementById('passenger-details');
  passengerDetailsDiv.innerHTML = `
    <p><strong>Name:</strong> ${passengerDetails.title || ''} ${passengerDetails.firstName || ''} ${passengerDetails.lastName || ''}</p>
    <p><strong>DOB:</strong> ${passengerDetails.dob || 'N/A'}</p>
    <p><strong>Passport Number:</strong> ${passengerDetails.passportNum || 'N/A'}</p>
    <p><strong>Gender:</strong> ${passengerDetails.gender || 'N/A'}</p>
    <p><strong>Contact:</strong> ${passengerDetails.countryCode || ''} ${passengerDetails.contactNumber || 'N/A'}</p>
    <p><strong>Email:</strong> ${passengerDetails.email || 'N/A'}</p>
  `;

  // Retrieve selected seats from sessionStorage
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
  const selectedSeatsDiv = document.getElementById('selected-seats');
  selectedSeatsDiv.innerHTML = selectedSeats && selectedSeats.length ? selectedSeats.join('<br>') : 'No seats selected.';

  // Retrieve selected services from sessionStorage
  const selectedServices = JSON.parse(sessionStorage.getItem('selectedServices')) || [];
  const selectedServicesDiv = document.getElementById('selected-services');
  selectedServicesDiv.innerHTML = selectedServices.length 
    ? selectedServices.map(service => `${service.name} - $${service.price}`).join('<br>') 
    : 'No services selected.';

  // Handle Proceed to Payment button click
  document.getElementById('proceed-to-payment-btn').addEventListener('click', () => {
    console.log('Button clicked!');
    window.location.href = 'payment.html'; // Redirect to payment page
  });
});