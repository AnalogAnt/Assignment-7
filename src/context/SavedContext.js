import React from 'react'

const SavedContext = React.createContext({
  savedVideos: [],
  stateVideo: () => {},
})

export default SavedContext
