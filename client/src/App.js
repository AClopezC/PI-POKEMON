import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Landing } from './Views/Landing/Landing';
import {Home} from './Views/Home/Home'

function App() {
  return (
     <div>
        <BrowserRouter>
         <Switch>
          <Route exact path={'/'} component={Landing} />      
          <Route path={'/home'} component={Home} />      
         </Switch>
        </BrowserRouter>
        
    </div>
  );
};

export default App;
