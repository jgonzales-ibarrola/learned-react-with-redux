import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  task: string;
  done: boolean;
}

interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: []
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload]
    }
  }
})

export const { addTodo } = todosSlice.actions;

export default todosSlice.reducer