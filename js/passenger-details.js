// Parse query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const flightId = urlParams.get('flight');
const fromLocation = urlParams.get('from');
const toLocation = urlParams.get('to');
const departDate = urlParams.get('depart');
const returnDate = urlParams.get('return');
const passengers = urlParams.get('passengers');

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

  // Optionally: Send data to server or handle it as needed
  console.log('Form data:', {
    title,
    firstName,
    lastName,
    dob,
    passportNum,
    gender,
    countryCode,
    contactNumber,
    email
  });

  // Redirect to a confirmation page or show a success message
  // window.location.href = `confirmation.html?flight=${flightId}`;
  alert('Passenger details submitted successfully!');
});
