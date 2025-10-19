/**
 * Toolbar Controls Component
 * Provides animation preset dropdown in the block toolbar
 *
 * @package
 */

import { BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarDropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import AnimatedIcon from './AnimatedIcon';
import { resetAttributes } from '../utils/attributeHelpers';
import { getPresetConfig } from '../presets/animationPresets';

/**
 * Font Awesome Icon Components (Inline SVG)
 * Using inline SVG for better compatibility with WordPress block editor
 */

// Circle X Mark - None
const IconCircleXMark = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
	</svg>
);

// Sparkles - Fade In
const IconSparkles = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM448 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L448 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L512 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L512 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L448 384z" />
	</svg>
);

// Arrow Up - Fade Up
const IconArrowUp = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
		<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
	</svg>
);

// Arrow Down - Fade Down
const IconArrowDown = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
		<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
	</svg>
);

// Arrow Left - Fade Left
const IconArrowLeft = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
		<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
	</svg>
);

// Arrow Right - Fade Right
const IconArrowRight = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
		<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
	</svg>
);

// Basketball - Bounce
const IconBasketball = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M86.6 64l85.2 85.2C194.5 121.7 208 86.4 208 48c0-14.7-2-28.9-5.7-42.4C158.6 15 119.8 35 86.6 64zM64 86.6C35 119.8 15 158.6 5.6 202.3C19.1 206 33.3 208 48 208c38.4 0 73.7-13.5 101.3-36.1L64 86.6zM256 0c-7.3 0-14.6 .3-21.8 .9C238 15 240 30.2 240 48c0 47.3-17.1 90.5-45.4 124L256 233.4 425.4 64C380.2 24.2 320.9 0 256 0zM48 240c-17.8 0-33-2-47.1-5.8C.3 241.4 0 248.7 0 256c0 64.9 24.2 124.2 64 169.4L233.4 256 172 194.6C138.5 222.9 95.3 240 48 240zm463.1 37.8c.6-7.2 .9-14.5 .9-21.8c0-64.9-24.2-124.2-64-169.4L278.6 256 340 317.4c33.4-28.3 76.7-45.4 124-45.4c17.8 0 33 2 47.1 5.8zm-4.7 31.9C492.9 306 478.7 304 464 304c-38.4 0-73.7 13.5-101.3 36.1L448 425.4c29-33.2 49-72 58.4-115.7zM340.1 362.7C317.5 390.3 304 425.6 304 464c0 14.7 2 28.9 5.7 42.4C353.4 497 392.2 477 425.4 448l-85.2-85.2zM317.8 511.1C324.6 511.7 331.3 512 338 512c65.9 0 126.3-24.8 171.8-65.6L293.5 230.1 172 351.6c28.3 33.4 45.4 76.7 45.4 124c0 17.8-2 33-5.8 47.1z" />
	</svg>
);

// Magnifying Glass Plus - Zoom In
const IconMagnifyingGlassPlus = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" />
	</svg>
);

// Magnifying Glass Minus - Zoom Out
const IconMagnifyingGlassMinus = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z" />
	</svg>
);

// Rotate - Rotate
const IconRotate = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
	</svg>
);

// Arrows Rotate - Flip
const IconArrowsRotate = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
	</svg>
);

// Triangle Exclamation - Shake
const IconTriangleExclamation = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
	</svg>
);

// Heart Pulse - Pulse
const IconHeartPulse = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14.3 21.4 14.3s17.8-5.7 21.5-14.3l37.7-83.9 4.5 11.3c8.7 21.9 29.2 35.3 51.7 35.3H463.1c-3.7 4.3-7.7 8.5-11.9 12.4L270.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-58.1c-3.9-9.6-12.9-15.9-23.3-16.3s-19.9 5.3-24.6 14.5l-44.3 98.7-38.8-86.2c-3.6-8.1-11.5-13.3-20.3-13.3s-16.7 5.2-20.3 13.3L140.7 235.6c-1.4 2.7-4.2 4.4-7.2 4.4H8.3C2.8 202.8 0 162.1 0 128C0 57.3 57.3 0 128 0c32.6 0 62.4 12.2 85.1 32.3c.2 .1 .4 .4 .6 .6c26.5 23.3 61.5 37.5 99.9 37.5c6.9 0 13.7-.5 20.3-1.3C378.7 107 416 164.1 416 230.7c0 1.1 0 2.1 0 3.2c0 1 0 2.1 0 3.2h21.4c18.4 0 33.3-14.9 33.3-33.3c0-22.9-6.4-44.3-17.5-62.5C499.9 123.1 512 91.2 512 56.8c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 31.9-20.5 59.1-49.2 69.2c-5.2-9.8-11.2-19.2-18-28.1C425.7 68.9 448 36.1 448 -1.6c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 23-11.6 43.3-29.3 55.5c-13.5-16.8-29.4-31.5-47.2-43.5C315.4 4.2 304.8 0 293.5 0C268.6 0 248 20.6 248 45.5c0 11.3 4.2 21.9 10.4 29.9c-21.5 7.3-44.2 11.1-67.8 11.1c-34.1 0-66.1-10.1-92.8-27.5C82.6 46.3 55.7 40 27.7 40C12.4 40 0 52.4 0 67.7c0 8.6 3.9 16.3 10 21.4C3.9 102.9 0 119.8 0 137.5c0 36.1 20.5 67.4 50.5 82.9c.5 11.7 1.5 23.3 3 34.8h132c3 0 5.8 1.7 7.2 4.4l23.2 58.1c3.9 9.6 12.9 15.9 23.3 16.3s19.9-5.3 24.6-14.5l44.3-98.7 38.8 86.2c3.6 8.1 11.5 13.3 20.3 13.3s16.7-5.2 20.3-13.3l29.3-65.1c1.4-2.7 4.2-4.4 7.2-4.4H503.7z" />
	</svg>
);

// Wave Square - Wobble
const IconWaveSquare = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20">
		<path d="M128 64c0-17.7 14.3-32 32-32H320c17.7 0 32 14.3 32 32V416h96V256c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H512V448c0 17.7-14.3 32-32 32H320c-17.7 0-32-14.3-32-32V96H192V256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h96V64z" />
	</svg>
);

/**
 * Icon mapping for animation presets
 * Maps preset names to Font Awesome SVG icons
 *
 * @type {Object}
 */
const presetIcons = {
	None: IconCircleXMark,
	'Fade In': IconSparkles,
	'Fade Up': IconArrowUp,
	'Fade Down': IconArrowDown,
	'Fade Left': IconArrowLeft,
	'Fade Right': IconArrowRight,
	Bounce: IconBasketball,
	'Zoom In': IconMagnifyingGlassPlus,
	'Zoom Out': IconMagnifyingGlassMinus,
	Rotate: IconRotate,
	Flip: IconArrowsRotate,
	Shake: IconTriangleExclamation,
	Pulse: IconHeartPulse,
	Wobble: IconWaveSquare,
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
