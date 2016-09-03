import { combineReducers } from 'redux';
import * as actions from '../actions';
import findIndex from 'lodash/fp/findIndex';
import set from 'lodash/fp/set';
import get from 'lodash/fp/get';
// import L from 'leaflet';

const initialMap = () => ({
	// :L.LatLng
	mouseLatLng: null,
	markers: [
		// {
		// 	imageX: 2358/2,
		// 	imageY: 2358/2,
		// }
	],
	selectedMarker: null,
	zoom: 0,
	center: [
		-2358/2,
		2358/2
	]
});

function map( state = initialMap(), action ) {
	switch( action.type ) {
		case actions.UPDATE_MOUSE_LATLNG: {
			return {
				...state,
				mouseLatLng: action.payload.latLng,
			};
		}

		//// Testing... or API actions?

		case actions.ADD_LOADED_MARKERS: {
			return {
				...state,
				markers: action.payload.markers,
			};
		}

		//// Editing...

		case actions.MOVE_MARKER: {
			let { markerId, position } = action.payload;
			let markerIndex = findIndex( m => m.id === markerId, state.markers );
			let marker = {
				...state.markers[ markerIndex ],
				imageX: position.x,
				imageY: position.y,
			};

			return {
				...state,
				markers: set( [ markerIndex ], marker, state.markers ),
			};
		}

		//// General Interaction?

		// Selecting a place from the index.
		case actions.SELECT_PLACE:
		case actions.SELECT_MARKER: {
			let { placeId } = action.payload;
			return {
				...state,
				selectedMarker: placeId,
			};
		}

		// Deselecting a marker on the map.
		case actions.DESELECT_MARKER: {
			let { placeId } = action.payload;
			return {
				...state,
				// Only deselect if it's still this one that's selected.
				selectedMarker: state.selectedMarker === placeId ? null : state.selectedMarker,
			};
		}

		case actions.ZOOM_TO: {
			let { zoom } = action.payload;
			return {
				...state,
				zoom
			};
		}

		case actions.PAN_TO: {
			let { center } = action.payload;
			return {
				...state,
				center
			};
		}

		default: {
			return state;
		}
	}
}

const initialUI = () => ({
	sidePanel: {
		left: {
			expanded: false,
		},
		right: {
			expanded: false,
		}
	}
})

function ui( state = initialUI(), action ) {
	switch( action.type ) {
		case actions.TOGGLE_SIDE_PANEL: {
			let { side } = action.payload;
			let togglePath = [ 'sidePanel', side, 'expanded' ];
			return set( togglePath, ! get( togglePath, state ), state );
		}

		default: return state;
	}
}

export default combineReducers({
	map,
	ui,
});
