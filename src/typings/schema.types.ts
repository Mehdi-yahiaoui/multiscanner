export type TPosts = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: {
    url: string;
  };
  author: {
    picture: {
      url: string;
    };
    name: string;
  };
  publishedAt: string;
  tag: [
    {
      name: string;
      colour: {
        hex?: string;
        rgba: {
          r: string;
          g: string;
          b: string;
          a: string;
        };
        css: any;
      };
    }
  ];
};

export interface TTag {
  name: string;
  colour: {
    hex?: string;
    rgba?: {
      r: string;
      g: string;
      b: string;
      a: string;
    };
    css?: any;
  };
}
export interface IPost extends TPosts {
  content: {
    raw: any;
  };
}
