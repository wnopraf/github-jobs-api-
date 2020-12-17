import { Action } from 'redux'

export type LoadDataAction = Action<'LOAD_DATA'> & {
  payload: JobsDescription[]
}

export type LoadingAction = Action<Loading>

export interface JobSearch {
  location: string
  title: string
  fullTime: boolean
}

export type BgColor = 'IS_LIGHT' | 'IS_DARK'

export type BgColorAction = Action<BgColor>

export type Loading = 'IS_LOADING' | 'IS_LOADED'

export interface Store {
  jobs: JobsDescription[]
  loader: Loading
  bgColor: BgColor
}

export interface JobsDescription {
  id: string
  type: 'Full Time' | 'Part Time'
  created_at: string
  company: string
  location: string
  title: string
  company_logo: string
}
