import {
	useDeletePostMutation,
	useGetPostsQuery,
	useUpdatePostMutation,
} from "@/services/posts";

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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilteredPosts } from "@/features/postsSlice";

const Posts = () => {
	const dispatch = useAppDispatch();
	const initialState = {
		title: "",
		content: "",
	};

	const [open, setOpen] = useState(false);
	const [currPost, setCurrPost] = useState(initialState);

	const { data: allPosts, isFetching, refetch } = useGetPostsQuery();
	const [deletePost] = useDeletePostMutation();
	const [updatePost] = useUpdatePostMutation();
	
	const filteredPosts = useAppSelector(state => state.postsSlice.filteredPosts)

	const handleDeletePost = (id: string) => {
		deletePost(id).then(() => refetch());
	};

	const handleEditBtn = (title: string, content: string) => {
		setCurrPost({ title, content });
		setOpen(!open);
	};

	const handleUpdatePost = async (e: React.FormEvent, id: string) => {
		e.preventDefault();
		await updatePost({ _id: id, ...currPost })
			.unwrap()
			.then(() => refetch());
		setOpen(!open);
	};

	useEffect(() => {
		if (allPosts) {
			dispatch(setFilteredPosts(allPosts));
		}
	}, [allPosts, dispatch])
	
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{isFetching ? (
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
												handleEditBtn(title, content)
											}
										>
											Edit {title.slice(0, 6)}...
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<form
											onSubmit={(e) => {
												handleUpdatePost(e, _id);
											}}
										>
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
