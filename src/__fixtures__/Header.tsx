import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { store } from '../state'
const FakeBody = styled.div`
  background: rgb(234 234 234);
  padding-bottom: 5rem;
`
export default ({ children }) => (
  <Provider store={store}>
    <FakeBody>
      <Header />
      {children}
    </FakeBody>
  </Provider>
)
