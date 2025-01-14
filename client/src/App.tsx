import AddPost from "./components/add-post";
import Posts from "./components/posts";

function App() {
	
	return (
		<>
			<div className="container">
				<h1 className="text-4xl font-bold">
					I Cleaned, and mastering react REDUX - TOOLKIT!
				</h1>

				<AddPost />

				<Posts />
			</div>
		</>
	);
}

export default App;
