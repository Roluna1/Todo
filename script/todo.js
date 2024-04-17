export let todos = JSON.parse(localStorage.getItem('todos')) || [];
export let todosCompleted = JSON.parse(localStorage.getItem('todosCompleted')) || [];


export function saveStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('todosCompleted', JSON.stringify(todosCompleted));
}
export function deleteTodo(deleteButtonID) {
  console.log(deleteButtonID)
  const deleteArray = [];

  todos.forEach((deleteTodo) =>{
    if (deleteTodo.deleteButtonID !== deleteButtonID) {
      deleteArray.push(deleteTodo)
      console.log(deleteArray)
    }
  })
};
