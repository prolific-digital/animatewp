/**
 * Inspector Panel Component
 * Provides all sidebar controls for animation settings
 *
 * @package
 */

import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { symbolFilled } from '@wordpress/icons';
import { validateNumericInput } from '../utils/attributeHelpers';

/**
 * Easing options for animations
 *
 * @type {Array}
 */
const EASING_OPTIONS = [
	{ label: 'Power1.in', value: 'power1.in' },
	{ label: 'Power1.out', value: 'power1.out' },
	{ label: 'Power1.inOut', value: 'power1.inOut' },
	{ label: 'Power2.in', value: 'power2.in' },
	{ label: 'Power2.out', value: 'power2.out' },
	{ label: 'Power2.inOut', value: 'power2.inOut' },
	{ label: 'Power3.in', value: 'power3.in' },
	{ label: 'Power3.out', value: 'power3.out' },
	{ label: 'Power3.inOut', value: 'power3.inOut' },
	{ label: 'Power4.in', value: 'power4.in' },
	{ label: 'Power4.out', value: 'power4.out' },
	{ label: 'Power4.inOut', value: 'power4.inOut' },
	{ label: 'Back.in', value: 'back.in' },
	{ label: 'Back.out', value: 'back.out' },
	{ label: 'Back.inOut', value: 'back.inOut' },
	{ label: 'Bounce.in', value: 'bounce.in' },
	{ label: 'Bounce.out', value: 'bounce.out' },
	{ label: 'Bounce.inOut', value: 'bounce.inOut' },
	{ label: 'Elastic.in', value: 'elastic.in' },
	{ label: 'Elastic.out', value: 'elastic.out' },
	{ label: 'Elastic.inOut', value: 'elastic.inOut' },
	{ label: 'Circ.in', value: 'circ.in' },
	{ label: 'Circ.out', value: 'circ.out' },
	{ label: 'Circ.inOut', value: 'circ.inOut' },
	{ label: 'Expo.in', value: 'expo.in' },
	{ label: 'Expo.out', value: 'expo.out' },
	{ label: 'Expo.inOut', value: 'expo.inOut' },
	{ label: 'Sine.in', value: 'sine.in' },
	{ label: 'Sine.out', value: 'sine.out' },
	{ label: 'Sine.inOut', value: 'sine.inOut' },
];

/**
 * ScrollTrigger start position options
 *
 * @type {Array}
 */
const SCROLL_TRIGGER_START_OPTIONS = [
	{ label: 'Top Top', value: 'top top' },
	{ label: 'Top Center', value: 'top center' },
	{ label: 'Top Bottom', value: 'top bottom' },
	{ label: 'Bottom Top', value: 'bottom top' },
	{ label: 'Bottom Center', value: 'bottom center' },
	{ label: 'Bottom Bottom', value: 'bottom bottom' },
];

/**
 * Animation direction options
 *
 * @type {Array}
 */
const DIRECTION_OPTIONS = [
	{ label: 'From (animate from values)', value: 'from' },
	{ label: 'To (animate to values)', value: 'to' },
];

/**
 * Inspector Panel Component
 * Renders all animation control panels in the block sidebar
 *
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Block attributes
 * @param {Function} props.setAttributes - Function to update attributes
 * @return {JSX.Element} Inspector panel controls
 */
const InspectorPanel = ( { attributes, setAttributes } ) => {
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
		animateAutoAlpha,
		animateRepeat,
		animateYoYo,
		enableScrollTrigger,
		scrollTriggerStart,
		scrollTriggerStartOffset,
	} = attributes;

	return (
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
						title={ __( 'Basic Settings', 'animatewp' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Auto Play', 'animatewp' ) }
							checked={ animateAutoPlay }
							onChange={ ( value ) =>
								setAttributes( { animateAutoPlay: value } )
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
									animateDuration: validateNumericInput(
										value,
										0.1,
										60,
										1
									),
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
									animateDelay: validateNumericInput(
										value,
										0,
										60,
										0
									),
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
							label={ __( 'Animation Easing', 'animatewp' ) }
							value={ animateEasing }
							options={ EASING_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { animateEasing: value } )
							}
							help={ __(
								'Choose the easing function for the animation.',
								'animatewp'
							) }
						/>
						<SelectControl
							label={ __( 'Animation Direction', 'animatewp' ) }
							value={ animateDirection }
							options={ DIRECTION_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { animateDirection: value } )
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
							label={ __( 'X Position (px)', 'animatewp' ) }
							value={ animateX }
							onChange={ ( value ) =>
								setAttributes( {
									animateX: validateNumericInput(
										value,
										-1000,
										1000,
										0
									),
								} )
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
							label={ __( 'Y Position (px)', 'animatewp' ) }
							value={ animateY }
							onChange={ ( value ) =>
								setAttributes( {
									animateY: validateNumericInput(
										value,
										-1000,
										1000,
										0
									),
								} )
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
							label={ __( 'X Percent (%)', 'animatewp' ) }
							value={ animateXPercent }
							onChange={ ( value ) =>
								setAttributes( {
									animateXPercent: validateNumericInput(
										value,
										-100,
										100,
										0
									),
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
							label={ __( 'Y Percent (%)', 'animatewp' ) }
							value={ animateYPercent }
							onChange={ ( value ) =>
								setAttributes( {
									animateYPercent: validateNumericInput(
										value,
										-100,
										100,
										0
									),
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
									animateScale: validateNumericInput(
										value,
										-100,
										100,
										1
									),
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
							label={ __( 'Rotation (degrees)', 'animatewp' ) }
							value={ animateRotation }
							onChange={ ( value ) =>
								setAttributes( {
									animateRotation: validateNumericInput(
										value,
										-360,
										360,
										0
									),
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
									animateAutoAlpha: validateNumericInput(
										value,
										0,
										1,
										1
									),
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
								setAttributes( { animateLoop: value } )
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
									animateRepeat: validateNumericInput(
										value,
										-1,
										100,
										0
									),
								} )
							}
							min={ -1 }
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
								setAttributes( { animateYoYo: value } )
							}
							help={ __(
								'Enable this option to make the animation reverse on repeat.',
								'animatewp'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Scroll Trigger', 'animatewp' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Enable Scroll Trigger', 'animatewp' ) }
							checked={ enableScrollTrigger }
							onChange={ ( value ) =>
								setAttributes( { enableScrollTrigger: value } )
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
									options={ SCROLL_TRIGGER_START_OPTIONS }
									onChange={ ( value ) =>
										setAttributes( {
											scrollTriggerStart: value,
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
									value={ scrollTriggerStartOffset }
									onChange={ ( value ) =>
										setAttributes( {
											scrollTriggerStartOffset:
												validateNumericInput(
													value,
													-1000,
													1000,
													0
												),
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
	);
};

export default InspectorPanel;
