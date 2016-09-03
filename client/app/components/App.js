import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
import CityMap from './CityMap';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
// import SidePanel from './SidePanel';


const App = ( props ) => {
	return (
		<div className="citymap-app">
			<LeftPanel />
			<CityMap />
			<RightPanel />
		</div>
	);
};

App.propTypes = {
};

export default App;
