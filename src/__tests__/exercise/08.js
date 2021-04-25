// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toEqual(0)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(1)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 2}))
  expect(result.current.count).toEqual(2)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(3)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(2)
})

test('allows customization of step', () => {
  const {result} = renderHook(() => useCounter({step: 3}))
  expect(result.current.count).toEqual(0)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(3)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(0)
})

/* eslint no-unused-vars:0 */
