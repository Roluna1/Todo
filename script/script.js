import { tasks } from "./task.js"
import { taskCompleted } from "./taskcompleted.js"
import { todos } from "./todo.js"

// pakyu javascript .|.

const arrowTask = document.querySelector('.arrow');
const arrowTask1 = document.querySelector('.arrow-2');
const schoolCategory = document.querySelector('.category-text.school')
const workCategory = document.querySelector('.category-text.work');
const personalCategory = document.querySelector('.category-text.personal');
const shoppingCategory = document.querySelector('.category-text.shopping');
const addButtonTask = document.querySelector('.add-todo-button');
const allCategory = document.querySelector('.category-text.all');

// inside todo-content 
const inputTodoCheckbox = document.createElement('input');
const inputTodoText = document.createElement('input');

addButtonTask.addEventListener('click', () => {
    addButtonTask.disabled = true;
    addButtonTask.style.opacity = '.5';
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.style.display = 'flex';
    arrowTask.style.transform = '';
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

    //const addEditButton = document.createElement('button')
    //addEditButton.style.display = 'none'

    //const editIcon = document.createElement('img')
    //editIcon.src = 'img/edit.png';

    //const addDeleteButton = document.createElement('button');

    //addDeleteButton.style.display = 'none'

    //const deleteIcon = document.createElement('img');
    //deleteIcon.src = 'img/delete.png';

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
    //addEditButton.appendChild(editIcon)
    //addDeleteButton.appendChild(deleteIcon);
    //inputTodoContent.appendChild(addEditButton);
    //inputTodoContent.appendChild(addDeleteButton);
    todoContainer.appendChild(inputTodoContent);

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
    const taskID = inputTodoText.getAttribute('data-input-text');
    const taskInput = document.querySelector(`.input-todo-text[data-input-text="${taskID}"]`);
    taskInput.focus();
    taskInput.addEventListener('keypress', (event) => {
      taskInput.focus();
      if (event.key === 'Enter' || event.key === 13 || event.which === 13) {
        event.preventDefault();
        addTodoList();
      }
    });
const checkButtons = document.querySelectorAll('.check-button');
checkButtons.forEach((button) => {
    button.addEventListener('click' , () => {
      addTodoList()
    });
});
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
  inputTodoText.setAttribute('readonly', true);
  inputTodoText.setAttribute('data-input-check', `${uniqueID}`)
  // action buttons
  //addDeleteButton.style.display = 'flex';
  //addEditButton.style.display = 'flex';
  //addEditButton.classList.add('edit-button')
  //editIcon.classList.add('edit-icon');
  //addDeleteButton.classList.add('delete-button');
  //deleteIcon.classList.add('delete-icon');
  //addEditButton.setAttribute('data-todo-id', `${uniqueID}`)
  //addDeleteButton.setAttribute('data-todo-id', `${uniqueID}`)
  }
  }
});
  allCategory.addEventListener('click', () => {
    const school = document.querySelectorAll('.todo-content.school, .todo-content1.school')
    const work = document.querySelectorAll('.todo-content.work, .todo-content1.work');
    const shopping = document.querySelectorAll('.todo-content.shopping, .todo-content1.shopping');
    const personal = document.querySelectorAll('.todo-content.personal, .todo-content1.personal');
    const walaToGuys = document.querySelectorAll('.todo-content.none, .todo-content1.none');
    
    allCategory.style.opacity = '1';
    schoolCategory.style.opacity = '.5';
    workCategory.style.opacity = '.5';
    personalCategory.style.opacity = '.5';
    shoppingCategory.style.opacity = '.5';
  
    school.forEach((hide) => {
      hide.style.display = 'flex';
    });
    work.forEach((hide) => {
      hide.style.display = 'flex';
    });
    shopping.forEach((hide) => {
      hide.style.display = 'flex';
    });
    personal.forEach((hide) => {
      hide.style.display = 'flex';
    });
    walaToGuys.forEach((hide) => {
      hide.style.display = 'flex';
    });
  });

schoolCategory.addEventListener('click', () => {
  const school = document.querySelectorAll('.todo-content.school, .todo-content1.school')
  const work = document.querySelectorAll('.todo-content.work, .todo-content1.work');
  const shopping = document.querySelectorAll('.todo-content.shopping, .todo-content1.shopping');
  const personal = document.querySelectorAll('.todo-content.personal, .todo-content1.personal');
  const walaToGuys = document.querySelectorAll('.todo-content.none, .todo-content1.none');

  allCategory.style.opacity = '.5';
  schoolCategory.style.opacity = '1';
  workCategory.style.opacity = '.5';
  personalCategory.style.opacity = '.5';
  shoppingCategory.style.opacity = '.5';

  school.forEach((hide) => {
    hide.style.display = 'flex';
  });
  work.forEach((hide) => {
    hide.style.display = 'none';
  });
  shopping.forEach((hide) => {
    hide.style.display = 'none';
  });
  personal.forEach((hide) => {
    hide.style.display = 'none';
  });
  walaToGuys.forEach((hide) => {
    hide.style.display = 'none';
  });
});
workCategory.addEventListener('click', () => {
  const school = document.querySelectorAll('.todo-content.school, .todo-content1.school')
  const work = document.querySelectorAll('.todo-content.work, .todo-content1.work');
  const shopping = document.querySelectorAll('.todo-content.shopping, .todo-content1.shopping');
  const personal = document.querySelectorAll('.todo-content.personal, .todo-content1.personal');
  const walaToGuys = document.querySelectorAll('.todo-content.none, .todo-content1.none');

  allCategory.style.opacity = '.5';
  schoolCategory.style.opacity = '.5';
  workCategory.style.opacity = '1';
  personalCategory.style.opacity = '.5';
  shoppingCategory.style.opacity = '.5';

  school.forEach((hide) => {
    hide.style.display = 'none';
  });
  work.forEach((hide) => {
    hide.style.display = 'flex';
  });
  shopping.forEach((hide) => {
    hide.style.display = 'none';
  });
  personal.forEach((hide) => {
    hide.style.display = 'none';
  });
  walaToGuys.forEach((hide) => {
    hide.style.display = 'none';
  });
});
personalCategory.addEventListener('click', () => {
  const school = document.querySelectorAll('.todo-content.school, .todo-content1.school')
  const work = document.querySelectorAll('.todo-content.work, .todo-content1.work');
  const shopping = document.querySelectorAll('.todo-content.shopping, .todo-content1.shopping');
  const personal = document.querySelectorAll('.todo-content.personal, .todo-content1.personal');
  const walaToGuys = document.querySelectorAll('.todo-content.none, .todo-content1.none');
  
  allCategory.style.opacity = '.5';
  schoolCategory.style.opacity = '.5';
  workCategory.style.opacity = '.5';
  personalCategory.style.opacity = '1';
  shoppingCategory.style.opacity = '.5';

  school.forEach((hide) => {
    hide.style.display = 'none';
  });
  work.forEach((hide) => {
    hide.style.display = 'none';
  });
  shopping.forEach((hide) => {
    hide.style.display = 'none';
  });
  personal.forEach((hide) => {
    hide.style.display = 'flex';
  });
  walaToGuys.forEach((hide) => {
    hide.style.display = 'none';
  });
});
shoppingCategory.addEventListener('click', () => {
  const school = document.querySelectorAll('.todo-content.school, .todo-content1.school')
  const work = document.querySelectorAll('.todo-content.work, .todo-content1.work');
  const shopping = document.querySelectorAll('.todo-content.shopping, .todo-content1.shopping');
  const personal = document.querySelectorAll('.todo-content.personal, .todo-content1.personal');
  const walaToGuys = document.querySelectorAll('.todo-content.none, .todo-content1.none');
  
  allCategory.style.opacity = '.5';
  schoolCategory.style.opacity = '.5';
  workCategory.style.opacity = '.5';
  personalCategory.style.opacity = '.5';
  shoppingCategory.style.opacity = '1';

  school.forEach((hide) => {
    hide.style.display = 'none';
  });
  work.forEach((hide) => {
    hide.style.display = 'none';
  });
  shopping.forEach((hide) => {
    hide.style.display = 'flex';
  });
  personal.forEach((hide) => {
    hide.style.display = 'none';
  });
  walaToGuys.forEach((hide) => {
    hide.style.display = 'none';
  });
});

arrowTask.addEventListener('click', () => {
  const container = document.querySelector('.todo-container')

  if(container) {
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    arrowTask.style.transform = arrowTask.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
  }
})
arrowTask1.addEventListener('click', () => {
  const container = document.querySelector('.complete-todo-container')

  if(container) {
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    arrowTask1.style.transform = arrowTask1.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
  }
})
tasks();
taskCompleted();
allCategory.style.opacity = '1';
schoolCategory.style.opacity = '.5';
workCategory.style.opacity = '.5';
personalCategory.style.opacity = '.5';
shoppingCategory.style.opacity = '.5';