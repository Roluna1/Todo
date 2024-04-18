import { todosCompleted, saveStorage } from "./todo.js";
import { tasks } from "./task.js";

export function taskCompleted() {
  const addTodo = document.querySelector('.add-todo-button');
  let completedHTML = '';

  todosCompleted.forEach((task) => {
    let color = '';
    if (task.category === 'School') {
      color = '#FF6763';
    } else if (task.category === 'Work') {
      color = '#FFB248';
    } else if (task.category === 'Personal') {
      color = '#e6e635';
    } else if (task.category === 'Shopping') {
      color = '#99E79B';
    } else {
      color = '#ffffff';
    }

    completedHTML += `
    <div class="todo-content" style="background-color: ${color};">
      <input class="input-todo-checkbox" type="checkbox" disabled checked>
      <input class="input-todo-text line" type="text" value="${task.text}" style="background-color: ${color};"readonly>
      <button class="delete-button" data-todo-id="${task.id}"><img src="img/delete.png" class="delete-icon"></button>
     </div>
    `;
  });
  
  document.querySelector('.complete-todo-container').innerHTML = completedHTML;

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    addTodo.disabled = false;
    addTodo.style.opacity = '1';
    button.addEventListener('click', (event) => {
      const taskId = event.currentTarget.getAttribute('data-todo-id');
      const index = todosCompleted.findIndex(task => task.id === parseInt(taskId));
      if (index !== -1) {
        todosCompleted.splice(index, 1);
        saveStorage();
        event.currentTarget.closest('.todo-content').remove();
        tasks();
        taskCompleted();
      }
    });
  });
}