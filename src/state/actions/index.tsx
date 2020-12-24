import Axios from 'axios'

import { ThunkAction } from 'redux-thunk'
import {
  JobSearch,
  LoadDataAction,
  BgColor,
  JobsDescription,
  LoadingAction
} from '../../types'
import {
  IS_DARK,
  IS_LIGHT,
  IS_LOADED,
  IS_LOADING,
  LOAD_DATA
} from '../constants'

export const loadData = ({
  title,
  location,
  fullTime
}: JobSearch): ThunkAction<
  Promise<void>,
  unknown,
  unknown,
  LoadDataAction | LoadingAction
> => async (dispatch, state) => {
  const descriptionParam = title ? `description=${title}` : ''
  const locationParam = location ? `&location=${location}` : ''
  const fullTimeParam = fullTime ? `&full_time=true` : ''

  try {
    const { data }: { data: JobsDescription[] } = await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?${descriptionParam}${locationParam}${fullTimeParam}`
    )
    dispatch({ type: LOAD_DATA, payload: data })
  } catch (error) {
    dispatch({ type: IS_LOADED })
    console.log('Request error', error)
  }
}

export const bgSwitchAction = (bgColorState: BgColor) => {
  switch (bgColorState) {
    case 'IS_DARK':
      return { type: IS_LIGHT }
    case 'IS_LIGHT':
      return { type: IS_DARK }
  }
}

export const loadingAction = { type: IS_LOADING }
