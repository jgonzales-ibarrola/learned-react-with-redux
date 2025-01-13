import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Button } from "./components/ui/button";
import { increment } from "./features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useState } from "react";
import { addTodo } from "./features/todos/todosSlice";
// import DogLists from "./components/dog-lists";
import PostLists from "./components/post-lists";

let nextId = 1;

function App() {
	const [newTodo, setNewTodo] = useState<{
		id: number;
		task: string;
		done: boolean;
	}>({
		id: nextId,
		task: "",
		done: false,
	});

	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	const todos = useAppSelector((state) => state.todos.todos);

	const handleIncrement = () => {
		dispatch(increment());
	};

	const handleAddNewTodo = () => {
		dispatch(addTodo(newTodo));
    setNewTodo({
      id: ++nextId,
      task: "",
      done: false,
    })
	};

	return (
		<>
			<div>
				<div>
					<a href="https://vite.dev" target="_blank">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
					<a href="https://react.dev" target="_blank">
						<img
							src={reactLogo}
							className="logo react"
							alt="React logo"
						/>
					</a>
				</div>
				<h1>Vite + React</h1>
				<div className="card">
					<Button onClick={handleIncrement}>count is {count}</Button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className="read-the-docs">
					Click on the Vite and React logos to learn more
				</p>
			</div>

			{/* TODOS */}
			<div>
				<input
					type="text"
					placeholder="add todo here.."
          value={newTodo.task}
					onChange={(e) => setNewTodo({
            ...newTodo,
            task: e.target.value
          })}
				/>

				<Button type="button" onClick={handleAddNewTodo}>
					Add new Todo
				</Button>

				<div>
					{todos.map((todo) => {
						return (
							<div key={todo.id}>
								<p>{todo.task}</p>
							</div>
						);
					})}
				</div>
			</div>

			<div>

				{/* <DogLists /> */}

				<PostLists />
			</div>
		</>
	);
}

export default App;
