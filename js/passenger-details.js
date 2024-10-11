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
  const title = formData.get('title');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const dob = formData.get('dob');
  const passportNum = formData.get('passport-num');
  const gender = formData.get('gender');
  const countryCode = formData.get('country-code');
  const contactNumber = formData.get('contact-number');
  const email = formData.get('email');

  // Perform basic validation
  if (!firstName || !lastName || !dob || !passportNum || !gender || !countryCode || !contactNumber || !email) {
    alert('Please fill in all required fields.');
    return;
  }

  // Save passenger details to local storage
  const passengerDetails = {
    title,
    firstName,
    lastName,
    dob,
    passportNum,
    gender,
    countryCode,
    contactNumber,
    email,
    from: fromLocation,
    to: toLocation,
    flightId,
    departDate,
    returnDate,
    passengers
  };
  localStorage.setItem('passengerDetails', JSON.stringify(passengerDetails));

  // Redirect to seat selection page
  window.location.href = 'seat-selection.html';
});