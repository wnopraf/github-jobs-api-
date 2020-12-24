import { useParams } from '@reach/router'
import Axios from 'axios'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { mediaHelper } from '../lib/mediaUtil'
import { timeAgo } from '../lib/util'
import { IS_LOADED, IS_LOADING } from '../state/constants'

import { JobsDescription, Store } from '../types'
import Loader from '../__fixtures__/Loader'
import { Container } from './Container'

const JobWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`
const StyledJob = styled.div<{ bg: string }>`
max-width: 760px;
min-height: 80vh;
margin: 0 auto;
color: var(--color-gray-detail-font);
  .detail-job--header  {
    display: flex;
    
    background-color: white;
    border-radius: .3rem;
    
    .detail-job--logo  {
        
    background-image: url(${(props) => props.bg});
      background-size: contain;
      background-position: center center;
      background-color: rgb(255 139 227);
      border-bottom-left-radius: .3rem;
      background-repeat: no-repeat;
      ${mediaHelper().tablet(`
      width: 180px;
      height: 180px;
      
      
      `)}
      
    }
    .detail-job--company  {
        padding: 0 1rem;
        width: 85%;
        display: flex;
      align-items: center;
        ${mediaHelper().tablet(`
        
        
      padding: 0 3rem;
      
        `)}
      
      .item-names .item-names--primary {
          font-size: 1.3rem;
          color: black;
          margin-bottom: .5rem;
          text-transform: capitalize;
        
        letter-spacing: 1px; 
        margin-top: 0;
          ${mediaHelper().tablet(`
          
          font-size: 1.6rem;
        margin-bottom: .75rem;
        
          
          `)}
        
      }
    }
      
      .detail-job--company .item-names--secondary {
        
        ${mediaHelper().tablet(`
          
        font-weight: 500;
          
          `)}
        
      }
      .detail-job--company-link {
        padding: 1rem;
    background: #e4e6fe;
    border-radius: .3rem;
    max-width: -webkit-fit-content;
    max-width: -moz-fit-content;
    max-width: fit-content;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin-left: auto;
    color: var(--color-purple-0);
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: .5px;
    font-size: 1.05rem;
      }
    }
    
  }
  .detail-job--features {
    margin-top: 3rem;
    padding: 1rem 3rem;
    background: white;
}
.detail-job-summary {
position: relative;
display: flex;
  align-items: center;
  flex-wrap: wrap;

.detail-job--posted-date {
    margin: 0;
    font-weight: 500;
}
.detail-job--title {
    margin:0;
    font-size: 1.6rem;
    margin: -5px 0;
    color: black;
    text-transform: capitalize;
    letter-spacing: 1px;
    
}
.detail-job--location {
    font-weight: bold;
    color: var(--color-purple-0);
}
.apply-button {
    
}

}
.detail-job--description {
    line-height: 1.65;
    h2 {
      color: black;
      font-size: 1.2rem;
    }
    a {
      font-weight: bold;
    color: var(--color-purple-0);
    }
    li{
      padding: 1rem 0;
      list-style-position: inside;
      &::marker {
        color: var(--color-purple-0);
      }
      &::before {
        content: '';
        margin-right: 1rem;
      }
    }
}
.apply-box {
    margin-top: 3rem;
    padding: 3rem;
    background-color: var(--color-purple-0);
    color: white;
    border-radius: .3rem;
    line-height: 1.6;
    .apply-box--title {
        margin: 0;
        text-transform: capitalize;
        font-size: 1.35rem;
        
    }
    .apply-box--info {
        margin-top: 1rem;
        opacity: .85;
    }
    .apply-box--link {
        font-weight: bold;
        text-decoration: underline;
        color: inherit;
    }
}

`

export const JobDetail: FunctionComponent<{ jobId: string }> = ({ jobId }) => {
  const [jobDescription, setJobDescription] = useState<JobsDescription>()
  const isLoading = useSelector<Store>((state) => state.loader)
  const dispatch = useDispatch()

  /* const { jobId }: { jobId: string } = useParams() */

  useEffect(() => {
    ;(async () => {
      try {
        dispatch({ type: IS_LOADING })
        const { data } = await Axios.get<JobsDescription>(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${jobId}.json`
        )
        console.log(data, 'data')

        setJobDescription(data)
        dispatch({ type: IS_LOADED })
      } catch (error) {
        console.log(error, 'fetch data error')
      } finally {
        dispatch({ type: IS_LOADED })
      }
    })()
  }, [])
  console.log(isLoading, 'loading')
  console.log(jobDescription, 'job')

  return isLoading || jobDescription === undefined ? (
    <Loader />
  ) : (
    <JobWrapper>
      <Container>
        <StyledJob bg={jobDescription!.company_logo}>
          <header className="detail-job--header">
            <div className="detail-job--logo"></div>
            <div className="detail-job--company">
              <div className="item-names">
                <h1 className="item-names--primary">
                  {jobDescription!.company}
                </h1>
                <span className="item-names--secondary">
                  {jobDescription!.company + '.co'}
                </span>
              </div>
              <a
                href={jobDescription!.company_url}
                className="detail-job--company-link"
              >
                company site
              </a>
            </div>
          </header>
          <div className="detail-job--features">
            <div className="detail-job-summary">
              <div className="summary-wrapper">
                <p>
                  <span className="detail-job--posted-date">
                    {timeAgo(jobDescription!.created_at)} •{' '}
                    {jobDescription!.type}
                  </span>
                </p>
                <h2 className="detail-job--title">{jobDescription!.title}</h2>
                <p className="detail-job--location">
                  {jobDescription!.location}
                </p>
              </div>

              <ApplyButton>apply button</ApplyButton>
            </div>
            <div
              className="detail-job--description"
              dangerouslySetInnerHTML={{ __html: jobDescription!.description }}
            ></div>
          </div>
          <div className="apply-box">
            <h3 className="apply-box--title">how to apply</h3>
            <p className="apply-box--info">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem quae
              consequuntur ipsum iure cumque aut maxime, minus deleniti dolorum
              nisi ratione quia, esse omnis cupiditate, incidunt eveniet illum
              laboriosam cum.
            </p>
            <a href="" className="apply-box--link">
              how to apply link
            </a>
          </div>
        </StyledJob>
      </Container>
      <Footer>
        <Container>
          <div className="footer-content">
            <div className="apply-reminder">
              <h3>{jobDescription!.title}</h3>
              <p className="apply-reminder--company">
                {jobDescription!.company}
              </p>
            </div>
            <ApplyButton>apply button</ApplyButton>
          </div>
        </Container>
      </Footer>
    </JobWrapper>
  )
}

const ApplyButton = styled.button`
  height: max-content;
  color: white;
  font-size: 1.15rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
  padding: 1rem 1.35rem;
  border-radius: 0.3rem;
  background-color: var(--color-purple-0);
`

const ApplyButtonPositioned = styled(ApplyButton)`
  position: absolute;
  top: 1rem;
  right: 1.7rem;
`

const Footer = styled.footer`
  background: white;
  margin-top: 3rem;
  .footer-content {
    max-width: 760px;
    display: flex;
    margin: 0 auto;
    padding: 1rem 0;
    line-height: 1.45;

    .apply-reminder {
      text-transform: capitalize;
      h3 {
        margin: 0;
      }
      .apply-reminder--company {
        color: gray;

        margin: 0;
      }
    }
    button {
      margin-left: auto;
    }
  }
`
