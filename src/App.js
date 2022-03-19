import {Switch, Redirect, Route} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
