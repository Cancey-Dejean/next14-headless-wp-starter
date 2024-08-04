export type Post = Page & {
  id?: string;
  date?: string;
  excerpt: string;
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type Page = {
  slug?: string;
  title: string;
  content?: string;
};

export type Category = {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parentId: string | null;
};

export type Author = {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  avatar: {
    url: string;
  };
  description: string;
  posts: {
    nodes: Page[];
  };
};

export type Tag = {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

type CategoriesResponse = {
  categories: {
    nodes: Category[];
  };
};

export type TagsResponse = {
  tags: {
    nodes: Tag[];
  };
};

export type AuthorsResponse = {
  users: {
    nodes: Author[];
  };
};

export type PostsResponse = {
  posts: {
    nodes: Post[];
    pageInfo: PageInfo;
    totalCount: number;
  };
};

export type PagesResponse = {
  pages: {
    nodes: Page[];
  };
};

export type SinglePostResponse = {
  post: Page;
};

interface SinglePageResponse {
  page: Page;
}
