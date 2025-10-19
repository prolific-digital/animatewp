/**
 * Attribute Helper Functions
 * Functions for managing block animation attributes
 *
 * @package
 */

/**
 * Save animation settings to block extra props
 * Converts block attributes to data attributes for frontend use
 *
 * @param {Object} extraProps - Block extra props to modify
 * @param {Object} blockType  - Block type object
 * @param {Object} attributes - Block attributes
 * @return {Object} Modified extraProps
 */
export function saveSettings( extraProps, blockType, attributes ) {
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

/**
 * Reset all animation attributes to default values
 *
 * @param {Function} setAttributes - WordPress setAttributes function
 */
export const resetAttributes = ( setAttributes ) => {
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
 * Validate numeric input to prevent invalid values
 *
 * @param {number} value        - Value to validate
 * @param {number} min          - Minimum allowed value
 * @param {number} max          - Maximum allowed value
 * @param {number} defaultValue - Default value if validation fails
 * @return {number} Validated value
 */
export const validateNumericInput = ( value, min, max, defaultValue ) => {
	if ( value === null || value === undefined || isNaN( value ) ) {
		return defaultValue;
	}
	return Math.max( min, Math.min( max, value ) );
};
