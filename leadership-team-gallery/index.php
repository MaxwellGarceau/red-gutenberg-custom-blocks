<?php

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'leadership_team_gallery_load_text_domain' );

function leadership_team_gallery_load_text_domain() {
	load_plugin_textdomain( 'red-gutenberg-blocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function leadership_team_gallery_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'leadership-team-gallery',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);

	wp_register_style(
		'leadership-team-gallery-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'leadership-team-gallery',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'red-gutenberg-blocks/leadership-team-gallery', array(
		'style' => 'leadership-team-gallery',
		'editor_style' => 'leadership-team-gallery-editor',
		'script' => 'leadership-team-gallery',
	) );

	/*
	 * Pass already loaded translations to our JavaScript.
	 *
	 * This happens _before_ our JavaScript runs, afterwards it's too late.
	 */
	/*
	 * TRANSLATIONS DISABLED UNTIL WP AND GUTENBERG ARE MORE STABLE
	 */
	// wp_add_inline_script(
	// 	'leadership-team-gallery',
	// 	sprintf(
	// 		'var leadership_team_gallery = { localeData: %s };',
	// 		json_encode( ! function_exists( 'wp_get_jed_locale_data' ) ? gutenberg_get_jed_locale_data( 'red-gutenberg-blocks' ) : wp_get_jed_locale_data( 'red-gutenberg-blocks' ) )
	// 	),
	// 	'before'
	// );

}
add_action( 'init', 'leadership_team_gallery_register_block' );
