import { Link, Router } from '@reach/router'
import React, { Children, FunctionComponent, useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { Store } from 'redux'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { JobDetail } from '../components/JobDetail'
import { MobileJobsForm } from '../components/JobFilter'
import { store } from '../state'
import { IS_LIGHT } from '../state/constants'
import { JobsDescription, Store as AppStore, BgColor } from '../types'
import { JobLists } from './JobList'
const StyledHome = styled.div`
  min-height: 100vh;
`

const Home = () => (
  <StyledHome>
    <Container>
      <MobileJobsForm />
      <JobLists />
    </Container>
  </StyledHome>
)

const BgWrapper = styled.section<{ bg: BgColor }>`
  transition: background-color 200ms linear;
  background-color: ${(props) =>
    props.bg === IS_LIGHT ? 'var(--color-gray-body-bg)' : 'black'};
`
const AppWrapper: FunctionComponent = ({ children }) => {
  const bgColor: BgColor = useSelector<AppStore, BgColor>(
    (store) => store.bgColor
  )

  return <BgWrapper bg={bgColor}>{children}</BgWrapper>
}
export const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Header></Header>
        <Router>
          <Home path="/" />

          <JobDetail path="/job/:jobId" />
        </Router>
      </AppWrapper>
    </Provider>
  )
}
