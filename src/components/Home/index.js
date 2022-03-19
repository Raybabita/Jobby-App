import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickJob = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="responsive-home">
          <div className="home-content-container">
            <h1 className="heading-content">
              Find The Job That Fits Your Life
            </h1>
            <p className="description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job thats fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link">
              <button
                onClick={onClickJob}
                className="find-job-button"
                type="button"
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
