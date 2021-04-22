// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  ReactDOM.render(<Counter />, el)
  const [decrement, increment] = el.querySelectorAll('button')
  const message = el.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')
  increment.click()
  expect(message.textContent).toBe('Current count: 1')
  decrement.click()
  expect(message.textContent).toBe('Current count: 0')
  el.remove()
})

/* eslint no-unused-vars:0 */
