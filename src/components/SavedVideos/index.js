import SavedContext from '../../context/SavedContext'
import SideBanner from '../SideBanner'
import Header from '../Header'
import TrendVidItem from '../TrendVidItem'

const SavedVideos = () => (
  <SavedContext.Consumer>
    {value => {
      const {savedVideos} = value
      let compo
      if (savedVideos.length === 0) {
        compo = (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </div>
        )
      } else {
        compo = (
          <div>
            <img src="" alt="" />
            <h1>Saved Videos</h1>
            <div>
              <ul>
                {savedVideos.map(each => (
                  <TrendVidItem details={each} />
                ))}
              </ul>
            </div>
          </div>
        )
      }
      return (
        <div>
          <Header />
          <SideBanner />
          {compo}
        </div>
      )
    }}
  </SavedContext.Consumer>
)

export default SavedVideos
