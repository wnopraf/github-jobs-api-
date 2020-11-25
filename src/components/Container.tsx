import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

import { breakPoints, mediaHelper } from '../lib/mediaUtil'

type BreakPoint = 'PHONE' | 'TABLET' | 'DESKTOP' | 'LARGEDESKTOP' | 'HD'
const maxWidthRuleRes = (breakPoint: BreakPoint) => {
  const maxWidth = (br: number) => `max-width: ${br}px;`
  switch (breakPoint) {
    case 'PHONE':
      return maxWidth(breakPoints.PHONE)
    case 'TABLET':
      return maxWidth(breakPoints.TABLET)
    case 'DESKTOP':
      return maxWidth(breakPoints.DESKTOP)
    case 'LARGEDESKTOP':
      return maxWidth(breakPoints.LARGEDESKTOP)
    case 'HD':
      return maxWidth(breakPoints.HD)
  }
}

const StyledContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  ${mediaHelper().phone(maxWidthRuleRes('PHONE'))}
  ${mediaHelper().tablet(maxWidthRuleRes('TABLET'))}
  ${mediaHelper().desktop(maxWidthRuleRes('DESKTOP'))}
  ${mediaHelper().lageDesktop(maxWidthRuleRes('LARGEDESKTOP'))}
  ${mediaHelper().hd(maxWidthRuleRes('HD'))}
`

export const Container: FunctionComponent = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}
