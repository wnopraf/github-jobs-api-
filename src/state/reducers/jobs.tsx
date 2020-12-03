import { Reducer } from 'redux'
import { LoadDataAction, JobSearch } from '../../types'
import { LOAD_DATA } from '../constants'

export const jobReducer: Reducer<JobSearch[], LoadDataAction> = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case LOAD_DATA:
      return [...payload] as JobSearch[]

    default:
      return state
  }
}
