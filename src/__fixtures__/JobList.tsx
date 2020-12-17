import React from 'react'

import Header from './Header'
import { JobLists } from '../components/JobList'
import { Container } from '../components/Container'

export default () => (
  <Header>
    <Container>
      <JobLists />
    </Container>
  </Header>
)
