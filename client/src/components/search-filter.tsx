import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setFilteredPosts, setSearchTerm } from "@/features/postsSlice";
import { Input } from "./ui/input";
import { useGetPostsQuery } from "@/services/posts";

const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.postsSlice.searchTerm)
  const { data: allPosts } = useGetPostsQuery();

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    dispatch(setSearchTerm(term))

    const filtered = (allPosts || []).filter(post => 
			post.title.toLowerCase().includes(term) ||
			post.content.toLowerCase().includes(term)
		)

		dispatch(setFilteredPosts(filtered))
  }

  return (
    <div>
      <Input type="text" placeholder="search title..." onChange={handleSearchFilter} />
      <p>Search: {searchTerm}</p>
    </div>
  )
}

export default SearchFilter