import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Add task', () => {
  test('Enter the task and press Enter to add it to the list after which the input box is cleared', async () => {
    render(
      <Router>
        <App />
      </Router>
    )
    const input = screen.getByTestId('new-todo')
    userEvent.type(input, 'Hello World{enter}')
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(input.value).toBe('')
  })
})

describe('Delete task', () => {
  test('Click the delete button (x) and the task item should be removed', () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    // Find the delete button
    userEvent.click(screen.getByTestId('destroy'))

    expect(screen.queryByText('eat')).toBeNull()
  })
})

describe('Toggle the completion status of a single task', () => {
  test('Toggle the task completion status button and the completion style of the task will also change accordingly', async () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const done = screen.getByTestId('todo-done')

    userEvent.click(done)

    expect(screen.getByTestId('todo-item').classList.contains('completed')).toBeTruthy()

    userEvent.click(done)

    expect(screen.getByTestId('todo-item').classList.contains('completed')).toBeFalsy()
  })
})

describe('Toggle the completion status of all tasks', () => {
  test('Click the Toggle All button (arrow down button) and all tasks should change accordingly', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const toggleAll = screen.getByTestId('toggle-all')

    userEvent.click(toggleAll)

    const todoDones = screen.getAllByTestId('todo-done')

    todoDones.forEach((item) => {
      expect(item.checked).toBeTruthy()
    })

    userEvent.click(toggleAll)

    todoDones.forEach((item) => {
      expect(item.checked).toBeFalsy()
    })
  })
})

describe('Edit Task', () => {
  test('Double click on the task item text and you should get the edit status', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    expect(todoItem.classList.contains('editing')).toBeFalsy()
    userEvent.dblClick(todoText)
    expect(todoItem.classList.contains('editing')).toBeTruthy()
  })

  test('After modifying the text of the task item and pressing Enter, the modification should be saved and the editing status should be cancelled.', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)

    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, 'hello{enter}')

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(todoItem.classList.contains('editing')).toBeFalsy()
  })

  test('Empty to-do item text, saving edits should remove to-do item', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, '{enter}')

    expect(screen.queryByText('eat')).toBeNull()
  })

  test('Modifying the task item text after pressing ESC, the editing state should be canceled and the task item text should remain unchanged', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')

    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, 'hello{esc}')

    expect(screen.getByText('eat')).toBeInTheDocument()
    expect(todoItem.classList.contains('editing')).toBeFalsy()
  })
})

describe('Delete all completed tasks', () => {
  test('If no tasks are completed, the clear completed button should not show, otherwise show', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    expect(screen.queryByTestId('clear-completed')).toBeNull()

    userEvent.click(screen.getAllByTestId('todo-done')[0])

    expect(screen.queryByTestId('clear-completed')).not.toBeNull()
  })

  test('Pressing the clear completed button should delete all completed tasks', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const clearCompleted = screen.queryByTestId('clear-completed')
    userEvent.click(clearCompleted)
    expect(screen.queryAllByTestId('todo-item')).toHaveLength(1)
    expect(screen.getByText('sleep')).toBeInTheDocument()
  })
})

describe('Show the number of remaining tasks', () => {
  test('Display the number of all remaining unfinished tasks', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

describe('Data filtering', () => {
  const todos = [
    { id: 1, text: 'play', done: true },
    { id: 2, text: 'eat', done: false },
    { id: 3, text: 'sleep', done: true }
  ]

  const filterTodos = {
    all: () => todos,
    pending: () => todos.filter((t) => !t.done),
    completed: () => todos.filter((t) => t.done)
  }

  test('Click on the All link, all tasks should be displayed, and the All link should be highlighted', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-all')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3)
    expect(link.classList.contains('selected')).toBeTruthy()
  })

  test('Click on the "Pending" link, all pending tasks should be displayed, and the "Pending" link should be highlighted', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-pending')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(1)
    expect(link.classList.contains('selected')).toBeTruthy()
  })

  test('Click on the "Completed" link, all completed tasks should be displayed and the "Completed" link should be highlighted', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-completed')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2)
    expect(link.classList.contains('selected')).toBeTruthy()
  })
})
