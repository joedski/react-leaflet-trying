
export function iconForType( markerType ) {
	switch( markerType ) {
		// General
		case '0': return {
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'circle'
		};

		// Residential
		case '1': return {
			prefix: 'glyphicon',
			icon: 'home',
		};

		// Business
		case '2': return {
			markerColor: 'green',
			// This one is closer to the original.
			// prefix: 'fa',
			// extraClasses: 'fa-fw',
			// icon: 'building',
			prefix: 'glyphicon',
			icon: 'shopping-cart',
		};

		// Restaurant
		case '3': return {
			markerColor: 'green',
			prefix: 'glyphicon',
			icon: 'cutlery',
		};

		// Hospital/Medical (use green instead for druggist?)
		case '4': return {
			markerColor: 'red',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'plus-square',
		};

		// Guard
		case '5': return {
			markerColor: 'darkgreen',
			prefix: 'glyphicon',
			// TODO: Need a better icon!  Possibly a custom one.
			icon: 'eye-open',
		};

		// Guild
		case '6': return {
			markerColor: 'darkpurple',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'magic'
		};

		// Flynn
		case '7': return {
			markerColor: 'darkred',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'flask',
		};

		// Library
		case '8': return {
			markerColor: 'cadetblue',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'book'
		};

		// Municipal
		case '9': return {
			markerColor: 'cadetblue',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'bank',
		};

		// Mystery Tree (unused)
		case '10': return {
			markerColor: 'darkgreen',
			prefix: 'glyphicon',
			icon: 'tree-conifer',
		};

		// Public Centers (CC, Welcome Center, etc.)
		case '11': return {
			markerColor: 'orange',
			prefix: 'fa',
			extraClasses: 'fa-fw',
			icon: 'users'
		};
	}
}
