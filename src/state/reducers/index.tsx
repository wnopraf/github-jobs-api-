import { jobReducer as jobs } from './jobs'
import { loaderReducer as loader } from './loader'
import { bgColorReducer as bgColor } from './bgColor'
import { combineReducers } from 'redux'
export const rootReducer = combineReducers({
  jobs,
  loader,
  bgColor
})
