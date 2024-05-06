export default {
  default: {
    name: 'default',
    groups: ['main'],
    columns: [
      'url',
      'h1',
      'og_image',
      'request_time',
      'status',
      'x_cache',
      'error',
      'dom_size',
      'html_size',
      'html_size_rendered',
      'is_canonical',
      'canonical_count',
      'google_amp',
      'h1_count',
      /* 'h2_count',
      'h3_count',
      'h4_count', */
      'readability_length',
      'readability_links',
      'readability_images',
      // 'images',
      'images_without_alt',
      'images_alt_empty',
      'images_outer',
      /* 'links',
      'links_inner', */
      'links_outer',
      'text_ratio_percent',
      /* 'lighthouse_scores_performance',
      'lighthouse_scores_pwa',
      'lighthouse_scores_accessibility',
      'lighthouse_scores_best-practices',
      'lighthouse_scores_seo',
      'lighthouse_first-contentful-paint',
      'lighthouse_speed-index',
      'lighthouse_largest-contentful-paint',
      'lighthouse_interactive',
      'lighthouse_total-blocking-time',
      'lighthouse_cumulative-layout-shift', */
    ],
  },
  default_plus_lighthouse: {
    name: 'default + lighthouse',
    groups: ['main'],
    columns: [
      'url',
      'depth',
      'status',
      'x_cache',
      'error',
      'mixed_content_url',
      'is_canonical',
      'request_time',
      'title',
      'h1',
      'description',
      'keywords',
      'og_image',
      'schema_types',
      'h1_count',
      'h2_count',
      'h3_count',
      'h4_count',
      'canonical_count',
      'images',
      'images_without_alt',
      'images_alt_empty',
      'images_outer',
      'links',
      'links_inner',
      'links_outer',
      'text_ratio_percent',
      'dom_size',
      'html_size',
      'lighthouse_scores_performance',
      'lighthouse_scores_pwa',
      'lighthouse_scores_accessibility',
      'lighthouse_scores_best-practices',
      'lighthouse_scores_seo',
      'lighthouse_first-contentful-paint',
      'lighthouse_speed-index',
      'lighthouse_largest-contentful-paint',
      'lighthouse_interactive',
      'lighthouse_total-blocking-time',
      'lighthouse_cumulative-layout-shift',
    ],
  },
  lighthouse: {
    name: 'lighthouse',
    groups: ['lighthouse'],
    presets: ['lighthouse', 'lighthouse-all'],
    columns: [
      'url',
      'lighthouse_scores_performance',
      'lighthouse_scores_pwa',
      'lighthouse_scores_accessibility',
      'lighthouse_scores_best-practices',
      'lighthouse_scores_seo',
      'lighthouse_first-contentful-paint',
      'lighthouse_speed-index',
      'lighthouse_largest-contentful-paint',
      'lighthouse_interactive',
      'lighthouse_total-blocking-time',
      'lighthouse_cumulative-layout-shift',
    ],
  },
  opengraph: {
    name: 'opengraph',
    groups: ['seo'],
    columns: [
      'url',
      'og_image',
      'og_title',
      'schema_types',
    ],
  },
  title: {
    name: 'title',
    groups: ['seo'],
    columns: [
      'url',
      'title',
    ],
  },
  mixed_content: {
    name: 'mixed_content',
    groups: ['info', 'seo'],
    columns: [
      'url',
      'mixed_content_url',
    ],
  },
  metatags: {
    name: 'metatags',
    groups: ['info'],
    columns: [
      'url',
      'title',
      'description',
      'keywords',
      'h1',
      'canonical',
      'google_amp',
      'og_image',
      'og_title',
      'schema_types',
    ],
  },
  content: {
    name: 'content',
    groups: ['info'],
    columns: [
      'url',
      'page_date',
      'og_image',
      'h1',
      'readability_length',
      'readability_minutes',
      'readability_text',
    ],
  },
};
