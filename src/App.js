import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Screens
import UserScreen from './pages/UserScreen/UserScreen';
import RegistrationScreen from './pages/registrationScreen/RegistrationScreen';

//Components;
import Navbar from './components/navbar/Navbar';
import Backdrop from './components/backdrop/Backdrop';
import SideDrawer from './components/sideDrawer/SideDrawer';

const App = () => {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <Route exact path="/" component={RegistrationScreen} />
          <Route exact path="/users" component={UserScreen} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
