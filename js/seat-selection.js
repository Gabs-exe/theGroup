const passengerDetails = JSON.parse(localStorage.getItem('passengerDetails'));
const flightTitle = document.getElementById('flight-title');
const seatMap = document.getElementById('seat-map');
const nextBtn = document.getElementById('next-btn');
const selectedSeatsContainer = document.createElement('div');
selectedSeatsContainer.id = 'selected-seats';
seatMap.after(selectedSeatsContainer);

// Retrieve the number of passengers
const numPassengers = parseInt(localStorage.getItem('numPassengers')) || 1;

let selectedSeatsCount = 0;

// Generate seat map
const seats = [];
for (let i = 0; i < 20; i++) {
  const row = [];
  for (let j = 0; j < 6; j++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    row.push(seat);
  }
  seats.push(row);
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

      if (columnIndex === 2) {
        const aisleSpace = document.createElement('span');
        aisleSpace.classList.add('aisle-space');
        rowContainer.appendChild(aisleSpace);
      }
    });
  }
  seatMap.appendChild(rowContainer);
});

const rowContainer = document.createElement('div');
rowContainer.classList.add('row');
const aisleSpace = document.createElement('span');
aisleSpace.classList.add('aisle-space');
aisleSpace.style.gridColumn = '4';
rowContainer.appendChild(aisleSpace);
seatMap.children[0].after(rowContainer);

// Set flight title
flightTitle.innerHTML = `Flight: ${passengerDetails.from} ---> ${passengerDetails.to}`;

// Add event listener to next button
nextBtn.addEventListener('click', () => {
  if (selectedSeatsCount !== numPassengers) {
    alert(`Please select ${numPassengers} seat(s) before proceeding.`);
    return;
  }

  // Save selected seats to local storage
  const selectedSeats = [];
  seats.forEach((row, rowIndex) => {
    row.forEach((seat, columnIndex) => {
      if (seat.classList.contains('selected')) {
        const seatLabel = String.fromCharCode(65 + columnIndex); // A, B, C, D, E, F
        selectedSeats.push(`Row ${rowIndex + 1}, Seat ${seatLabel}`);
      }
    });
  });
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));

  // Redirect to next page
  window.location.href = 'next-page.html';
});

// Add event listener to seats
seats.forEach((row) => {
  row.forEach((seat) => {
    seat.addEventListener('click', () => {
      if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeatsCount--;
      } else if (selectedSeatsCount < numPassengers) {
        seat.classList.add('selected');
        selectedSeatsCount++;
      } else {
        alert(`You can only select ${numPassengers} seat(s).`);
      }
      updateSelectedSeatsDisplay();
    });
  });
});

// Update selected seats display
function updateSelectedSeatsDisplay() {
  selectedSeatsContainer.innerHTML = '<h3>Selected Seats:</h3>';
  const selectedSeats = [];
  seats.forEach((row, rowIndex) => {
    row.forEach((seat, columnIndex) => {
      if (seat.classList.contains('selected')) {
        const seatLabel = String.fromCharCode(65 + columnIndex); // A, B, C, D, E, F
        selectedSeats.push(`Row ${rowIndex + 1}, Seat ${seatLabel}`);
        seat.style.background = 'green'; // Change seat color to green
        seat.style.color = 'white'; // Change text color to white
      } else {
        seat.style.background = ''; // Reset seat color
        seat.style.color = ''; // Reset text color
      }
    });
  });
  selectedSeatsContainer.innerHTML += selectedSeats.length ? selectedSeats.join('<br>') : 'None';
}
