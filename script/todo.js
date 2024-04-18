export let todos = JSON.parse(localStorage.getItem('todos')) || [];
export let todosCompleted = JSON.parse(localStorage.getItem('todosCompleted')) || [];

// pakyu javascript .|.
export function saveStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('todosCompleted', JSON.stringify(todosCompleted));
}
