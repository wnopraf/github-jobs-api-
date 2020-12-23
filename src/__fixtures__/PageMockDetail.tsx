import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { JobDetail } from '../components/JobDetail'
import { MobileJobsForm } from '../components/JobFilter'
import { store } from '../state'
import { JobsDescription } from '../types'
const FakeBody = styled.div`
  background: rgb(234 234 234);
`

const fakeJob: JobsDescription = {
  company_url: 'http://www.fakeCompany.com',
  company: 'so digital inc.',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero culpa iure necessitatibus error ea cupiditate accusantium totam, incidunt provident optio, dolores possimus voluptates quisquam nesciunt quis numquam minima, unde dicta.',
  created_at: new Date().toISOString(),
  company_logo: 'null',
  title: 'front end developer',
  type: 'Full Time',
  id: '324524309',
  location: 'Malaga'
}
export default () => (
  <Provider store={store}>
    <FakeBody>
      <Header></Header>

      <JobDetail {...fakeJob} />
    </FakeBody>
  </Provider>
)
