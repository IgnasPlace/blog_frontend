import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrentUserType, PostType, PostsStateType, UserType } from "./types";

const initialPostsState: PostsStateType = {
  posts: [],
};
const initialUserState: CurrentUserType = {
  user: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    updatePosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<PostType>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<UserType | null>) => {
      if (action.payload !== null) {
        state.user = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: userSlice.reducer,
  },
});

export const postsActions = postsSlice.actions;
export const userActions = userSlice.actions;
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
