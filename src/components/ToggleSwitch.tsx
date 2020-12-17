import React, {
  EventHandler,
  FunctionComponent,
  ReactEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

import { BgColor, BgColorAction, store } from '../types'
import { IS_DARK, IS_LIGHT } from '../state/constants'
import { bgSwitchAction } from '../state/actions'
import { HiMoon, HiSun } from 'react-icons/hi'
const ToggleBgSwitchBar = styled.div<{
  barWidth: number
  switchPos: BgColor
}>`
  width: ${({ barWidth }) => barWidth + 'px'};
  background: white;
  border-radius: 1rem;
  padding: ${({ barWidth }) => 0.1 * barWidth}px;
  margin: 0 0.5rem;
  cursor: pointer;
  .toggle-switcher--switcher {
    width: ${({ barWidth }) => barWidth * 0.3 + 'px'};
    height: ${({ barWidth }) => barWidth * 0.3 + 'px'};
    border-radius: 50%;
    background: rgb(111 125 236);
    transition: transform ease-in-out 300ms;
    transform: ${({ switchPos, barWidth }) =>
      switchPos === IS_LIGHT
        ? 'translateX(0)'
        : `translateX(${barWidth - barWidth * 0.3 - 0.1 * barWidth * 2}px)`};
  }
`
export const ToggleBgSwitchBarProps: FunctionComponent<{
  switchPos: BgColor
  barWidth: number
  switcherWidth: number
}> = ({ barWidth = 30, switchPos }) => {
  return (
    <ToggleBgWrapper>
      <ToggleBgSwitchBar barWidth={barWidth} switchPos={switchPos} />
    </ToggleBgWrapper>
  )
}
const ToggleBgWrapper = styled.div<{ barWidth?: number }>`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  ${({ barWidth }) => ((barWidth as number) > 30 ? 'font-size: 1.6rem;' : '')}
  .sun-icon,
  .moon-icon {
    color: white;
  }
`

export const ToggleBgSwitch: FunctionComponent<{
  barwidth?: number
}> = ({ barwidth = 30 }) => {
  const [switchState, setSwitchState] = useState<BgColor>('IS_LIGHT')

  const switchStateRef = useRef<BgColor>('IS_LIGHT')
  switchStateRef.current = switchState
  const dispatch: Dispatch<BgColorAction> = useDispatch()

  useEffect(() => {
    console.log(bgState, 'bgState')
  })

  const bgState = useSelector<store, BgColor>((state) => state.bgColor)
  const switchHandler: ReactEventHandler = () => {
    switch (switchState) {
      case IS_LIGHT:
        return setSwitchState(IS_DARK)
      case IS_DARK:
        return setSwitchState(IS_LIGHT)
    }
  }
  return (
    <ToggleBgWrapper barWidth={barwidth}>
      <HiSun className="sun-icon" />
      <ToggleBgSwitchBar
        switchPos={switchState}
        barWidth={barwidth}
        onClick={switchHandler}
        onTransitionEnd={() => {
          console.log('transitionend event')

          dispatch(bgSwitchAction(switchStateRef.current))
        }}
      >
        <div className="toggle-switcher--switcher"></div>
      </ToggleBgSwitchBar>
      <HiMoon className="moon-icon" />
    </ToggleBgWrapper>
  )
}
