<?php

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'red_hero_image_load_text_domain' );

function red_hero_image_load_text_domain() {
	load_plugin_textdomain( 'red-gutenberg-blocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function red_hero_image_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'red-hero-image',
		plugins_url( 'dist/block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'dist/block.build.js' )
	);

	wp_register_style(
		'red-hero-image-editor',
		plugins_url( 'styles/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'styles/editor.css' )
	);

	wp_register_style(
		'red-hero-image',
		plugins_url( 'styles/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'styles/style.css' )
	);

	register_block_type( 'red-gutenberg-blocks/red-hero-image', array(
		'style' => 'red-hero-image',
		'editor_style' => 'red-hero-image-editor',
		'script' => 'red-hero-image',
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
	// 	'red-hero-image',
	// 	sprintf(
	// 		'var red_hero_image = { localeData: %s };',
	// 		json_encode( ! function_exists( 'wp_get_jed_locale_data' ) ? gutenberg_get_jed_locale_data( 'red-gutenberg-blocks' ) : wp_get_jed_locale_data( 'red-gutenberg-blocks' ) )
	// 	),
	// 	'before'
	// );

}
add_action( 'init', 'red_hero_image_register_block' );
