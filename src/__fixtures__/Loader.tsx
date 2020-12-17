import React from 'react'
import { VscLoading } from 'react-icons/vsc'

import { AnimatedLoaderIcon } from '../components/JobList'
import { Container } from '../components/Container'

export default () => (
  <Container>
    <AnimatedLoaderIcon>
      <VscLoading className="loader-icon" />
    </AnimatedLoaderIcon>
  </Container>
)
