import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SidePanel from './SidePanel';

import groupBy from 'lodash/fp/groupBy';
import toPairs from 'lodash/fp/toPairs';
import sortBy from 'lodash/fp/sortBy';
import compose from 'lodash/fp/flowRight';

import locationTypes from '../location-types';

const sortedPlaces = compose( sortBy( e => parseInt( e[ 0 ] ) ), toPairs, groupBy( 'type' ) );

const RightPanel = props => (
	<SidePanel side="right">
		<div className="map-location-index">
			<h4>Location Index</h4>
			{ sortedPlaces( props.places ).map( ([ type, thesePlaces ]) => (
				<div className="panel panel-default panel-compact" key={ type }>
					<div className="panel-heading" key={ `${type}-heading` }>
						<h4 className="panel-title">{ locationTypes[ type ].title }</h4>
					</div>
					<div className="list-group" key={ `${type}-items` }>
						{ thesePlaces.map( p => (
							<button key={ p.id }
								type="button"
								className={ classNames( 'list-group-item', {
									'active': p.id === props.selectedPlace,
								})}
								onClick={ () => props.onSelectPlace( p.id ) }
								>
								{ p.name }</button>
						))}
					</div>
				</div>
			)) }
		</div>
	</SidePanel>
);

RightPanel.propTypes = {
	places: React.PropTypes.array,
	onSelectPlace: React.PropTypes.func,
	selectedPlace: React.PropTypes.string,
};

RightPanel.defaultProps = () => ({
	places: [],
});

const mapState = state => ({
	places: state.map.markers,
	selectedPlace: state.map.selectedMarker,
});

const mapDispatch = dispatch => ({
	onSelectPlace: placeId => dispatch( actions.selectPlace( placeId ) ),
});

export default connect( mapState, mapDispatch )( RightPanel );
