export const UPDATE_MOUSE_LATLNG = 'UPDATE_MOUSE_LATLNG';
export const updateMouseLatLng = ( latLng, meta = {} ) => ({
	type: UPDATE_MOUSE_LATLNG,
	payload: {
		latLng
	},
	meta
});

//// Testing... Or possibly API actions.

export const ADD_LOADED_MARKERS = 'ADD_LOADED_MARKERS';
export const addLoadedMarkers = ( markers, meta = {} ) => ({
	type: ADD_LOADED_MARKERS,
	payload: {
		markers,
	},
	meta
});

//// Editing

export const MOVE_MARKER = 'MOVE_MARKER';
export const moveMarker = ( markerId, position, meta = {} ) => ({
	type: MOVE_MARKER,
	payload: {
		markerId,
		position
	},
	meta
});

//// UI

export const TOGGLE_SIDE_PANEL = 'TOGGLE_SIDE_PANEL';
export const toggleSidePanel = ( side, meta = {} ) => ({
	type: TOGGLE_SIDE_PANEL,
	payload: {
		side,
	},
	meta
});

// Selecting a Place from the Place Index.
export const SELECT_PLACE = 'SELECT_PLACE';
export const selectPlace = ( placeId, meta = {} ) => ({
	type: SELECT_PLACE,
	payload: {
		placeId,
	},
	meta
});

// Selecting a Marker on the Map.
// TODO: Is is goot to have these two actions that do the same thing?
export const SELECT_MARKER = 'SELECT_MARKER';
export const selectMarker = ( placeId, meta = {} ) => ({
	type: SELECT_MARKER,
	payload: {
		placeId,
	},
	meta
});

// Deselecting a Marker on the Map.
export const DESELECT_MARKER = 'DESELECT_MARKER';
export const deselectMarker = ( placeId, meta = {} ) => ({
	type: DESELECT_MARKER,
	payload: {
		placeId,
	},
	meta
});

export const ZOOM_TO = 'ZOOM_TO';
export const zoomTo = ( zoom, meta = {} ) => ({
	type: ZOOM_TO,
	payload: {
		zoom,
	},
	meta
});

export const PAN_TO = 'PAN_TO';
export const panTo = ( center, meta = {} ) => ({
	type: PAN_TO,
	payload: {
		center,
	},
	meta
});
