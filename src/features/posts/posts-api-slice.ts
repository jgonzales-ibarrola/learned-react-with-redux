// https://jsonplaceholder.typicode.com/posts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Posts {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const postsApiSlice = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
		prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json; charset=UTF-8')

			return headers;
		},
	}),

	endpoints(builder) {
		return {
			fetchPosts: builder.query<Posts[], number | void>({
				query() {
					return `/posts`;
				},
			}),
		};
	},
});

export const { useFetchPostsQuery } = postsApiSlice;
