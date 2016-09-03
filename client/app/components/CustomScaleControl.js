
// import { control } from 'leaflet'
import { Control } from 'leaflet';
import { PropTypes } from 'react';

// import MapControl from './MapControl'
import { ScaleControl } from 'react-leaflet';

const { Scale } = Control;
const CustomScale = Scale.extend({
	options: {
		position: 'bottomleft',

		// @option maxWidth: Number = 100
		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
		maxWidth: 100,

		// @option metric: Boolean = True
		// Whether to show the metric scale line (m/km).
		metric: true,

		// @option imperial: Boolean = True
		// Whether to show the imperial scale line (mi/ft).
		imperial: true,

		// @option updateWhenIdle: Boolean = false
		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).

		// @option customScale: Number = 1
		// Additional scaler to apply to the number presented before display.  Hack to allow the use of maps with arbitrary sizes.
		customScale: 1,
	},

	_update: function () {
		var map = this._map,
				y = map.getSize().y / 2;

		var maxMeters = map.distance(
				map.containerPointToLatLng([0, y]),
				map.containerPointToLatLng([this.options.maxWidth, y])
				) * this.options.customScale;

		this._updateScales(maxMeters);
	}
})

export default class CustomScaleControl extends ScaleControl {
	static propTypes = {
		...ScaleControl.propTypes,
		customScaleFactor: PropTypes.number,
	}

	componentWillMount () {
		// this.leafletElement = control.scale(this.props)
		this.leafletElement = new CustomScale( this.props );
	}
}
