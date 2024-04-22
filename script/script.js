import { tasks } from "./task.js";
import { taskCompleted } from "./taskcompleted.js";
import { todos, saveStorage } from "./todo.js";
import { AddTodo } from "./addtodo.js";

// pakyu javascript .|.

const arrowTask = document.querySelector('.arrow');
const arrowTask1 = document.querySelector('.arrow-2');
const schoolCategory = document.querySelector('.category-text.school')
const workCategory = document.querySelector('.category-text.work');
const personalCategory = document.querySelector('.category-text.personal');
const shoppingCategory = document.querySelector('.category-text.shopping');
const allCategory = document.querySelector('.category-text.all');
const addButtonTask = document.querySelector('.add-todo-button');
// inside todo-content 

addButtonTask.addEventListener('click', () => {
  AddTodo();
  editButtonBeh()
});

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
function editButtonBeh() {
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
}

tasks();
taskCompleted();
allCategory.style.opacity = '1';
schoolCategory.style.opacity = '.5';
workCategory.style.opacity = '.5';
personalCategory.style.opacity = '.5';
shoppingCategory.style.opacity = '.5';

