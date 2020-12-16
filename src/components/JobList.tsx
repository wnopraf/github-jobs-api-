import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import styled from 'styled-components'
import { VscLoading } from 'react-icons/vsc'
import { loadData } from '../state/actions'
import { JobsDescription, JobSearch, LoadDataAction, Store } from '../types'
import { mediaHelper } from '../lib/mediaUtil'

export const AnimatedLoaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
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

const StyledDiv$jobLists = styled.div`
  display: grid;
  grid-auto-flow: column;
  ${mediaHelper().tablet(`
  grid-auto-column: 1fr 1fr;
  grid-gap: 2rem;

`)}
`
export const JobLists: FunctionComponent<{ searchParams: JobSearch }> = ({
  searchParams
}) => {
  const thunkDispatch: ThunkDispatch<
    Store,
    unknown,
    LoadDataAction
  > = useDispatch()
  const jobs = useSelector<Store>((store) => store.jobs)
  const isLoading = useSelector<Store>((store) => store.loading)

  return isLoading ? (
    <AnimatedLoaderIcon>
      <VscLoading className="loader-icon" />
    </AnimatedLoaderIcon>
  ) : (
    <div></div>
  )
}
