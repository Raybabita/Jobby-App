import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {FiExternalLink} from 'react-icons/fi'

import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobsDetailsData: {},
    similarJobsDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    location: data.location,
    rating: data.rating,
    companyWebsiteUrl: data.company_website_url,
    id: data.id,
    jobDescription: data.job_description,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    employmentType: data.employment_type,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    })),
  })

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updateJobData = this.getFormattedData(fetchedData.job_details)
      console.log(updateJobData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => ({
          companyLogoUrl: eachSimilarJob.company_logo_url,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          id: eachSimilarJob.id,
          jobDescription: eachSimilarJob.job_description,
          title: eachSimilarJob.title,
          employmentType: eachSimilarJob.employment_type,
        }),
      )
      console.log(updatedSimilarJobsData)
      this.setState({
        jobsDetailsData: updateJobData,
        similarJobsDetails: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobsDetailsData, similarJobsDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      location,
      packagePerAnnum,
      rating,
      title,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobsDetailsData
    return (
      <ul className="job-card-list">
        <li className="list-item ">
          <div className="job-title-and-image-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-container">
              <h1 className="company-title">{title}</h1>
              <div className="job-item-rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-and-salary-container">
            <div className="location-and-type-container">
              <MdLocationOn className="location-icon" />
              <p className="job-item-location">{location}</p>
              <BsFillBriefcaseFill className="location-icon" />
              <p className="job-item-location">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line " />
          <div className="description-and-websiteUrl-Container">
            <h1 className="description-text">Description</h1>
            <div className="visit-link-container">
              <a className="visit-text" href={companyWebsiteUrl}>
                Visit <FiExternalLink className="visit-link-icon" />
              </a>
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-container">
            {skills.map(eachSkill => (
              <li className="list-item-skill" key={eachSkill.name}>
                <img
                  className="skill-img"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <div className="skill-divider-container">
                  <p className="divider">|</p>
                  <p className="skill-name">{eachSkill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="company-heading">life At Company</h1>
          <div className="company-details-container">
            <p className="company-description">{lifeAtCompany.description}</p>
            <img
              className="company-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </li>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsDetails.map(eachJob => (
            <SimilarJobs key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </ul>
      </ul>
    )
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" height={50} width={50} color="#ffffff" />
    </div>
  )

  onClickRetry = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="job-failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />

      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <div className="retry-container">
        <button
          type="button"
          onClick={this.onClickRetry}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-detail-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
