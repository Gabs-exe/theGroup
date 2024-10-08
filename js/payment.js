document.addEventListener('DOMContentLoaded', () => {
  // Retrieve and display booking summary from localStorage
  const flightDetails = JSON.parse(localStorage.getItem('flightDetails')) || {};
  const passengerDetails = JSON.parse(localStorage.getItem('passengerDetails')) || {};
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];

  const orderSummaryDiv = document.getElementById('order-summary-details');
  orderSummaryDiv.innerHTML = `
      <p><strong>Flight:</strong> ${flightDetails.fromLocation} to ${flightDetails.toLocation}</p>
      <p><strong>Passengers:</strong> ${passengerDetails.firstName} ${passengerDetails.lastName}</p>
      <p><strong>Seats:</strong> ${selectedSeats.join(', ') || 'None selected'}</p>
      <p><strong>Services:</strong> ${selectedServices.map(service => `${service.name} - $${service.price}`).join('<br>') || 'None selected'}</p>
  `;

  // Payment Form Validation
  document.getElementById('pay-now-btn').addEventListener('click', (e) => {
      e.preventDefault(); // Prevent form submission

      const form = document.getElementById('payment-form');
      if (form.checkValidity()) {
          alert('Payment Successful!'); // Simulate payment success
          // You could redirect to a success page here or perform further actions
      } else {
          alert('Please fill out all required fields.');
      }
  });
});
