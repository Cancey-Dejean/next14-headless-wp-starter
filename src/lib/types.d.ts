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

type CategoriesResponse = {
  categories: {
    nodes: Category[];
  };
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
    nodes: Page[];
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
