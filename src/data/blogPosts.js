/** Blog post registry — add entries here when publishing new articles */
export const blogPosts = [
  {
    slug: 'ui-testing-frameworks-modern-era',
    title: 'UI Software Testing Frameworks in the Modern Era',
    excerpt:
      'Playwright, Cypress, and Selenium solved click paths — but real-time operator dashboards need socket events, pixels, and one CI gate. Here is how teams are closing that gap.',
    author: 'AESS Technologies',
    publishedAt: '2026-07-18',
    readMinutes: 8,
    tags: ['QA', 'UI testing', 'Spectra', 'Real-time apps'],
    ogImage: '/logo512.png',
    heroImage: `${process.env.PUBLIC_URL}/spectra-demo.gif`,
  },
];

export const getBlogPost = (slug) => blogPosts.find((post) => post.slug === slug);

export default blogPosts;
