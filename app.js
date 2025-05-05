// Get DOM elements
const checklistContainer = document.querySelector('.checklist');
const addItemForm = document.getElementById('add-item-form');
const newItemInput = document.getElementById('new-item-input');

// Array to store checklist items
let checklistItems = [];

// Function to render checklist items
function renderChecklist() {
  // Clear the checklist container
  checklistContainer.innerHTML = '';

  // Render each checklist item
  checklistItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'checklist-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `item${index}`;
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => toggleItemCompleted(index));

    const label = document.createElement('label');
    label.htmlFor = `item${index}`;
    label.textContent = item.text;

    li.appendChild(checkbox);
    li.appendChild(label);
    checklistContainer.appendChild(li);
  });
}

// Function to add a new checklist item
function addChecklistItem(text) {
  const newItem = {
    text,
    completed: false,
  };

  checklistItems.push(newItem);
  renderChecklist();
  saveChecklistItems();
}

// Function to toggle the completed status of a checklist item
function toggleItemCompleted(index) {
  checklistItems[index].completed = !checklistItems[index].completed;
  saveChecklistItems();
}

// Function to save checklist items to localStorage
function saveChecklistItems() {
  localStorage.setItem('checklistItems', JSON.stringify(checklistItems));
}

// Function to load checklist items from localStorage
function loadChecklistItems() {
  const savedItems = localStorage.getItem('checklistItems');
  if (savedItems) {
    checklistItems = JSON.parse(savedItems);
    renderChecklist();
  }
}

// Event listener for adding a new checklist item
addItemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newItemText = newItemInput.value.trim();
  if (newItemText !== '') {
    addChecklistItem(newItemText);
    newItemInput.value = '';
  }
});

// Load checklist items from localStorage on page load
loadChecklistItems();
