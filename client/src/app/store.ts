import { postsApi } from "@/services/posts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		[postsApi.reducerPath]: postsApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(postsApi.middleware)
	},
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
