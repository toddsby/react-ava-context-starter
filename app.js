import React from 'react';
import {render} from 'react-dom';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import { AppContextProvider } from './context/state-provider';

render(
    <AppContextProvider>
      <Router history={browserHistory} routes={routes} />
    </AppContextProvider>,
    document.getElementById('app')
);
