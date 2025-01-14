import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAddPostMutation, useGetPostsQuery } from "@/services/posts";
import { Input } from "./ui/input";

const AddPost = () => {
	const initialState = {
		title: "",
		content: "",
	};

	const [newPost, setNewPost] = useState(initialState);

	const [addPost] = useAddPostMutation();
	const { refetch } = useGetPostsQuery();

	const titleInputRef = useRef<HTMLInputElement>(null);

	const handleAddPost = async (e: FormEvent) => {
		e.preventDefault();
		await addPost(newPost).then(() => {
			setNewPost(initialState);
			refetch();
		});
		titleInputRef.current?.focus();
	};

	return (
		<form onSubmit={handleAddPost}>
			<div className="space-y-3 my-6">
				<div className="grid md:grid-cols-2 gap-4">
					<Input
						type="text"
						placeholder="title.."
						value={newPost.title}
						ref={titleInputRef}
						onChange={(e) =>
							setNewPost((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
					/>
					<Input
						type="text"
						placeholder="content.."
						value={newPost.content}
						onChange={(e) =>
							setNewPost((prev) => ({
								...prev,
								content: e.target.value,
							}))
						}
					/>
				</div>

				<Button type="submit">Add new Post</Button>
			</div>
		</form>
	);
};

export default AddPost;
