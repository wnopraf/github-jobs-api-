import { EventType } from '@testing-library/react'
import React, {
  ChangeEventHandler,
  createContext,
  Dispatch,
  EventHandler,
  FormEvent,
  FunctionComponent,
  InputHTMLAttributes,
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
import { JobSearch, LoadDataAction, Store } from '../types'
import { mediaHelper } from '../lib/mediaUtil'
import { ThunkDispatch } from 'redux-thunk'

const MobileJobsWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 450px;
  ${mediaHelper().tablet(`
    max-width: 100%;
  `)}
  .selectable: {
  }
`

type FormState = { title: string; location: string; fullTime: boolean }
type FormActionConstants =
  | 'SETTITLE'
  | 'SETLOCATION'
  | 'SETFULLTIME'
  | 'RESET_DEFAULT'
type FormAction = { payLoad?: string | boolean } & Action<FormActionConstants>
type FormContext = { jobsFormState: FormState; dispatch: Dispatch<FormAction> }
type FormPickerValues = 'TITLE' | 'LOCATION' | 'FULLTIME'
const FormContext = createContext({} as FormContext)

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
  }
}

export const MobileJobsForm: FunctionComponent = () => {
  const [jobsFormState, dispatch] = useReducer(formReducer, {
    title: '',
    location: '',
    fullTime: false
  })

  useEffect(() => {
    const focusOutHandler: EventListener = (e) => {
      console.log('focusout handler', e.type)

      switch ((e.target as HTMLInputElement).dataset.form) {
        case 'title':
          return dispatch({
            type: 'SETTITLE',
            payLoad: (e.target as HTMLInputElement).value
          })
        case 'location':
          return dispatch({
            type: 'SETLOCATION',
            payLoad: (e.target as HTMLInputElement).value
          })
      }
    }
    window.addEventListener('focusout', focusOutHandler)
    return () => {
      window.removeEventListener('focusout', focusOutHandler)
    }
    /* Este evento debe registrarse en el componente padre, ya que los formularions se montan y desmontan en el select, registrando
    y desregistrando contuinamente el evento */
  }, [])
  const jobs = useSelector<Store>((store) => store.jobs)
  console.log('jobs data state', jobs)

  return (
    <FormContext.Provider value={{ jobsFormState, dispatch }}>
      <MobileJobsWrapper>
        <FormPicker />
        <TabletFormInputs />
      </MobileJobsWrapper>
    </FormContext.Provider>
  )
}

const StyledTextInput = styled.input`
  padding: 1rem;
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
  ${mediaHelper().phone(`
    width: auto;
  `)}
  ${mediaHelper().tablet(`
    margin-right: none;
  `)}
`
export const TitleJobFilter: FunctionComponent = () => {
  const {
    jobsFormState: { title }
  } = useContext(FormContext)
  console.log('filter title', title)

  return (
    <StyledTextInput
      type="text"
      data-form="title"
      defaultValue={title}
      className="title-input"
      placeholder="Filter by title..."
    />
  )
}

export const LocationJobFilter: FunctionComponent = () => {
  const {
    jobsFormState: { location }
  } = useContext(FormContext)

  return (
    <StyledTextInput
      type="text"
      data-form="location"
      defaultValue={location}
      className="location-input"
      placeholder="Filter by location..."
    />
  )
}
const StyledCheckInput = styled.div`
  display: flex;
  align-items: center;

  margin-right: auto;

  .full-time--wrapper {
    position: relative;
    margin-right: 1rem;
    width: 30px;
    height: 30px;
  }
  label {
    font-weight: bold;
    font-size: 1.3rem;
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
    width: 32px;
    height: 30px;
    background: rgb(230 229 229);
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .full-time--fake-checkbox::after {
    content: '';
    position: absolute;
    display: block;
    left: 10px;
    top: 2px;
    width: 12px;
    height: 20px;
    border: solid darkslategray;
    border-width: 0 5px 5px 0;

    transform: rotate(45deg);
    opacity: 0;

    transition: all 200ms ease-in-out;
  }

  .full-time--input:checked ~ .full-time--fake-checkbox::after {
    opacity: 1;
  }
`
export const FullTimeJobFilter: FunctionComponent = () => {
  const {
    jobsFormState: { fullTime },
    dispatch
  } = useContext(FormContext)

  const fullTimeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: 'SETFULLTIME', payLoad: event.target.checked })
  }

  return (
    <StyledCheckInput>
      <span className="full-time--wrapper">
        <input
          type="checkbox"
          className="full-time--input"
          checked={fullTime}
          onChange={fullTimeHandler}
        />
        <span className="full-time--fake-checkbox"></span>
      </span>
      <label>Full Time</label>
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
  const selectionHandler: ReactEventHandler<HTMLElement> = (e) => {
    console.log(jobsFormState)

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
    const { title, location, fullTime } = jobsFormState
    await thunkDispatch(loadData({ title, location, fullTime }))
    dispatch({ type: 'RESET_DEFAULT' })
  }
  const SelectForm: FunctionComponent<{ formFilter: string }> = ({
    formFilter
  }) => {
    switch (formFilter) {
      case 'title':
        return <TitleJobFilter />
      case 'location':
        return <LocationJobFilter />
      case 'fulltime':
        return <FullTimeJobFilter />
      default:
        throw new Error('Form no asignable')
    }
  }
  return (
    <StyledDivFilterWrapper>
      <SelectForm formFilter={pickedForm} />
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
    margin-left: 1.5rem;
    color: white;
    background: var(--color-purple-0);
    font-size: 1.25rem;
    font-weight: bold;
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
  .full-time {
    width: 40%;
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
  const { jobsFormState, dispatch } = useContext(FormContext)

  const clickLoadDataHandler: ReactEventHandler = async () => {
    await thunkDispatch(loadData(jobsFormState))
    dispatch({ type: 'RESET_DEFAULT' })
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
