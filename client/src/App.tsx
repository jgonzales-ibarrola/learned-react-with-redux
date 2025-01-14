import AddPost from "./components/add-post";
import Posts from "./components/posts";
import SearchFilter from "./components/search-filter";

function App() {
	
	return (
		<>
			<div className="container">
				<h1 className="text-4xl font-bold">
					I Cleaned, and mastering react REDUX - TOOLKIT!
				</h1>

				<SearchFilter />

				<AddPost />

				<Posts />
			</div>
		</>
	);
}

export default App;
