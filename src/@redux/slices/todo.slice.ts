import { RootState } from '@redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITodo {
  title: string;
  done: boolean;
  id: string;
}

interface IInitial {
  todoItems: ITodo[];
}

const initialState: IInitial = {
  todoItems: []
};

const todoSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    addTodo: (state, { payload }: PayloadAction<ITodo>) => {
      state.todoItems = [...state.todoItems, payload];
    },
    updateTodo: (state, { payload }: PayloadAction<string>) => {
      state.todoItems = state.todoItems.map((todo) => {
        if (todo.id === payload) {
          return {
            ...todo,
            done: !todo.done
          };
        }
        return todo;
      });
    }
  }
});

export const selectTodo = (state: RootState) => state.todo;
export default todoSlice;
export const { addTodo, updateTodo } = todoSlice.actions;
