import { todos, saveStorage, todosCompleted } from "./todo.js"
import { taskCompleted } from "./taskcompleted.js";
import { tasks } from "./task.js";
export function AddTodo() {

  const schoolCategory = document.querySelector('.category-text.school')
  const workCategory = document.querySelector('.category-text.work');
  const personalCategory = document.querySelector('.category-text.personal');
  const shoppingCategory = document.querySelector('.category-text.shopping');
  const allCategory = document.querySelector('.category-text.all');
  
  function CategoryClick(category, hideSelectors) {
    const allSelectors = ['.todo-content.school', '.todo-content1.school', '.todo-content.work', '.todo-content1.work', '.todo-content.shopping', '.todo-content1.shopping', '.todo-content.personal', '.todo-content1.personal', '.todo-content.none', '.todo-content1.none'];
    const categorySelectors = hideSelectors.split(',').flatMap(selector => allSelectors.filter(s => s.includes(selector.trim())));
    const otherSelectors = allSelectors.filter(s => !categorySelectors.includes(s));
  
    category.addEventListener('click', () => {
      allCategory.style.opacity = '.5';
      schoolCategory.style.opacity = '.5';
      workCategory.style.opacity = '.5';
      personalCategory.style.opacity = '.5';
      shoppingCategory.style.opacity = '.5';
  
      category.style.opacity = '1';
  
      categorySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(hide => {
          hide.style.display = 'flex';
        });
      });
  
      otherSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(hide => {
          hide.style.display = 'none';
        });
      });
    });
  }
  CategoryClick(allCategory, 'none, school, work, personal, shopping');
  CategoryClick(schoolCategory, 'school');
  CategoryClick(workCategory, 'work');
  CategoryClick(personalCategory, 'personal');
  CategoryClick(shoppingCategory, 'shopping');

  const addButtonTask = document.querySelector('.add-todo-button');
  const inputTodoCheckbox = document.createElement('input');
  const inputTodoText = document.createElement('input');
  const todoContainer = document.querySelector('.todo-container');
  todoContainer.style.display = 'flex';
  const inputTodoContent = document.createElement('div');
  inputTodoContent.classList.add('todo-content');

  // inputTodoCheckBox
  inputTodoCheckbox.type = 'checkbox';
  inputTodoCheckbox.classList.add('input-todo-checkbox');
  inputTodoCheckbox.disabled = true;

  // inputTodoText
  inputTodoText.type = 'text';
  inputTodoText.classList.add('input-todo-text');
  inputTodoText.setAttribute('data-input-text', 1);
  inputTodoText.style.backgroundColor = '#ffffff';
  inputTodoText.value = '';

  const selectOptionContainer = document.createElement('div');
  selectOptionContainer.classList.add('select-option-category');

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

  const addEditButton = document.createElement('button')
  addEditButton.style.display = 'none'

  const editIcon = document.createElement('img')
  editIcon.src = 'img/edit.png';

  const addDeleteButton = document.createElement('button');

  addDeleteButton.style.display = 'none'

  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'img/delete.png';

  inputTodoContent.appendChild(inputTodoCheckbox);
  inputTodoContent.appendChild(inputTodoText);
  selectOption.appendChild(defaultOption);
  selectOption.appendChild(schoolOption);
  selectOption.appendChild(workOption);
  selectOption.appendChild(personalOption);
  selectOption.appendChild(shoppingOption);
  selectOptionContainer.appendChild(selectOption);
  inputTodoContent.appendChild(selectOptionContainer);
  inputTodoContent.appendChild(checkButton);
  addEditButton.appendChild(editIcon)
  addDeleteButton.appendChild(deleteIcon);
  inputTodoContent.appendChild(addEditButton);
  inputTodoContent.appendChild(addDeleteButton);
  todoContainer.appendChild(inputTodoContent);

  const checkButtons = document.querySelectorAll('.check-button');
    checkButtons.forEach((button) => {
    button.addEventListener('click' , () => {
      addTodoList()
    });
  });
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
    inputTodoText.focus();  

  function addTodoList() {
      if (!inputTodoText.value) {
        alert('Please put something');
    } else {
    let uniqueID = Math.floor(Math.random() * 1000000000000000000000);
    const addTodo = {
        id: uniqueID,
        text: inputTodoText.value,
        category: selectOption.value
    };
    todos.push(addTodo);
    //console.log(addTodo);
    //console.log(todos);
    //console.log(uniqueID)
    localStorage.setItem('todos', JSON.stringify(todos));
    addButtonTask.disabled = false;
    addButtonTask.style.opacity = '1';
    selectOptionContainer.remove();
    checkButton.remove();
    inputTodoText.setAttribute('readonly', true)
    // action buttons
    addDeleteButton.style.display = 'flex';
    addEditButton.style.display = 'flex';
    addEditButton.classList.add('edit-button1')
    editIcon.classList.add('edit-icon');
    addDeleteButton.classList.add('delete-button1');
    deleteIcon.classList.add('delete-icon');
    addEditButton.setAttribute('data-todo-id', `${uniqueID}`)
    addDeleteButton.setAttribute('data-todo-id', `${uniqueID}`)
    inputTodoText.setAttribute('data-input-text', `${uniqueID}`)
    inputTodoContent.classList.add(`${selectingCategory.value.toLowerCase()}`)
    console.log(selectingCategory.value)
    inputTodoCheckbox.setAttribute('data-input-check', `${uniqueID}`)
    inputTodoCheckbox.removeAttribute('disabled');
    }
    const editButtons = document.querySelectorAll('.edit-button1');
    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const taskId = event.currentTarget.getAttribute('data-todo-id');
            const taskInput = document.querySelector(`.input-todo-text[data-input-text="${taskId}"]`);
            if (taskInput.hasAttribute('readonly', true)) {
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
    const completeContainer = document.querySelector('.complete-todo-container')
    const InputCheck = inputTodoContent.querySelectorAll('.input-todo-checkbox');
    InputCheck.forEach((check) => { 
      check.addEventListener('change', (event) => {
        const taskId = event.target.getAttribute('data-input-check');
        const completedTask = todos.find(task => task.id === parseInt(taskId));
        if (completedTask) {
          todosCompleted.push(completedTask);
          saveStorage();
          const index = todos.findIndex(task => task.id === parseInt(taskId));
          if (index !== -1) {
            todos.splice(index, 1);
            completeContainer.appendChild(inputTodoContent);
            inputTodoContent.classList.remove('todo-content');
            inputTodoContent.classList.add('todo-content');
            inputTodoContent.classList.add(selectingCategory.value)
            taskCompleted();
          }
          saveStorage();
        }
      }); 
    });
};
}