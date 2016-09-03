import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import classNames from 'classnames';

const SidePanelToggle = ( props ) => {
	return (
		<div className="side-panel--toggle-container">
			<div className={ classNames( 'side-panel--toggle', {
				'side-panel--toggle__left': props.side === 'left',
				'side-panel--toggle__right': props.side === 'right',
			})}
				onClick={ props.onToggle }>
				<i className={ classNames( 'glyphicon', {
					'glyphicon-triangle-right': (props.side === 'right' && props.expanded === true) || (props.side === 'left' && props.expanded === false),
					'glyphicon-triangle-left': (props.side === 'left' && props.expanded === true) || (props.side === 'right' && props.expanded === false),
				})}></i>
			</div>
		</div>
	);
};

SidePanelToggle.propTypes = {
	side: React.PropTypes.string.isRequired,
	expanded: React.PropTypes.bool,
	onToggle: React.PropTypes.func,
};

const SidePanel = ( props ) => {
	return (
		<div className={ `side-panel side-panel__${ props.side }` }>
			{ props.side === 'right'
				? <SidePanelToggle
						side="right"
						expanded={ props.expanded }
						// TODO: Enable toggling.
						onToggle={ () => props.onToggle( props.side ) }
						/>
				: null }
			<div className={ classNames( 'side-panel--content', {
				'side-panel--content__collapsed': props.expanded === false
			})}>
				{ props.children }
			</div>
			{ props.side === 'left'
				? <SidePanelToggle
						side="left"
						expanded={ props.expanded }
						// TODO: Enable toggling.
						onToggle={ () => props.onToggle( props.side ) }
						// onToggle={}
						/>
				: null }
		</div>
	);
};

SidePanel.propTypes = {
	children: React.PropTypes.node,

	side: React.PropTypes.string.isRequired,
	expanded: React.PropTypes.bool,

	onToggle: React.PropTypes.func,
};

SidePanel.defaultProps = () => ({
	expanded: false,
});

const mapState = ( state, ownProps ) => ({
	expanded: state.ui.sidePanel[ ownProps.side ].expanded,
});

const mapDispatch = ( dispatch, ownProps ) => ({
	onToggle: () => dispatch( actions.toggleSidePanel( ownProps.side ) ),
});

export default connect( mapState, mapDispatch )( SidePanel );

// export default SidePanel;
