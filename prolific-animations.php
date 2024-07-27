<?php

/**
 * Plugin Name:       Prolific Animations
 * Description:       A plugin to add animations to all WordPress blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Prolific Digital
 * Author URI:        https://prolificdigital.com
 * GitHub Plugin URI: https://github.com/prolific-digital/prolific-animations
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       prolific-blocks
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// Enqueue the compiled script
add_action('enqueue_block_editor_assets', 'prolific_animations_enqueue_block_editor_assets');

function prolific_animations_enqueue_block_editor_assets() {
	$asset_file = include(plugin_dir_path(__FILE__) . 'build/animations/index.asset.php');

	wp_enqueue_script(
		'my-plugin-script',
		plugin_dir_url(__FILE__) . 'build/animations/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);
}

// enqueue front end script
add_action('wp_enqueue_scripts', 'prolific_animations_enqueue_frontend');

function prolific_animations_enqueue_frontend() {
	wp_enqueue_script(
		'my-plugin-script',
		plugin_dir_url(__FILE__) . 'build/animations/view.js',
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/animations/view.js')
	);
}
