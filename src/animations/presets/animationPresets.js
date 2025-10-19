/**
 * Animation Preset Configurations
 * Defines all available animation presets and their settings
 *
 * @package
 */

/**
 * Available animation presets with their configurations
 * Each preset defines the animation parameters to be applied
 *
 * @type {Object}
 */
export const ANIMATION_PRESETS = {
	'Fade In': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateAutoAlpha: 0,
	},
	'Fade Up': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power2.inOut',
		animateY: 100,
		animateAutoAlpha: 0,
	},
	'Fade Down': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power2.inOut',
		animateY: -100,
		animateAutoAlpha: 0,
	},
	'Fade Left': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power2.inOut',
		animateX: 100,
		animateAutoAlpha: 0,
	},
	'Fade Right': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power2.inOut',
		animateX: -100,
		animateAutoAlpha: 0,
	},
	Bounce: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 0.6,
		animateDelay: 0,
		animateEasing: 'bounce',
		animateY: -60,
	},
	'Zoom In': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateScale: 0,
	},
	'Zoom Out': {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateScale: 100,
	},
	Rotate: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateRotation: 360,
	},
	Flip: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateRotation: 180,
	},
	Shake: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateY: 100,
		animateEasing: 'elastic',
		animateRepeat: -1,
		animateYoYo: true,
	},
	Pulse: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 0.5,
		animateDelay: 0,
		animateEasing: 'power1.inOut',
		animateScale: 1.2,
		animateRepeat: -1,
		animateYoYo: true,
	},
	Wobble: {
		enableAnimation: true,
		enableScrollTrigger: true,
		scrollTriggerStart: 'top bottom',
		animateDuration: 1,
		animateDelay: 0,
		animateEasing: 'elastic',
		animateRotation: 15,
		animateRepeat: -1,
		animateYoYo: true,
	},
};

/**
 * Get list of all available preset names
 *
 * @return {Array} Array of preset names
 */
export const getPresetNames = () => Object.keys( ANIMATION_PRESETS );

/**
 * Get configuration for a specific preset
 *
 * @param {string} presetName - Name of the preset
 * @return {Object|null} Preset configuration or null if not found
 */
export const getPresetConfig = ( presetName ) => {
	return ANIMATION_PRESETS[ presetName ] || null;
};
