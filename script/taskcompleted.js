import { todosCompleted, saveStorage, todos } from "./todo.js";
import { tasks } from "./task.js";

export function taskCompleted() {
  const addTodo = document.querySelector('.add-todo-button');
  let completedHTML = '';

  todosCompleted.forEach((task) => {
    let color = '';
    let category = '';
    if (task.category === 'School') {
      color = '#FF6763';
      category = 'school'
    } else if (task.category === 'Work') {
      color = '#FFB248';
      category = 'work'
    } else if (task.category === 'Personal') {
      color = '#e6e635';
      category = 'personal'
    } else if (task.category === 'Shopping') {
      color = '#99E79B';
      category = 'shopping'
    } else {
      color = '#ffffff';
      category = 'none'
    }

    completedHTML += `
    <div class="todo-content1 ${category}" id="${category}"style="background-color: ${color};">
      <input class="input-todo-checkbox1" type="checkbox" data-input-check="${task.id}" checked>
      <input class="input-todo-text1 line" type="text" value="${task.text}" style="background-color: ${color};"readonly>
      <button class="delete-button1" data-todo-id="${task.id}"><img src="img/delete.png" class="delete-icon1"></button>
     </div>
    `;
  });
  
  document.querySelector('.complete-todo-container').innerHTML = completedHTML;

  const deleteButtons = document.querySelectorAll('.delete-button1');
  deleteButtons.forEach((button) => {
    addTodo.disabled = false;
    addTodo.style.opacity = '1';
    button.addEventListener('click', (event) => {
      const container = event.currentTarget.closest('.todo-content1');
      const taskId = event.currentTarget.getAttribute('data-todo-id');
      const index = todosCompleted.findIndex(task => task.id === parseInt(taskId));
      if (index !== -1) {
        todosCompleted.splice(index, 1);
        saveStorage();
        event.currentTarget.closest('.todo-content1').remove();
        container.remove()
      }
    });
  });
  const InputCheck = document.querySelectorAll('.input-todo-checkbox1');
  InputCheck.forEach((check) => { 
    check.addEventListener('change', (event) => {
      const taskId = event.target.getAttribute('data-input-check');
      const todo = todosCompleted.find(task => task.id === parseInt(taskId));
      if (todo) {
        todos.push(todo);
        taskCompleted();
        tasks();
        saveStorage();

        const index = todosCompleted.findIndex(task => task.id === parseInt(taskId));
        if (index !== -1) {
          todosCompleted.splice(index, 1);
        }
        saveStorage();
        taskCompleted();
        tasks();
      }
    }); 
  });
}