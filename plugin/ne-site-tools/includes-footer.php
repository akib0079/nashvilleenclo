<?php
/**
 * [ne_footer] — site footer (replaces the theme footer template's old column layout).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ne_site_tools_footer() {
	$u     = function ( $p ) { return esc_url( home_url( $p ) ); };
	$phone = '(615) 669-1987';
	$tel   = 'tel:+16156691987';
	$email = 'info@nashvilleenclosures.com';
	$logo  = esc_url( home_url( '/wp-content/uploads/2026/10/nashville-enclosures-logo-white.png' ) );

	$systems = array(
		'Louvered Roofs'          => '/products/louvered-roofs/',
		'Solid Roof Systems'      => '/products/solid-roof-systems/',
		'Retractable Screens'     => '/products/retractable-screens/',
		'Cantilever Roof Systems' => '/products/cantilever-roof-systems/',
		'3 & 4 Season Rooms'      => '/products/3-4-season-rooms/',
		'Glass Enclosures'        => '/products/glass-enclosures/',
		'Infrared Heating'        => '/products/infrared-heating/',
		'Screen Rooms'            => '/products/screen-rooms/',
		'Architectural Metal'     => '/products/architectural-metal/',
	);
	$company = array(
		'About Us'             => '/about/',
		'Our Process'          => '/about/our-process/',
		'Commercial'           => '/commercial/',
		'Projects'             => '/projects/',
		'Videos & Resources'   => '/videos-resources/',
		'Blog'                 => '/blog/',
		'Warranty & Service'   => '/warranty-service/',
		'Contact Us'           => '/contact-us/',
	);
	$social = array(
		'Facebook'  => array( 'https://www.facebook.com/p/Nashville-Enclosures-61560898534466/', '<path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.2L14.1 2.2C10.9 2.2 10.2 4.6 10.2 6.2v2.3H8v3.7h2.2V22h3.8v-9.8h3l.4-3.7H14z"/>' ),
		'Instagram' => array( 'https://www.instagram.com/nashvilleenclosures/', '<path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 7c-.1-1.5-.4-2.8-1.5-3.9S18 1.7 16.5 1.6C15 1.5 9 1.5 7.5 1.6 6 1.7 4.7 2 3.6 3.1S2.2 5.5 2.1 7C2 8.5 2 14.5 2.1 16c.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 7.5.1 9 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-7.5 0-9zm-2.2 11.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 5.6 4.9C6.8 4.4 9.6 4.5 10.9 4.5s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z"/>' ),
	);
	$counties = 'Davidson, Williamson, Rutherford, Wilson, Sumner, Robertson, Montgomery, Cheatham, Dickson, Hickman, Maury, Marshall, Bedford, Trousdale, Smith and Macon counties';

	ob_start();
	?>
	<div class="ne-footer">
		<div class="ne-footer-inner">
			<div class="ne-footer-grid">
				<div class="ne-footer-brand">
					<a class="ne-footer-logo" href="<?php echo $u( '/' ); ?>"><img src="<?php echo $logo; ?>" width="260" height="80" alt="Nashville Enclosures" loading="lazy" decoding="async"></a>
					<p>Luxury outdoor structures and premium enclosure systems, thoughtfully designed and expertly built for homes and businesses across Middle Tennessee.</p>
					<div class="ne-footer-social">
						<?php foreach ( $social as $name => $s ) : ?>
							<a href="<?php echo esc_url( $s[0] ); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr( 'Nashville Enclosures on ' . $name ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><?php echo $s[1]; // phpcs:ignore -- static markup ?></svg></a>
						<?php endforeach; ?>
					</div>
				</div>
				<nav class="ne-footer-col" aria-label="Our systems">
					<p class="ne-footer-h">Our Systems</p>
					<ul>
						<?php foreach ( $systems as $label => $path ) : ?>
							<li><a href="<?php echo $u( $path ); ?>"><?php echo esc_html( $label ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<nav class="ne-footer-col" aria-label="Company">
					<p class="ne-footer-h">Company</p>
					<ul>
						<?php foreach ( $company as $label => $path ) : ?>
							<li><a href="<?php echo $u( $path ); ?>"><?php echo esc_html( $label ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<div class="ne-footer-col ne-footer-contact">
					<p class="ne-footer-h">Get in Touch</p>
					<ul>
						<li><a href="<?php echo esc_attr( $tel ); ?>"><span class="ne-fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg></span><?php echo esc_html( $phone ); ?></a></li>
						<li><a href="mailto:<?php echo esc_attr( $email ); ?>"><span class="ne-fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><?php echo esc_html( $email ); ?></a></li>
						<li><span class="ne-fi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span>Nashville &amp; Middle Tennessee</li>
					</ul>
					<p class="ne-footer-counties">Serving <?php echo esc_html( $counties ); ?>.</p>
					<a class="ne-footer-btn" href="<?php echo $u( '/contact-us/' ); ?>">Request a Consultation</a>
				</div>
			</div>
			<div class="ne-footer-bottom">
				<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Nashville Enclosures. All rights reserved.</p>
				<p><a href="<?php echo $u( '/warranty-service/' ); ?>">Warranty &amp; Service</a><span aria-hidden="true">·</span><a href="<?php echo $u( '/contact-us/' ); ?>">Contact</a></p>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'ne_footer', 'ne_site_tools_footer' );
