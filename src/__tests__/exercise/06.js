// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
window.navigator.geolocation = {
  getCurrentPosition: jest.fn()
}

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 10,
      longitude: 10,
    }
  }

  let setReturnedValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnedValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)


  // const {promise, resolve, reject} = deferred()
  // window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     promise.then(() => callback(fakePosition))
  //   }
  // )
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  // await act(async () => {
  //   resolve()
  //   await promise
  // })

  act(() => setReturnedValue([fakePosition]))
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
