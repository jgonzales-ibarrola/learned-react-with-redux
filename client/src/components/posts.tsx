import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePostMutation, useGetPostsQuery } from "@/services/posts";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

const Posts = () => {
	const { data, isFetching, refetch } = useGetPostsQuery();
	const [deletePost] = useDeletePostMutation();

	const handleDeletePost = (id: string) => {
		deletePost(id)
		.then(() => refetch())
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{isFetching ? (
				<p>Fetching Posts...</p>
			) : (
				data?.slice(0, 10).map((post) => {
					const { _id, title, content } = post;

					return (
						<Card className="relative" key={_id}>
							<CardHeader>
								<CardTitle>{title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{content}</p>
							</CardContent>

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
