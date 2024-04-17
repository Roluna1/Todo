import { todosCompleted, todos , saveStorage } from "./todo.js";
import { tasks } from "./task.js"
export function taskCompleted() {
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
  document.querySelector('.complete-todo-container').innerHTML = completedHTML;
})
/*
const InputCheck = document.querySelectorAll('.input-todo-checkbox');
InputCheck.forEach((check) => { 
  check.addEventListener('change', (event) => {
    const taskId = event.target.getAttribute('data-input-check');
    const completedTask = todosCompleted.find(task => task.id === parseInt(taskId));
    if (completedTask) {
      todosCompleted.push(completedTask);
      taskCompleted()
      tasks()
      saveStorage();
      const index = todosCompleted.findIndex(task => task.id === parseInt(taskId));
      if (index !== -1) {
        todosCompleted.splice(index, 1);
      }
      saveStorage();
      taskCompleted()
      tasks()
    }
  }); 
});
*/
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const taskId = event.currentTarget.getAttribute('data-todo-id');
        const index = todosCompleted.findIndex(task => task.id === parseInt(taskId));
        if (index !== -1) {
            todosCompleted.splice(index, 1);
            saveStorage();
            tasks(); // Update the tasks display
            taskCompleted()
        }
    });
});
return taskCompleted;
}



