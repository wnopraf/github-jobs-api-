import Axios from 'axios'

import { ThunkAction } from 'redux-thunk'
import { Job, SearchParams, LoadDataActionType } from '../../types'
import { LOAD_DATA } from '../constants'

export const loadData = ({
  description,
  location
}: SearchParams): ThunkAction<
  Promise<void>,
  unknown,
  unknown,
  LoadDataActionType
> => async (dispatch, state) => {
  try {
    const { data } = await Axios.get(
      `https://jobs.github.com/positions.json?description=${description}&location=${location}`
    )
    dispatch({ type: LOAD_DATA, payload: data })
  } catch (error) {}
}
