import { useFetchBreedsQuery } from "@/features/dogs/dogs-api-slice";
import { useState } from "react";

const DogLists = () => {
	const [numberofDogs, setNumberOfDogs] = useState(10);
	const { data, isFetching } = useFetchBreedsQuery(numberofDogs);

	return (
		<div>
			{isFetching ? (
				<p>Fetching Dogs...</p>
			) : (
				<div>
					<p>Number of dogs fetched: {data?.length}</p>

					<select
						value={numberofDogs}
						onChange={(e) =>
							setNumberOfDogs(parseInt(e.target.value))
						}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>

					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Picture</th>
							</tr>
						</thead>

						<tbody>
							{data?.map((breed) => {
								return (
									<tr>
										<td>{breed.name}</td>
										<td>
											<img
												height={250}
												src={breed.image.url}
												alt={breed.name}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default DogLists;
