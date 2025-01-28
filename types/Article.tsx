export type Article = {
  filename: string;
  date: string;
  readtime: number;
  title: string;
  description: string;
  content: string;
  images: {
    formats: {
      large: { url: string };
      medium: { url: string };
      thumbnail: { url: string };
    };
    alt: string;
  }[];
};
