window.onload = function() {
  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
  const bookingReference = JSON.parse(localStorage.getItem('referenceNumber'));
  const bookingHTMl = document.getElementById('booking-info');

  // Display booking information
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
  </div>
  `;

  // Display selected services under booking information
  if (bookingDetails.selectedServices.length > 0) {
      bookingHTMl.innerHTML += `
      <div id="selected-services">
          <h3>Selected Services:</h3>
          ${bookingDetails.selectedServices.map((service, index) => `
              <div>
                  <p>${service.name} - $${service.price}</p>
                  <button class="remove-service" data-index="${index}">Remove</button>
              </div>
          `).join('')}
          <button id="add-service" style="margin-top: 12px">Add Service</button>
      </div>
      `;
  } else {
      bookingHTMl.innerHTML += `
      <div id="selected-services">
          <h3>No services selected.</h3>
          <button id="add-service">Add Service</button>
      </div>
      `;
  }

  // Add event listener to remove service button
const removeServiceButtons = document.querySelectorAll('.remove-service');
removeServiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        const serviceName = bookingDetails.selectedServices[index].name;
        if (confirm(`Are you sure you want to remove ${serviceName}?`)) {
            bookingDetails.selectedServices.splice(index, 1);
            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            window.location.reload();
        }
    });
});

  // Add event listener to add service button
const addServiceButton = document.getElementById('add-service');
addServiceButton.addEventListener('click', () => {
    // Create a dropdown modal or container for service selection
    const serviceSelectionContainer = document.createElement('div');
    serviceSelectionContainer.id = 'service-selection-modal';
    serviceSelectionContainer.innerHTML = `
        <h3>Select a Service</h3>
        <div id="services-grid"></div>
        <button id="close-service-selection">Close</button>
    `;
    document.body.appendChild(serviceSelectionContainer);

    // Render services from services.js into the services grid
    const servicesGrid = document.getElementById('services-grid');

    services.forEach((service) => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service-item');
        serviceItem.innerHTML = `
            <img src="${service.image}" alt="${service.name}" />
            <p>${service.name} (${service.category}) - $${service.price}</p>
            <button class="select-service">Select</button>
        `;

        // Add event listener to select the service
        serviceItem.querySelector('.select-service').addEventListener('click', () => {
            // Add the selected service to bookingDetails.selectedServices
            bookingDetails.selectedServices.push(service);
            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            window.location.reload();
        });

        servicesGrid.appendChild(serviceItem);
    });

    // Close button event listener
    document.getElementById('close-service-selection').addEventListener('click', () => {
        serviceSelectionContainer.remove();
    });
});
};