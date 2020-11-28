'use strict'

const getSavedTodos = () => {

    const todosJSON = localStorage.getItem('todos')

    try {
      return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
      return []
    } 

}

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodos = (id) => {
  const todosIndex = todos.findIndex((todo) => {
    return todo.id === id
  })

  if(todosIndex > -1) {
    todos.splice(todosIndex, 1)
  }
}

const toggleTodo = (id) => {
  const toggleIndex = todos.find((todo) => todo.id === id)

  if(toggleIndex) {
    toggleIndex.completed = !toggleIndex.completed
  }
} 


const generateTodosDOM = (todo) => {
  const todoEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  // todoEl.setAttribute('href', 'edit.html')
  const removeButton = document.createElement('button')

  checkbox.setAttribute('type', 'checkbox')

  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos(filters, todos)
  })

    checkbox.checked = todo.completed
  
    containerEl.appendChild(checkbox)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    removeButton.textContent = 'remove' 
    removeButton.classList.add('button--text')
    
    todoEl.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
      removeTodos(todo.id)
      saveTodos(todos)
      renderTodos(filters, todos)
    })


    return todoEl 
  
} 



const generateSummaryDOM = (incompleteTodos) => {
    const headEl = document.createElement('h2')
    headEl.classList.add('list-title')

    const plural = incompleteTodos.length === 1 ? '' : 's'
    headEl.textContent = `You have ${incompleteTodos.length} todo${plural} left`

    // if(incompleteTodos.length > 1) {
    //   headEl.textContent = `You have ${incompleteTodos.length} todos left`
    // } else {
    //   headEl.textContent = `You have ${incompleteTodos.length} todo left`
    // }
    
    return headEl
}

const renderTodos = (filters, todos) => {
    let filteredTodos = todos.filter(todo => {
      return todo.text.toLowerCase().includes(filters.searchText)
    })

    filteredTodos = filteredTodos.filter(todo => {
      if(filters.hideCompleted) {
        return !todo.completed
      } else {
        return true
      }
      
    })
     

    const uncompletedTodos = filteredTodos.filter((todo) => {
      return !todo.completed
    })
      
    display.innerHTML = ''
    
    const textEl = generateSummaryDOM(uncompletedTodos) 
    display.appendChild(textEl)
    if(filteredTodos.length > 0) {
      filteredTodos.forEach(todo => {
        display.appendChild(generateTodosDOM(todo))
      })
    } else {
      const pEl = document.createElement('p')
      pEl.classList.add('empty-message')
      pEl.textContent = 'No to-dos to show'
      display.appendChild(pEl)
    }
    
  }