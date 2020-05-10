import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

const state = store.getState();
const cards = state.stack

store.dispatch({
    type: 'DEAL',
    payload: cards
});
store.dispatch({
    type: 'HIT',
    payload: cards
});
store.dispatch({
    type: 'PLAYER_SUM',
    payload: state.player.cards
});

store.dispatch({
    type: 'DEAL_DEALER',
    payload: cards
});
if (state.dealerSum < 17) {
    store.dispatch({
        type: 'DEAL_DEALER',
        payload: cards
    });
}
store.dispatch({
    type: 'DEALER_SUM',
    payload: state.dealer.dealerCards,
})
if (state.dealerSum < 17) {
    store.dispatch({
        type: 'DEAL_DEALER',
        payload: cards
    });
}
store.dispatch({
    type: 'DEALER_SUM',
    payload: state.dealer.dealerCards,
})
store.dispatch({
    type: 'COMPARE',
    payload: state.playerSum
});




ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
