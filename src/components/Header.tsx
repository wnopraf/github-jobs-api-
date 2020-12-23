import React, {
  Children,
  FunctionComponent,
  useCallback,
  useState
} from 'react'
import styled from 'styled-components'
import { useMediaPhone, useMediaPoint } from '../lib/Hooks'
import { mediaHelper } from '../lib/mediaUtil'

import { Container } from './Container'
import { MobileJobsForm } from './JobFilter'
import { ToggleBgSwitch } from './ToggleSwitch'

export const HeightContext = React.createContext<(node: HTMLElement) => void>(
  () => {}
)
const StyledHeader = styled.header<{ formHeight: number }>`
  background-color: var(--color-purple-0);
  height: 160px;
  margin-bottom: -45px;
  ${mediaHelper().tablet(`
  border-bottom-left-radius: 5rem;
  
  `)}
  .header--wrapper-content {
    padding: 1px;

    .header--title {
      display: flex;
      justify-content: space-between;
      h1 {
        color: white;
        font-size: 2.5rem;
        letter-spacing: 2px;
      }
    }
    .header--form {
      margin-top: 2rem;
      margin-bottom: ${(props) => -(props.formHeight / 2)}px;
    }
  }
`
export const Header: FunctionComponent = ({ children }) => {
  const [formHeight, setFormHeight] = useState(0)
  const { isPhone } = useMediaPoint()
  const heightMeasurer = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        const { height } = node.getBoundingClientRect()
        console.log('form height', height)

        setFormHeight(height)
      }
    },
    [isPhone]
  )

  return (
    <StyledHeader formHeight={formHeight}>
      <Container>
        <div className="header--wrapper-content">
          <div className="header--title">
            <h1>devjobs</h1>
            <ToggleBgSwitch barwidth={isPhone ? 60 : 30} />
          </div>
        </div>
      </Container>
    </StyledHeader>
  )
}
