import userEvent from '@testing-library/user-event';
import { render } from 'utils/testing/render';
import TodoList from '../TodoList';
import { act } from '@testing-library/react';
import { testStore } from 'utils/testing/withStore';

const mockTodos = [
  {
    done: false,
    id: '86564129-b964-4908-89a7-5207d660c328',
    title: 'first todo'
  },
  {
    done: false,
    id: 'e9fc3def-c0d0-46d2-b454-af5002c239db',
    title: 'second todo'
  },
  {
    done: false,
    id: '69274e13-880d-43d5-b928-cc18d3bc0953',
    title: 'third todo'
  },
  {
    done: false,
    id: 'b1331c44-2113-4f9e-978e-d56ba58dbf8c',
    title: 'another todo'
  }
];

describe('todo list unit tests', () => {
  it('must show "There is no todo" when there are no todos', () => {
    const rendered = render({
      component: <TodoList />,
      reduxData: {
        todo: {
          todoItems: []
        }
      }
    });

    expect(rendered.getByTestId('noTodo').textContent).toBe('There is no todo');
  });

  it('must show title of each todo in list', async () => {
    const rendered = render({
      component: <TodoList />,
      reduxData: {
        todo: {
          todoItems: mockTodos
        }
      }
    });

    mockTodos.map((item) => {
      expect(rendered.getByText(item.title)).toBeDefined();
    });
  });

  it('must change done state on todo clicked', async () => {
    const rendered = render({
      component: <TodoList />,
      reduxData: {
        todo: {
          todoItems: mockTodos
        }
      }
    });

    const labelElement = rendered.getByLabelText(mockTodos[0].title);
    await act(async () => {
      await userEvent.click(labelElement);
    });

    const { todoItems } = testStore.getState().todo;
    expect(todoItems[0].done).toBe(true);
  });
});
