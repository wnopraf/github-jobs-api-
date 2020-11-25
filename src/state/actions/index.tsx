import Axios from 'axios'

import { ThunkAction } from 'redux-thunk'
import { Job, SearchParams, LoadDataAction, BgColor } from '../../types'
import { IS_DARK, IS_LIGHT, LOAD_DATA } from '../constants'

export const loadData = ({
  description,
  location
}: SearchParams): ThunkAction<
  Promise<void>,
  unknown,
  unknown,
  LoadDataAction
> => async (dispatch, state) => {
  try {
    const { data }: { data: Job[] } = await Axios.get(
      `https://jobs.github.com/positions.json?description=${description}&location=${location}`
    )
    dispatch({ type: LOAD_DATA, payload: data })
  } catch (error) {}
}

export const bgSwitchAction = (bgColorState: BgColor) => {
  switch (bgColorState) {
    case 'IS_DARK':
      return { type: IS_LIGHT }
    case 'IS_LIGHT':
      return { type: IS_DARK }
  }
}
