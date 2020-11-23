import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { ToggleBgSwitch } from '../components/ToggleSwitch'
import { store } from '../state'

export default () => (
  <Provider store={store}>
    <FakeBgWrapper>
      <ToggleBgSwitch />
    </FakeBgWrapper>
  </Provider>
)

const FakeBgWrapper = styled.div`
  background: rgb(141 152 234);
`
