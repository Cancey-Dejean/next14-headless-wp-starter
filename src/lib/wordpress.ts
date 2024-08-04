import { GraphQLClient, gql } from "graphql-request";
import {
  Author,
  AuthorsResponse,
  CategoriesResponse,
  Category,
  Page,
  PagesResponse,
  PostsResponse,
  Tag,
  TagsResponse,
} from "@/lib/types";

const endpoint = "http://wordpress-playground.local/graphql";

const client = new GraphQLClient(endpoint);

// Define your queries

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 25) {
      nodes {
        title
        slug
        content
      }
    }
  }
`;

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      content
    }
  }
`;

const GET_PAGES = gql`
  query GetPages {
    pages {
      nodes {
        slug
        title
      }
    }
  }
`;

const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      slug
      title
      content
    }
  }
`;

const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    users {
      nodes {
        id
        databaseId
        name
        slug
        avatar {
          url
        }
        description
        posts {
          nodes {
            id
            title
            slug
          }
        }
      }
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
        parentId
      }
    }
  }
`;

const GET_ALL_TAGS = gql`
  query GetAllTags {
    tags(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
      }
    }
  }
`;

// Define your fetch functions
export async function getPosts(): Promise<Page[]> {
  const data = await client.request<PostsResponse>(GET_POSTS);
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string): Promise<Page | null> {
  try {
    const variables = { slug };
    const data = await client.request<{ post: Page }>(
      GET_POST_BY_SLUG,
      variables,
    );
    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getPages(): Promise<Page[]> {
  const data = await client.request<PagesResponse>(GET_PAGES);
  return data.pages.nodes;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const variables = { slug };
    const data = await client.request<{ page: Page }>(
      GET_PAGE_BY_SLUG,
      variables,
    );
    return data.page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const data = await client.request<AuthorsResponse>(GET_ALL_AUTHORS);
    return data.users.nodes;
  } catch (error) {
    console.error("Error fetching all authors:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const data = await client.request<CategoriesResponse>(GET_ALL_CATEGORIES);
    return data.categories.nodes;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const data = await client.request<TagsResponse>(GET_ALL_TAGS);
    return data.tags.nodes;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return [];
  }
}
