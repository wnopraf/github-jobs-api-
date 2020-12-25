import { Link, Router } from '@reach/router'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { JobDetail } from '../components/JobDetail'
import { MobileJobsForm } from '../components/JobFilter'
import { store } from '../state'
import { JobsDescription } from '../types'
import { JobLists } from './JobList'
const FakeBody = styled.div``

const Home = () => (
  <div className="home">
    <Container>
      <MobileJobsForm />
      <JobLists />
    </Container>
  </div>
)

export const App = () => {
  return (
    <Provider store={store}>
      <Header></Header>

      <Router>
        <Home path="/" />

        <JobDetail path="/job/:jobId" />
      </Router>
    </Provider>
  )
}
