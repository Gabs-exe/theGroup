const passengerDetails = JSON.parse(localStorage.getItem('passengerDetails'));
const flightTitle = document.getElementById('flight-title');
const seatMap = document.getElementById('seat-map');
const nextBtn = document.getElementById('next-btn');
const selectedSeatsContainer = document.createElement('div');
selectedSeatsContainer.id = 'selected-seats';
seatMap.after(selectedSeatsContainer);

// Retrieve the number of passengers
const numPassengers = parseInt(passengerDetails.passengers);

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
        seat.setAttribute('title', 'This seat is unavailable');
        seat.removeEventListener('click', selectSeat); // Disable clicking on full seats
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
  window.location.href = 'services.html';
});

// Add event listener to seats
seats.forEach((row) => {
  row.forEach((seat) => {
    seat.addEventListener('click', selectSeat); // Add event listener for seat selection
  });
});

// Function to handle seat selection
function selectSeat() {
  if (this.classList.contains('full')) {
    return; // Skip full seats
  }

  if (this.classList.contains('selected')) {
    this.classList.remove('selected');
    selectedSeatsCount--;
    this.style.background = ''; // Reset seat color
    this.style.color = ''; // Reset text color
  } else if (selectedSeatsCount < numPassengers) {
    this.classList.add('selected');
    selectedSeatsCount++;
    this.style.background = 'green'; // Change seat color to green
    this.style.color = 'white'; // Change text color to white
  } else {
    alert(`You can only select ${numPassengers} seat(s).`);
  }
  updateSelectedSeatsDisplay();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
  selectedSeatsContainer.innerHTML = '<h3>Selected Seats:</h3>';
  const selectedSeats = [];
  seats.forEach((row, rowIndex) => {
    row.forEach((seat, columnIndex) => {
      if (seat.classList.contains('selected')) {
        const seatLabel = String.fromCharCode(65 + columnIndex); // A, B, C, D, E, F
        selectedSeats.push(`Row ${rowIndex}, Seat ${seatLabel}`);
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
