import { postsSlice } from "@/features/posts/posts-api-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		[postsSlice.reducerPath]: postsSlice.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(postsSlice.middleware)
	},
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
