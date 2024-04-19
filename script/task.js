import { todos, todosCompleted, saveStorage } from "./todo.js";
import { taskCompleted } from "./taskcompleted.js"
export function tasks() {
  let taskHTML = '';
// pakyu javascript .|.
  todos.forEach((task) => {
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
    taskHTML += `
    <div class="todo-content ${category}" id="${category}" style="background-color:${color};">
      <input class="input-todo-checkbox" type="checkbox" data-input-check="${task.id}">
      <input class="input-todo-text" data-input-check="${task.id}" type="text" value="${task.text}" style="background-color: ${color};" readonly>
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
          const container = event.currentTarget.closest('.todo-content');
          const taskId = event.currentTarget.getAttribute('data-todo-id');
          const index = todos.findIndex(task => task.id === Number(taskId));
          if (index !== -1) {
              todos.splice(index, 1);
              saveStorage();
              container.remove();
          }
      });
  });
  /*
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const taskId = event.currentTarget.getAttribute('data-todo-id');
      const taskInput = document.querySelector(`.input-todo-text[data-input-check="${taskId}"]`);
      if (taskInput.hasAttribute('readonly')) {
        // editing
        taskInput.removeAttribute('readonly');
        taskInput.focus();
        taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
        button.innerHTML = '<img src="img/save.png" class="save-icon">';
      } else {
        // saving
        const newText = taskInput.value;
        const taskIndex = todos.findIndex(task => task.id === Number(taskId));
        if (taskIndex !== -1) {
          todos[taskIndex].text = newText;
          taskInput.setAttribute('readonly', true);
          saveStorage();
          button.innerHTML = '<img src="img/edit.png" class="edit-icon">';
        }
      }
    });
  });
  */
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
          const taskId = event.currentTarget.getAttribute('data-todo-id');
          const taskInput = document.querySelector(`.input-todo-text[data-input-check="${taskId}"]`);
          if (taskInput.hasAttribute('readonly')) {
              // editing
              taskInput.removeAttribute('readonly');
              taskInput.focus();
              taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
              button.innerHTML = '<img src="img/save.png" class="save-icon">';
  
              // Enter
              taskInput.addEventListener('keypress', (event) => {
                  if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
                      saveTask(taskId, taskInput);
                      button.innerHTML = '<img src="img/edit.png" class="edit-icon">';
                  }
              });
          } else {
              // saving
              saveTask(taskId, taskInput, button);
          }
      });
  });
  
  function saveTask(taskId, taskInput, button) {
      const newText = taskInput.value;
      const taskIndex = todos.findIndex(task => task.id === Number(taskId));
      if (taskIndex !== -1) {
          todos[taskIndex].text = newText;
          taskInput.setAttribute('readonly', true);
          saveStorage();
          if (button) {
              button.innerHTML = '<img src="img/edit.png" class="edit-icon">';
          }
      }
  }
};