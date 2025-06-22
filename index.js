// 1. Read todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 2. Function to create and insert a task element into the DOM
function createTaskElement(taskText) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'to-do pangolin-regular';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'todo-check';

  const textNode = document.createTextNode(' ' + taskText);

  taskDiv.appendChild(checkBtn);
  taskDiv.appendChild(textNode);
  document.querySelector(".container").appendChild(taskDiv);

  // Remove from UI and storage when button is clicked
  checkBtn.addEventListener('click', () => {
    taskDiv.remove(); // remove from UI
    todos = todos.filter(t => t !== taskText); // remove from array
    localStorage.setItem('todos', JSON.stringify(todos)); // update localStorage
  });
}

// 3. On page load, render all existing todos
window.addEventListener('DOMContentLoaded', () => {
  todos.forEach(todo => {
    createTaskElement(todo);
  });
});

// 4. Add new task on button click
document.querySelector(".add").addEventListener("click", () => {
  const input = document.querySelector(".input");
  const taskText = input.value.trim();

  if (taskText !== '') {
    todos.push(taskText); // Add to array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save to localStorage
    createTaskElement(taskText); // Show on screen
    input.value = ''; // Clear the box
  }
});

// 5. Also add task on Enter key press
document.querySelector(".input").addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    const input = document.querySelector(".input");
    const taskText = input.value.trim();

    if (taskText !== '') {
      todos.push(taskText);
      localStorage.setItem('todos', JSON.stringify(todos));
      createTaskElement(taskText);
      input.value = '';
    }
  }
});
