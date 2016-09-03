import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
	/*Map as LeafletMap,*/ /*Marker,*/ Popup, ImageOverlay, ScaleControl,
} from 'react-leaflet';
import L from 'leaflet';
import { iconForType } from './map-icons';
import Marker from './PoppableMarker';
import LeafletMap from './ResizingMap';
import CustomScaleControl from './CustomScaleControl';

import debounce from 'lodash/fp/debounce';

let debouncer = debounce( 100 );

let checkPan = debouncer( ({ center, place, callback }) => {
	let shouldPan = (
		center[ 0 ] != (- place.imageY)
		|| center[ 1 ] != (place.imageX)
	);

	if( shouldPan ) {
		// This just gets hackier and hackier.
		setTimeout( () => {
			callback([
				-place.imageY,
				place.imageX
			]);
		}, 1 );
	}
});

// TODO: Load from outside?
const MAP_SIZE = 2400;

const CityMap = ( props ) => {
	let marsillionImageBounds = L.latLngBounds([[ -MAP_SIZE, 0 ], [ 0, MAP_SIZE ]]);
	let selectedMarkerPlace = props.selectedMarker
		? props.markers.find( m => m.id === props.selectedMarker )
		: null
		;

	if( selectedMarkerPlace ) {
		// This is getting incredibly hacky... Ugh.
		checkPan({
			center: props.center,
			place: selectedMarkerPlace,
			callback: props.onPanTo
		});
	}

	return (
		<LeafletMap
			// This is pretty annoying but I guess that's the price of
			// trying to wedge something like Leaflet into something like React.  Egh.
			shouldInvalidateSize={ true }
			invalidateSizeCheckValue={ `${ props.sidesOpen.left ? 'left' : '' }${ props.sidesOpen.right ? 'right' : '' }` }
			className="citymap"
			// Just doing single images for now.
			// at z 0, 256px covers 360deg lng the whole planet.
			zoom={ props.zoom }
			maxZoom={ 1 }
			minZoom={ -1 }
			maxBounds={ marsillionImageBounds }
			center={ props.center }
			// lat/long -> px-width/px-height
			crs={ L.extend( {}, L.CRS.Simple, {
				// transformation: new L.Transformation( 200/64, 0, -200/64, 0 )
			}) }
			animate={ true }
			onZoomEnd={ event => {
				return props.onZoomTo( event.target.getZoom() );
			}}
			// onResize={ () => {
			// 	console.log( `Map resize event!` );
			// }}
			onClick={ () => {
				if( props.selectedMarker ) {
					props.onDeselectMarker( props.selectedMarker );
				}
			}}
		>
			<ImageOverlay
				url="images/marsillion.png"
				bounds={ marsillionImageBounds }
				/>
			{ props.markers.map( m => (
				// Leaflet goes [ Lat, Long ], hence Y then X.
				<Marker key={ m.id }
					position={ L.latLng([ -m.imageY, m.imageX ]) }
					icon={ L.AwesomeMarkers.icon( iconForType( m.type ) ) }
					draggable={ m.type === '1' }
					onDragEnd={ event => {
						let latLng = event.target.getLatLng();
						let position = {
							x: latLng.lng,
							y: -latLng.lat,
						};
						props.onMarkerMove( m.id, position );
					} }
					popupOpen={ m.id === props.selectedMarker }
					onClick={ () => {
						props.onSelectMarker( m.id );
					} }
					>
					<Popup>
						<div>
							<h4>{ m.name }</h4>
							{ m.info
								// TODO: Should probably have a safer way of handling info, like manually restricting tags or something.
								? <p dangerouslySetInnerHTML={{ __html: m.info }} />
								: null }
						</div>
					</Popup>
				</Marker>
			))}
			{/* Normally in the custom CRS, 1m = 1px = 1deg.   Our map is 200m/64px.
			Changing the CRS to influence the meters would be the meters while leaving the pixels alone
			would be the best way to do it, but as a quick hack this works. */}
			<CustomScaleControl customScale={ 200 / 64 } />
		</LeafletMap>
	);
}

CityMap.propTypes = {
	zoom: React.PropTypes.number,
	center: React.PropTypes.any, // TODO: Proper Type (probably latLngType?)
	markers: React.PropTypes.array,
	selectedMarker: React.PropTypes.string,
	onMarkerMove: React.PropTypes.func,
	onDeselectMarker: React.PropTypes.func,
	onSelectMarker: React.PropTypes.func,
	onZoomTo: React.PropTypes.func,
};

const mapState = state => ({
	zoom: state.map.zoom,
	center: state.map.center,
	markers: state.map.markers,
	selectedMarker: state.map.selectedMarker,
	sidesOpen: {
		left: state.ui.sidePanel.left.expanded,
		right: state.ui.sidePanel.right.expanded,
	},
});

const mapDispatch = dispatch => ({
	onMarkerMove: ( markerId, position ) => dispatch( actions.moveMarker( markerId, position ) ),
	onDeselectMarker: ( markerId ) => dispatch( actions.deselectMarker( markerId ) ),
	onSelectMarker: ( markerId ) => dispatch( actions.selectMarker( markerId ) ),
	onZoomTo: zoom => dispatch( actions.zoomTo( zoom ) ),
	onPanTo: center => dispatch( actions.panTo( center ) ),
});

const CurrentMap = connect( mapState, mapDispatch )( CityMap );

export default CurrentMap;

