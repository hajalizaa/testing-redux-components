import { addTodo } from '@redux/slices/todo.slice';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

const CreateTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addTodo({
        done: false,
        id: uuid(),
        title
      })
    );
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <input
        required
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        data-testid="input"
      />
      <button type="submit">add todo</button>
    </form>
  );
};

export default CreateTodo;
