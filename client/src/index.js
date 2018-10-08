import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import reduxThunk from 'redux-thunk';

import initState from './config/initState';
import reducers from './reducers';
import theme from './theme/theme';

import App from './components/App/App';
import './index.css'

const store = createStore(reducers, initState, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>
, document.getElementById('root'));