import { todos, todosCompleted, saveStorage } from "./todo.js";
import { taskCompleted } from "./taskcompleted.js"
export function tasks() {
  let taskHTML = '';

  todos.forEach((task) => {
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
    taskHTML += `
    <div class="todo-content" style="background-color:${color};">
      <input class="input-todo-checkbox" type="checkbox" data-input-check="${task.id}">
      <input class="input-todo-text" type="text" value="${task.text}" style="background-color: ${color};" readonly>
      <button class="edit-button" data-todo-id="${task.id}"><img src="img/edit.png" class="edit-icon"></button>
      <button class="delete-button" data-todo-id="${task.id}"><img src="img/delete.png" class="delete-icon"></button>
    </div>
    `;
  });

  document.querySelector('.todo-container').innerHTML = taskHTML;

  const InputCheck = document.querySelectorAll('.input-todo-checkbox');
  InputCheck.forEach((check) => { 
    check.addEventListener('change', (event) => {
      const taskId = event.target.getAttribute('data-input-check');
      const completedTask = todos.find(task => task.id === parseInt(taskId));
      if (completedTask) {
        todosCompleted.push(completedTask);
        taskCompleted();
        tasks();
        saveStorage();
        const index = todos.findIndex(task => task.id === parseInt(taskId));
        if (index !== -1) {
          todos.splice(index, 1);
        }
        saveStorage();
        taskCompleted();
        tasks();
      }
    }); 
  });
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
          const taskId = event.currentTarget.getAttribute('data-todo-id');
          const index = todos.findIndex(task => task.id === parseInt(taskId));
          if (index !== -1) {
              todos.splice(index, 1);
              saveStorage();
              tasks();
          }
      });
  });
  return todosCompleted;
};