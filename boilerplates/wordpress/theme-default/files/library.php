<?php

/*
|--------------------------------------------------------------------------
| Carousel Custom Post Type
|--------------------------------------------------------------------------
*/

function carousel_custom(){
		echo '<div class="home-carousel">';
			$args = array( 'post_type' => 'carousel_case', 'posts_per_page' => -1);
			$the_query = new WP_Query( $args );
			while ( $the_query->have_posts() ) : $the_query->the_post();
 				echo '<a href="#" title="';
				the_title();
				echo '">';
                echo the_post_thumbnail('thumb-carousel');
                echo '</a>';
			endwhile;
    echo '</div>';
}

/*
|--------------------------------------------------------------------------
| Slider Advanced Custom Field
|--------------------------------------------------------------------------
*/

function slider_advanced() {
    echo'<div class="home-slider">';
            $args = array( 'post_type' => 'slider_home', 'posts_per_page' => 3);
            $the_query = new WP_Query( $args );
            while ( have_rows('slider') ) : the_row();
                	echo'<div class="slider-image">';
                		echo'<a href="#" target="">'; ?>

					<img src="<?php the_sub_field('imagem'); ?>" alt="">
 <?php
               		echo'</a>';
	                	echo'<span class="slider-caption">';
		                	the_sub_field('conteudo');
		                echo'</span>';
                	echo'</div>';
            endwhile;
    echo'</div>';
}


/*
|--------------------------------------------------------------------------
| Slider Custom Post Type
|--------------------------------------------------------------------------
*/

function slider_custom() {
    echo'<div class="home-slider">';
            $args = array( 'post_type' => 'slider_home', 'posts_per_page' => 3);
            $the_query = new WP_Query( $args );
            while ( $the_query->have_posts() ) : $the_query->the_post();
                	echo'<div class="slider-image">';
                		echo'<a href="#" target="">';
                			echo the_post_thumbnail('thumb-slider');
                		echo'</a>';
	                	echo'<span class="slider-caption">';
		                	the_excerpt();
		                echo'</span>';
                	echo'</div>';
            endwhile;
    echo'</div>';
}

/*
|--------------------------------------------------------------------------
| Slider por Categoria (Destaques)
|--------------------------------------------------------------------------
*/

function slider_post() {
   echo'<div class="home-slider">';
            $args = array('posts_per_page' => 3, 'category_name' => 'destaques' );
            $the_query = new WP_Query( $args );
            while ( $the_query->have_posts() ) : $the_query->the_post();
                echo'<div class="slider-image">';
               echo'<a href="';
                echo the_permalink();
                echo '" target="_blank">';
                echo the_post_thumbnail('banner-slider');
                echo'</a>';
                echo'<div class="slider-texto">';
                echo'<p>';
                echo excerpt('16');
                 echo'</p>';
                echo'</div>';
                echo'</div>';
            endwhile;
    echo'</div>';
}

/*
|--------------------------------------------------------------------------
| Breadcrumb
|--------------------------------------------------------------------------
*/

function the_breadcrumb() {
    global $post;
    echo '<ul id="breadcrumbs">';
    if (!is_home()) {
        echo '<li><a href="';
        echo get_option('home');
        echo '">';
        echo 'Home';
        echo '</a></li><li class="separator"> / </li>';
        if (is_category() || is_single()) {
            echo '<li>';
            the_category(' </li><li class="separator"> / </li><li> ');
            if (is_single()) {
                echo '</li><li class="separator"> / </li><li>';
                the_title();
                echo '</li>';
            }
        } elseif (is_page()) {
            if($post->post_parent){
                $anc = get_post_ancestors( $post->ID );
                $title = get_the_title();
                foreach ( $anc as $ancestor ) {
                    $output = '<li><a href="'.get_permalink($ancestor).'" title="'.get_the_title($ancestor).'">'.get_the_title($ancestor).'</a></li> <li class="separator">/</li>';
                }
                echo $output;
                echo '<strong title="'.$title.'"> '.$title.'</strong>';
            } else {
                echo '<li><strong> '.get_the_title().'</strong></li>';
            }
        }
    }
    elseif (is_tag()) {single_tag_title();}
    elseif (is_day()) {echo"<li>Archive for "; the_time('F jS, Y'); echo'</li>';}
    elseif (is_month()) {echo"<li>Archive for "; the_time('F, Y'); echo'</li>';}
    elseif (is_year()) {echo"<li>Archive for "; the_time('Y'); echo'</li>';}
    elseif (is_author()) {echo"<li>Author Archive"; echo'</li>';}
    elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {echo "<li>Blog Archives"; echo'</li>';}
    elseif (is_search()) {echo"<li>Search Results"; echo'</li>';}
    echo '</ul>';
}

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

function custom_pagination($pages = '', $range = 2) {
    $showitems = ($range * 2)+1;
    global $paged;
    if(empty($paged)) $paged = 1;
    if($pages == '') {
            global $wp_query;
            $pages = $wp_query->max_num_pages;
            if(!$pages)        {
                    $pages = 1;
            }
    }
    if(1 != $pages)        {
            echo "<div class='paginacao'>";
            if($paged > 2 && $paged > $range+1 && $showitems < $pages)
            	echo "<a href='".get_pagenum_link(1)."' class='btn'>Primeira</a>";
            if($paged > 1 && $showitems < $pages)
             echo "<a href='".get_pagenum_link($paged - 1)."' class='btn'>&lsaquo;</a>";

            for ($i=1; $i <= $pages; $i++) {
                    if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
                           echo ($paged == $i)? "<a class='btn current'>".$i."</a>":"<a href='".get_pagenum_link($i)."' class='btn' >".$i."</a>";
                    }
            }

            if ($paged < $pages && $showitems < $pages)
            	echo "<a href='".get_pagenum_link($paged + 1)."' class='btn'>&rsaquo;</a>";
            if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($pages)."' class='btn'>Última</a>";
            echo "</div>\n";
    }
}

/*
|--------------------------------------------------------------------------
| Custom Excerpt
|--------------------------------------------------------------------------
*/

function excerpt($limit) {
      $excerpt = explode(' ', get_the_excerpt(), $limit);
      if (count($excerpt)>=$limit) {
        array_pop($excerpt);
        $excerpt = implode(" ",$excerpt).'...';
      } else {
        $excerpt = implode(" ",$excerpt);
      }
      $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
      return $excerpt;
    }

    function content($limit) {
      $content = explode(' ', get_the_content(), $limit);
      if (count($content)>=$limit) {
        array_pop($content);
        $content = implode(" ",$content).'...';
      } else {
        $content = implode(" ",$content);
      }
      $content = preg_replace('/\[.+\]/','', $content);
      $content = apply_filters('the_content', $content);
      $content = str_replace(']]>', ']]&gt;', $content);
      return $content;
    }



?>