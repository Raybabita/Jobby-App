import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsDetails extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeIdRadioInput: '',
    activeIdCheckboxInput: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  onCheckBoxOption = id => {
    const {activeIdCheckboxInput} = this.state
    this.setState(preState => {
      if (preState.activeIdCheckboxInput.includes(id)) {
        return {
          activeIdCheckboxInput: preState.activeIdCheckboxInput.filter(
            eachItem => eachItem !== id,
          ),
        }
      }
      return {activeIdCheckboxInput: [...activeIdCheckboxInput, id]}
    }, this.getJobsData)
  }

  onRadioButtonOption = id => {
    this.setState({activeIdRadioInput: id}, this.getJobsData)
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeIdRadioInput, activeIdCheckboxInput} = this.state
    const stringifyEmployment = activeIdCheckboxInput.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${activeIdRadioInput}&employment_type=${stringifyEmployment}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updateData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packageAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updateData)
      this.setState({
        jobsData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

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

  renderLoaderView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" height={50} width={50} color="#ffffff" />
    </div>
  )

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          className="search-input"
          onKeyDown={this.onEnterSearchInput}
          placeholder="Search"
        />
        <button
          type="button"
          testid="searchButton"
          className="search-btn"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderNoJobFound = () => (
    <div className="no-job-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobCardDetailsView = () => {
    const {jobsData} = this.state
    const showJobDataList = jobsData.length > 0
    return showJobDataList ? (
      <>
        <ul className="job-card-list">
          {jobsData.map(eachItem => (
            <JobCard key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </>
    ) : (
      this.renderNoJobFound()
    )
  }

  renderJobCard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobCardDetailsView()
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
      <div className="job-detail-container">
        <FilterGroup
          onRadioButtonOption={this.onRadioButtonOption}
          onCheckBoxOption={this.onCheckBoxOption}
        />
        {this.renderSearchInput()}
        {this.renderJobCard()}
      </div>
    )
  }
}

export default JobsDetails
