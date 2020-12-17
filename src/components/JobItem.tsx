import { time } from 'console'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { timeAgo } from '../lib/util'
import { JobsDescription } from '../types'

const StyledArticle$jobItem = styled.article<{ bg: string }>`
  background: white;
  color: black;
  .job-item--data {
    color: gray;
  }
  .job-item--company {
    color: gray;
  }
  .job-item--location {
    color: var(--color-purple-0);
    font-weight: bold;
  }
  &:before {
    content: '';
    display: block;
    height: 35px;
    width: 35px;

    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    background-size: contain;
    top: calc(-35px / 2);
    border-radius: 0.5rem;
    background-image: url(${(props) => props.bg});
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
        &nbsp; • &nbsp;
        <span className="job-item--type">{type}</span>
      </p>
      <h3>{title}</h3>
      <p className="job-item--company">{company}</p>
      <p className="job-item--location">{location}</p>
    </StyledArticle$jobItem>
  )
}
