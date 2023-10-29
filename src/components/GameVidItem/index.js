const GameVidItem = props => {
  const {details} = props
  const {title, thumbnailUrl, viewCount} = details
  return (
    <li>
      <img src={thumbnailUrl} alt="video thumbnail" />
      <div>
        <p>{title}</p>

        <p>{viewCount} Watching Worldwide</p>
      </div>
    </li>
  )
}

export default GameVidItem
