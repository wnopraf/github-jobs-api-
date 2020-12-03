import React from 'react'
import { Provider } from 'react-redux'

import styled from 'styled-components'
import {
  FormPicker,
  FullTimeJobFilter,
  LocationJobFilter,
  TitleJobFilter,
  MobileJobsForm,
  TabletFormInputs
} from '../components/JobFilter'
import { store } from '../state'

const StyledDivWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
`
export default () => (
  <Provider store={store}>
    <StyledDivWrapper>
      <MobileJobsForm />
    </StyledDivWrapper>
  </Provider>
)
/* export default {
  FormPicker: (
    <StyledDivWrapper>
      <FormPicker />
    </StyledDivWrapper>
  ),
  FullTimeJobFilter: (
    <StyledDivWrapper>
      <FullTimeJobFilter />
    </StyledDivWrapper>
  ),
  TitleJobFilter: (
    <StyledDivWrapper>
      <TitleJobFilter />
    </StyledDivWrapper>
  ),
  LocationJobFilter: (
    <StyledDivWrapper>
      <LocationJobFilter />
    </StyledDivWrapper>
  )
} */
