/**
 * Toolbar Controls Component
 * Provides animation preset dropdown in the block toolbar
 *
 * @package AnimateWP
 */

import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import AnimatedIcon from './AnimatedIcon';
import { resetAttributes } from '../utils/attributeHelpers';
import { getPresetConfig } from '../presets/animationPresets';

/**
 * Apply an animation preset to the block
 *
 * @param {string} presetName - Name of the preset to apply
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
 * @param {Object} props - Component props
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
							icon: <AnimatedIcon />,
							onClick: () => resetAttributes( setAttributes ),
						},
						{
							title: 'Fade In',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Fade In', setAttributes ),
						},
						{
							title: 'Fade Up',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Fade Up', setAttributes ),
						},
						{
							title: 'Fade Down',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Fade Down', setAttributes ),
						},
						{
							title: 'Fade Left',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Fade Left', setAttributes ),
						},
						{
							title: 'Fade Right',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Fade Right', setAttributes ),
						},
						{
							title: 'Bounce',
							icon: <AnimatedIcon />,
							onClick: () => applyPreset( 'Bounce', setAttributes ),
						},
						{
							title: 'Zoom In',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Zoom In', setAttributes ),
						},
						{
							title: 'Zoom Out',
							icon: <AnimatedIcon />,
							onClick: () =>
								applyPreset( 'Zoom Out', setAttributes ),
						},
						{
							title: 'Rotate',
							icon: <AnimatedIcon />,
							onClick: () => applyPreset( 'Rotate', setAttributes ),
						},
						{
							title: 'Flip',
							icon: <AnimatedIcon />,
							onClick: () => applyPreset( 'Flip', setAttributes ),
						},
						{
							title: 'Shake',
							icon: <AnimatedIcon />,
							onClick: () => applyPreset( 'Shake', setAttributes ),
						},
						{
							title: 'Pulse',
							icon: <AnimatedIcon />,
							onClick: () => applyPreset( 'Pulse', setAttributes ),
						},
						{
							title: 'Wobble',
							icon: <AnimatedIcon />,
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
