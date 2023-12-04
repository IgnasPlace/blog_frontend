export type PostType = {
  id: number;
  title: string;
  body: string;
  created_on: string;
  updated_on?: string;
  user_name: string;
  user_id: string;
};
export type NewPostType = {
  title: string;
  body: string;
  createdAt: string;
};
export type UserType = {
  name: string;
  picture: string;
  email: string;
  id: string;
};

export type PostsStateType = {
  posts: PostType[];
};

export type CurrentUserType = {
  user: UserType | null;
};
