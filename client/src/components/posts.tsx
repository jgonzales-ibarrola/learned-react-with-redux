import { useFetchPostsQuery } from "@/features/posts/posts-api-slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Posts = () => {
	const { data, isFetching } = useFetchPostsQuery();

	return (
		<div>
			{isFetching ? (
				<p>Fetching Posts...</p>
			) : (
				data?.map((post) => {
					const { id, title, content } = post;

					return (
						<Card key={id}>
							<CardHeader>
								<CardTitle>{title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{content}</p>
							</CardContent>
						</Card>
					);
				})
			)}
		</div>
	);
};

export default Posts;
