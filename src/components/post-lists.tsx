import { useFetchPostsQuery } from "@/features/posts/posts-api-slice";

const PostLists = () => {
	const { data, isFetching } = useFetchPostsQuery();

	return (
		<div>
			{isFetching ? (
				<p>Fetching Posts...</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Body</th>
							<th>User ID</th>
						</tr>
					</thead>

					<tbody>
						{data?.map((post) => {
							const { id, title, body, userId } = post;

							return (
								<tr key={id}>
									<td>{id}</td>
									<td>{title}</td>
									<td>{body}</td>
									<td>{userId}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PostLists;
