document.addEventListener('DOMContentLoaded', () => {
  // Retrieve and display booking summary from sessionStorage
  const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo')) || {};
  const passengerDetails = JSON.parse(sessionStorage.getItem('passengerDetails')) || {};
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats')) || [];
  const selectedServices = JSON.parse(sessionStorage.getItem('selectedServices')) || [];

  const orderSummaryDiv = document.getElementById('order-summary-details');
  orderSummaryDiv.innerHTML = `
      <p><strong>Flight:</strong> ${flightInfo.fromLocation} to ${flightInfo.toLocation}</p>
      <p><strong>Passengers:</strong> ${passengerDetails.firstName} ${passengerDetails.lastName}</p>
      <p><strong>Seats:</strong> ${selectedSeats.join(', ') || 'None selected'}</p>
      <p><strong>Services:</strong> ${selectedServices.map(service => `${service.name} - $${service.price}`).join('<br>') || 'None selected'}</p>
  `;

  // Payment Form Validation and redirection on "Pay Now"
  document.getElementById('pay-now-btn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    // Save booking details to localStorage (if needed)
    const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
    const passengerDetails = JSON.parse(sessionStorage.getItem('passengerDetails'));
    const selectedFlightFrom = JSON.parse(sessionStorage.getItem('selectedFlightFrom'));
    const selectedFlightTo = JSON.parse(sessionStorage.getItem('selectedFlightTo'));
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));
    const selectedServices = JSON.parse(sessionStorage.getItem('selectedServices'));

    const bookingDetails = {
      flightInfo,
      passengerDetails,
      selectedFlightFrom,
      selectedFlightTo,
      selectedSeats,
      selectedServices,
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
  });
});
