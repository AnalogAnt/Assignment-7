import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import SideBanner from '../SideBanner'
import Header from '../Header'
import VideoItem from '../VideoItem'

import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    isLoading: false,
    fail: false,
    emptyList: false,
    videosList: [],
    showAd: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
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
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      if (fetchedData.total === 0) {
        this.setState({emptyList: true})
      } else {
        const updatedData = fetchedData.videos.map(product => ({
          title: product.title,
          thumbnailUrl: product.thumbnail_url,
          channel: product.channel,
          id: product.id,
          viewCount: product.view_count,
          publishedAt: product.published_at,
        }))
        this.setState({
          videosList: updatedData,
          isLoading: false,
          fail: false,
          emptyList: false,
        })
      }
    } else {
      this.setState({fail: true, isLoading: false})
    }
  }

  disableAd = () => {
    this.setState({isLoading: false, showAd: false})
  }

  onInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {
      searchInput,
      showAd,
      videosList,
      isLoading,
      fail,
      emptyList,
    } = this.state
    const adEle = showAd ? (
      <div className="topCard" data-testid="banner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <button type="button" data-testid="close" onClick={this.disableAd}>
          X
        </button>
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="getNow">
          GET IT NOW
        </button>
      </div>
    ) : (
      <> </>
    )
    let bottomEle
    if (isLoading) {
      bottomEle = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (fail) {
      bottomEle = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble to complete your request.</p>
          <p>Please try again.</p>
          <button type="button" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    } else if (emptyList) {
      bottomEle = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="button" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    } else {
      bottomEle = (
        <ul>
          {videosList.map(each => (
            <VideoItem details={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <SideBanner />
          <div className="mainCon">
            {adEle}
            <div className="bottomCard">
              <input
                type="search"
                value={searchInput}
                onChange={this.onInput}
                placeholder="Search"
              />
              <button
                type="button"
                onClick={this.getVideos}
                data-testid="searchButton"
              >
                Search
              </button>
              {bottomEle}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
