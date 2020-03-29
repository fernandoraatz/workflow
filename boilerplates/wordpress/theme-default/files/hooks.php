<?php

/*
|--------------------------------------------------------------------------
| Add Styles
|--------------------------------------------------------------------------
*/

wp_register_style('styles', get_bloginfo('template_url') . '/style.css');

function add_estilos(){
    if (is_admin()) // Adiciona apenas se estiver no Blog e não no Painel Administrativo
        return;
    wp_enqueue_style('styles');
}

add_action('wp_print_styles','add_estilos');

/*
|--------------------------------------------------------------------------
| Add Scripts
|--------------------------------------------------------------------------
*/

wp_register_script( 'scripts', get_bloginfo('template_url') . 'content/assets/js/scripts.js');  

function add_scripts(){
    if (is_admin()) // Adiciona apenas se estiver no Blog e não no Painel Administrativo
        return;
    wp_enqueue_script('scripts');
}

add_action('wp_footer','add_scripts');