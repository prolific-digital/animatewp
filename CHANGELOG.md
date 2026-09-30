# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2026-09-29

### Changed
- Updates now come from the Prolific Digital license server (`api.prolificdigital.io`) instead of GitHub. Set `PROLIFIC_LICENSE_KEY_ANIMATEWP` in `wp-config.php` (or use the `prolific_license_key` filter) to receive updates.
- plugin-update-checker is now installed with Composer (^5.7) instead of the 5.4 copy bundled in `includes/plugin-update-checker/`.
- Editor strings used the `block-settings-enhancer` text domain; they now use `animatewp`. Translations load from `languages/`.
- Requires WordPress 6.5+ and PHP 8.4+.
- License file is now GPL-2.0 (the plugin header already said GPL-2.0-or-later; the repository shipped the GPL-3.0 text).

### Added
- `ANIMATEWP_VERSION` constant; `package.json` version now tracks the plugin version (it said 0.1.0).
- `package-lock.json`, this changelog, coding-standards config and CI/release workflows.

### Removed
- `GitHub Plugin URI` header.

## [1.1.1] - 2024-08-11

### Changed
- Updated readme and screenshot.

## [1.1.0] - 2024-08-11

### Added
- Decimal values in the delay setting.

### Changed
- Duration and delay maximums raised to 60 seconds.

## [1.0.1] - 2024-07-29

### Fixed
- Release fixes. Note: the v1.0.1 tag shipped with a `Version: 1.0.0` plugin header.

## [1.0.0] - 2024-07-29

### Added
- Initial release with presets and advanced animation settings (GSAP, scroll triggers).

[Unreleased]: https://github.com/prolific-digital/animatewp/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/prolific-digital/animatewp/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/prolific-digital/animatewp/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/prolific-digital/animatewp/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/prolific-digital/animatewp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/prolific-digital/animatewp/releases/tag/v1.0.0
