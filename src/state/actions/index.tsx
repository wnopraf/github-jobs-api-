import Axios from 'axios'

import { ThunkAction } from 'redux-thunk'
import { JobSearch, LoadDataAction, BgColor } from '../../types'
import { IS_DARK, IS_LIGHT, LOAD_DATA } from '../constants'

export const loadData = ({
  title,
  location,
  fullTime
}: JobSearch): ThunkAction<
  Promise<void>,
  unknown,
  unknown,
  LoadDataAction
> => async (dispatch, state) => {
  const descriptionParam = title ? `description=${title}` : ''
  const locationParam = location ? `&location=${location}` : ''
  const fullTimeParam = fullTime ? `&full_time=true` : ''

  try {
    const { data }: { data: JobSearch[] } = await Axios.get(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?${descriptionParam}${locationParam}${fullTimeParam}`
    )
    dispatch({ type: LOAD_DATA, payload: data })
  } catch (error) {
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
