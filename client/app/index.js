
import 'whatwg-fetch';

import './scaffolding';

// Shouldn't this be covered by jsx:true?  Or babel-preset-react?
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import * as actions from './actions';
import { getStore } from './store';

let store = getStore();

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.querySelector( '.app-container' )
);

// load some test data...

fetch( './markers.json' )
.then( response => response.json() )
.then( markers => store.dispatch( actions.addLoadedMarkers( markers ) ) )
;
