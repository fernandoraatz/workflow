<?php

/*
|--------------------------------------------------------------------------
| Thumbnails
|--------------------------------------------------------------------------
*/

add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size('thumb-slider', 1000, 390, true );


/*
|--------------------------------------------------------------------------
| Widgets
|--------------------------------------------------------------------------
*/

if ( function_exists('register_sidebar') )
register_sidebar(array(name => 'Pesquisar'));


/*
|--------------------------------------------------------------------------
| Menus
|--------------------------------------------------------------------------
*/

add_theme_support('menus');

function register_menus() {
	register_nav_menus(
	array(  'menu_principal' => __( 'Menu Principal' ),
	        'menu_eventos' => __( 'Menu Eventos' )
        )
	);
}

add_action( 'init', 'register_menus' );

/*
|--------------------------------------------------------------------------
| Body Class
|--------------------------------------------------------------------------
*/

function add_slug_body_class( $classes ) {
    global $post;
        if ( isset( $post ) ) {
        $classes[] = $post->post_type . '-' . $post->post_name;
        }
    return $classes;
}

add_filter( 'body_class', 'add_slug_body_class' );

/*
|--------------------------------------------------------------------------
| Custom Excerpt
|--------------------------------------------------------------------------
*/

function custom_excerpt_length( $length ) {
    return 20;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function custom_excerpt_more($more) {
    return '…';
}

add_filter('excerpt_more', 'custom_excerpt_more');

/*
|--------------------------------------------------------------------------
| Desabilitar Barra de Admin
|--------------------------------------------------------------------------
*/

    add_filter('show_admin_bar', '__return_false');

/*
|--------------------------------------------------------------------------
| Traduzir Nome da Categoria
|--------------------------------------------------------------------------
*/

    // add_action('trabalhos_add_form','qtrans_modifyTermFormFor');
    // add_action('trabalhos_edit_form','qtrans_modifyTermFormFor');


/*
|--------------------------------------------------------------------------
| Adicionar Excerpt em Pages
|--------------------------------------------------------------------------
*/

	// add_post_type_support( 'page', 'excerpt' );

/*
|--------------------------------------------------------------------------
| Retirar Metatag Wordpress Generator
|--------------------------------------------------------------------------
*/

	// remove_action('wp_head', 'wp_generator');

/*
|--------------------------------------------------------------------------
| Inserir Imagem Destaque Feed
|--------------------------------------------------------------------------
*/

	/*add_filter('the_content_feed', 'rss_post_thumbnail');
	function rss_post_thumbnail($content) {
		global $post;
		if( has_post_thumbnail($post->ID) )
			$content = '<p>' . get_the_post_thumbnail($post->ID, 'thumbnail') . '</p>' . $content;
		return $content;
	}*/

/*
|--------------------------------------------------------------------------
| Remover Widgets do Dashboard
|--------------------------------------------------------------------------
*/

// function remove_dashboard_widgets() {
//     remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
//     remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
//     remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
//     remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
//     remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
//     remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
//     remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
//     remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );

//     // Yoast's SEO Plugin Widget
//     remove_meta_box( 'yoast_db_widget', 'dashboard', 'normal' );
// }

// add_action( 'wp_dashboard_setup', 'remove_dashboard_widgets' );



?>