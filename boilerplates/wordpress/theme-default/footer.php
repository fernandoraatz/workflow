<?php	if ( is_home() ) {
		echo "";
	} else{

		echo '</div>';

	 } ?>

<!--  Footer -->

	<div class="container">
		<footer role="contentinfo">

				<span>
					&copy; <?php echo date( 'Y' ); ?>
					<a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a>
				</span>

				<div class="socials">
						<ul>
							<li><span class="ico icon-facebook"></span></li>
							<li><span class="ico icon-twitter"></span></li>
						</ul>

				</div>

		</footer>
	</div>
<!-- Function Hook -->

	<?php wp_footer() ?>

<!-- Scripts -->

	 <script src="<?php bloginfo('template_directory');?>/assets/js/main.js"></script>

</body>
</html>