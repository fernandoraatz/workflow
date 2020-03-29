<?php get_header();  ?>

<div class="container">
	<section>
			<h2>Resultados da Pesquisa</h2>

			<?php if(have_posts()) : while(have_posts()) : the_post() ?>

			<article>
				<h3><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
				<i class="date"><?php the_date('d-m-y');?></i>
				<p><?php the_excerpt();?></p>

				<a href="<?php the_permalink();?>" class="btn-mais">Leia Mais</a>
			</article>

			<?php endwhile;endif; ?>

	</section>
</div>


<?php get_footer();  ?>