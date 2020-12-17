import { store } from '../state'

test('is loading', () => {
  store.dispatch({ type: 'IS_LOADING' })
  expect(store.getState().loader).toBe(true)
})
