export type Article = {
  title: string;
  subtitle: string;
  articleUrl: string;
  imageUrl: string;
};

export type ArticlesResponse = {
  articles: Article[];
};
