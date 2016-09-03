import React from 'react';
import Leaflet from 'leaflet'
import { Map } from 'react-leaflet';
import throttle from 'lodash/fp/throttle';

// Dirty dirty hax to have it invalidate its size every time.
// This is probably a bad idea for a variety of reasons.

export default class ResizingMap extends Map {
	static propTypes = {
		...Map.propTypes,
		shouldInvalidateSize: React.PropTypes.bool,
		invalidateSizeThrottle: React.PropTypes.number,
		invalidateSizeAnimate: React.PropTypes.bool,
		invalidateSizeCheckValue: React.PropTypes.any,
	};

	static defaultProps = {
		...Map.defaultProps,
		shouldInvalidateSize: false,
		invalidateSizeThrottle: 100,
		invalidateSizeAnimate: false,
		invalidateSizeCheckValue: false,
	};

	static childContextTypes = {
		map: React.PropTypes.instanceOf( Leaflet.Map ),
	};

	componentDidMount() {
		super.componentDidMount();

		this.throttledInvalidateSize = throttle(
			this.props.invalidateSizeThrottle,
			() => this.invalidateSize()
		);
	}

	componentDidUpdate( prevProps ) {
    const { center } = this.props
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
    	console.log( "componentDidUpdate: center should update." );
		}

		super.componentDidUpdate( prevProps );

		if( this.props.invalidateSizeThrottle != prevProps.invalidateSizeThrottle ) {
			this.throttledInvalidateSize = throttle(
				this.props.invalidateSizeThrottle,
				() => this.invalidateSize()
			);
		}

		let shouldInvalidateSize = false;

		if( this.props.shouldInvalidateSize ) {
			if( this.props.invalidateSizeCheckValue === true ) {
				shouldInvalidateSize = true;
			}
			else if( this.props.invalidateSizeCheckValue !== false ) {
				// NOTE: Non-strict comparison here.
				if( this.props.invalidateSizeCheckValue != prevProps.invalidateSizeCheckValue ) {
					shouldInvalidateSize = true;
				}
			}
		}

		if( shouldInvalidateSize ) {
			this.throttledInvalidateSize();
		}
	}

	invalidateSize() {
		console.log( `invalidateSize` )
		this.leafletElement.invalidateSize( this.props.invalidateSizeAnimate );
	}
}
