<?php
/**
 * Automatic updates from the Prolific Digital license server.
 *
 * Loaded from the main plugin file after Composer's autoloader. The license
 * key is read from the PROLIFIC_LICENSE_KEY_ANIMATEWP constant
 * (wp-config.php) and can be overridden with the `prolific_license_key` filter.
 *
 * @package AnimateWP
 */

defined( 'ABSPATH' ) || exit;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

if ( ! class_exists( PucFactory::class ) ) {
	return;
}

( static function (): void {
	$update_checker = PucFactory::buildUpdateChecker(
		'https://api.prolificdigital.io/api/update?plugin=animatewp',
		ANIMATEWP_PLUGIN_FILE,
		'animatewp'
	);
	$update_checker->addQueryArgFilter(
		static function ( array $args ): array {
			$key = defined( 'PROLIFIC_LICENSE_KEY_ANIMATEWP' ) ? constant( 'PROLIFIC_LICENSE_KEY_ANIMATEWP' ) : '';
			$key = (string) apply_filters( 'prolific_license_key', $key, 'animatewp' );
			if ( '' !== $key ) {
				$args['license_key'] = $key;
			}
			return $args;
		}
	);
} )();
