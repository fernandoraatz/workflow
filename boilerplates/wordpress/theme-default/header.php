<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7 ie6" lang="pt-BR"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7" lang="pt-BR"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 ie8" lang="pt-BR"><![endif]-->
<!--[if IE 9 ]><html class="no-js ie9" lang="pt-BR"><![endif]-->
<!--[if(gt IE 9)|!(IE)]><!-->
<html class="no-js" lang="pt-br">
<!--<![endif]-->

<head>

<!-- Meta-Tags-->

	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1,user-scalable=no" name="viewport" />

	<!-- Google Tags -->

	<meta name="author" content="">
	<meta name="description" content="">
	<meta name="keywords" content="">

	<!-- Facebook Tags -->

	<meta property="og:title" content="" />
	<meta property="og:type" content="Portfolio" />
	<meta property="og:image" content="<?php bloginfo( 'template_directory' ); ?>/">

	<!-- RSS -->

	<link rel="alternate" type="application/rss+xml" title="RSS2.0" href="<?php bloginfo( 'rss2_url' ); ?>" />

	<!-- Favicon -->

	<link rel="shortcut icon" href="<?php bloginfo( 'template_directory' ); ?>/favicon.ico">

	<!-- Título -->

	<title><?php bloginfo( 'name' ); ?></title>

	<!-- IE Modenizr -->

	<!--[if IE]><script src="<?php bloginfo('template_directory');?>/assets/js/modenizr.js"></script><![endif]-->

	<!-- Function Hook -->

	<?php wp_head() ?>

</head>

<!-- Body -->

<body <?php body_class( $class ); ?>>

	<!-- Header-->

	<header>
		<div class="container">
			<nav>

			</nav>
		</div>
	</header>

	<!-- Slider-->

	<section class="slider">
		<div class="container">

			<?php slider_custom();  ?>

		</div>
	</section>

	<!-- Inner Content -->

<?php	if ( is_front_page() ) {
	echo "";
} else{

	echo '<div class="inner-content">';
	
 } ?>