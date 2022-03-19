import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <>
      <div className="nav-container-lg">
        <div className="responsive-header">
          <Link to="/" className="link">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="menu-items">
            <li className="item">
              <Link to="/" className="link">
                <p className="menu-item">Home</p>
              </Link>
            </li>
            <li className="item">
              <Link to="/jobs" className="link">
                <p className="menu-item">Jobs</p>
              </Link>
            </li>
          </ul>

          <button
            onClick={onClickLogout}
            type="button"
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="nav-container-sm">
        <Link to="/" className="link">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="menu-sm">
          <li>
            <Link to="/" className="link">
              <AiFillHome className="icons-sm" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              <BsBriefcaseFill className="icons-sm" />
            </Link>
          </li>
          <li>
            <button
              className="logout-icon-btn"
              onClick={onClickLogout}
              type="button"
            >
              <FiLogOut className="icons-sm" />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
