import React from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'hook/redux';
import { updateTodo } from '@redux/slices/todo.slice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todoItems } = useSelector((state) => state.todo);

  if (todoItems.length === 0) {
    return <p>There is no todo</p>;
  }

  return (
    <ul>
      {todoItems.map((item) => (
        <li key={item.id}>
          <label htmlFor={item.id}>
            <span>{item.title}</span>
            <input
              type="checkbox"
              onChange={() => dispatch(updateTodo(item.id))}
              checked={item.done}
              id={item.id}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
