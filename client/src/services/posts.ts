import { Post } from "@/types/posts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.BASE_URL,
	}),
	endpoints: (builder) => ({
		getPosts: builder.query<Post[], void>({
			query: () => "posts",
		}),
		getPost: builder.query({
			query: (id) => `posts/${id}`,
		}),
		addPost: builder.mutation({
			query: (newPost) => ({
				url: "posts/create",
				method: "POST",
				body: newPost,
			}),
		}),
		updatePost: builder.mutation({
			query: (post) => ({
				url: `posts/${post._id}`,
				method: "PATCH",
				body: post,
			}),
		}),
		deletePost: builder.mutation({
			query: (id) => ({
				url: `posts/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostQuery,
	useAddPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = postsApi;
