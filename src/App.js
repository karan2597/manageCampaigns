import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import manageCampaigns from './pages/manageCampaigns';
import './App.css';

const App = () => (
  <>
    <Switch>
      <Route exact path="/manageCampaigns" component={manageCampaigns} />
    </Switch>
  </>
);

export default App;
