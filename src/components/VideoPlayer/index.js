import ReactPlayer from 'react-player'

import './index.css'

const VideoPlayer = props => {
  const {videoURL} = props
  return (
    <div className="video-container">
      <h1 className="heading">Video Player</h1>
      <div className="responsive-container">
        <ReactPlayer url={videoURL} controls />
      </div>
    </div>
  )
}

export default VideoPlayer
