import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
import {
	Marker
} from 'react-leaflet';
import L from 'leaflet';
// import { iconForType } from './map-icons';

export default class PoppableMarker extends Marker {
	static propTypes = Marker.propTypes;
	static childContextTypes = Marker.childContextTypes;

	componentDidUpdate( prevProps ) {
		super.componentDidUpdate( prevProps );

		if( this.props.popupOpen !== prevProps.popupOpen ) {
			if( this.props.popupOpen ) {
				this.leafletElement.openPopup();
			}
			else {
				this.leafletElement.closePopup();
			}
		}
	}
}
