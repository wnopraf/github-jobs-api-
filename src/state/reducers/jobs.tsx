import { Reducer } from 'redux'
import { LoadDataAction, JobSearch, JobsDescription } from '../../types'
import { LOAD_DATA } from '../constants'

export const jobReducer: Reducer<JobsDescription[], LoadDataAction> = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case LOAD_DATA:
      return [...payload] 

    default:
      return state
  }
}
