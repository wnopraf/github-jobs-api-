import React, { FunctionComponent, useEffect } from 'react'
import { Link } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import styled from 'styled-components'
import { VscLoading } from 'react-icons/vsc'
import { loadData } from '../state/actions'
import {
  BgColor,
  JobsDescription,
  JobSearch,
  LoadDataAction,
  Loading,
  Store
} from '../types'
import { mediaHelper } from '../lib/mediaUtil'
import { JobItem } from './JobItem'

export const AnimatedLoaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .loader-icon {
    @keyframes spinner {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    animation: spinner 0.7s linear infinite;
    color: var(--color-purple-0);
    font-size: 2.5rem;
  }
`

const StyledDiv$jobLists = styled.div<{ themeMode: BgColor }>`
  margin-top: 5rem;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 1rem 0;
  ${mediaHelper().tablet(`
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

`)}
  ${mediaHelper().desktop(`
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;

`)}
a {
    background: ${(props) =>
      props.themeMode === 'IS_LIGHT' ? 'white' : 'var(--color-bg-darkTheme)'};
    border-radius: 0.45rem;
    text-decoration: none;
    padding: 1rem;
    position: relative;
    transition: box-shadow, background-color 200ms linear;
    &:hover {
      box-shadow: 0px 0px 10px 0px #0000003d;
    }
    h3 {
      color: ${(props) => (props.themeMode === 'IS_LIGHT' ? 'black' : 'white')};
    }
  }
`
export const JobLists: FunctionComponent = () => {
  const thunkDispatch: ThunkDispatch<
    Store,
    unknown,
    LoadDataAction
  > = useDispatch()
  const jobs = useSelector<Store, JobsDescription[]>((store) => store.jobs)
  const isLoading = useSelector<Store, Loading>((store) => store.loader)
  const themeMode = useSelector<Store, BgColor>((store) => store.bgColor)
  console.log(isLoading, 'is loaded')

  return isLoading ? (
    <AnimatedLoaderIcon>
      <VscLoading className="loader-icon" />
    </AnimatedLoaderIcon>
  ) : (
    <StyledDiv$jobLists themeMode={themeMode}>
      {jobs.map((el, i) => {
        return (
          <Link to={`/job/${el.id}`} key={i}>
            <JobItem {...el} />
          </Link>
        )
      })}
    </StyledDiv$jobLists>
  )
}
