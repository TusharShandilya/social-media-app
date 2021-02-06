export type CommentType = {
  commentId: any;
  id: string;
  body: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  edited: boolean;
};

export type LikeType = {
  id: string;
  username: string;
};

export type PostType = {
  id: string;
  body: string;
  username: string;
  firstName: string;
  lastName: string;
  edited: boolean;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  likes: LikeType[];
  comments: CommentType[];
};

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  followers: string[];
  following: string[];
  followerCount: number;
  followingCount: number;
  token: string;
};

export type StyleSize = "xs" | "sm" | "md" | "lg" | "xl";
