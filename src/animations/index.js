/**
 * AnimateWP Block Editor Integration
 *
 * Adds GSAP-powered animation controls to all WordPress blocks via Higher-Order Components.
 * Provides animation presets, customizable settings, and ScrollTrigger support.
 *
 * @package AnimateWP
 */

import './editor.scss';
import blockAttributes from './block.json';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

// Import components
import InspectorPanel from './components/InspectorPanel';
import ToolbarControls from './components/ToolbarControls';

// Import utilities
import { saveSettings } from './utils/attributeHelpers';
import { getExcludedBlocks, isBlockExcluded } from './utils/blockHelpers';

/**
 * Add animation attributes to all blocks (except excluded ones)
 *
 * @param {Object} settings - Block settings
 * @return {Object} Modified settings
 */
function addAttributes( settings ) {
	if ( ! settings.attributes ) {
		settings.attributes = {};
	}

	// Check if block is in the exclusion list
	if ( isBlockExcluded( settings.name ) ) {
		return settings;
	}

	// Loop through each attribute in blockAttributes and add it if it doesn't exist
	Object.keys( blockAttributes.attributes ).forEach( ( attribute ) => {
		if ( ! settings.attributes.hasOwnProperty( attribute ) ) {
			settings.attributes[ attribute ] =
				blockAttributes.attributes[ attribute ];
		}
	} );

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'animatewp/add-attributes',
	addAttributes
);

/**
 * HOC to add animation inspector controls to blocks
 */
const withInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { isSelected, name } = props;

		// Skip adding custom controls for excluded blocks
		if ( isBlockExcluded( name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && <InspectorPanel { ...props } /> }
			</Fragment>
		);
	};
}, 'withInspectorControl' );

addFilter(
	'editor.BlockEdit',
	'animatewp/with-inspector-control',
	withInspectorControl
);

/**
 * HOC to add animation preset toolbar button to blocks
 */
const withToolbarButton = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { isSelected, name } = props;

		// Skip adding custom controls for excluded blocks
		if ( isBlockExcluded( name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && <ToolbarControls { ...props } /> }
			</Fragment>
		);
	};
}, 'withToolbarButton' );

addFilter(
	'editor.BlockEdit',
	'animatewp/with-toolbar-button',
	withToolbarButton
);

/**
 * Add visual indicator to blocks with animations enabled
 */
const withAnimationIndicator = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const { attributes } = props;
			const hasAnimation = attributes?.enableAnimation;

			return (
				<BlockListBlock
					{ ...props }
					className={
						hasAnimation ? 'has-animatewp-animation' : ''
					}
				/>
			);
		};
	},
	'withAnimationIndicator'
);

addFilter(
	'editor.BlockListBlock',
	'animatewp/with-animation-indicator',
	withAnimationIndicator
);

/**
 * Save animation settings to block extra props
 */
addFilter(
	'blocks.getSaveContent.extraProps',
	'animatewp/save-settings',
	saveSettings
);
