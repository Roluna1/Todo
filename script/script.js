import { tasks } from "./task.js"
import { taskCompleted } from "./taskcompleted.js"
import { todos, todosCompleted } from "./todo.js"


tasks();
taskCompleted();


const addButtonTask = document.querySelector('.add-todo-button');
addButtonTask.addEventListener('click', () => {
    addButtonTask.disabled = true;
    addButtonTask.style.opacity = '.5';
    const todoContainer = document.querySelector('.todo-container')

    const inputTodoContent = document.createElement('div');
    inputTodoContent.classList.add('todo-content');
  
    const inputTodoCheckbox = document.createElement('input')
    inputTodoCheckbox.type = 'checkbox';
    inputTodoCheckbox.classList.add('input-todo-checkbox');
    inputTodoCheckbox.disabled = true;
  
    const inputTodoText = document.createElement('input');
    inputTodoText.type = 'text';
    inputTodoText.classList.add('input-todo-text');
  
    const selectOption = document.createElement('select');
    selectOption.classList.add('selecting-category');
  
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select';
  
    const schoolOption = document.createElement('option');
    schoolOption.value = 'School';
    schoolOption.textContent = 'School';
    
    const workOption = document.createElement('option');
    workOption.value = 'Work';
    workOption.textContent = 'Work';
  
    const personalOption = document.createElement('option');
    personalOption.value = 'Personal';
    personalOption.textContent = 'Personal';
  
    const shoppingOption = document.createElement('option');
    shoppingOption.value = 'Shopping';
    shoppingOption.textContent = 'Shopping';
  
  
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.innerText = '\u2714';
  
    inputTodoContent.appendChild(inputTodoCheckbox);
    inputTodoContent.appendChild(inputTodoText);
    selectOption.appendChild(defaultOption);
    selectOption.appendChild(schoolOption);
    selectOption.appendChild(workOption);
    selectOption.appendChild(personalOption);
    selectOption.appendChild(shoppingOption);
    inputTodoContent.appendChild(selectOption);
    inputTodoContent.appendChild(checkButton);
    todoContainer.appendChild(inputTodoContent);
    inputTodoText.focus();

    const selectingCategory = inputTodoContent.querySelector('.selecting-category');
    selectingCategory.addEventListener('change', () => {
      const selectedCategory = selectingCategory.value;
      switch (selectedCategory) {
        case 'School':
          inputTodoContent.style.backgroundColor = '#FF6763';
          inputTodoText.style.backgroundColor = '#FF6763';
          break;
        case 'Work':
          inputTodoContent.style.backgroundColor = '#FFB248';
          inputTodoText.style.backgroundColor = '#FFB248';
          break;
        case 'Personal':
          inputTodoContent.style.backgroundColor = '#e6e635';
          inputTodoText.style.backgroundColor = '#e6e635';
          break;        
        case 'Shopping':
          inputTodoContent.style.backgroundColor = '#99E79B';
          inputTodoText.style.backgroundColor = '#99E79B';
          break;
        default:
          break;       
      }
    });
const checkButtons = document.querySelectorAll('.check-button');
checkButtons.forEach((button) => {
  let maxId;
  if (todos.length > 0) {
      maxId = Math.max(...todos.map(todo => todo.id)) + 1;
  } else {
      maxId = 1;
  }
  let nextId = maxId;
    button.addEventListener('click', () => {
    console.log('nyeks');
    if (!inputTodoText.value) {
        alert('Please put something');
    } else {
    const addTodo = {
        id: nextId,
        text: inputTodoText.value,
        category: selectOption.value
    };
    todos.push(addTodo);
    console.log(addTodo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    tasks();
    taskCompleted()
    addButtonTask.disabled = false;
    addButtonTask.style.opacity = '1';
    }
    });
});
});
console.log(todos);
console.log(todosCompleted);
