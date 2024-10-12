// Parse query parameters from sessionStorage
const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));
const selectedFrom = sessionStorage.getItem('selectedFlightFrom');
const selectedTo = sessionStorage.getItem('selectedFlightTo');
console.log(flightInfo);
console.log(selectedFrom);
console.log(selectedTo);

// Display flight details (optional, if needed on the passenger details page)
const form = document.getElementById('passenger-form');

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = new FormData(form);
  const passengerDetails = {
    title: formData.get('title'),
    firstName: formData.get('first-name'),  
    lastName: formData.get('last-name'),
    dob: formData.get('dob'),
    passportNum: formData.get('passport-num'),
    gender: formData.get('gender'),
    countryCode: formData.get('country-code'),
    contactNumber: formData.get('contact-number'),
    email: formData.get('email')
  };

  // Perform basic validation
  if (!passengerDetails.firstName || !passengerDetails.lastName || !passengerDetails.dob || 
      !passengerDetails.passportNum || !passengerDetails.gender || !passengerDetails.countryCode || 
      !passengerDetails.contactNumber || !passengerDetails.email) {
    alert('Please fill in all required fields.');
    return;
  }

  // Get existing flight info from sessionStorage
  const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo')) || {};

  // Add passenger details to flightInfo
  flightInfo.passengerDetails = passengerDetails;

  // Save updated flightInfo back to sessionStorage
  sessionStorage.setItem('flightInfo', JSON.stringify(flightInfo));

  // Redirect to seat selection page
  window.location.href = 'seat-selection.html';
});