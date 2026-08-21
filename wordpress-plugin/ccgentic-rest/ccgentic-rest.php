<?php
/**
 * Plugin Name: CCgentic REST
 * Description: Custom REST API for the CCgentic Next.js frontend. Uses Advanced Custom Fields (free or Pro) when available.
 * Version: 1.1.0
 * Author: CCgentic
 * Requires at least: 6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CCGENTIC_REST_NAMESPACE', 'ccgentic/v1' );
define( 'CCGENTIC_REST_PATH', plugin_dir_path( __FILE__ ) );

require_once CCGENTIC_REST_PATH . 'includes/acf-fields.php';

function ccgentic_rest_acf_available() {
	return function_exists( 'get_fields' ) && function_exists( 'acf_add_local_field_group' );
}

function ccgentic_rest_empty_hero_acf() {
	return array(
		'hero_eyebrow'    => '',
		'hero_heading'    => '',
		'hero_tagline'    => '',
		'hero_cta_label'  => '',
	);
}

function ccgentic_rest_empty_post_acf() {
	return array(
		'subtitle'      => '',
		'extra_section' => '',
	);
}

function ccgentic_rest_normalize_acf( $fields, $defaults ) {
	if ( ! is_array( $fields ) ) {
		return $defaults;
	}

	$normalized = $defaults;
	foreach ( $defaults as $key => $fallback ) {
		if ( ! array_key_exists( $key, $fields ) ) {
			continue;
		}
		$value = $fields[ $key ];
		if ( is_string( $value ) && '' !== $value && '' === $normalized[ $key ] ) {
			$normalized[ $key ] = $value;
		}
	}

	return $normalized;
}

function ccgentic_rest_get_acf_for_id( $post_id ) {
	if ( ! function_exists( 'get_fields' ) ) {
		return array();
	}

	$fields = get_fields( $post_id );
	if ( ! is_array( $fields ) ) {
		return array();
	}

	return $fields;
}

function ccgentic_rest_get_hero_acf() {
	$defaults = ccgentic_rest_empty_hero_acf();
	if ( ! function_exists( 'get_fields' ) ) {
		return $defaults;
	}

	$merged = $defaults;

	$option_fields = get_fields( 'option' );
	$merged        = ccgentic_rest_normalize_acf( $option_fields, $merged );

	$front_id = (int) get_option( 'page_on_front' );
	if ( $front_id > 0 ) {
		$merged = ccgentic_rest_normalize_acf( get_fields( $front_id ), $merged );
	}

	$home_query = new WP_Query(
		array(
			'name'           => 'home',
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'no_found_rows'  => true,
		)
	);
	if ( ! empty( $home_query->posts ) ) {
		$merged = ccgentic_rest_normalize_acf( get_fields( $home_query->posts[0]->ID ), $merged );
	}

	return $merged;
}

function ccgentic_rest_format_post( $post ) {
	$post_id = $post->ID;
	$image   = get_the_post_thumbnail_url( $post_id, 'large' );
	$raw_acf = ccgentic_rest_get_acf_for_id( $post_id );

	return array(
		'id'            => $post_id,
		'slug'          => $post->post_name,
		'title'         => html_entity_decode( get_the_title( $post_id ), ENT_QUOTES, 'UTF-8' ),
		'excerpt'       => wp_strip_all_tags( get_the_excerpt( $post_id ) ),
		'content'       => apply_filters( 'the_content', $post->post_content ),
		'featuredImage' => $image ? $image : '',
		'date'          => get_the_date( 'c', $post_id ),
		'acf'           => ccgentic_rest_normalize_acf( $raw_acf, ccgentic_rest_empty_post_acf() ),
	);
}

function ccgentic_rest_get_site() {
	return rest_ensure_response(
		array(
			'name'          => get_bloginfo( 'name' ),
			'description'   => get_bloginfo( 'description' ),
			'url'           => home_url( '/' ),
			'acfAvailable'  => ccgentic_rest_acf_available(),
			'acf'           => ccgentic_rest_get_hero_acf(),
		)
	);
}

function ccgentic_rest_get_home() {
	return rest_ensure_response(
		array(
			'acfAvailable' => ccgentic_rest_acf_available(),
			'acf'          => ccgentic_rest_get_hero_acf(),
		)
	);
}

function ccgentic_rest_get_posts() {
	$query = new WP_Query(
		array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 10,
			'no_found_rows'  => true,
		)
	);

	$items = array();
	foreach ( $query->posts as $post ) {
		$items[] = ccgentic_rest_format_post( $post );
	}

	return rest_ensure_response( $items );
}

function ccgentic_rest_get_post_by_slug( $request ) {
	$slug  = sanitize_title( $request['slug'] );
	$query = new WP_Query(
		array(
			'name'           => $slug,
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'no_found_rows'  => true,
		)
	);

	if ( empty( $query->posts ) ) {
		return new WP_Error( 'ccgentic_not_found', 'Post not found.', array( 'status' => 404 ) );
	}

	return rest_ensure_response( ccgentic_rest_format_post( $query->posts[0] ) );
}

function ccgentic_rest_get_pages() {
	$query = new WP_Query(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 20,
			'no_found_rows'  => true,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
		)
	);

	$items = array();
	foreach ( $query->posts as $post ) {
		$items[] = ccgentic_rest_format_post( $post );
	}

	return rest_ensure_response( $items );
}

function ccgentic_rest_register_routes() {
	$namespace = CCGENTIC_REST_NAMESPACE;

	register_rest_route(
		$namespace,
		'/site',
		array(
			'methods'             => 'GET',
			'callback'            => 'ccgentic_rest_get_site',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		$namespace,
		'/home',
		array(
			'methods'             => 'GET',
			'callback'            => 'ccgentic_rest_get_home',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		$namespace,
		'/posts',
		array(
			'methods'             => 'GET',
			'callback'            => 'ccgentic_rest_get_posts',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		$namespace,
		'/posts/(?P<slug>[a-zA-Z0-9-]+)',
		array(
			'methods'             => 'GET',
			'callback'            => 'ccgentic_rest_get_post_by_slug',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		$namespace,
		'/pages',
		array(
			'methods'             => 'GET',
			'callback'            => 'ccgentic_rest_get_pages',
			'permission_callback' => '__return_true',
		)
	);
}

add_action( 'rest_api_init', 'ccgentic_rest_register_routes' );
