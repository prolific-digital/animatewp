/**
 * Block Helper Functions
 * Functions for managing block exclusions and filtering
 *
 * @package
 */

import { applyFilters } from '@wordpress/hooks';

/**
 * Get list of blocks that should be excluded from animations
 * Allows filtering via 'animatewp.excludedBlocks' hook
 *
 * @return {Array} Array of block names to exclude
 */
export function getExcludedBlocks() {
	const defaultExcluded = [ 'gravityforms/form' ];
	return applyFilters( 'animatewp.excludedBlocks', defaultExcluded );
}

/**
 * Check if a block should be excluded from animations
 *
 * @param {string} blockName - The block name to check
 * @return {boolean} True if block should be excluded
 */
export function isBlockExcluded( blockName ) {
	const excludedBlocks = getExcludedBlocks();
	return excludedBlocks.includes( blockName );
}
