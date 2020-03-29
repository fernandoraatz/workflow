<?php

/*
|--------------------------------------------------------------------------
| Custom Post Type
|--------------------------------------------------------------------------
*/

// Cria, registra e adiciona o Post Custom Type e suas labels

add_action( 'init', 'custom_cases' );

  function custom_cases() {

      // Esta array controle como as labels vao ser mostradas no Admin do Wordpress

      $labels = array(
          'name'                 => _x('Sliders', 'post type general name'),
          'singular_name'        => _x('Slider', 'post type singular name'),
          'add_new'              => _x('Adicionar Novo', 'Novo item'),
          'add_new_item'         => __('Novo Slider'),
          'edit_item'            => __('Editar Slider'),
          'new_item'             => __('Novo Slider'),
          'view_item'            => __('Ver Slider'),
          'search_items'         => __('Procurar Sliders'),
          'not_found'            =>  __('Nenhum registro encontrado'),
          'not_found_in_trash'   => __('Nenhum registro encontrado na lixeira'),
          'parent_item_colon'    => '',
          'menu_name'            => 'Cases'
      );

      // Esta array controla os comportamentos

       $args = array(
          'labels'               => $labels,
          'public'               => true,
          'public_queryable'     => true,
          'show_ui'              => true,
          'query_var'            => true,
          'menu_icon'            => 'dashicons-format-image',
          'rewrite'              => array( 'slug' => '', 'with_front' => false,),
          'capability_type'      => 'post',
          'has_archive'          => true,
          'hierarchical'         => false,
          'menu_position'        => null,
          //'register_meta_box_cb' => 'meta_box_destaques',
          'supports'             => array('title','thumbnail','editor',)
        );

          register_post_type( 'carousel_case' , $args );
          flush_rewrite_rules();

  }

/*
|--------------------------------------------------------------------------
| Custom Taxonomies
|--------------------------------------------------------------------------
*/

// Função que cria uma categoria e atrela ao Custom Type

  function custom_cases_taxonomy() {

       // Adiciona uma nova Categoria ao Post

          register_taxonomy('case_categoria', 'carousel_case', array(

          // Taxonomia Hierárquica (Assim como as categorias padrões)

          'hierarchical' => true,

      // Esta array controle como as labels vao ser mostradas no Admin do Wordpress

                'labels' => array(
                'name'                => _x( 'Nome Categorias', 'taxonomy general name' ),
                'singular_name'       => _x( 'Nome Categoria', 'taxonomy singular name' ),
                'search_items'        =>  __( 'Procurar Produtos' ),
                'all_items'           => __( 'Todos os Produtos' ),
                'parent_item'         => __( 'Categoria Pai' ),
                'parent_item_colon'   => __( 'Categoria Pai:' ),
                'edit_item'           => __( 'Editar' ),
                'update_item'         => __( 'Atualizar' ),
                'add_new_item'        => __( 'Adicionar Nova Categoria' ),
                'new_item_name'       => __( 'Nome do Produto' ),
                'menu_name'           => __( 'Nome Categorias' ),
          ),

          // Essa array controla as slugs usadas pela taxonomia

          'rewrite' => array(
            'slug' => '', // Controla a slug base que vai ser mostrada diante de cada termo
            'with_front' => false, // Não mostra a base da categoria antes /produtos/
            'hierarchical' => true // Permite que a URL seja /produtos/eletronicos/celular
          ),
        ));
  }
  
  add_action( 'init', 'custom_cases_taxonomy', 0 );
