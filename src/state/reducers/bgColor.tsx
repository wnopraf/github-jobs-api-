import { Reducer } from 'redux'
import { BgColor, BgColorAction } from '../../types'
import { IS_DARK, IS_LIGHT } from '../constants'

export const bgColorReducer: Reducer<BgColor, BgColorAction> = (
  state: BgColor = 'IS_LIGHT',
  { type }: BgColorAction
) => {
  switch (type) {
    case IS_DARK:
      return IS_DARK

    case IS_LIGHT:
      return IS_LIGHT

    default:
      return state
  }
}
