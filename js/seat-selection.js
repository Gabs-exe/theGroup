document.addEventListener('DOMContentLoaded', function() {
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

  console.log('Flight info:', flightInfo);

  if (!flightInfo.passengers) {
      console.error('Error: No passenger count found in flight info');
      alert('Error: Passenger count is missing. Please go back and enter the number of passengers.');
      window.location.href = 'flight-selection.html'; // Replace with your actual flight selection page
      throw new Error('No passenger count found');
  }

  const numPassengers = parseInt(flightInfo.passengers);

  const flightTitle = document.getElementById('flight-title');
  const seatMap = document.getElementById('seat-map');
  const nextBtn = document.getElementById('next-btn');
  const selectedSeatsContainer = document.createElement('div');
  selectedSeatsContainer.id = 'selected-seats';
  seatMap.after(selectedSeatsContainer);

  let selectedSeatsCount = 0;

  // Generate seat map
  const seats = [];
  for (let i = 0; i < 20; i++) { // 20 rows
      const row = [];
      for (let j = 0; j < 6; j++) { // 6 seats per row
          const seat = document.createElement('div');
          seat.classList.add('seat');
          row.push(seat);
      }
      seats.push(row);
  }

  // Randomly mark seats as full (unavailable)
  const fullSeats = [];
  const totalSeats = 20 * 6; // 20 rows, 6 seats per row
  const numFullSeats = Math.floor(totalSeats * 0.2); // 20% of seats are full

  for (let i = 0; i < numFullSeats; i++) {
      const randomRow = Math.floor(Math.random() * 20);
      const randomSeat = Math.floor(Math.random() * 6);
      const seat = seats[randomRow][randomSeat];
      seat.classList.add('full');
      fullSeats.push({ row: randomRow, seat: randomSeat });
  }

  // Create seat map rows
  seats.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('row');

      if (rowIndex === 0) {
          row.forEach((seat, columnIndex) => {
              const columnHeaders = document.createElement('span');
              columnHeaders.classList.add('column-header');
              columnHeaders.innerHTML = String.fromCharCode(65 + columnIndex); // A, B, C, D, E, F
              rowContainer.appendChild(columnHeaders);

              if (columnIndex === 2) {
                  const aisleSpace = document.createElement('span');
                  aisleSpace.classList.add('aisle-space');
                  rowContainer.appendChild(aisleSpace);
              }
          });
      } else {
          const rowNumber = document.createElement('span');
          rowNumber.classList.add('row-number');
          rowNumber.innerHTML = `${rowIndex}`;
          rowContainer.appendChild(rowNumber);

          row.forEach((seat, columnIndex) => {
              rowContainer.appendChild(seat);

              // Check if seat is full
              if (seat.classList.contains('full')) {
                  seat.style.background = 'red'; // Mark full seat as red
                  seat.style.color = 'white'; // Set text color to white
                  seat.setAttribute('title', 'This seat is unavailable'); // Add tooltip
              } else {
                  seat.addEventListener('click', () => {
                      if (selectedSeatsCount < numPassengers) {
                          seat.classList.toggle('selected');
                          selectedSeatsCount += seat.classList.contains('selected') ? 1 : -1;
                          updateSelectedSeatsDisplay();
                      } else if (seat.classList.contains('selected')) {
                          seat.classList.remove('selected');
                          selectedSeatsCount--;
                          updateSelectedSeatsDisplay();
                      } else {
                          alert(`You can only select ${numPassengers} seat(s).`);
                      }
                  });
              }

              if (columnIndex === 2) {
                  const aisleSpace = document.createElement('span');
                  aisleSpace.classList.add('aisle-space');
                  rowContainer.appendChild(aisleSpace);
              }
          });
      }

      seatMap.appendChild(rowContainer);
  });

  // Add event listener to the next button
  nextBtn.addEventListener('click', () => {
      if (selectedSeatsCount !== numPassengers) {
          alert(`Please select exactly ${numPassengers} seat(s).`);
          return;
      }

      // Add selected seats to flightInfo
      const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
          .map(seat => `${String.fromCharCode(65 + Array.from(seat.parentNode.children).indexOf(seat))}${Array.from(seat.parentNode.parentNode.children).indexOf(seat.parentNode) + 1}`);
      flightInfo.selectedSeats = selectedSeats;

      // Save updated flightInfo back to sessionStorage
      sessionStorage.setItem('flightInfo', JSON.stringify(flightInfo));

      // Redirect to the next page (e.g., payment page)
      window.location.href = 'payment.html';
  });

  function updateSelectedSeatsDisplay() {
      const selectedSeats = Array.from(document.querySelectorAll('.seat.selected'))
          .map(seat => `${String.fromCharCode(65 + Array.from(seat.parentNode.children).indexOf(seat))}${Array.from(seat.parentNode.parentNode.children).indexOf(seat.parentNode) + 1}`);
      selectedSeatsContainer.textContent = `Selected seats: ${selectedSeats.join(', ') || 'None'}`;
  }
});