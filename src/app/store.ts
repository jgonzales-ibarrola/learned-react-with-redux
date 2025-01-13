import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";
import { apiSlice } from "../features/dogs/dogs-api-slice";
import { postsApiSlice } from '../features/posts/posts-api-slice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		todos: todosReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[postsApiSlice.reducerPath]: postsApiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
		.concat(apiSlice.middleware)
		.concat(postsApiSlice.middleware);
	},
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
