import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'w3cik3xc',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '1'
});
