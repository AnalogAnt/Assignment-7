import {Link, withRouter} from 'react-router-dom'
import './index.css'

const SideBanner = () => (
  <div>
    <ul className="nav-menu">
      <li className="nav-menu-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-menu-item">
        <Link to="/trending" className="nav-link">
          Trending
        </Link>
      </li>
      <li className="nav-menu-item">
        <Link to="/gaming" className="nav-link">
          Gaming
        </Link>
      </li>
      <li className="nav-menu-item">
        <Link to="/saved-videos" className="nav-link">
          Saved Videos
        </Link>
      </li>
    </ul>
    <div>
      <p>CONTACT US</p>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default withRouter(SideBanner)
