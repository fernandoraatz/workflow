## Snippets

Snippets Disponíveis ou interessantes a serem criados:

```
url
dir
wpquery
loop
loopterms
listterms
wpsearch
wpmenu
wpmenui

```

---

## Template Tags

Includes:

```
<?php get_header(); ?>

<?php get_sidebar();?>

<?php get_footer(); ?>


```

Bloginfo:

```
<?php bloginfo( 'url' ); ?>/      // url

<?php bloginfo( 'template_directory' ); ?>/    // dir


```

---

## Excerpt com Limites

Determinando Excerpt com Limites de Caracteres:

```
echo excerpt('16');

```

---

## Loop com Wp_query

Exemplo de consulta/loop com o wp_query:

```
<?php

    $args = array(
      'posts_per_page' => -1,
      'category_name' => 'nome-categoria,
      'post_status'  => 'publish',
      'order' => 'ASC'
       );

    $the_query = new WP_Query( $args );

    if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post();

  ?>

<div class="post">

      <h2><a href="<?php the_permalink();?>"> <?php the_title();</a></h2> // Título do Post ?>
      <a href="<?php the_permalink(); ?>"><?php  echo get_the_date();</a> // Data do Post ?>

      <p><?php the_content();</p> // Conteúdo do post ?> ou
      <p><?php the_excerpt();</p> // Resumo do Post ?>

  </div>

<?php endwhile; ?>

<?php wp_reset_postdata(); ?>

<?php else:  ?>
  <p><?php _e( 'Desculpe, Não existe posts no momento' ); ?></p>
<?php endif; ?>


```

---

## Loop Default

Exemplo de loop padrão:

```
<?php if(have_posts()) : while(have_posts()) : the_post() ?>

       <div class="post">

           <h2><a href="<?php the_permalink();?>"> <?php the_title();</a></h2> // Título do Post ?>
           <a href="<?php the_permalink(); ?>"><?php  echo get_the_date();</a> // Data do Post ?>

           <p><?php the_content();</p> // Conteúdo do post ?> ou
           <p><?php the_excerpt();</p> // Resumo do Post ?>

       </div>

   <?php endwhile;endif; ?>

```

---

## Menu Gerenciado pelo Wordpress

Template exemplo de menu gerenciado pelo WP:

```

<?php
     wp_nav_menu(
       array(
          'menu' => 'menu_principal',
          'menu_class' => 'menu'
      )
    );

?>

```

---

## Menu Interno gerenciado pelo Wordpress

Template exemplo de menu interno gerenciado pelo WP:

```
<?php
      wp_nav_menu(
        array(
          'theme_location' => 'menu_produtos',
          'menu_class' => 'menu_produtos')
      );
?>


```

---

## Loop Custom Taxonomy

```
<?php

     $args=array(
    'post_type' => 'nome-post-type',
    'nome-taxonomia' => 'nome-categoria',
    'posts_per_page' => -1
     );

     $the_query = new WP_Query($args);
     if( $the_query->have_posts() ) { while ($the_query->have_posts()) : $the_query->the_post(); ?>

          <div class="post">
                <h2><a href="<?php the_permalink();?>"> <?php the_title();</a></h2> // Título do Post ?>
                <a href="<?php the_permalink(); ?>"><?php  echo get_the_date();</a> // Data do Post ?>

                <p><?php the_content();</p> // Conteúdo do post ?> ou
                <p><?php the_excerpt();</p> // Resumo do Post ?>
            </div>

     <?php endwhile; }  wp_reset_query(); ?>

```
---

### Listar Custom Taxonomy

```
<?php

       $args = array(
         'taxonomy'     => 'cat-eventos',
         'orderby'      => 'name',
         'show_count'   => 0,
         'pad_counts'   => 0,
         'hierarchical' => 1,
         'title_li'     => ''
       );
     ?>

<?php wp_list_categories( $args ); ?>

```

---

### Search WP

```
<form action="<?php bloginfo('url'); ?>/" method="get" role="search" id="searchform">
        <input type="submit" value="BUSCAR" id="searchsubmit" >
        <input type="text" placeholder="value" id="s" name="s" >
</form>

```

---

### Search WP filtrando Custom Post Field

```
<form action="<?php bloginfo('url'); ?>/" method="get" role="search" id="searchform">
        <input type="submit" value="BUSCAR" id="searchsubmit" >
        <input type="hidden" name="post_type" value="nome-post-type" />
        <input type="text" placeholder="Digite Seu Nome..." id="s" name="s" >
</form>

```

---

###  Pegar Termos de Custom Categories (TITULO, DESCRICAO, LINK)

```
<?php

    $terms = get_the_terms( $post->ID, 'nome_da_categoria' );

    if ($terms) {

            foreach ( $terms as $term ) {
                $term_name = $term->name;
                $term_link = get_term_link($term);
                $term_description = $term->description;
            }
    }             
?>

```
---

###  WP_GET_ARQUIVES Custom Post Type

```

function my_custom_post_type_archive_where($where,$args){  
    $post_type  = isset($args['post_type'])  ? $args['post_type']  : 'post';  
    $where = "WHERE post_type = '$post_type' AND post_status = 'publish'";
    return $where;  
}

add_filter( 'getarchives_where','my_custom_post_type_archive_where',10,2);

<?php
        $args = array(
            'post_type'    => 'nome-post-type',
            'type'         => 'monthly'
        );

        echo '<ul>'.wp_get_archives($args).'</ul>';
     ?>


```
