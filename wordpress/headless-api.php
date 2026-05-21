<?php
/**
 * Plugin Name: All Phase — Headless API
 * Description: Registers custom post types, REST meta fields, and a global
 *              site-options endpoint for the headless Astro/React frontend.
 *              Drop this file into /wp-content/mu-plugins/ — no activation needed.
 * Version:     1.0.0
 * Author:      Ethixweb
 *
 * SAFE TO INSTALL: read-only additions only. Nothing is deleted or altered.
 */

defined( 'ABSPATH' ) || exit;

// ── 1. Custom Post Types ──────────────────────────────────────────────────────

add_action( 'init', 'allphase_register_cpts' );

function allphase_register_cpts(): void {

    /* ── Services ── */
    register_post_type( 'allphase_service', [
        'labels' => [
            'name'               => 'Services',
            'singular_name'      => 'Service',
            'add_new_item'       => 'Add New Service',
            'edit_item'          => 'Edit Service',
            'menu_name'          => 'Services',
        ],
        'public'              => true,
        'show_in_rest'        => true,   // required for REST API access
        'rest_base'           => 'allphase_service',
        'supports'            => [ 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ],
        'menu_icon'           => 'dashicons-admin-tools',
        'has_archive'         => false,
        'rewrite'             => [ 'slug' => 'services' ],
    ] );

    /* ── Team Members ── */
    register_post_type( 'allphase_team', [
        'labels' => [
            'name'               => 'Team Members',
            'singular_name'      => 'Team Member',
            'add_new_item'       => 'Add Team Member',
            'edit_item'          => 'Edit Team Member',
            'menu_name'          => 'Team',
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'rest_base'           => 'allphase_team',
        'supports'            => [ 'title', 'editor', 'thumbnail', 'page-attributes' ],
        'menu_icon'           => 'dashicons-groups',
        'has_archive'         => false,
        'rewrite'             => [ 'slug' => 'team' ],
    ] );
}

// ── 2. Register REST meta fields ──────────────────────────────────────────────

add_action( 'init', 'allphase_register_meta_fields' );

function allphase_register_meta_fields(): void {

    /* ── Service meta ── */
    $service_fields = [
        'service_number'    => 'string',  // "01", "02" …
        'service_icon'      => 'string',  // Lucide icon name e.g. "Wrench"
        'service_page_slug' => 'string',  // "/services/drain-cleaning"
    ];
    foreach ( $service_fields as $key => $type ) {
        register_post_meta( 'allphase_service', $key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
            'default'      => '',
        ] );
    }

    /* ── Team member meta ── */
    $team_fields = [
        'team_role'  => 'string',  // "Master Plumber"
        'team_years' => 'string',  // "Since 1989"
    ];
    foreach ( $team_fields as $key => $type ) {
        register_post_meta( 'allphase_team', $key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
            'default'      => '',
        ] );
    }
}

// ── 3. Global site-options REST endpoint ─────────────────────────────────────
//
//  GET /wp-json/allphase/v1/options
//
//  Returns a JSON object with every field the frontend consumes globally.
//  Edit values in WP Admin → Settings → All Phase Options.
//
//  To update a value programmatically:
//      update_option( 'allphase_phone', '(206) 772-6077' );

add_action( 'rest_api_init', 'allphase_register_options_endpoint' );

function allphase_register_options_endpoint(): void {
    register_rest_route( 'allphase/v1', '/options', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'allphase_get_options',
        'permission_callback' => '__return_true',  // public read
    ] );
}

function allphase_get_options( WP_REST_Request $request ): WP_REST_Response {

    // ── Helper: get option with fallback ──────────────────────────────────────
    $opt = fn( string $key, mixed $default = '' ): mixed => get_option( $key, $default );

    // ── Helper: decode stored JSON array or return default array ──────────────
    $arr = function( string $key, array $default = [] ) use ( $opt ): array {
        $raw = $opt( $key );
        if ( ! $raw ) return $default;
        $decoded = json_decode( $raw, true );
        return is_array( $decoded ) ? $decoded : $default;
    };

    $phone      = $opt( 'allphase_phone',      '(206) 772-6077' );
    $phone_href = 'tel:' . preg_replace( '/[^0-9+]/', '', $opt( 'allphase_phone_e164', '+12067726077' ) );

    $data = [

        // ── Contact ───────────────────────────────────────────────────────────
        'phone'         => $phone,
        'phone_href'    => $phone_href,
        'email'         => $opt( 'allphase_email',        'info@allphaseplumbing.com' ),
        'address_line1' => $opt( 'allphase_address_line1','14101 Interurban Ave S, Unit 78-A' ),
        'address_city'  => $opt( 'allphase_address_city', 'Tukwila' ),
        'address_state' => $opt( 'allphase_address_state','WA' ),
        'address_zip'   => $opt( 'allphase_address_zip',  '98168' ),

        // ── Hero ──────────────────────────────────────────────────────────────
        'hero_eyebrow'  => $opt( 'allphase_hero_eyebrow', "Seattle's Trusted Plumber" ),
        'hero_title'    => $opt( 'allphase_hero_title',   "Your Home's Plumbing," ),
        'hero_italic'   => $opt( 'allphase_hero_italic',  'Done Right.' ),
        'hero_subtitle' => $opt( 'allphase_hero_subtitle','Serving Tukwila & the Greater Seattle Area with expert care since 1989.' ),
        'hero_stats'    => $arr( 'allphase_hero_stats', [
            [ 'number' => '35+',  'label' => 'Years Experience'   ],
            [ 'number' => '10k+', 'label' => 'Homes Served'       ],
            [ 'number' => '24/7', 'label' => 'Emergency Available' ],
        ] ),

        // ── Why Us ────────────────────────────────────────────────────────────
        'why_us_eyebrow'  => $opt( 'allphase_why_eyebrow', 'Why Homeowners Across Greater Seattle Trust All Phase Plumbing' ),
        'why_us_heading'  => $opt( 'allphase_why_heading', 'Six reasons your neighbors' ),
        'why_us_italic'   => $opt( 'allphase_why_italic',  'keep calling.' ),
        'why_us_reasons'  => $arr( 'allphase_why_reasons', [
            [ 'icon' => 'Award',       'title' => 'Licensed Technicians',   'desc' => 'Every tech is licensed, bonded, and background-checked.' ],
            [ 'icon' => 'Clock',       'title' => '24/7 Emergency Service', 'desc' => 'Burst pipe at midnight? We answer when you call.' ],
            [ 'icon' => 'DollarSign',  'title' => 'Upfront Honest Pricing', 'desc' => 'Flat-rate quotes before any work begins. No surprises.' ],
            [ 'icon' => 'ShieldCheck', 'title' => 'Guaranteed Workmanship', 'desc' => 'Every repair backed by our written guarantee.' ],
            [ 'icon' => 'Home',        'title' => 'Locally Owned',          'desc' => 'Family-owned in Tukwila, serving neighbors since 1989.' ],
            [ 'icon' => 'Layers',      'title' => 'All Under One Roof',     'desc' => 'Plumbing, drains, sewer, water heaters — one call does it.' ],
        ] ),

        // ── Team ─────────────────────────────────────────────────────────────
        'team_eyebrow' => $opt( 'allphase_team_eyebrow', 'Behind the Scenes' ),
        'team_heading' => $opt( 'allphase_team_heading', 'See the All Phase team' ),
        'team_italic'  => $opt( 'allphase_team_italic',  'in action.' ),
        'team_body'    => $opt( 'allphase_team_body',    "We're a family-owned crew of real plumbers — licensed, background-checked, and proud to have served Seattle homes for more than three decades. When you call, you talk to a neighbor." ),
        'team_points'  => $arr( 'allphase_team_points', [
            'Real plumbers — not subcontractors',
            'Licensed, bonded, and background-checked',
            'Serving Seattle homes for 30+ years',
        ] ),

        // ── Service area ──────────────────────────────────────────────────────
        'service_area_cities' => $arr( 'allphase_cities', [
            'Seattle','Tacoma','Auburn','Bellevue','Kirkland',
            'Redmond','Renton','Kent','Mercer Island','Federal Way',
            'Des Moines','Bonney Lake','Puyallup','South Hill','Spanaway',
            'Summit','Fife','Lakewood','Summit View','Bothell',
        ] ),

        // ── CTA banner ────────────────────────────────────────────────────────
        'cta_heading'      => $opt( 'allphase_cta_heading',    'Contact Us Today' ),
        'cta_subheading'   => $opt( 'allphase_cta_subheading', 'Same Day Service' ),
        'cta_body'         => $opt( 'allphase_cta_body',       'Plumbing and Drain Cleaning — When booked before 2pm, Mon–Fri' ),
        'dispatch_message' => $opt( 'allphase_dispatch_msg',   '⚡ Dispatching certified local technicians near Tukwila WA...' ),
    ];

    $response = new WP_REST_Response( $data, 200 );

    // Allow Vercel (and any origin) to read this endpoint
    $response->header( 'Access-Control-Allow-Origin',  '*' );
    $response->header( 'Access-Control-Allow-Methods', 'GET' );
    $response->header( 'Cache-Control',                'public, max-age=120' ); // 2-minute CDN cache

    return $response;
}

// ── 4. WordPress Settings page (WP Admin → Settings → All Phase Options) ──────

add_action( 'admin_menu', 'allphase_add_settings_page' );

function allphase_add_settings_page(): void {
    add_options_page(
        'All Phase Options',
        'All Phase Options',
        'manage_options',
        'allphase-options',
        'allphase_render_settings_page'
    );
}

add_action( 'admin_init', 'allphase_register_settings' );

function allphase_register_settings(): void {
    $text_options = [
        'allphase_phone'          => 'Phone number (display)',
        'allphase_phone_e164'     => 'Phone number (E.164, e.g. +12067726077)',
        'allphase_email'          => 'Email address',
        'allphase_address_line1'  => 'Address line 1',
        'allphase_address_city'   => 'City',
        'allphase_address_state'  => 'State',
        'allphase_address_zip'    => 'ZIP code',
        'allphase_hero_eyebrow'   => 'Hero — eyebrow label',
        'allphase_hero_title'     => 'Hero — main title',
        'allphase_hero_italic'    => 'Hero — italic accent',
        'allphase_hero_subtitle'  => 'Hero — subtitle paragraph',
        'allphase_why_eyebrow'    => 'Why Us — eyebrow label',
        'allphase_why_heading'    => 'Why Us — heading',
        'allphase_why_italic'     => 'Why Us — italic accent',
        'allphase_team_eyebrow'   => 'Team — eyebrow label',
        'allphase_team_heading'   => 'Team — heading',
        'allphase_team_italic'    => 'Team — italic accent',
        'allphase_team_body'      => 'Team — body paragraph',
        'allphase_cta_heading'    => 'CTA Banner — heading',
        'allphase_cta_subheading' => 'CTA Banner — subheading',
        'allphase_cta_body'       => 'CTA Banner — body',
        'allphase_dispatch_msg'   => 'CTA Banner — dispatch message',
    ];

    $json_options = [
        'allphase_hero_stats'   => 'Hero stats (JSON array of {number, label})',
        'allphase_why_reasons'  => 'Why Us reasons (JSON array of {icon, title, desc})',
        'allphase_team_points'  => 'Team bullet points (JSON array of strings)',
        'allphase_cities'       => 'Service area cities (JSON array of strings)',
    ];

    add_settings_section( 'allphase_main', '', '__return_false', 'allphase-options' );

    foreach ( array_merge( $text_options, $json_options ) as $key => $label ) {
        register_setting( 'allphase_options_group', $key, [ 'sanitize_callback' => 'sanitize_text_field' ] );
        add_settings_field(
            $key, $label,
            fn() => allphase_render_field( $key ),
            'allphase-options', 'allphase_main'
        );
    }
}

function allphase_render_field( string $key ): void {
    $value = esc_attr( get_option( $key, '' ) );
    echo '<input type="text" name="' . esc_attr( $key ) . '" value="' . $value . '" class="regular-text">';
}

function allphase_render_settings_page(): void {
    ?>
    <div class="wrap">
        <h1>All Phase Plumbing — Site Options</h1>
        <p>Changes here update the live site within 2 minutes (CDN cache).</p>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'allphase_options_group' );
            do_settings_sections( 'allphase-options' );
            submit_button( 'Save Options' );
            ?>
        </form>
    </div>
    <?php
}
