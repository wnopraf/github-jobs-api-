import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { Store } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const ToggleBgSwitcherDiv = styled.div`
  width: 50px;
  background: white;
  border-radius: 50%;
  .toggle-switcher--swithcer  {
    witdth: 50px;
    height: 50px;
    border-radius: 50%;
    background: purple;
    cursor: pointer;
  }
`

export const ToggleBgSwitcher: FunctionComponent = () => {
  const dispatch = useDispatch < ThunkDispatch<>()
  return (
    <ToggleBgSwitcherDiv>
      <div className="toggle-switcher--switcher"></div>
    </ToggleBgSwitcherDiv>
  )
}
