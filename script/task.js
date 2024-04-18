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
      <input class="input-todo-text" data-input-check="${task.id}" type="text" value="${task.text}" style="background-color: ${color};" readonly>
      <button class="edit-button" data-todo-id="${task.id}"><img src="img/edit.png" class="edit-icon"></button>
      <button class="delete-button" data-todo-id="${task.id}"><img src="img/delete.png" class="delete-icon"></button>
    </div>
    `;
  });

  document.querySelector('.todo-container').innerHTML = taskHTML;
  const addTodo = document.querySelector('.add-todo-button');
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
        addTodo.disabled = false;
        addTodo.style.opacity = '1';
          const taskId = event.currentTarget.getAttribute('data-todo-id');
          const index = todos.findIndex(task => task.id === Number(taskId));
          if (index !== -1) {
              todos.splice(index, 1);
              saveStorage();
              tasks();
          }
      });
  });
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const taskId = event.currentTarget.getAttribute('data-todo-id');
      const taskInput = document.querySelector(`.input-todo-text[data-input-check="${taskId}"]`);
      if (taskInput.hasAttribute('readonly')) {
        // Enable editing mode
        taskInput.removeAttribute('readonly');
        taskInput.focus();
        taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
        button.innerHTML = '<img src="img/save.png" class="save-icon">';
      } else {
        // Save the edited text
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
  return todosCompleted;
};