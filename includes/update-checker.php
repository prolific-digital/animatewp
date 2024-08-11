<?php
// Include the Plugin Update Checker library.
require_once plugin_dir_path(__FILE__) . 'plugin-update-checker/plugin-update-checker.php';

// Use the correct namespace and class.
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// Initialize the update checker.
$myUpdateChecker = PucFactory::buildUpdateChecker(
  'https://github.com/prolific-digital/animatewp/',
  plugin_dir_path(__DIR__) . 'animatewp.php', // Full path to the main plugin file
  'animatewp'
);
