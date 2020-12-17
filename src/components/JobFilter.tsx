import React, {
  ChangeEventHandler,
  createContext,
  Dispatch,
  FunctionComponent,
  ReactEventHandler,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'

import { Action } from 'redux'
import styled from 'styled-components'
import { TiFilter } from 'react-icons/ti'
import { MdLocationOn } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

import { loadData } from '../state/actions'
import { JobSearch, LoadDataAction, LoadingAction, Store } from '../types'
import { mediaHelper } from '../lib/mediaUtil'
import { ThunkDispatch } from 'redux-thunk'
import { useMediaPoint } from '../lib/Hooks'
import { HeightContext } from './Header'
import { IS_LOADED, IS_LOADING } from '../state/constants'

const MobileJobsWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;

  margin: 0 auto;
  ${mediaHelper().tablet(`
    max-width: 100%;
  `)}
`

type FormState = { title: string; location: string; fullTime: boolean }
type FormActionConstants =
  | 'SETTITLE'
  | 'SETLOCATION'
  | 'SETFULLTIME'
  | 'RESET_DEFAULT'
  | 'MERGE_ALL'
type FormAction = {
  payLoad?: string | boolean | JobSearch
} & Action<FormActionConstants>
type FormContext = {
  jobsFormState: FormState
  dispatch: Dispatch<FormAction>
  changeHandler: ReactEventHandler
}

const FormContext = createContext({} as FormContext)
let title: string = '',
  location: string = '',
  fullTime: boolean = false

const formReducer: Reducer<FormState, FormAction> = (
  state = { title: '', location: '', fullTime: false },
  action
) => {
  switch (action.type) {
    case 'SETTITLE':
      return { ...state, title: action.payLoad as string }
    case 'SETLOCATION':
      return { ...state, location: action.payLoad as string }
    case 'SETFULLTIME':
      return { ...state, fullTime: action.payLoad as boolean }
    case 'RESET_DEFAULT':
      return { title: '', location: '', fullTime: false }
    case 'MERGE_ALL':
      return { ...state, ...(action.payLoad as JobSearch) }
  }
}

export const MobileJobsForm: FunctionComponent = () => {
  const [jobsFormState, dispatch] = useReducer(formReducer, {
    title: '',
    location: '',
    fullTime: false
  })

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    switch ((e.target as HTMLInputElement).dataset.form) {
      case 'title':
        dispatch({ type: 'SETTITLE', payLoad: e.target.value })
        break
      case 'location':
        dispatch({ type: 'SETLOCATION', payLoad: e.target.value })
        break
      case 'fullTime':
        dispatch({ type: 'SETFULLTIME', payLoad: e.target.checked })
        break
    }
  }

  const jobs = useSelector<Store>((store) => store.jobs)
  const heightMeasurer = useContext(HeightContext)
  console.log('form filter state', jobsFormState)

  console.log('jobs data state', jobs)

  return (
    <FormContext.Provider value={{ changeHandler, dispatch, jobsFormState }}>
      <MobileJobsWrapper ref={heightMeasurer}>
        <FormPicker />
        <TabletFormInputs />
      </MobileJobsWrapper>
    </FormContext.Provider>
  )
}

const StyledTextTitle = styled.input<{ control?: string }>`
  padding: 1rem;
  position: absolute;
  ${mediaHelper().tablet(`
    position: static;
  `)}
  
  z-index: ${(props) => (props.control === 'title' ? 10 : -1)};
  ${mediaHelper().tablet(`
    z-index: 0;
  `)}
  ${mediaHelper().tablet(`padding: 0;`)}
  border: none;
  outline: none;
  &:placeholder {
    font-size: 1.6rem;
    color: light-gray;
  }
    letter-spacing: 1px;
    
  }
  margin-right: auto;
  width: 60%;
  ${mediaHelper().tablet(`
    width: 100%;
    margin-right: none;
  `)}
`

const StyledTextLocation = styled(StyledTextTitle)`
  z-index: ${(props) => (props.control === 'location' ? 10 : -1)};
  ${mediaHelper().tablet(`
    z-index: 0;
  `)}
`
export const TitleJobFilter: FunctionComponent<{ control?: string }> = ({
  control
}) => {
  const { changeHandler, jobsFormState } = useContext(FormContext)
  console.log('filter title', jobsFormState.title)
  const { isDesktop } = useMediaPoint()

  return (
    <StyledTextTitle
      type="text"
      data-form="title"
      value={jobsFormState.title}
      onChange={changeHandler}
      className="title-input"
      placeholder={
        isDesktop
          ? 'Filter by title, companies, expertise...'
          : 'Filter by title...'
      }
      control={control}
    />
  )
}

export const LocationJobFilter: FunctionComponent<{ control?: string }> = ({
  control
}) => {
  const { changeHandler, jobsFormState } = useContext(FormContext)

  return (
    <StyledTextLocation
      type="text"
      data-form="location"
      value={jobsFormState.location}
      onChange={changeHandler}
      className="location-input"
      placeholder="Filter by location..."
      control={control}
    />
  )
}
const StyledCheckInput = styled.div<{ control?: string }>`
  display: flex;
  align-items: center;
  position: absolute;
  ${mediaHelper().tablet(`
    position: static;
  `)}

  z-index: ${(props) => (props.control === 'fulltime' ? 10 : -1)};
  ${mediaHelper().tablet(`
  z-index: 0;
`)}
  margin-right: auto;

  .full-time--wrapper {
    position: relative;
    margin-right: 1rem;
    width: 30px;
    height: 30px;
  }
  label {
  }
  .full-time--input {
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 10;
  }
  .full-time--fake-checkbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    ${mediaHelper().desktop(`
      width: 25px;
      height: 25px;
    
    `)}
    background: rgb(230 229 229);
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .full-time--label {
    font-weight: bold;
    font-size: 1.3rem;
    text-transform: capitalize;
    ${mediaHelper().desktop(`
      font-size: 1.1rem;
    `)}
  }
  .full-time--fake-checkbox::after {
    content: '';
    position: absolute;
    display: block;
    left: 10px;
    top: 2px;
    width: 40%;
    height: 70%;
    margin-bottom: 5px;
    border: solid darkslategray;
    border-width: 0 5px 5px 0;
    ${mediaHelper().desktop(`
      border-width: 0 4px 4px 0;
    `)}
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    opacity: 0;
    -webkit-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
  }

  .full-time--input:checked ~ .full-time--fake-checkbox::after {
    opacity: 1;
  }
`
export const FullTimeJobFilter: FunctionComponent<{ control?: string }> = ({
  control
}) => {
  const { changeHandler, jobsFormState } = useContext(FormContext)
  const { isDesktop } = useMediaPoint()
  return (
    <StyledCheckInput control={control}>
      <span className="full-time--wrapper">
        <input
          type="checkbox"
          className="full-time--input"
          data-form="fullTime"
          checked={jobsFormState.fullTime}
          onChange={changeHandler}
        />
        <span className="full-time--fake-checkbox"></span>
      </span>
      <label className="full-time--label">
        {isDesktop ? 'full time only' : 'full time'}
      </label>
    </StyledCheckInput>
  )
}

const StyledUlFormPicker = styled.ul<{ isOpen: boolean; liHeight: number }>`
  height: ${(props) => (props.isOpen ? props.liHeight * 3 : 0)}px;
  overflow: hidden;

  transition: height 200ms ease-in-out;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 4rem;
  right: 0;
  background: white;
  box-shadow: 0 0 3px 0px #00000073;
`
const StyledDivFilterWrapper = styled.div`
  position: relative;
  
  @media (min-width: 768px) {
    display: none;
  }
  display: flex;
  align-items: center;
  background: white;
    padding: 1rem;
    border-radius: .35rem;
  .filter-icon {
    position: relative;
    cursor: pointer;
    font-size: 2rem;
    color: gray;
    margin-left: auto;
    z-index: 20;
   }
.search-icon {
  
  text-align: center;
  
  color: white;
  background: var(--color-purple-0);
  font-size: 1.6rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: .3rem;
  width: 45px;
  height: 45px;
  
  line-height: 45px;
    svg {
      vertical-align: middle;
    }
    ${mediaHelper().phone(`
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 2rem;
    
    `)}
}
  }
  li {
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: bold;
    color: gray;
    font-size: 1.3rem;
    width: 150px;
    ${mediaHelper().phone(`
      width: 200px;
    
    `)}
    &:hover  {
      background: rgb(247 247 247);
    }
  }
`
export const FormPicker = () => {
  const [isopen, setIsopen] = useState(false)
  const [liHeight, setLiHeight] = useState<number>(0)
  const [pickedForm, setPickedForm] = useState<string>('title')

  const computeHeight = useCallback<(node: HTMLLIElement) => void>((node) => {
    if (node === null) return
    const { height } = node.getBoundingClientRect()
    setLiHeight(height)
  }, [])
  const openFilterHandler: ReactEventHandler = (e) => {
    setIsopen((prevSate) => !prevSate)
  }
  const { jobsFormState, dispatch } = useContext(FormContext)
  const thunkDispatch = useDispatch()
  const loadingDispatch = useDispatch<Dispatch<LoadingAction>>()
  const selectionHandler: ReactEventHandler<HTMLElement> = (e) => {
    console.log(jobsFormState, 'formSelection')

    switch ((e.target as HTMLElement).dataset.jobFilter) {
      case 'title':
        setPickedForm('title')
        setIsopen((isopen) => !isopen)
        return
      case 'location':
        setPickedForm('location')
        setIsopen((isopen) => !isopen)
        return
      case 'fulltime':
        setPickedForm('fulltime')
        setIsopen((isopen) => !isopen)
        return
    }
  }

  const getDataHandler: ReactEventHandler = async (e) => {
    loadingDispatch({ type: 'IS_LOADING' })
    const { title, location, fullTime } = jobsFormState
    await thunkDispatch(loadData({ title, location, fullTime }))
    dispatch({ type: 'RESET_DEFAULT' })
    loadingDispatch({ type: 'IS_LOADED' })
  }

  return (
    <StyledDivFilterWrapper>
      <TitleJobFilter control={pickedForm} />
      <LocationJobFilter control={pickedForm} />
      <FullTimeJobFilter control={pickedForm} />
      <span className="filter-icon">
        <TiFilter onClick={openFilterHandler} />
        <StyledUlFormPicker
          isOpen={isopen}
          liHeight={liHeight}
          onClick={selectionHandler}
        >
          <li ref={computeHeight} data-job-filter="title">
            title
          </li>
          <li data-job-filter="location">location</li>
          <li data-job-filter="fulltime">full time</li>
        </StyledUlFormPicker>
      </span>

      <span className="search-icon" onClick={getDataHandler}>
        <BiSearchAlt2 />
      </span>
    </StyledDivFilterWrapper>
  )
}
const StyledFormTabletWrapper = styled.div`
  display: none;
  ${mediaHelper().tablet(`
  display: flex;`)}
  align-items: center;
  background: white;

  border-radius: 0.35rem;

  .search {
    padding: 1rem 0.5rem;
    ${mediaHelper().lageDesktop(`
    padding: 1rem 2.5rem;
    
    `)}
    margin-left: auto;
    color: white;
    background: var(--color-purple-0);
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 1.5px;
    cursor: pointer;
    border-radius: 0.3rem;
  }
  > * {
    display: flex;
    align-items: center;
    min-width: 90px;
    width: 30%;
    &:not(.full-time) {
      border-right: 1px solid gainsboro;
    }
    height: 90px;
    padding: 1rem;
  }
  .title {
    ${mediaHelper().desktop(`
      width: 40%;
    
    `)}
  }
  .full-time {
    width: 40%;
  }
  .location {
  }
  .input-icon {
    font-size: 2rem;
    color: var(--color-purple-0);
    margin-right: 0.5rem;
  }
`
export const TabletFormInputs = () => {
  const thunkDispatch: ThunkDispatch<
    Store,
    unknown,
    LoadDataAction
  > = useDispatch()
  const loadingDispatch = useDispatch<Dispatch<LoadingAction>>()
  const { dispatch, jobsFormState } = useContext(FormContext)

  const clickLoadDataHandler: ReactEventHandler = async () => {
    loadingDispatch({ type: IS_LOADING })
    await thunkDispatch(loadData(jobsFormState))
    dispatch({ type: 'RESET_DEFAULT' })
    loadingDispatch({ type: IS_LOADED })
  }
  console.log('form state', jobsFormState)
  return (
    <StyledFormTabletWrapper>
      <div className="title">
        <BiSearchAlt2 className="input-icon" />
        <TitleJobFilter />
      </div>
      <div className="location">
        <MdLocationOn className="input-icon" />
        <LocationJobFilter />
      </div>
      <div className="full-time">
        <FullTimeJobFilter />
        <span className="search" onClick={clickLoadDataHandler}>
          search
        </span>
      </div>
    </StyledFormTabletWrapper>
  )
}
