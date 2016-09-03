import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SidePanel from './SidePanel';

const LeftPanel = props => (
	<SidePanel side="left">
		<div className="map-location-details">
			<h3>Marsillion</h3>
			{ props.selectedPlace ? (
				<div className="panel panel-default panel-compact">
					<div className="panel-heading">
						<h4 className="panel-title">{ props.selectedPlace.name }</h4>
					</div>
					<div className="list-group">
						<div className="list-group-item">
							<h5 className="list-group-item-heading">Name</h5>
							<p className="list-group-item-text">{ props.selectedPlace.name }</p>
						</div>
						<div className="list-group-item">
							<h5 className="list-group-item-heading">Info</h5>
							{ props.selectedPlace.info
								? <p className="list-group-item-text" dangerouslySetInnerHTML={{ __html: props.selectedPlace.info }} />
								: <p className="list-group-item-text">(No additional info!)</p>}
						</div>
						<div className="list-group-item">
							<h5 className="list-group-item-heading">Creator</h5>
							<p className="list-group-item-text">{ props.selectedPlace.creatorName }</p>
						</div>
					</div>
				</div>
			) : '(No place selected)' }
		</div>
	</SidePanel>
);

LeftPanel.propTypes = {
	selectedPlace: React.PropTypes.any,
};

LeftPanel.defaultProps = () => ({
	selectedPlace: null,
});

const mapState = state => ({
	// TODO: Current place selector.
	// selectedPlace: state.map.selectedMarker,
	// place: ,
	selectedPlace: state.map.selectedMarker
		? state.map.markers.find( m => m.id === state.map.selectedMarker )
		: null,
});

const mapDispatch = () => ({});

export default connect( mapState, mapDispatch )( LeftPanel );
