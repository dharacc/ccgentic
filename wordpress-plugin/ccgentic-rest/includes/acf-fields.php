<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ccgentic_rest_register_acf() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page(
			array(
				'page_title' => 'CCgentic Home',
				'menu_title' => 'CCgentic Home',
				'menu_slug'  => 'ccgentic-home',
				'capability' => 'edit_posts',
				'redirect'   => false,
			)
		);
	}

	$hero_location = array(
		array(
			array(
				'param'    => 'page_type',
				'operator' => '==',
				'value'    => 'front_page',
			),
		),
	);

	if ( function_exists( 'acf_add_options_page' ) ) {
		$hero_location[] = array(
			array(
				'param'    => 'options_page',
				'operator' => '==',
				'value'    => 'ccgentic-home',
			),
		);
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_ccgentic_hero',
			'title'                 => 'CCgentic Hero',
			'show_in_rest'          => 1,
			'fields'                => array(
				array(
					'key'          => 'field_ccgentic_hero_eyebrow',
					'label'        => 'Eyebrow',
					'name'         => 'hero_eyebrow',
					'type'         => 'text',
					'show_in_rest' => 1,
				),
				array(
					'key'          => 'field_ccgentic_hero_heading',
					'label'        => 'Heading',
					'name'         => 'hero_heading',
					'type'         => 'textarea',
					'rows'         => 3,
					'instructions' => 'One line per heading break.',
					'show_in_rest' => 1,
				),
				array(
					'key'          => 'field_ccgentic_hero_tagline',
					'label'        => 'Tagline',
					'name'         => 'hero_tagline',
					'type'         => 'text',
					'show_in_rest' => 1,
				),
				array(
					'key'          => 'field_ccgentic_hero_cta_label',
					'label'        => 'CTA label',
					'name'         => 'hero_cta_label',
					'type'         => 'text',
					'show_in_rest' => 1,
				),
			),
			'location'              => $hero_location,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'active'                => true,
		)
	);

	acf_add_local_field_group(
		array(
			'key'                   => 'group_ccgentic_post',
			'title'                 => 'CCgentic Post',
			'show_in_rest'          => 1,
			'fields'                => array(
				array(
					'key'          => 'field_ccgentic_post_subtitle',
					'label'        => 'Subtitle',
					'name'         => 'subtitle',
					'type'         => 'text',
					'show_in_rest' => 1,
				),
				array(
					'key'          => 'field_ccgentic_post_extra_section',
					'label'        => 'Extra section',
					'name'         => 'extra_section',
					'type'         => 'wysiwyg',
					'tabs'         => 'visual',
					'toolbar'      => 'basic',
					'media_upload' => 0,
					'show_in_rest' => 1,
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'post',
					),
				),
			),
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'active'                => true,
		)
	);
}

add_action( 'acf/init', 'ccgentic_rest_register_acf' );
