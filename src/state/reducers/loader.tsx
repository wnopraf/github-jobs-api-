import { Reducer } from 'redux'
import { LoadingAction } from '../../types'
import { IS_LOADED, IS_LOADING } from '../constants'

export const loaderReducer: Reducer<boolean, LoadingAction> = (
  state = false,
  { type }
) => {
  switch (type) {
    case IS_LOADING:
      return true
    case IS_LOADED:
      return false
    default:
      return state
  }
}
