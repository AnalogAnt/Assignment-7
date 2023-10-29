/* eslint-disable camelcase */
import {formatDistanceToNow} from 'date-fns'

const TrendVidItem = props => {
  const {details} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {name, profile_image_url} = channel
  return (
    <li>
      <img src={thumbnailUrl} alt="video thumbnail" />
      <div>
        <img src={profile_image_url} alt="channel profile" />
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
  )
}

export default TrendVidItem
