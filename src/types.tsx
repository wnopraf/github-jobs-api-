import { Action } from 'redux'

export type LoadDataAction = Action<'LOAD_DATA'> & {
  payload: Job[]
}

export type LoadingAction = Action<Loading>

export interface Job {
  location: string
  title: string
  description: string
}

export interface SearchParams {
  location?: string
  description: string
}

export type BgColor = 'IS_LIGHT' | 'IS_DARK'

export type BgColorAction = Action<BgColor>

export type Loading = 'IS_LOADING' | 'IS_LOADED'

export interface store {
  jobs: Job[]
  loading: Loading
  bgColor: BgColor
}
