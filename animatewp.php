<?php

/**
 * Plugin Name:       AnimateWP
 * Description:       Add advanced animations to your WordPress site.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.1.1
 * Author:            Prolific Digital
 * Author URI:        https://animatewp.com
 * GitHub Plugin URI: https://github.com/prolific-digital/animatewp
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       animatewp
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'includes/update-checker.php';

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
