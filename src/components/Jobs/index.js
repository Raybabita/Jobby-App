import Header from '../Header'
import JobsDetails from '../JobsDetails'
import Profile from '../Profile'
import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-section">
      <div className="responsive-jobs">
        <Profile />
        <JobsDetails />
      </div>
    </div>
  </>
)

export default Jobs
