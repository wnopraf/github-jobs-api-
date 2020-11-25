import React, { Children, FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import {
  ToggleBgSwitch,
  ToggleBgSwitchBarProps
} from '../components/ToggleSwitch'
import { store } from '../state'
import '../styles/index.css'

const FakeBgWrapper = styled.div`
  background: rgb(141 152 234);
`

const TestProvider: FunctionComponent = ({ children }) => {
  return (
    <Provider store={store}>
      <FakeBgWrapper>{children}</FakeBgWrapper>
    </Provider>
  )
}
export default {
  basic: (
    <TestProvider>
      <ToggleBgSwitch />
    </TestProvider>
  ),
  medium: (
    <TestProvider>
      <ToggleBgSwitch barwidth={60} />
    </TestProvider>
  )
}
