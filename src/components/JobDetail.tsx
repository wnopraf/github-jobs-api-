import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { mediaHelper } from '../lib/mediaUtil'
import { timeAgo } from '../lib/util'

import { JobsDescription } from '../types'
import { Container } from './Container'

const JobWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`
const StyledJob = styled.div<{ bg: string }>`
max-width: 760px;
min-height: 80vh;
margin: 0 auto;
  .detail-job--header  {
    display: flex;
    
    background-color: white;
    border-radius: .3rem;
    
    .detail-job--logo  {
        width: 90px;
    height: 90px;
    background-image: ${(props) => props.bg};
      background-size: 50px 50px;
      background-position: center center;
      background-color: rgb(255 139 227);
      border-bottom-left-radius: .3rem;
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
        color: rgb(179 179 179);
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
    padding: 1rem;
    background: white;
    color: rgb(179 179 179);
}
.detail-job-summary {
position: relative;
.detail-job--posted-date {
    margin: 0;
    font-weight: 500;
}
.detail-job--title {
    margin:0;
    font-size: 1.6rem;
    line-height: .5;
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
    line-height: 1.6;
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

export const JobDetail: FunctionComponent<JobsDescription> = ({
  company_logo,
  company_url,
  company,
  description,
  location,
  created_at,
  title,
  type
}) => {
  return (
    <JobWrapper>
      <StyledJob bg={company_logo}>
        <Container>
          <header className="detail-job--header">
            <div className="detail-job--logo"></div>
            <div className="detail-job--company">
              <div className="item-names">
                <h3 className="item-names--primary">{company}</h3>
                <span className="item-names--secondary">{company + '.co'}</span>
              </div>
              <a href={company_url} className="detail-job--company-link">
                company site
              </a>
            </div>
          </header>
          <div className="detail-job--features">
            <div className="detail-job-summary">
              <p>
                <span className="detail-job--posted-date">
                  {timeAgo(created_at)} • {type}
                </span>
              </p>
              <h2 className="detail-job--title">{title}</h2>
              <p className="detail-job--location">{location}</p>
              <ApplyButtonPositioned>apply button</ApplyButtonPositioned>
            </div>
            <div className="detail-job--description">{description}</div>
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
        </Container>
      </StyledJob>
      <Footer>
        <Container>
          <div className="footer-content">
            <div className="apply-reminder">
              <h3>{title}</h3>
              <p className="apply-reminder--company">{company}</p>
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
  position: absolute;
  width: 100%;
  bottom: 0;

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
