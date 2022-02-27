import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styleApp from './app.module.css';
import ModalSwitch from '../modal-switch';

const App = () => { 

  return (
      <div className={`${styleApp.app} mb-10`}>
          <Router>
            <Switch>
              <Route>
                <ModalSwitch />
              </Route>
            </Switch>
          </Router>
      </div>
  );
}



export default App;
