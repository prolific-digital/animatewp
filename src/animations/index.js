/**
 * AnimateWP Block Editor Integration
 *
 * Adds GSAP-powered animation controls to all WordPress blocks via Higher-Order Components.
 * Provides animation presets, customizable settings, and ScrollTrigger support.
 *
 * @package AnimateWP
 */

import blockAttributes from './block.json';
import {
	moveTo,
	tableOfContents,
	symbol,
	symbolFilled,
} from '@wordpress/icons';

import { addFilter, applyFilters } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	SelectControl,
	Notice,
	Toolbar,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Get list of blocks that should be excluded from animations
 *
 * @return {Array} Array of block names to exclude
 */
function getExcludedBlocks() {
	const defaultExcluded = [ 'gravityforms/form' ];
	return applyFilters( 'animatewp.excludedBlocks', defaultExcluded );
}

/**
 * Check if a block should be excluded from animations
 *
 * @param {string} blockName - The block name to check
 * @return {boolean} True if block should be excluded
 */
function isBlockExcluded( blockName ) {
	const excludedBlocks = getExcludedBlocks();
	return excludedBlocks.includes( blockName );
}

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
		const { attributes, setAttributes, isSelected, name } = props;

		// Skip adding custom controls for excluded blocks
		if ( isBlockExcluded( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const {
			enableAnimation,
			animateLoop,
			animateAutoPlay,
			animateDuration,
			animateDelay,
			animateEasing,
			animateDirection,
			animateX,
			animateY,
			animateXPercent,
			animateYPercent,
			animateScale,
			animateRotation,
			animateSkew,
			animateAutoAlpha,
			animateRepeat,
			animateYoYo,
			enableScrollTrigger,
			scrollTriggerStart,
			scrollTriggerEnd,
			scrollTriggerToggleActions,
			scrollTriggerStartOffset,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls group="styles">
						<PanelBody
							title={ __( 'Animations', 'animatewp' ) }
							initialOpen={ false }
							icon={ symbolFilled }
						>
							<Notice isDismissible={ false }>
								{ __(
									'Looking for documentation on how to use these settings?',
									'animatewp'
								) }
								<a
									href="https://prolificdigital.notion.site/Prolific-Animations-WordPress-Plugin-138f73948280458d9a2bcd298ac62354?pvs=4"
									target="_blank"
									rel="noopener noreferrer"
								>
									{ __( 'Learn more', 'animatewp' ) }
								</a>
							</Notice>
							<div style={ { marginBottom: '20px' } }></div>
							<ToggleControl
								label={ __( 'Enable Animation', 'animatewp' ) }
								checked={ enableAnimation }
								onChange={ ( value ) =>
									setAttributes( { enableAnimation: value } )
								}
								help={ __(
									'Enable this option to add animation to the block.',
									'animatewp'
								) }
							/>
						</PanelBody>

						{ enableAnimation && (
							<>
								<PanelBody
									title={ __(
										'Basic Settings',
										'animatewp'
									) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Auto Play', 'animatewp' ) }
										checked={ animateAutoPlay }
										onChange={ ( value ) =>
											setAttributes( {
												animateAutoPlay: value,
											} )
										}
										help={ __(
											'Enable this option to auto play the animation.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'Animation Duration (seconds)',
											'animatewp'
										) }
										value={ animateDuration }
										onChange={ ( value ) =>
											setAttributes( {
												animateDuration: value,
											} )
										}
										min={ 0.1 }
										max={ 60 }
										step={ 0.1 }
										help={ __(
											'Set the duration of the animation in seconds.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'Animation Delay (seconds)',
											'animatewp'
										) }
										value={ animateDelay }
										onChange={ ( value ) =>
											setAttributes( {
												animateDelay: value,
											} )
										}
										min={ 0 }
										max={ 60 }
										step={ 0.1 }
										help={ __(
											'Set the delay before the animation starts in seconds.',
											'animatewp'
										) }
									/>
									<SelectControl
										label={ __(
											'Animation Easing',
											'animatewp'
										) }
										value={ animateEasing }
										options={ [
											{
												label: 'Power1.in',
												value: 'power1.in',
											},
											{
												label: 'Power1.out',
												value: 'power1.out',
											},
											{
												label: 'Power1.inOut',
												value: 'power1.inOut',
											},
											{
												label: 'Power2.in',
												value: 'power2.in',
											},
											{
												label: 'Power2.out',
												value: 'power2.out',
											},
											{
												label: 'Power2.inOut',
												value: 'power2.inOut',
											},
											{
												label: 'Power3.in',
												value: 'power3.in',
											},
											{
												label: 'Power3.out',
												value: 'power3.out',
											},
											{
												label: 'Power3.inOut',
												value: 'power3.inOut',
											},
											{
												label: 'Power4.in',
												value: 'power4.in',
											},
											{
												label: 'Power4.out',
												value: 'power4.out',
											},
											{
												label: 'Power4.inOut',
												value: 'power4.inOut',
											},
											{
												label: 'Back.in',
												value: 'back.in',
											},
											{
												label: 'Back.out',
												value: 'back.out',
											},
											{
												label: 'Back.inOut',
												value: 'back.inOut',
											},
											{
												label: 'Bounce.in',
												value: 'bounce.in',
											},
											{
												label: 'Bounce.out',
												value: 'bounce.out',
											},
											{
												label: 'Bounce.inOut',
												value: 'bounce.inOut',
											},
											{
												label: 'Elastic.in',
												value: 'elastic.in',
											},
											{
												label: 'Elastic.out',
												value: 'elastic.out',
											},
											{
												label: 'Elastic.inOut',
												value: 'elastic.inOut',
											},
											{
												label: 'Circ.in',
												value: 'circ.in',
											},
											{
												label: 'Circ.out',
												value: 'circ.out',
											},
											{
												label: 'Circ.inOut',
												value: 'circ.inOut',
											},
											{
												label: 'Expo.in',
												value: 'expo.in',
											},
											{
												label: 'Expo.out',
												value: 'expo.out',
											},
											{
												label: 'Expo.inOut',
												value: 'expo.inOut',
											},
											{
												label: 'Sine.in',
												value: 'sine.in',
											},
											{
												label: 'Sine.out',
												value: 'sine.out',
											},
											{
												label: 'Sine.inOut',
												value: 'sine.inOut',
											},
										] }
										onChange={ ( value ) =>
											setAttributes( {
												animateEasing: value,
											} )
										}
										help={ __(
											'Choose the easing function for the animation.',
											'animatewp'
										) }
									/>
									<SelectControl
										label={ __(
											'Animation Direction',
											'animatewp'
										) }
										value={ animateDirection }
										options={ [
											{
												label: 'From (animate from values)',
												value: 'from',
											},
											{
												label: 'To (animate to values)',
												value: 'to',
											},
										] }
										onChange={ ( value ) =>
											setAttributes( {
												animateDirection: value,
											} )
										}
										help={ __(
											'Choose whether to animate FROM the specified values to current position, or TO the specified values from current position.',
											'animatewp'
										) }
									/>
								</PanelBody>

								<PanelBody
									title={ __( 'Transform', 'animatewp' ) }
									initialOpen={ false }
								>
									<RangeControl
										label={ __(
											'X Position (px)',
											'animatewp'
										) }
										value={ animateX }
										onChange={ ( value ) =>
											setAttributes( { animateX: value } )
										}
										min={ -1000 }
										max={ 1000 }
										step={ 1 }
										help={ __(
											'Set the X position for the animation in pixels.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'Y Position (px)',
											'animatewp'
										) }
										value={ animateY }
										onChange={ ( value ) =>
											setAttributes( { animateY: value } )
										}
										min={ -1000 }
										max={ 1000 }
										step={ 1 }
										help={ __(
											'Set the Y position for the animation in pixels.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'X Percent (%)',
											'animatewp'
										) }
										value={ animateXPercent }
										onChange={ ( value ) =>
											setAttributes( {
												animateXPercent: value,
											} )
										}
										min={ -100 }
										max={ 100 }
										step={ 1 }
										help={ __(
											'Set the X position as a percentage for the animation.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'Y Percent (%)',
											'animatewp'
										) }
										value={ animateYPercent }
										onChange={ ( value ) =>
											setAttributes( {
												animateYPercent: value,
											} )
										}
										min={ -100 }
										max={ 100 }
										step={ 1 }
										help={ __(
											'Set the Y position as a percentage for the animation.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __( 'Scale', 'animatewp' ) }
										value={ animateScale }
										onChange={ ( value ) =>
											setAttributes( {
												animateScale: value,
											} )
										}
										min={ -100 }
										max={ 100 }
										step={ 0.1 }
										help={ __(
											'Set the scale for the animation.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __(
											'Rotation (degrees)',
											'animatewp'
										) }
										value={ animateRotation }
										onChange={ ( value ) =>
											setAttributes( {
												animateRotation: value,
											} )
										}
										min={ -360 }
										max={ 360 }
										step={ 1 }
										help={ __(
											'Set the rotation for the animation in degrees.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __( 'Opacity', 'animatewp' ) }
										value={ animateAutoAlpha }
										onChange={ ( value ) =>
											setAttributes( {
												animateAutoAlpha: value,
											} )
										}
										min={ 0 }
										max={ 1 }
										step={ 0.1 }
										help={ __(
											'Set the opacity for the animation.',
											'animatewp'
										) }
									/>
								</PanelBody>

								<PanelBody
									title={ __( 'Advanced', 'animatewp' ) }
									initialOpen={ false }
								>
									<ToggleControl
										label={ __( 'Loop', 'animatewp' ) }
										checked={ animateLoop }
										onChange={ ( value ) =>
											setAttributes( {
												animateLoop: value,
											} )
										}
										help={ __(
											'Enable this option to loop the animation.',
											'animatewp'
										) }
									/>
									<RangeControl
										label={ __( 'Repeat', 'animatewp' ) }
										value={ animateRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												animateRepeat: value,
											} )
										}
										min={ 0 }
										max={ 100 }
										step={ 1 }
										help={ __(
											'Set the number of times the animation should repeat. 0 = no repeat, -1 = infinite.',
											'animatewp'
										) }
									/>
									<ToggleControl
										label={ __( 'Yo-Yo', 'animatewp' ) }
										checked={ animateYoYo }
										onChange={ ( value ) =>
											setAttributes( {
												animateYoYo: value,
											} )
										}
										help={ __(
											'Enable this option to make the animation reverse on repeat.',
											'animatewp'
										) }
									/>
								</PanelBody>

								<PanelBody
									title={ __(
										'Scroll Trigger',
										'animatewp'
									) }
									initialOpen={ false }
								>
									<ToggleControl
										label={ __(
											'Enable Scroll Trigger',
											'animatewp'
										) }
										checked={ enableScrollTrigger }
										onChange={ ( value ) =>
											setAttributes( {
												enableScrollTrigger: value,
											} )
										}
										help={ __(
											'Enable this option to trigger the animation on scroll.',
											'animatewp'
										) }
									/>
									{ enableScrollTrigger && (
										<>
											<SelectControl
												label={ __(
													'Scroll Trigger Start',
													'animatewp'
												) }
												value={ scrollTriggerStart }
												options={ [
													{
														label: 'Top Top',
														value: 'top top',
													},
													{
														label: 'Top Center',
														value: 'top center',
													},
													{
														label: 'Top Bottom',
														value: 'top bottom',
													},
													{
														label: 'Bottom Top',
														value: 'bottom top',
													},
													{
														label: 'Bottom Center',
														value: 'bottom center',
													},
													{
														label: 'Bottom Bottom',
														value: 'bottom bottom',
													},
												] }
												onChange={ ( value ) =>
													setAttributes( {
														scrollTriggerStart:
															value,
													} )
												}
												help={
													<span>
														{ __(
															'Select the start point for the scroll trigger. ',
															'animatewp'
														) }
														<a
															href="https://prolificdigital.notion.site/Prolific-Animations-WordPress-Plugin-138f73948280458d9a2bcd298ac62354#e6fd93c8324442b3919c67b0a1a8ab19"
															target="_blank"
															rel="noopener noreferrer"
														>
															{ __(
																'Learn more about ScrollTrigger.',
																'animatewp'
															) }
														</a>
													</span>
												}
											/>
											<RangeControl
												label={ __(
													'Scroll Trigger Start Offset (px)',
													'animatewp'
												) }
												value={
													scrollTriggerStartOffset
												}
												onChange={ ( value ) =>
													setAttributes( {
														scrollTriggerStartOffset:
															value,
													} )
												}
												min={ -1000 }
												max={ 1000 }
												step={ 1 }
												help={ __(
													'Set an offset for the scroll trigger start point in pixels.',
													'animatewp'
												) }
											/>
										</>
									) }
								</PanelBody>
							</>
						) }
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withInspectorControl' );

addFilter(
	'editor.BlockEdit',
	'animatewp/with-inspector-control',
	withInspectorControl
);

// Add the new attributes to save function
function saveSettings( extraProps, blockType, attributes ) {
	const {
		enableAnimation,
		animateLoop,
		animateAutoPlay,
		animateDuration,
		animateDelay,
		animateEasing,
		animateDirection,
		animateX,
		animateY,
		animateXPercent,
		animateYPercent,
		animateScale,
		animateRotation,
		animateSkew,
		animateAutoAlpha,
		animateRepeat,
		animateYoYo,
		enableScrollTrigger,
		scrollTriggerStart,
		scrollTriggerEnd,
		scrollTriggerToggleActions,
		scrollTriggerStartOffset,
	} = attributes;

	if ( enableAnimation ) {
		extraProps.className = `${ extraProps.className } has-animation`;
		extraProps[ 'data-animation-duration' ] = animateDuration;
		extraProps[ 'data-animation-delay' ] = animateDelay;
		extraProps[ 'data-animation-ease' ] = animateEasing;
		extraProps[ 'data-animation-direction' ] = animateDirection;
		extraProps[ 'data-animation-x' ] = animateX;
		extraProps[ 'data-animation-y' ] = animateY;
		extraProps[ 'data-animation-x-percent' ] = animateXPercent;
		extraProps[ 'data-animation-y-percent' ] = animateYPercent;
		extraProps[ 'data-animation-scale' ] = animateScale;
		extraProps[ 'data-animation-rotation' ] = animateRotation;
		extraProps[ 'data-animation-skew' ] = animateSkew;
		extraProps[ 'data-animation-auto-alpha' ] = animateAutoAlpha;
		extraProps[ 'data-animation-repeat' ] = animateRepeat;
		extraProps[ 'data-animation-yoyo' ] = animateYoYo;
	}

	if ( animateLoop ) {
		extraProps[ 'data-loop-animation' ] = true;
	}

	if ( animateAutoPlay ) {
		extraProps[ 'data-auto-play-animation' ] = true;
	}

	if ( enableScrollTrigger ) {
		extraProps[ 'data-scroll-trigger' ] = true;
		extraProps[ 'data-scroll-trigger-start' ] = scrollTriggerStart;
		extraProps[ 'data-scroll-trigger-end' ] = scrollTriggerEnd;
		extraProps[ 'data-scroll-trigger-toggle-actions' ] =
			scrollTriggerToggleActions;
		extraProps[ 'data-scroll-trigger-start-offset' ] =
			scrollTriggerStartOffset;
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'animatewp/save-settings',
	saveSettings
);

/**
 * Animated lightning bolt icon component
 * Used in toolbar dropdown and preset controls
 *
 * @return {JSX.Element} SVG icon with pulsing animation
 */
const AnimatedIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		width="24"
		height="24"
		className="animated-icon"
	>
		<path d="M64 64C46.3 64 32 78.3 32 96l0 320c0 17.7 14.3 32 32 32l320 0c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L64 64zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM159.7 264l48.3 0c5.5 0 10.5 2.8 13.5 7.4s3.3 10.4 1 15.3l-19.4 41.9L288.3 248 240 248c-5.5 0-10.5-2.8-13.5-7.4s-3.3-10.4-1-15.3l19.4-41.9L159.7 264zM281.6 112c14.7 0 24.4 15.2 18.2 28.5L265 216l49.4 0c11.9 0 21.6 9.7 21.6 21.6c0 5.9-2.4 11.6-6.7 15.7L180.2 394.5c-3.7 3.5-8.7 5.5-13.8 5.5c-14.7 0-24.4-15.2-18.2-28.5L183 296l-49.4 0c-11.9 0-21.6-9.7-21.6-21.6c0-5.9 2.4-11.6 6.7-15.7L267.8 117.5c3.7-3.5 8.7-5.5 13.8-5.5z">
			<animate
				attributeName="opacity"
				values="1;0.5;1"
				dur="2s"
				repeatCount="indefinite"
				begin="1s"
			/>
		</path>
	</svg>
);

/**
 * Reset all animation attributes to default values
 *
 * @param {Function} setAttributes - WordPress setAttributes function
 */
const resetAttributes = ( setAttributes ) => {
	setAttributes( {
		enableAnimation: false,
		enableScrollTrigger: false,
		animateLoop: false,
		animateAutoPlay: false,
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateDirection: 'from',
		animateX: 0,
		animateY: 0,
		animateXPercent: 0,
		animateYPercent: 0,
		animateScale: 1,
		animateRotation: 0,
		animateSkew: 0,
		animateAutoAlpha: 1,
		animateRepeat: 0,
		animateYoYo: false,
		scrollTriggerStart: 'top bottom',
		scrollTriggerEnd: 'bottom top',
		scrollTriggerToggleActions: 'play none none none',
		scrollTriggerStartOffset: 0,
	} );
};

/**
 * HOC to add animation preset toolbar button to blocks
 */
const withToolbarButton = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, isSelected, name } = props;

		// Skip adding custom controls for excluded blocks
		if ( isBlockExcluded( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const applyPreset = ( preset ) => {
			resetAttributes( setAttributes );

			switch ( preset ) {
				case 'Fade In':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateAutoAlpha: 0,
					} );
					break;
				case 'Fade Up':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power2.inOut',
						animateY: 100,
						animateAutoAlpha: 0,
					} );
					break;
				case 'Fade Down':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power2.inOut',
						animateY: -100,
						animateAutoAlpha: 0,
					} );
					break;
				case 'Fade Left':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power2.inOut',
						animateX: 100,
						animateAutoAlpha: 0,
					} );
					break;
				case 'Fade Right':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power2.inOut',
						animateX: -100,
						animateAutoAlpha: 0,
					} );
					break;
				case 'Bounce':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 0.6,
						animateDelay: 0,
						animateEasing: 'bounce',
						animateY: -60,
					} );
					break;
				case 'Zoom In':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateScale: 0,
					} );
					break;
				case 'Zoom Out':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateScale: 100,
					} );
					break;
				case 'Rotate':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateRotation: 360,
					} );
					break;
				case 'Flip':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateRotation: 180,
					} );
					break;
				case 'Shake':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateY: 100,
						animateEasing: 'elastic',
						animateRepeat: -1,
						animateYoYo: true,
					} );
					break;
				case 'Pulse':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 0.5,
						animateDelay: 0,
						animateEasing: 'power1.inOut',
						animateScale: 1.2,
						animateRepeat: -1,
						animateYoYo: true,
					} );
					break;
				case 'Wobble':
					setAttributes( {
						enableAnimation: true,
						enableScrollTrigger: true,
						scrollTriggerStart: 'top bottom',
						animateDuration: 1,
						animateDelay: 0,
						animateEasing: 'elastic',
						animateRotation: 15,
						animateRepeat: -1,
						animateYoYo: true,
					} );
					break;
				default:
					break;
			}
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<BlockControls>
						<Toolbar>
							<ToolbarDropdownMenu
								icon={ <AnimatedIcon /> }
								label={ __( 'Animation Presets', 'animatewp' ) }
								controls={ [
									{
										title: 'None',
										icon: <AnimatedIcon />,
										onClick: () =>
											resetAttributes( setAttributes ),
									},
									{
										title: 'Fade In',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Fade In' ),
									},
									{
										title: 'Fade Up',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Fade Up' ),
									},
									{
										title: 'Fade Down',
										icon: <AnimatedIcon />,
										onClick: () =>
											applyPreset( 'Fade Down' ),
									},
									{
										title: 'Fade Left',
										icon: <AnimatedIcon />,
										onClick: () =>
											applyPreset( 'Fade Left' ),
									},
									{
										title: 'Fade Right',
										icon: <AnimatedIcon />,
										onClick: () =>
											applyPreset( 'Fade Right' ),
									},
									{
										title: 'Bounce',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Bounce' ),
									},
									{
										title: 'Zoom In',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Zoom In' ),
									},
									{
										title: 'Zoom Out',
										icon: <AnimatedIcon />,
										onClick: () =>
											applyPreset( 'Zoom Out' ),
									},
									{
										title: 'Rotate',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Rotate' ),
									},
									{
										title: 'Flip',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Flip' ),
									},
									{
										title: 'Shake',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Shake' ),
									},
									{
										title: 'Pulse',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Pulse' ),
									},
									{
										title: 'Wobble',
										icon: <AnimatedIcon />,
										onClick: () => applyPreset( 'Wobble' ),
									},
									// Add more preset controls here if needed
								] }
							/>
						</Toolbar>
					</BlockControls>
				) }
			</Fragment>
		);
	};
}, 'withToolbarButton' );

addFilter(
	'editor.BlockEdit',
	'animatewp/with-toolbar-button',
	withToolbarButton
);
