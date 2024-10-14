window.onload = function() {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    const bookingReference = JSON.parse(localStorage.getItem('referenceNumber'));
    const bookingHTMl = document.getElementById('booking-info');

    console.log(bookingDetails);

    bookingHTMl.innerHTML = `
    <div>
    <h3>Flight Information</h3>
    <p><strong>Date:</strong> ${bookingDetails.flightInfo.departDate || 'N/A'}</p>
    <p><strong>From:</strong> ${bookingDetails.selectedFlightFrom.fromLocation || 'N/A'}</p>
    <p><strong>To:</strong> ${bookingDetails.selectedFlightFrom.toLocation || 'N/A'}</p>
    <p><strong>Time:</strong> ${bookingDetails.selectedFlightFrom.time || 'N/A'}</p>
    <p><strong>Seat selection:</strong> ${bookingDetails.selectedSeats[0] || 'N/A'}</p>
    ---------------------------------
    <p><strong>Date:</strong> ${bookingDetails.flightInfo.returnDate || 'N/A'}</p>
    <p><strong>From:</strong> ${bookingDetails.selectedFlightTo.fromLocation || 'N/A'}</p>
    <p><strong>To:</strong> ${bookingDetails.selectedFlightTo.toLocation || 'N/A'}</p>
    <p><strong>Time:</strong> ${bookingDetails.selectedFlightTo.time || 'N/A'}</p>
    <p><strong>Seat selection:</strong> ${bookingDetails.selectedSeats[0] || 'N/A'}</p>
    </div>
    <div>
    <h3>Passenger Details</h3>
    <p><strong>Name:</strong> ${bookingDetails.passengerDetails.title || ''} ${bookingDetails.passengerDetails.firstName || ''} ${bookingDetails.passengerDetails.lastName || ''}</p>
    <p><strong>Date of Birth:</strong> ${bookingDetails.passengerDetails.dob || 'N/A'}</p>
    <p><strong>Passport Number:</strong> ${bookingDetails.passengerDetails.passportNum || 'N/A'}</p>
    <p><strong>Gender:</strong> ${bookingDetails.passengerDetails.gender || 'N/A'}</p>
    <p><strong>Contact:</strong> +${bookingDetails.passengerDetails.countryCode || ''} ${bookingDetails.passengerDetails.contactNumber || 'N/A'}</p>
    <p><strong>Email:</strong> ${bookingDetails.passengerDetails.email || 'N/A'}</p>
    </div>`

    bookingHTMl.innerHTML += selectedServices.length 
    ? selectedServices.map(service => `${service.name} - $${service.price}`).join('<br>') 
    : 'No services selected.'

};