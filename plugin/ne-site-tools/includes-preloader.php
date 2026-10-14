<?php
/**
 * Curtain preloader: a brief brand reveal on the first page view of a visit.
 * Two dark panels part like curtains as soon as the page is ready (never longer than 1.4 s),
 * later page views in the same session skip it. Replaces the theme's Royal Preloader.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_head',
	function () {
		if ( is_admin() || ( function_exists( 'is_customize_preview' ) && is_customize_preview() ) || isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return;
		}
		?>
<script>(function(d){try{if(sessionStorage.getItem('neSeen')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(e){}d.documentElement.classList.add('ne-pl-on');})(document);</script>
<style id="ne-curtain-css">
#ne-curtain{display:none}
.ne-pl-on #ne-curtain{display:block;position:fixed;inset:0;z-index:2147483000;pointer-events:none}
.ne-pl-on body{overflow:hidden}
#ne-curtain .nc-p{position:absolute;top:0;bottom:0;width:50.5%;background:#141414;transition:transform .9s cubic-bezier(.77,0,.18,1)}
#ne-curtain .nc-l{left:0}#ne-curtain .nc-r{right:0}
#ne-curtain .nc-m{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:22px;transition:opacity .35s ease,transform .5s ease}
#ne-curtain .nc-m img{width:220px;height:auto;opacity:0;animation:ncIn .6s .05s ease forwards}
#ne-curtain .nc-bar{width:160px;height:2px;background:rgba(255,255,255,.12);overflow:hidden;border-radius:2px}
#ne-curtain .nc-bar i{display:block;height:100%;width:100%;background:#957E56;transform:scaleX(0);transform-origin:left;animation:ncBar 1.1s cubic-bezier(.4,0,.2,1) forwards}
@keyframes ncIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes ncBar{to{transform:scaleX(1)}}
#ne-curtain.nc-open .nc-l{transform:translateX(-101%)}
#ne-curtain.nc-open .nc-r{transform:translateX(101%)}
#ne-curtain.nc-open .nc-m{opacity:0;transform:translate(-50%,-50%) scale(.96)}
</style>
		<?php
	},
	1
);

add_action(
	'wp_body_open',
	function () {
		if ( is_admin() || isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return;
		}
		$logo = esc_url( home_url( '/wp-content/uploads/2026/10/nashville-enclosures-logo-white.png' ) );
		?>
<div id="ne-curtain" aria-hidden="true"><div class="nc-p nc-l"></div><div class="nc-p nc-r"></div><div class="nc-m"><img src="<?php echo $logo; ?>" alt="" width="220" height="68"><div class="nc-bar"><i></i></div></div></div>
<script>(function(){var h=document.documentElement,c=document.getElementById('ne-curtain');if(!h.classList.contains('ne-pl-on')||!c){if(c)c.remove();return;}
var t0=Date.now(),done=false;function open(){if(done)return;done=true;var wait=Math.max(0,650-(Date.now()-t0));setTimeout(function(){c.classList.add('nc-open');h.classList.remove('ne-pl-on');c.style.display='block';c.style.position='fixed';c.style.inset='0';c.style.zIndex='2147483000';try{sessionStorage.setItem('neSeen','1');}catch(e){}setTimeout(function(){c.remove();},1000);},wait);}
if(document.readyState!=='loading')open();else document.addEventListener('DOMContentLoaded',open);setTimeout(open,1400);})();</script>
		<?php
	},
	1
);

// The theme's Royal Preloader is switched off in the Customizer; make sure its assets never load either.
add_action(
	'wp_enqueue_scripts',
	function () {
		global $wp_scripts, $wp_styles;
		foreach ( array( $wp_scripts, $wp_styles ) as $reg ) {
			if ( ! $reg ) {
				continue;
			}
			foreach ( $reg->queue as $handle ) {
				$src = isset( $reg->registered[ $handle ] ) ? (string) $reg->registered[ $handle ]->src : '';
				if ( false !== strpos( $src, 'royal_preloader' ) || false !== strpos( $src, 'royal-preload' ) ) {
					if ( $reg === $wp_scripts ) {
						wp_dequeue_script( $handle );
					} else {
						wp_dequeue_style( $handle );
					}
				}
			}
		}
	},
	100
);
