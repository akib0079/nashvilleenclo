<?php
/**
 * Plugin Name: Nashville Enclosures Site Tools
 * Description: Site design system stylesheet, footer ([ne_footer]), curtain preloader, service-area map ([ne_service_map]) and permanent redirects.
 * Version: 1.3.2
 * Author: Nashville Enclosures web team
 * License: GPL-2.0-or-later
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NE_SITE_TOOLS_VERSION', '1.3.2' );
define( 'NE_SITE_TOOLS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Pages that moved. Old path (no trailing slash) => new path.
 * Commercial became its own top-level page on 2026-10-15.
 */
function ne_site_tools_redirects() {
	return array(
		'/products/commercial-outdoor-spaces' => '/commercial/',
		'/commercial-outdoor-spaces'          => '/commercial/',
	);
}

add_action(
	'template_redirect',
	function () {
		$path = wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '', PHP_URL_PATH );
		if ( ! is_string( $path ) ) {
			return;
		}
		$path = untrailingslashit( $path );
		$map  = ne_site_tools_redirects();
		if ( isset( $map[ $path ] ) ) {
			wp_safe_redirect( home_url( $map[ $path ] ), 301 );
			exit;
		}
	},
	1
);

// marks that JavaScript runs, so scroll-reveal styles never hide content when it doesn't
add_action( 'wp_head', function () { echo "<script>document.documentElement.classList.add('ne-js');</script>\n"; }, 0 );

require_once __DIR__ . '/includes-footer.php';
require_once __DIR__ . '/includes-preloader.php';
require_once __DIR__ . '/includes-components.php';
require_once __DIR__ . '/includes-home.php';

/**
 * Site stylesheet (design system). Printed late so it sits after Elementor's per-page CSS.
 * Versioned by file time so browsers and WP Engine pick up every change.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		$file = __DIR__ . '/assets/site.css';
		wp_enqueue_style( 'ne-site', NE_SITE_TOOLS_URL . 'assets/site.css', array(), (string) filemtime( $file ) );
		wp_register_script( 'ne-home', NE_SITE_TOOLS_URL . 'assets/home.js', array(), (string) filemtime( __DIR__ . '/assets/home.js' ), true );
	},
	999
);

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_register_style( 'ne-leaflet', NE_SITE_TOOLS_URL . 'assets/leaflet.css', array(), '1.9.4' );
		wp_register_style( 'ne-service-map', NE_SITE_TOOLS_URL . 'assets/service-map.css', array( 'ne-leaflet' ), NE_SITE_TOOLS_VERSION );
		wp_register_script( 'ne-leaflet', NE_SITE_TOOLS_URL . 'assets/leaflet.js', array(), '1.9.4', true );
		wp_register_script( 'ne-service-map', NE_SITE_TOOLS_URL . 'assets/service-map.js', array( 'ne-leaflet' ), NE_SITE_TOOLS_VERSION, true );
	}
);

/**
 * [ne_service_map height="560" title="Our Service Area"]
 * Middle Tennessee counties served, highlighted on a light basemap.
 */
add_shortcode(
	'ne_service_map',
	function ( $atts ) {
		$atts = shortcode_atts(
			array(
				'height' => '560',
				'title'  => 'Our Service Area',
				'text'   => 'Serving Nashville and the surrounding Middle Tennessee counties.',
			),
			$atts,
			'ne_service_map'
		);
		wp_enqueue_style( 'ne-service-map' );
		wp_enqueue_script( 'ne-service-map' );

		$counties = array( 'Davidson', 'Williamson', 'Rutherford', 'Wilson', 'Sumner', 'Robertson', 'Montgomery', 'Cheatham', 'Dickson', 'Hickman', 'Maury', 'Marshall', 'Bedford', 'Trousdale', 'Smith', 'Macon' );

		ob_start();
		?>
		<div class="ne-service-map-wrap" style="--ne-map-h:<?php echo (int) $atts['height']; ?>px">
			<div class="ne-service-map" data-geo="<?php echo esc_url( NE_SITE_TOOLS_URL . 'assets/tn-counties.json' ); ?>" role="img" aria-label="<?php echo esc_attr( 'Map of the Middle Tennessee counties served by Nashville Enclosures: ' . implode( ', ', $counties ) ); ?>"></div>
			<div class="ne-service-card">
				<p class="ne-service-title"><?php echo esc_html( $atts['title'] ); ?></p>
				<p class="ne-service-text"><?php echo esc_html( $atts['text'] ); ?></p>
				<ul class="ne-service-list">
					<?php foreach ( $counties as $c ) : ?>
						<li><?php echo esc_html( $c ); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
);
