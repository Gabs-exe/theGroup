// Create an array of services
const services = [
  {
    category: 'Launch',
    items: [
      { name: 'Appetizer Platter', price: 10, image: 'images/appetizer-platter.jpg' },
      { name: 'Soup of the Day', price: 8, image: 'images/soup-of-the-day.jpg' },
      { name: 'Salad Mix', price: 12, image: 'images/salad-mix.jpg' }
    ]
  },
  {
    category: 'Breakfast',
    items: [
      { name: 'Eggs Benedict', price: 15, image: 'images/eggs-benedict.jpg' },
      { name: 'Pancakes', price: 10, image: 'images/pancakes.jpg' },
      { name: 'Breakfast Burrito', price: 12, image: 'images/breakfast-burrito.jpg' }
    ]
  },
  {
    category: 'Dinner',
    items: [
      { name: 'Grilled Steak', price: 25, image: 'images/grilled-steak.jpg' },
      { name: 'Pan-Seared Salmon', price: 22, image: 'images/pan-seared-salmon.jpg' },
      { name: 'Vegetarian Quinoa Bowl', price: 18, image: 'images/vegetarian-quinoa-bowl.jpg' }
    ]
  },
  {
    category: 'Food',
    items: [
      { name: 'Sandwich', price: 5, image: 'images/sandwich.jpg' },
      { name: 'Pasta', price: 7, image: 'images/pasta.jpg' },
      { name: 'Fish & Chips', price: 8, image: 'images/fish-chips.jpg' }
    ]
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Coke', price: 2, image: 'images/coke.jpg' },
      { name: 'Fanta', price: 2, image: 'images/fanta.jpg' }
    ]
  },
  {
    category: 'Alcoholic Beverages',
    items: [
      { name: 'Jim Beam (1 peg)', price: 10, image: 'images/jim-beam.jpg' },
      { name: 'Laphroaig', price: 12, image: 'images/laphroaig.jpg' },
      { name: 'Macallan', price: 15, image: 'images/macallan.jpg' }
    ]
  }
];

// Store selected services
const selectedServices = [];

// Create the services grid
const servicesGrid = document.getElementById('services-grid');
const categorySelect = document.createElement('select');
categorySelect.id = 'category-select';

// Create options for the select menu
services.forEach((category) => {
  const option = document.createElement('option');
  option.value = category.category;
  option.text = category.category;
  categorySelect.appendChild(option);
});

// Add the select menu to the page
servicesGrid.appendChild(categorySelect);

// Create a container for the category items
const categoryItemsContainer = document.createElement('div');
categoryItemsContainer.id = 'category-items-container';
servicesGrid.appendChild(categoryItemsContainer);

// Create a container for displaying selected items
const selectedItemsContainer = document.createElement('div');
selectedItemsContainer.id = 'selected-items-container';
selectedItemsContainer.innerHTML = '<h3>Selected Items:</h3>';
servicesGrid.appendChild(selectedItemsContainer);

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

// Function to render the category items
function renderCategoryItems(category) {
  // Clear the category items container
  categoryItemsContainer.innerHTML = '';

  // Create the category container
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-container');
  categoryContainer.innerHTML = `<h2>${category.category}</h2>`;
  categoryItemsContainer.appendChild(categoryContainer);

  // Create the items grid
  const itemsGrid = document.createElement('div');
  itemsGrid.classList.add('items-grid');
  categoryContainer.appendChild(itemsGrid);

  // Create the items
  category.items.forEach((item) => {
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
    itemName.innerHTML = item.name;
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

// Event listener for the select menu
categorySelect.addEventListener('change', (e) => {
  const selectedCategory = services.find((category) => category.category === e.target.value);
  renderCategoryItems(selectedCategory);
});

// Render the first category by default
renderCategoryItems(services[0]);

// Add event listener to "Next" button
document.querySelector('.submit-btn').addEventListener('click', () => {
  // Save selected services to localStorage
  localStorage.setItem('selectedServices', JSON.stringify(selectedServices));

  // Redirect to review-details.html
  window.location.href = 'review-details.html';
});
