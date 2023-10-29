import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import SideBanner from '../SideBanner'
import Header from '../Header'
import GameVidItem from '../GameVidItem'

class Gaming extends Component {
  state = {GamingVideos: [], isLoading: false, fail: false}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/videos/gaming'
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.videos.map(product => ({
        title: product.title,
        thumbnailUrl: product.thumbnail_url,

        id: product.id,
        viewCount: product.view_count,
      }))
      this.setState({
        GamingVideos: updatedData,
        isLoading: false,
        fail: false,
      })
    } else {
      this.setState({isLoading: false, fail: true})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {GamingVideos, isLoading, fail} = this.state
    let boot
    if (isLoading) {
      boot = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (fail) {
      boot = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble to complete your request</p>
          <p>Please try again</p>
          <button type="button" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    } else {
      boot = GamingVideos.map(each => (
        <GameVidItem details={each} key={each.id} />
      ))
    }
    return (
      <div>
        <Header />
        <SideBanner />
        <div>
          <h1>Gaming</h1>
        </div>
        <div>
          <ul>{boot}</ul>
        </div>
      </div>
    )
  }
}

export default Gaming
