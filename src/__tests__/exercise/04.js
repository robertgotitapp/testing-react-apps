// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
const { build, fake } = require('@jackfranklin/test-data-bot');
import Login from '../../components/login'


// const buildLoginForm = (priority = {username: null, password: null}) => {
//   const fakeUsername = faker.internet.userName()
//   const fakePassword = faker.internet.password()

//   return {
//     username: priority.username || fakeUsername,
//     password: priority.password || fakePassword
//   }
// }

const userBuilder = build({
  fields: {
    username: fake(f => f.name.findName()),
    password: fake(f => f.internet.password())
  }
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()

  // const {username, password} = buildLoginForm({username: 'robert'})
  const { username, password } = userBuilder()

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)

  const submitButton = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  userEvent.click(submitButton)
  expect(handleSubmit).toHaveBeenCalledWith({
    password,
    username,
  })

})

/*
eslint
  no-unused-vars: "off",
*/
