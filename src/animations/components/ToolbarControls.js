/**
 * Toolbar Controls Component
 * Provides animation preset dropdown in the block toolbar
 *
 * @package
 */

import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	cancelCircleFilled,
	arrowUp,
	arrowDown,
	arrowLeft,
	arrowRight,
	verse,
	plusCircle,
	pullquote,
	rotateRight,
	flipVertical,
	warning,
	symbol,
	aspectRatio,
} from '@wordpress/icons';
import AnimatedIcon from './AnimatedIcon';
import { resetAttributes } from '../utils/attributeHelpers';
import { getPresetConfig } from '../presets/animationPresets';

/**
 * Icon mapping for animation presets
 * Maps preset names to WordPress icons
 *
 * @type {Object}
 */
const presetIcons = {
	None: cancelCircleFilled,
	'Fade In': symbol,
	'Fade Up': arrowUp,
	'Fade Down': arrowDown,
	'Fade Left': arrowLeft,
	'Fade Right': arrowRight,
	Bounce: verse,
	'Zoom In': plusCircle,
	'Zoom Out': pullquote,
	Rotate: rotateRight,
	Flip: flipVertical,
	Shake: warning,
	Pulse: symbol,
	Wobble: aspectRatio,
};

/**
 * Apply an animation preset to the block
 *
 * @param {string}   presetName    - Name of the preset to apply
 * @param {Function} setAttributes - WordPress setAttributes function
 */
const applyPreset = ( presetName, setAttributes ) => {
	// Reset all attributes first
	resetAttributes( setAttributes );

	// Get preset configuration
	const presetConfig = getPresetConfig( presetName );

	if ( presetConfig ) {
		setAttributes( presetConfig );
	}
};

/**
 * Toolbar Controls Component
 * Renders the animation preset dropdown in the block toolbar
 *
 * @param {Object}   props               - Component props
 * @param {Function} props.setAttributes - Function to update attributes
 * @return {JSX.Element} Toolbar controls
 */
const ToolbarControls = ( { setAttributes } ) => {
	return (
		<BlockControls>
			<Toolbar>
				<ToolbarDropdownMenu
					icon={ <AnimatedIcon /> }
					label={ __( 'Animation Presets', 'animatewp' ) }
					controls={ [
						{
							title: 'None',
							icon: presetIcons.None,
							onClick: () => resetAttributes( setAttributes ),
						},
						{
							title: 'Fade In',
							icon: presetIcons[ 'Fade In' ],
							onClick: () =>
								applyPreset( 'Fade In', setAttributes ),
						},
						{
							title: 'Fade Up',
							icon: presetIcons[ 'Fade Up' ],
							onClick: () =>
								applyPreset( 'Fade Up', setAttributes ),
						},
						{
							title: 'Fade Down',
							icon: presetIcons[ 'Fade Down' ],
							onClick: () =>
								applyPreset( 'Fade Down', setAttributes ),
						},
						{
							title: 'Fade Left',
							icon: presetIcons[ 'Fade Left' ],
							onClick: () =>
								applyPreset( 'Fade Left', setAttributes ),
						},
						{
							title: 'Fade Right',
							icon: presetIcons[ 'Fade Right' ],
							onClick: () =>
								applyPreset( 'Fade Right', setAttributes ),
						},
						{
							title: 'Bounce',
							icon: presetIcons.Bounce,
							onClick: () =>
								applyPreset( 'Bounce', setAttributes ),
						},
						{
							title: 'Zoom In',
							icon: presetIcons[ 'Zoom In' ],
							onClick: () =>
								applyPreset( 'Zoom In', setAttributes ),
						},
						{
							title: 'Zoom Out',
							icon: presetIcons[ 'Zoom Out' ],
							onClick: () =>
								applyPreset( 'Zoom Out', setAttributes ),
						},
						{
							title: 'Rotate',
							icon: presetIcons.Rotate,
							onClick: () =>
								applyPreset( 'Rotate', setAttributes ),
						},
						{
							title: 'Flip',
							icon: presetIcons.Flip,
							onClick: () => applyPreset( 'Flip', setAttributes ),
						},
						{
							title: 'Shake',
							icon: presetIcons.Shake,
							onClick: () =>
								applyPreset( 'Shake', setAttributes ),
						},
						{
							title: 'Pulse',
							icon: presetIcons.Pulse,
							onClick: () =>
								applyPreset( 'Pulse', setAttributes ),
						},
						{
							title: 'Wobble',
							icon: presetIcons.Wobble,
							onClick: () =>
								applyPreset( 'Wobble', setAttributes ),
						},
					] }
				/>
			</Toolbar>
		</BlockControls>
	);
};

export default ToolbarControls;
