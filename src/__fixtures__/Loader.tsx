import React from 'react'
import { VscLoading } from 'react-icons/vsc'

import { AnimatedLoaderIcon } from '../components/JobList'

export default () => (
  <AnimatedLoaderIcon>
    <VscLoading className="loader-icon" />
  </AnimatedLoaderIcon>
)
