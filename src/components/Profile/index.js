import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getUpdatedData = data => ({
    name: data.name,
    profileUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getUpdatedData(fetchedData.profile_details)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="Oval" height={50} width={50} color="#0b69ff" />
    </div>
  )

  onClickRetry = () => {
    this.getProfileData()
  }

  renderFailureView = () => (
    <div className="retry-container">
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {name, shortBio, profileUrl} = profileData
    return (
      <div className="profile-container">
        <img className="profile-img" src={profileUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
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
      <div className="profile-and-filter-container">
        {this.renderProfileView()}
      </div>
    )
  }
}

export default Profile
