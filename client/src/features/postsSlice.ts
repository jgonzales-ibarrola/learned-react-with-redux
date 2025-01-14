import { Post } from "@/types/posts";
import { createSlice } from "@reduxjs/toolkit";

interface PostsSlice {
  searchTerm: string;
  filteredPosts: Post[]
}

const initialState: PostsSlice = {
  searchTerm: '',
  filteredPosts: []
}

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    }
  }
})

export const { setSearchTerm, setFilteredPosts } = postsSlice.actions;
export default postsSlice.reducer;