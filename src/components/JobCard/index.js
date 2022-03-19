import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
import {Link} from 'react-router-dom'

const JobCardItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packageAnnum,
  } = jobDetails

  return (
    <li className="list-item ">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-title-and-image-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
          <div className="job-item-location-container">
            <MdLocationOn className="location-icon" />
            <p className="job-item-location">{location}</p>
            <BsFillBriefcaseFill className="location-icon" />
            <p className="job-item-location">{employmentType}</p>
          </div>
          <div className="job-item-employment-container">
            <p className="job-item-location">{packageAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line " />
        <h1 className="description-text">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCardItem
