
import './App.css';

// Routing Components
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

// React Bootstrap Components
import Container from 'react-bootstrap/Container'

// Components
import NavBar from './components/NavBar'
import AddMember from './components/AddMember'
import EditMember from './components/EditMember'

// Pages
import Home from './pages/Home'
import Member from './pages/Member'



function App() {
  return (
   <>
    <NavBar/>
    <Container>
      <Router>
          <Switch>
            <Route exact path = '/' component={Home}></Route>
            <Route exact path = '/member/:id' component={Member}></Route>
            <Route exact path = '/add' component={AddMember}></Route>
            <Route exact path = '/member/edit/:id' component={EditMember}></Route>
          </Switch>
      </Router>
    </Container>
   </>
  );
}

export default App;
