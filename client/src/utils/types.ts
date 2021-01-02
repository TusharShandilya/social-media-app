export type Post = {
  id: string;
  body: string;
  username: string;
  firstName: string;
  lastName: string;
  edited: boolean;
  createdAt: string;
  likeCount: number;
  likes: [
    {
      id: string;
      username: string;
    }
  ];
  commentCount: number;
  comments: [
    {
      id: string;
      commentId: string;
      body: string;
      username: string;
      firstName: string;
      lastName: string;
      createdAt: string;
      edited: boolean;
    }
  ];
};

export type User = {
  [props: string]: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};
