import { Post } from "@/types/posts";

import { useEffect, useState } from "react";

import {
	useDeletePostMutation,
	useGetPostsQuery,
	useUpdatePostMutation,
} from "@/services/posts";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilteredPosts } from "@/features/postsSlice";

import { Trash2Icon } from "lucide-react";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Posts = () => {
	const dispatch = useAppDispatch();
	const initialState = {
		_id: "",
		title: "",
		content: "",
	};

	const [open, setOpen] = useState(false);
	const [currPost, setCurrPost] = useState<Post>(initialState);

	const { data: allPosts, isLoading, refetch } = useGetPostsQuery();
	const [deletePost] = useDeletePostMutation();
	const [updatePost] = useUpdatePostMutation();

	const filteredPosts = useAppSelector(
		(state) => state.postsSlice.filteredPosts
	);

	const handleDeletePost = async (id: string) => {
		try {
			dispatch(
				setFilteredPosts(
					filteredPosts.filter((post) => post._id !== id)
				)
			);
			await deletePost(id).unwrap();
			await refetch();

		} catch (error) {
			console.error("Failed to delete a post", error);

			dispatch(
				setFilteredPosts([
					...filteredPosts,
					filteredPosts.find((post) => post._id === id),
				])
			);
		}
	};

	const handleEditBtn = (_id: string, title: string, content: string) => {
		setCurrPost({ ...currPost, _id, title, content });
		setOpen(true);
	};

	const handleUpdatePost = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const updatedPosts = filteredPosts.map((post) =>
				post._id === currPost._id ? { ...post, ...currPost } : post
			);
			dispatch(setFilteredPosts(updatedPosts));
			await updatePost({
				_id: currPost._id,
				title: currPost.title,
				content: currPost.content,
			}).unwrap();

			await refetch();

			setOpen(false);
		} catch (error) {
			console.error("Failed to update a post", error);
		}
	};

	useEffect(() => {
		if (allPosts) {
			dispatch(setFilteredPosts(allPosts));
		}
	}, [allPosts, dispatch]);

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{isLoading ? (
				<p>Fetching Posts...</p>
			) : (
				filteredPosts?.slice(0, 10).map((post) => {
					const { _id, title, content } = post;

					return (
						<Card className="relative" key={_id}>
							<CardHeader>
								<CardTitle>{title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{content}</p>
							</CardContent>
							<CardFooter>
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											onClick={() =>
												handleEditBtn(
													_id,
													title,
													content
												)
											}
										>
											Edit {title.slice(0, 6)}...
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<form onSubmit={handleUpdatePost}>
											<DialogHeader>
												<DialogTitle>
													Edit post
												</DialogTitle>
												<DialogDescription>
													Make changes to your post
													here. Click save when you're
													done.
												</DialogDescription>
											</DialogHeader>
											<div className="grid gap-4 py-4">
												<div className="grid grid-cols-4 items-center gap-4">
													<Label className="text-right">
														Title
													</Label>
													<Input
														value={currPost.title}
														onChange={(e) =>
															setCurrPost(
																(prev) => ({
																	...prev,
																	title: e
																		.target
																		.value,
																})
															)
														}
														className="col-span-3"
													/>
												</div>
												<div className="grid grid-cols-4 items-center gap-4">
													<Label
														htmlFor="username"
														className="text-right"
													>
														Username
													</Label>
													<Input
														value={currPost.content}
														onChange={(e) =>
															setCurrPost(
																(prev) => ({
																	...prev,
																	content:
																		e.target
																			.value,
																})
															)
														}
														className="col-span-3"
													/>
												</div>
											</div>
											<DialogFooter>
												<Button
													type="button"
													variant={"secondary"}
													onClick={() =>
														setOpen(!open)
													}
												>
													Cancel
												</Button>
												<Button type="submit">
													Save changes
												</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</CardFooter>

							<Button
								variant={"destructive"}
								className="absolute top-0 right-0"
								onClick={() => handleDeletePost(_id)}
							>
								<Trash2Icon />
							</Button>
						</Card>
					);
				})
			)}
		</div>
	);
};

export default Posts;
