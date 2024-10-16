// Create a consolidated array of services from all categories
const services = [
  { category: 'Lunch', name: 'Appetizer Platter', price: 10, image: 'img/appetizer-platter.jpg' },
  { category: 'Lunch', name: 'Soup of the Day', price: 8, image: 'img/soup-of-the-day.jpg' },
  { category: 'Lunch', name: 'Salad Mix', price: 12, image: 'img/salad-mix.jpg' },
  { category: 'Breakfast', name: 'Eggs Benedict', price: 15, image: 'img/eggs-benedict.jpg' },
  { category: 'Breakfast', name: 'Pancakes', price: 10, image: 'img/pancakes.jpg' },
  { category: 'Breakfast', name: 'Breakfast Burrito', price: 12, image: 'img/breakfast-burrito.jpg' },
  { category: 'Dinner', name: 'Grilled Steak', price: 25, image: 'img/grilled-steak.jpg' },
  { category: 'Dinner', name: 'Pan-Seared Salmon', price: 22, image: 'img/pan-seared-salmon.jpg' },
  { category: 'Dinner', name: 'Vegetarian Quinoa Bowl', price: 18, image: 'img/vegetarian-quinoa-bowl.jpg' },
  { category: 'Food', name: 'Sandwich', price: 5, image: 'img/sandwich.jpg' },
  { category: 'Food', name: 'Pasta', price: 7, image: 'img/pasta.jpg' },
  { category: 'Food', name: 'Fish & Chips', price: 8, image: 'img/fish-chips.jpg' },
  { category: 'Beverages', name: 'Coke', price: 2, image: 'img/coke.jpg' },
  { category: 'Beverages', name: 'Fanta', price: 2, image: 'img/fanta.jpg' },
  { category: 'Alcoholic Beverages', name: 'Jim Beam (1 peg)', price: 10, image: 'img/jim-beam.jpg' },
  { category: 'Alcoholic Beverages', name: 'Laphroaig', price: 12, image: 'img/laphroaig.jpg' },
  { category: 'Alcoholic Beverages', name: 'Macallan', price: 15, image: 'img/macallan.jpg' }
];

// Store selected services
const selectedServices = [];

// Create the services grid
const servicesGrid = document.getElementById('services-grid');

// Create a container for displaying selected items
const selectedItemsContainer = document.createElement('div');
selectedItemsContainer.id = 'selected-items-container';
selectedItemsContainer.innerHTML = '<h3>Selected Items:</h3>';
servicesGrid.appendChild(selectedItemsContainer);

// Create a container for displaying all items
const itemsGrid = document.createElement('div');
itemsGrid.classList.add('items-grid');
servicesGrid.appendChild(itemsGrid);

// Function to render the selected items
function renderSelectedItems() {
  selectedItemsContainer.innerHTML = '<h3>Selected Items:</h3>'; // Reset the container content

  if (selectedServices.length === 0) {
    selectedItemsContainer.innerHTML += '<p>No items selected yet.</p>';
    return;
  }

  const ul = document.createElement('ul');
  selectedServices.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    ul.appendChild(li);
  });
  selectedItemsContainer.appendChild(ul);
}

// Function to render all items
function renderItems() {
  // Clear the items container
  itemsGrid.innerHTML = '';

  // Create the items
  services.forEach((item) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
    itemsGrid.appendChild(itemContainer);

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemContainer.appendChild(itemImage);

    const itemPrice = document.createElement('p');
    itemPrice.innerHTML = `Price: $${item.price}`;
    itemContainer.appendChild(itemPrice);

    const itemName = document.createElement('p');
    itemName.innerHTML = `${item.name} (${item.category})`;
    itemContainer.appendChild(itemName);

    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add';
    addButton.addEventListener('click', () => {
      // Toggle item selection
      const selectedIndex = selectedServices.findIndex((service) => service.name === item.name);
      if (selectedIndex === -1) {
        selectedServices.push(item);
        itemContainer.classList.add('selected'); // Add class to change color
        console.log(`Added ${item.name} to selection`);
      } else {
        selectedServices.splice(selectedIndex, 1);
        itemContainer.classList.remove('selected'); // Remove class to revert color
        console.log(`Removed ${item.name} from selection`);
      }

      // Update the selected items display
      renderSelectedItems();
    });
    itemContainer.appendChild(addButton);
  });
}

// Render all items initially
renderItems();

// Add event listener to "Next" button
document.querySelector('.submit-btn').addEventListener('click', () => {
  // Save selected services to sessionStorage instead of localStorage
  sessionStorage.setItem('selectedServices', JSON.stringify(selectedServices));

  // Redirect to review-details.html
  window.location.href = 'review-details.html';
});
