import { time } from 'console'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { timeAgo } from '../lib/util'
import { JobsDescription } from '../types'

const StyledArticle$jobItem = styled.article<{ bg: string }>`
  position: relative;
  padding: 1rem;
  background: white;
  .job-item--data {
    color: gray;
  }
  .job-item--company {
    color: gray;
  }
  .job-item--location {
    color: var(--color-purple-0);
  }
  &:before  {
    height: 45px;
    width: 45px;
    background-image: url(${(props) => props.bg});
    background-position: center center;
    background-repear: none;
  }
`

export const JobItem: FunctionComponent<JobsDescription> = ({
  type,
  company_logo,
  company,
  created_at,
  title,
  location
}) => {
  return (
    <StyledArticle$jobItem bg={company_logo}>
      <p className="job-item--data">
        <span className="job-item--postded-date">{timeAgo(created_at)}</span>
        &#9899;
        <span className="job-item--type">{type}</span>
      </p>
      <h3>{title}</h3>
      <p className="job-item--company">{company}</p>
      <p className="job-item--location">{location}</p>
    </StyledArticle$jobItem>
  )
}
