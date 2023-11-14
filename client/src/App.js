import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Landing } from './Views/Landing/Landing';
import { Home } from './Views/Home/Home';
import {Form} from './Views/Form/Form'
import { Detail } from './Components/Detail/Detail';

function App() {
  return (
     <div>
        <BrowserRouter>
         <Switch>
          <Route exact path={'/'} component={Landing} />
          <Route path={'/home'} component={Home} />
          <Route path={'/detail/:id'} component={Detail} />
          <Route path={'/form'} component={Form} />
          
         </Switch>
        </BrowserRouter>
        
    </div>
  );
};

export default App;
