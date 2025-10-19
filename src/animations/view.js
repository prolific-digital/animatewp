/**
 * AnimateWP Frontend Animation Handler
 *
 * Initializes and manages GSAP animations on blocks with animation attributes.
 * Supports ScrollTrigger integration and handles proper cleanup on page unload.
 *
 * @package AnimateWP
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

// Store all animations for cleanup to prevent memory leaks
const animations = [];

/**
 * Initialize animations when DOM is ready
 */
document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.has-animation' ).forEach( ( element ) => {
		try {
			// Validate element exists
			if ( ! element ) {
				console.warn(
					'AnimateWP: Invalid element encountered, skipping animation'
				);
				return;
			}

			const duration =
				parseFloat(
					element.getAttribute( 'data-animation-duration' )
				) || 1;
			const delay =
				parseFloat( element.getAttribute( 'data-animation-delay' ) ) ||
				0;
			const ease =
				element.getAttribute( 'data-animation-ease' ) || 'power1.inOut';
			const direction =
				element.getAttribute( 'data-animation-direction' ) || 'from';
			const loop =
				element.getAttribute( 'data-loop-animation' ) === 'true';
			const autoPlay =
				element.getAttribute( 'data-auto-play-animation' ) === 'true';
			const x =
				parseFloat( element.getAttribute( 'data-animation-x' ) ) || 0;
			const y =
				parseFloat( element.getAttribute( 'data-animation-y' ) ) || 0;
			const xPercent =
				parseFloat(
					element.getAttribute( 'data-animation-x-percent' )
				) || 0;
			const yPercent =
				parseFloat(
					element.getAttribute( 'data-animation-y-percent' )
				) || 0;
			const scale =
				parseFloat( element.getAttribute( 'data-animation-scale' ) ) ??
				1;
			const rotation =
				parseFloat(
					element.getAttribute( 'data-animation-rotation' )
				) || 0;
			const autoAlpha =
				parseFloat(
					element.getAttribute( 'data-animation-auto-alpha' )
				) ?? 1;
			const repeat =
				parseInt(
					element.getAttribute( 'data-animation-repeat' ),
					10
				) || 0;
			const yoYo =
				element.getAttribute( 'data-animation-yoyo' ) === 'true';
			const enableScrollTrigger =
				element.getAttribute( 'data-scroll-trigger' ) === 'true';
			const scrollTriggerStart =
				element.getAttribute( 'data-scroll-trigger-start' ) ||
				'top center';
			const scrollTriggerEnd =
				element.getAttribute( 'data-scroll-trigger-end' ) ||
				'bottom center';
			const scrollTriggerToggleActions =
				element.getAttribute( 'data-scroll-trigger-toggle-actions' ) ||
				'play none none none';
			const scrollTriggerStartOffset = parseFloat(
				element.getAttribute( 'data-scroll-trigger-start-offset' )
			);

			const animationConfig = {
				duration: duration,
				delay: delay,
				ease: ease,
				x: x,
				y: y,
				xPercent: xPercent,
				yPercent: yPercent,
				scale: scale,
				rotation: rotation,
				autoAlpha: autoAlpha,
				repeat: repeat,
				yoyo: yoYo,
				paused: ! autoPlay,
			};

			if ( enableScrollTrigger ) {
				animationConfig.scrollTrigger = {
					trigger: element,
					start: `${ scrollTriggerStart }+=${ scrollTriggerStartOffset }`,
					end: scrollTriggerEnd,
					toggleActions: scrollTriggerToggleActions,
				};
			}

			// Use direction to determine whether to use gsap.from() or gsap.to()
			const animation =
				direction === 'to'
					? gsap.to( element, animationConfig )
					: gsap.from( element, animationConfig );

			if ( autoPlay ) {
				animation.play();
			}

			// Store animation for cleanup
			animations.push( animation );
		} catch ( error ) {
			console.error(
				'AnimateWP: Error creating animation for element:',
				element,
				error
			);
		}
	} );
} );

/**
 * Cleanup all animations and ScrollTriggers on page unload
 * Prevents memory leaks by properly disposing of GSAP instances
 */
window.addEventListener( 'beforeunload', () => {
	animations.forEach( ( anim ) => {
		if ( anim && typeof anim.kill === 'function' ) {
			anim.kill();
		}
	} );
	ScrollTrigger.getAll().forEach( ( st ) => st.kill() );
} );
