import { Reducer } from 'redux'
import { LoadDataAction, Job } from '../../types'
import { LOAD_DATA } from '../constants'

export const jobReducer: Reducer<Job[], LoadDataAction> = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case LOAD_DATA:
      return [state, ...payload] as Job[]

    default:
      return state
  }
}
