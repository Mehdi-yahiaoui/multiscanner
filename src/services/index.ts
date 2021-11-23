import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
  const query = gql`
    query Posts {
      posts {
        id
        slug
        title
        excerpt
        publishedAt
        coverImage {
          url
        }
        author {
          picture {
            url
          }
          name
        }
        tag {
          name
          colour {
            rgba {
              r
              g
              b
              a
            }
          }
        }
      }
    }
  `;

  const data = await request(graphqlAPI as string, query);

  return data;
};

export const getPostBySlug = async (slug: any) => {
  const query = gql`
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        id
        slug
        title
        excerpt
        publishedAt
        content {
          raw
        }
        coverImage {
          url
        }
        author {
          picture {
            url
          }
          name
        }
      }
    }
  `;

  const data = await request(graphqlAPI as string, query, { slug });

  return data;
};
