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
add_action('save_post', 'animatewp_update_animation_meta', 10, 1);
add_action('admin_init', 'animatewp_register_settings');
add_action('admin_menu', 'animatewp_add_settings_page');

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

/**
 * Check if the content contains any of the data attributes used for animations
 *
 * @param string $content Post content to check
 * @return bool True if animation attributes found
 */
function animatewp_contains_data_attributes($content) {
	return strpos($content, 'data-animation-') !== false;
}

/**
 * Update post meta when post is saved to track animation usage
 * This optimizes frontend detection by avoiding content parsing on every page load
 *
 * @param int $post_id Post ID
 */
function animatewp_update_animation_meta($post_id) {
	// Avoid running on autosave or revisions
	if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
		return;
	}

	// Check if user has permission to edit the post
	if (!current_user_can('edit_post', $post_id)) {
		return;
	}

	$post = get_post($post_id);
	if (!$post) {
		return;
	}

	$has_animations = animatewp_contains_data_attributes($post->post_content);
	update_post_meta($post_id, '_has_animatewp_animations', $has_animations ? '1' : '0');
}

/**
 * Enqueue frontend scripts and styles
 * Uses post meta for efficient detection of animation usage
 */
function animatewp_enqueue_frontend() {
	// Check if we're on a singular post/page
	if (!is_singular()) {
		return;
	}

	$post_id = get_the_ID();
	if (!$post_id) {
		return;
	}

	// Use post meta for efficient detection (set during save_post)
	$has_animations = get_post_meta($post_id, '_has_animatewp_animations', true);

	// Fallback to content check if meta doesn't exist (backward compatibility)
	if ($has_animations === '') {
		$post = get_post($post_id);
		$has_animations = $post && animatewp_contains_data_attributes($post->post_content) ? '1' : '0';
		// Update meta for next time
		update_post_meta($post_id, '_has_animatewp_animations', $has_animations);
	}

	if ($has_animations === '1') {
		$asset_file = include(plugin_dir_path(__FILE__) . 'build/animations/view.asset.php');

		wp_enqueue_script(
			'animatewp-view',
			plugin_dir_url(__FILE__) . 'build/animations/view.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		// Pass configuration to frontend script
		wp_localize_script('animatewp-view', 'animateWP', array(
			'isAdmin' => current_user_can('administrator'),
			'debugMode' => get_option('animatewp_debug_mode', '0') === '1',
			'pluginUrl' => plugin_dir_url(__FILE__),
		));
	}
}

/**
 * Register plugin settings
 */
function animatewp_register_settings() {
	register_setting('animatewp_options', 'animatewp_debug_mode');

	add_settings_section(
		'animatewp_main_section',
		__('AnimateWP Settings', 'animatewp'),
		null,
		'animatewp'
	);

	add_settings_field(
		'animatewp_debug_mode',
		__('Debug Mode', 'animatewp'),
		'animatewp_debug_mode_callback',
		'animatewp',
		'animatewp_main_section'
	);
}

/**
 * Render debug mode setting field
 */
function animatewp_debug_mode_callback() {
	$debug_mode = get_option('animatewp_debug_mode', '0');
	?>
	<label>
		<input type="checkbox" name="animatewp_debug_mode" value="1" <?php checked($debug_mode, '1'); ?> />
		<?php _e('Enable ScrollTrigger markers for debugging (visible to administrators only)', 'animatewp'); ?>
	</label>
	<p class="description">
		<?php _e('When enabled, visual markers will appear on the frontend to help debug ScrollTrigger animations. Only visible when logged in as an administrator.', 'animatewp'); ?>
	</p>
	<?php
}

/**
 * Add settings page to WordPress admin
 */
function animatewp_add_settings_page() {
	add_options_page(
		__('AnimateWP Settings', 'animatewp'),
		__('AnimateWP', 'animatewp'),
		'manage_options',
		'animatewp',
		'animatewp_settings_page'
	);
}

/**
 * Render settings page
 */
function animatewp_settings_page() {
	if (!current_user_can('manage_options')) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
		<form method="post" action="options.php">
			<?php
			settings_fields('animatewp_options');
			do_settings_sections('animatewp');
			submit_button(__('Save Settings', 'animatewp'));
			?>
		</form>
	</div>
	<?php
}
