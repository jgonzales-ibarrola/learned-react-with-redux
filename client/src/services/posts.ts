import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4000/api/",
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "posts",
		}),
    getPost: builder.query({
      query: (id) => `posts/${id}`
    }),
    addPost: builder.mutation({
			query: (newPost) => ({
				url: 'posts',
				method: 'POST',
				body: newPost,
			})
		}),
		updatePost: builder.mutation({
			query: (post) => ({
				url: `posts/${post.id}`,
				method: 'PUT',
				body: post
			})
		}),
		deletePost: builder.mutation({
			query: (id) => ({
				url: `posts/${id}`,
				method: 'DELETE',
			})
		})
	}),
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
