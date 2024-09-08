document.addEventListener('DOMContentLoaded', () => {
  // Retrieve flight details from localStorage
  const flightDetails = JSON.parse(localStorage.getItem('flightDetails')) || {};
  const { flightId, fromLocation, toLocation, departDate, returnDate, passengers } = flightDetails;

  // Display flight details
  const flightDetailsDiv = document.getElementById('flight-details');
  flightDetailsDiv.innerHTML = `
      <p><strong>Flight ID:</strong> ${flightId || 'N/A'}</p>
      <p><strong>From:</strong> ${fromLocation || 'N/A'}</p>
      <p><strong>To:</strong> ${toLocation || 'N/A'}</p>
      <p><strong>Depart Date:</strong> ${departDate || 'N/A'}</p>
      <p><strong>Return Date:</strong> ${returnDate ? returnDate : 'N/A'}</p>
      <p><strong>Passengers:</strong> ${passengers || 'N/A'}</p>
  `;

  // Retrieve passenger details from localStorage
  const passengerDetails = JSON.parse(localStorage.getItem('passengerDetails')) || {};
  const passengerDetailsDiv = document.getElementById('passenger-details');
  passengerDetailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${passengerDetails.title || ''} ${passengerDetails.firstName || ''} ${passengerDetails.lastName || ''}</p>
      <p><strong>DOB:</strong> ${passengerDetails.dob || 'N/A'}</p>
      <p><strong>Passport Number:</strong> ${passengerDetails.passportNum || 'N/A'}</p>
      <p><strong>Gender:</strong> ${passengerDetails.gender || 'N/A'}</p>
      <p><strong>Contact:</strong> ${passengerDetails.countryCode || ''} ${passengerDetails.contactNumber || 'N/A'}</p>
      <p><strong>Email:</strong> ${passengerDetails.email || 'N/A'}</p>
  `;

  // Retrieve selected seats from localStorage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const selectedSeatsDiv = document.getElementById('selected-seats');
  selectedSeatsDiv.innerHTML = selectedSeats.length ? selectedSeats.join('<br>') : 'No seats selected.';

  // Retrieve selected in-flight services from localStorage (if available)
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
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
