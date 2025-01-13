import { Post } from "@/types/posts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:4000/api"

export const postsSlice = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query<Post[], void> ({
        query() {
          return `/posts`;
        }
      })
    }
  }
})

export const { useFetchPostsQuery } = postsSlice;