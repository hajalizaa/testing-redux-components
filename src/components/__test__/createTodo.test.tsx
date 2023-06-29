import userEvent from '@testing-library/user-event';
import { render } from 'utils/testing/render';
import CreateTodo from '../CreateTodo';
import { act, fireEvent } from '@testing-library/react';
import { testStore } from 'utils/testing/withStore';

describe('create todo unit tests', () => {
  it('must create new todo on form submit', async () => {
    const rendered = render({
      component: <CreateTodo />,
      reduxData: {}
    });

    const todoTitle = 'first todo';
    const form = rendered.getByTestId('form') as HTMLFormElement;
    const input = rendered.getByTestId('input') as HTMLInputElement;

    await act(async () => {
      await userEvent.type(input, todoTitle);
    });

    fireEvent.submit(form);

    const { todoItems } = testStore.getState().todo;
    expect(todoItems.length).toBe(1);
    expect(todoItems[0].title).toBe(todoTitle);
  });
});
