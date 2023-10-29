/* eslint-disable camelcase */
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

const VideoItem = props => {
  const {details} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt, id} = details
  const {name, profile_image_url} = channel
  return (
    <Link to={`/videos/${id}`} className="item-link">
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <img src={profile_image_url} alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div>
              <p>{viewCount}</p>
              <p>{formatDistanceToNow(new Date(publishedAt))}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
