<?php
/**
 * Home page components.
 *
 * [ne_hero ids="1,2,3" pill="" title="" accent="" text="" cta1="Label|/url/" cta2="Label|/url/"]
 *     full-width slideshow: crossfade + slow Ken Burns zoom, counter + progress + arrows, swipe.
 * [ne_band id="123" side="left"]HTML card content[/ne_band]                  full-width photo with overlapping card
 * [ne_mosaic ids="1,2,3,4,5" group="work"]                                   asymmetric project mosaic + lightbox
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ne_site_tools_link_pair( $v ) {
	$p = array_map( 'trim', explode( '|', (string) $v, 2 ) );
	return ( count( $p ) === 2 && '' !== $p[0] ) ? $p : null;
}

add_shortcode(
	'ne_hero',
	function ( $a ) {
		$a   = shortcode_atts( array( 'ids' => '', 'pill' => '', 'title' => '', 'accent' => '', 'text' => '', 'cta1' => '', 'cta2' => '', 'interval' => '6500' ), $a, 'ne_hero' );
		$ids = array_values( array_filter( array_map( 'intval', explode( ',', $a['ids'] ) ) ) );
		if ( ! $ids ) {
			return '';
		}
		wp_enqueue_script( 'ne-home' );
		$total  = count( $ids );
		$slides = '';
		foreach ( $ids as $n => $id ) {
			$src    = wp_get_attachment_image_url( $id, 'full' );
			$srcset = wp_get_attachment_image_srcset( $id, 'full' );
			$alt    = (string) get_post_meta( $id, '_wp_attachment_image_alt', true );
			if ( ! $src ) {
				continue;
			}
			// first slide loads immediately (LCP); the rest are swapped in just before they show
			$img     = 0 === $n
				? '<img src="' . esc_url( $src ) . '" srcset="' . esc_attr( (string) $srcset ) . '" sizes="100vw" alt="' . esc_attr( $alt ) . '" fetchpriority="high" decoding="async">'
				: '<img data-src="' . esc_url( $src ) . '" data-srcset="' . esc_attr( (string) $srcset ) . '" sizes="100vw" alt="' . esc_attr( $alt ) . '" decoding="async">';
			$slides .= '<div class="nh-slide' . ( 0 === $n ? ' is-active' : '' ) . ( $n % 2 ? ' nh-kb-b' : ' nh-kb-a' ) . '">' . $img . '</div>';
		}
		$btn = '';
		foreach ( array( $a['cta1'], $a['cta2'] ) as $k => $c ) {
			$p = ne_site_tools_link_pair( $c );
			if ( $p ) {
				$btn .= '<a class="nh-btn' . ( $k ? ' nh-btn--light' : '' ) . '" href="' . esc_url( $p[1] ) . '">' . esc_html( $p[0] ) . '</a>';
			}
		}
		ob_start();
		?>
<section class="ne-hero2" data-interval="<?php echo (int) $a['interval']; ?>" aria-roledescription="carousel" aria-label="Featured outdoor living projects">
	<div class="nh-frame">
		<div class="nh-slides"><?php echo $slides; // phpcs:ignore -- escaped above ?></div>
		<div class="nh-shade" aria-hidden="true"></div>
		<div class="nh-inner">
			<div class="nh-copy">
				<?php if ( $a['pill'] ) : ?><p class="nh-pill"><?php echo esc_html( wp_specialchars_decode( $a['pill'] ) ); ?></p><?php endif; ?>
				<h1 class="nh-title"><?php echo esc_html( wp_specialchars_decode( $a['title'] ) ); ?><?php if ( $a['accent'] ) : ?><span class="nh-accent"><?php echo esc_html( wp_specialchars_decode( $a['accent'] ) ); ?></span><?php endif; ?></h1>
				<?php if ( $a['text'] ) : ?><p class="nh-text"><?php echo esc_html( wp_specialchars_decode( $a['text'] ) ); ?></p><?php endif; ?>
				<?php if ( $btn ) : ?><div class="nh-ctas"><?php echo $btn; // phpcs:ignore -- escaped above ?></div><?php endif; ?>
			</div>
			<div class="nh-ctrl">
				<span class="nh-count"><b class="nh-num">01</b> / <?php echo esc_html( str_pad( (string) $total, 2, '0', STR_PAD_LEFT ) ); ?></span>
				<span class="nh-bar" aria-hidden="true"><i></i></span>
				<button type="button" class="nh-arrow nh-prev" aria-label="Previous photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
				<button type="button" class="nh-arrow nh-next" aria-label="Next photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
			</div>
		</div>
	</div>
</section>
		<?php
		return trim( ob_get_clean() );
	}
);

add_shortcode(
	'ne_band',
	function ( $a, $content = '' ) {
		$a   = shortcode_atts( array( 'id' => 0, 'side' => 'left' ), $a, 'ne_band' );
		$img = wp_get_attachment_image( (int) $a['id'], 'full', false, array( 'class' => 'ne-band-img', 'sizes' => '100vw', 'loading' => 'lazy', 'decoding' => 'async' ) );
		return '<section class="ne-band ne-band--' . ( 'right' === $a['side'] ? 'right' : 'left' ) . '"><div class="ne-band-media">' . $img . '</div><div class="ne-band-card">' . do_shortcode( $content ) . '</div></section>';
	}
);

add_shortcode(
	'ne_mosaic',
	function ( $a ) {
		$a   = shortcode_atts( array( 'ids' => '', 'group' => 'ne-mosaic' ), $a, 'ne_mosaic' );
		$ids = array_values( array_filter( array_map( 'intval', explode( ',', $a['ids'] ) ) ) );
		$out = '<div class="ne-mosaic">';
		foreach ( $ids as $n => $id ) {
			$full = wp_get_attachment_image_url( $id, 'full' );
			if ( ! $full ) {
				continue;
			}
			$alt  = (string) get_post_meta( $id, '_wp_attachment_image_alt', true );
			$img  = wp_get_attachment_image( $id, 0 === $n ? '1536x1536' : 'medium_large', false, array( 'class' => 'ne-mosaic-img', 'sizes' => 0 === $n ? '(max-width: 767px) 92vw, 640px' : '(max-width: 767px) 92vw, 320px', 'loading' => 'lazy', 'decoding' => 'async' ) );
			$out .= '<a class="ne-mosaic-item ne-mosaic-item--' . ( $n + 1 ) . '" href="' . esc_url( $full ) . '" data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="' . esc_attr( sanitize_title( $a['group'] ) ) . '" data-elementor-lightbox-description="' . esc_attr( $alt ) . '">' . $img . '<span class="ne-mosaic-cap"><span>' . esc_html( get_the_title( $id ) ) . '</span></span></a>';
		}
		return $out . '</div>';
	}
);
