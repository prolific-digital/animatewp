<?php
/**
 * Plugin Name:       AnimateWP
 * Plugin URI:        https://prolificdigital.com
 * Description:       Add advanced animations to your WordPress site.
 * Version:           1.2.0
 * Requires at least: 6.5
 * Requires PHP:      8.4
 * Author:            Prolific Digital
 * Author URI:        https://prolificdigital.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       animatewp
 * Domain Path:       /languages
 * Update URI:        https://api.prolificdigital.io/api/update?plugin=animatewp
 *
 * @package AnimateWP
 */

defined( 'ABSPATH' ) || exit;

define( 'ANIMATEWP_VERSION', '1.2.0' );
define( 'ANIMATEWP_PLUGIN_FILE', __FILE__ );
define( 'ANIMATEWP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

// Composer dependencies (plugin-update-checker). Present in release zips;
// in a git checkout run `composer install` first.
if ( is_readable( ANIMATEWP_PLUGIN_DIR . 'vendor/autoload.php' ) ) {
	require_once ANIMATEWP_PLUGIN_DIR . 'vendor/autoload.php';
}

require_once ANIMATEWP_PLUGIN_DIR . 'includes/update-checker.php';

/**
 * Load bundled translations from /languages (the header's Domain Path).
 */
add_action(
	'init',
	static function () {
		load_plugin_textdomain( 'animatewp', false, dirname( plugin_basename( ANIMATEWP_PLUGIN_FILE ) ) . '/languages' );
	}
);

add_action('enqueue_block_editor_assets', 'animatewp_enqueue_block_editor_assets');
add_action('wp_enqueue_scripts', 'animatewp_enqueue_frontend');

function animatewp_enqueue_block_editor_assets() {
	$asset_file = include(plugin_dir_path(__FILE__) . 'build/animations/index.asset.php');

	wp_enqueue_script(
		'animatewp-editor',
		plugin_dir_url(__FILE__) . 'build/animations/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
}

// Check if the content contains any of the data attributes used for animations
function animatewp_contains_data_attributes($content) {
	return strpos($content, 'data-animation-') !== false;
}

function animatewp_enqueue_frontend() {
	if (animatewp_contains_data_attributes(get_post()->post_content)) {
		wp_enqueue_script(
			'animatewp-view',
			plugin_dir_url(__FILE__) . 'build/animations/view.js',
			array('wp-blocks', 'wp-element', 'wp-editor'),
			filemtime(plugin_dir_path(__FILE__) . 'build/animations/view.js'),
			true
		);
	}
}
