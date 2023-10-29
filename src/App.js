import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/trending" component={Trending} />
      <Route exact path="/gaming" component={Gaming} />
      <Route exact path="/saved-videos" component={SavedVideos} />
      <Route exact path="/videos/:id" component={VideoItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
