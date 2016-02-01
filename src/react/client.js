import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import reducer from './reducers/index';
import DevTools from './containers/DevTools';

const initialState = {
  matrix: [
    ['A',' ',' ',' '],
    ['B',' ',' ',' '],
    ['C',' ',' ',' '],
    ['D',' ',' ',' ']
  ],
  validWordCount: 0,
  validGrid: false
};

const store = DevTools.instrument()(createStore)(reducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<App />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root')
);
