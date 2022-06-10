import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthService from './Services/Api/Auth.Service'
import EventBus from './Services/Controller/EventBus'

import SignIn from './Components/Security/SignIn'
import Report from './Components/Report'
import Index from './Components/Index'
import Schedule from './Components/Schedule'
import NewSchedule from './Components/NewSchedule'

import CustomAppBar from './Components/Customs/Custom.AppBar'

class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showClientBoard: 0,
      showAdminBoard: 0,
      currentUser: undefined,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.userData.permission,
        showClientBoard: user.userData.permission,
      })
    }

    EventBus.on('logout', () => {
      this.logOut()
    })
  }

  componentWillUnmount() {
    EventBus.remove('logout')
  }

  logOut() {
    AuthService.logout()

    this.setState({
      showAdminBoard: 0,
      showClientBoard: 0,
      currentUser: undefined,
    })
  }

  render() {
    const { currentUser, showAdminBoard, showClientBoard } = this.state

    return (
      <React.Fragment>
        <CustomAppBar
          user={currentUser}
          admin={showAdminBoard}
          client={showClientBoard}
        />

        <Switch>
          <Route exact path='/' element={<Index />} />
          <Route exact path='schedule' element={<Schedule />} />
          <Route exact path='report' element={<Report />} />
          <Route exact path='login' element={<SignIn />} />
          <Route exact path='newschedule' element={<NewSchedule />} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
