import { jobReducer } from './jobs'
import { loaderReducer } from './loader'
import { combineReducers } from 'redux'
import { bgColorReducer } from './bgColor'

export const rootReducer = combineReducers({
  jobReducer,
  loaderReducer,
  bgColorReducer
})
