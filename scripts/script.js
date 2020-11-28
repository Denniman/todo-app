'use strict'

const todos = getSavedTodos()

const inputSearch = document.querySelector('#todosInput')
const checkbox = document.querySelector('#checkbox')
const display = document.querySelector('.display')


  const filters = {
    searchText: '',
    hideCompleted: false
  }

  renderTodos(filters, todos)

  inputSearch.addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(filters, todos)
  })

  checkbox.addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(filters, todos)
  })

  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.todosText.value.trim()
    if(text.length > 0) {
      todos.push({
        id: uuidv4(),
        text,
        completed: false
      })

      saveTodos(todos)
      renderTodos(filters, todos)
      e.target.todosText.value = ''
    }
  
})

 
  
  