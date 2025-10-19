/**
 * Animated lightning bolt icon component
 * Used in toolbar dropdown and preset controls
 *
 * @package
 */

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

export default AnimatedIcon;
