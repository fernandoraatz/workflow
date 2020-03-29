<?php get_header();  ?>

<!--  Content -->

<div class="content single-content">
	<div class="container">

		<?php if(have_posts()) : while(have_posts()) : the_post() ?>

		<article>
			<h3><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
			<i class="date"><?php the_date('d-m-y');?></i>
			<p><?php the_content();?></p>
			<a href="<?php the_permalink();?>" class="btn-mais">Leia Mais</a>
		</article>

		<?php endwhile;endif; ?>

	</div>
</div>

<?php get_footer();?>

