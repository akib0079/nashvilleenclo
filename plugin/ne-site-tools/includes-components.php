<?php
/**
 * Design-system components used by the page builders (rendered inside Elementor shortcode widgets).
 *
 * [ne_card id="123" num="01" title="…" text="…" url="/products/…/"]  product / system card
 * [ne_gallery ids="1,2,3" cols="3" group="louvered"]                photo grid with Elementor lightbox
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode(
	'ne_card',
	function ( $a ) {
		$a   = shortcode_atts( array( 'id' => 0, 'num' => '', 'title' => '', 'text' => '', 'url' => '#' ), $a, 'ne_card' );
		$img = wp_get_attachment_image(
			(int) $a['id'],
			'large',
			false,
			array(
				'class'    => 'ne-pcard-img',
				'sizes'    => '(max-width: 767px) 92vw, (max-width: 1024px) 46vw, 420px',
				'loading'  => 'lazy',
				'decoding' => 'async',
				'alt'      => '',
			)
		);
		ob_start();
		?>
<a class="ne-pcard" href="<?php echo esc_url( $a['url'] ); ?>">
	<?php echo $img; // phpcs:ignore -- core image markup ?>
	<span class="ne-pcard-shade" aria-hidden="true"></span>
	<span class="ne-pcard-top" aria-hidden="true">
		<?php if ( '' !== $a['num'] ) : ?><span class="ne-pcard-num"><?php echo esc_html( $a['num'] ); ?></span><?php endif; ?>
		<span class="ne-pcard-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
	</span>
	<span class="ne-pcard-body">
		<span class="ne-pcard-title"><span><?php echo esc_html( wp_specialchars_decode( $a['title'] ) ); ?></span></span>
		<?php if ( '' !== $a['text'] ) : ?><span class="ne-pcard-text"><?php echo esc_html( wp_specialchars_decode( $a['text'] ) ); ?></span><?php endif; ?>
	</span>
</a>
		<?php
		return trim( ob_get_clean() );
	}
);

add_shortcode(
	'ne_gallery',
	function ( $a ) {
		$a    = shortcode_atts( array( 'ids' => '', 'cols' => '3', 'group' => '' ), $a, 'ne_gallery' );
		$ids  = array_filter( array_map( 'intval', explode( ',', $a['ids'] ) ) );
		$cols = max( 2, min( 4, (int) $a['cols'] ) );
		$grp  = $a['group'] ? sanitize_title( $a['group'] ) : 'ne-gal-' . substr( md5( $a['ids'] ), 0, 8 );
		if ( ! $ids ) {
			return '';
		}
		$out = '<div class="ne-gal ne-gal--' . $cols . '">';
		foreach ( $ids as $id ) {
			$full = wp_get_attachment_image_url( $id, 'full' );
			if ( ! $full ) {
				continue;
			}
			$alt  = trim( (string) get_post_meta( $id, '_wp_attachment_image_alt', true ) );
			$img  = wp_get_attachment_image(
				$id,
				'medium_large',
				false,
				array(
					'class'    => 'ne-gal-img',
					'sizes'    => '(max-width: 767px) 92vw, (max-width: 1024px) 46vw, ' . (int) round( 1200 / $cols ) . 'px',
					'loading'  => 'lazy',
					'decoding' => 'async',
				)
			);
			$out .= '<a class="ne-gal-item" href="' . esc_url( $full ) . '" data-elementor-open-lightbox="yes" data-elementor-lightbox-slideshow="' . esc_attr( $grp ) . '" data-elementor-lightbox-description="' . esc_attr( $alt ) . '" aria-label="' . esc_attr( $alt ? 'View photo: ' . $alt : 'View photo' ) . '">' . $img . '<span class="ne-gal-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4M11 8.5v5M8.5 11h5"/></svg></span></a>';
		}
		return $out . '</div>';
	}
);
