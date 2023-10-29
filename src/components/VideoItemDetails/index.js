/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {Redirect} from 'react-router-dom'
import SideBanner from '../SideBanner'
import Header from '../Header'
import SavedContext from '../../context/SavedContext'
import VideoPlayer from '../VideoPlayer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    isLoading: true,
    error: false,
    checkSave: false,
    savedVideos: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)

      if (response.ok) {
        const data = await response.json()

        this.setState({
          videoData: data.video_details,
          isLoading: false,
          error: false,
        })
      } else {
        this.setState({
          isLoading: false,
          error: true,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
      })
    }
  }

  saveVid = () => {
    const {videoData} = this.state
    this.setState(prevState => ({
      savedVideos: prevState.savedVideos.push(videoData),
      checkSave: !prevState.checkSave,
    }))
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {videoData, isLoading, error, checkSave, savedVideos} = this.state
    const {
      video_url,
      title,
      view_count,
      published_at,
      description,
      channel,
    } = videoData

    let bottom

    if (isLoading) {
      bottom = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        </div>
      )
    } else if (error) {
      bottom = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" onClick={this.getDetails}>
            Retry
          </button>
        </div>
      )
    } else {
      bottom = (
        <div>
          <VideoPlayer videoURL={video_url} />
          <div>
            <p>{title}</p>
            <div>
              <div>
                <p>{view_count}</p>
                <p>{formatDistanceToNow(new Date(published_at))}</p>
              </div>
              <div>
                <button type="button">Like</button>
                <button type="button">Dislike</button>
                <button type="button" onClick={this.saveVid}>
                  {checkSave ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
            <hr />
            <div>
              <img src={channel.profile_image_url} alt="channel logo" />
              <div>
                <p>{channel.name}</p>
                <p>{channel.subscriber_count} subscribers</p>
              </div>
            </div>
            <p>{description}</p>
          </div>
        </div>
      )
    }

    return (
      <SavedContext.Provider
        value={{
          savedVideos,
          stateVideo: this.saveVid,
        }}
      >
        <div>
          <Header />
          <SideBanner />
          {bottom}
        </div>
      </SavedContext.Provider>
    )
  }
}

export default VideoItemDetails
