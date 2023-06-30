# Redux Unit Tests

This project aims to provide a comprehensive example and guidance for writing unit tests specifically for components that utilize the Redux library. Writing tests for components that interact with Redux, manage state, and handle actions can be challenging, but with the proper setup and understanding of testing methodologies, it becomes more manageable and efficient.

By exploring this project, you will gain insights into best practices and effective strategies for testing components that use Redux. It will serve as a reference point to understand how to structure your test suite, set up the necessary testing utilities and libraries, and write meaningful test cases.

## Usage

**First, install dependencies with following command**

```bash
npm install
```

or

```bash
yarn
```

**To run tests, run the following command**

```bash
npm run test
```

or

```bash
yarn test
```

**To start development server, run the following command**

```bash
npm run dev
```

or

```bash
yarn dev
```

## withStore function

In the `src/utils/testing/withStore.tsx` file, you will find a valuable utility function that enhances the testing capabilities for components utilizing `redux`. This function plays a crucial role in creating a mock store, allowing you to simulate and control state during testing.

The content of the withStore function is as follows:

```
import { RootState } from '@redux';
import rootReducer from '@redux/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Provider } from 'react-redux';

export let testStore: ToolkitStore<RootState>;

const makeStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
      });
    }
  });
};

export const withStore = (component: any, initialState: any) => {
  testStore = makeStore(initialState);

  return <Provider store={testStore}>{component}</Provider>;
};

```

This code defines a function called `withStore` that is used to provide a Redux store to a React component for testing purposes. Here's a description for the function:

The `withStore` function is a utility function that facilitates testing of React `components` by providing a `Redux` store. It accepts two parameters: `component` and `initialState`.

The `component` parameter represents the React component that needs to be wrapped with the Redux store. It can be any valid React component.

The `initialState` parameter is an object that represents the initial state of the Redux store. It allows you to set the initial state of the store to a specific value for testing purposes.

Inside the `withStore` function, a Redux store is created using the `makeStore` function. The `makeStore` function accepts the `initialState` and returns a configured store using `configureStore` from `@reduxjs/toolkit`. The `reducer` used in the store is provided by `rootReducer` from `@redux/reducers`.

The store configuration includes disabling certain middleware options. In this case, the `thunk` middleware is set to `false`, indicating that the store should not support Redux Thunk middleware. Additionally, the `serializableCheck` option is set to `false`, disabling the serialization check for action payloads. This is often necessary when testing, as test data may not always be serializable.

Finally, the `withStore` function returns a JSX element that wraps the `component` with the Redux store using the `Provider` component from `react-redux`. This allows the component to access the Redux store during testing.

The `testStore` variable is also exported, which provides access to the created `store` instance for further testing or assertions if needed.

Overall, the `withStore` function simplifies the process of setting up a Redux store for testing React components, allowing you to provide a custom initial state and disable certain middleware options as required for your tests.

## render function

In the `src/utils/testing/render.tsx` file, you will find a powerful utility function that simplifies the process of rendering and testing React components. This function leverages the capabilities of the `@testing-library/react` library to provide a streamlined testing experience.

Here's an overview of the content of the render function:

```
import { ReactNode } from 'react';
import { render as tRender } from '@testing-library/react';

import { withStore } from './withStore';

export interface IRender {
  component: ReactNode;
  reduxData?: any;
}

export const render = ({ component, reduxData = {} }: IRender) => {
  return tRender(withStore(component, reduxData));
};
```

This code defines a function called `render` that is used for rendering a React component with a Redux store for testing purposes. Here's a description for the function:

The `render` function is a utility function that simplifies the process of rendering a React component with a Redux store for testing. It takes an object as its parameter, with the following properties:

`component`: This property represents the React component that you want to render and test. It accepts any valid ReactNode, such as JSX components or HTML elements.

`reduxData` (optional): This property allows you to provide initial data for the Redux store. It is an object that represents the initial state of the Redux store, which can be customized for your testing needs. If not specified, an empty object is used as the default value.

Inside the `render` function, it utilizes the `withStore` function from the withStore module. The `withStore` function wraps the `component` with a Redux store using the `Provider` component from `react-redux`. This enables the component to access the Redux store during testing.

The `render` function then calls the `render` function from `@testing-library/react`, which is aliased as `tRender`. It passes the wrapped `component` with the Redux store to the `tRender` function for rendering.

The `render` function ultimately returns the result of the `tRender` function call, which includes information about the rendered component and utility methods provided by the testing library, such as querying the rendered component for testing assertions.

By using the `render` function, you can easily render a React component with a Redux store for testing purposes, providing optional initial data for the store. This helps facilitate unit testing of components that rely on Redux state management.

## Components

The `CreateTodo` component is a form-based component that allows users to submit new todo items. By entering a title for the todo and clicking the "add todo" button, the form triggers the submission, dispatching an action to add the todo item to the Redux store. It efficiently manages state using React hooks and leverages the `useDispatch` hook from `react-redux` for handling actions.

```
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

```

The `TodoList` component is responsible for rendering a list of todo items. It utilizes the `useSelector` hook from the custom `hook/redux` module to access the `todoItems` state from the Redux store. The component also uses the `useDispatch` hook from `react-redux` to dispatch the `updateTodo` action when a checkbox is clicked.

If the `todoItems` array is empty, indicating that there are no todos, the component renders a simple message stating "There is no todo".

Otherwise, the component renders an unordered list (`<ul>`) where each todo item is displayed as a list item (`<li>`). Each list item includes a label and an associated checkbox input. The label displays the title of the todo item, while the checkbox represents the completion status (`done` property) of the todo. The `onChange` event handler dispatches the `updateTodo` action, passing the `item.id` as the payload to update the todo's completion status in the Redux store. The checkbox's `checked` property is set based on the `item.done` value.

```
import React from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'hook/redux';
import { updateTodo } from '@redux/slices/todo.slice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todoItems } = useSelector((state) => state.todo);

  if (todoItems.length === 0) {
    return <p data-testid="noTodo">There is no todo</p>;
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

```

## Unit Tests

**Unit Tests for `TodoList` Component:**

```
import userEvent from '@testing-library/user-event';
import { render } from 'utils/testing/render';
import TodoList from '../TodoList';
import { act, fireEvent } from '@testing-library/react';
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

```

The `TodoList` component unit tests are written to ensure the expected behavior of the component. The tests utilize the `render` function from the `utils/testing/render` module to render the `TodoList` component with different sets of mock data.

The first test, titled 'must show `"There is no todo" when there are no todos'`, verifies that when the `todoItems` array is empty, the component correctly displays the message `"There is no todo"`. It checks if the content of the element with the `data-testid` attribute of `'noTodo'` matches the expected text.

The second test, titled `'must show title of each todo in list'`, tests whether the component correctly renders the list of todo items. It uses the `mockTodos` array as mock data to simulate the existence of todos. The test checks if each todo item from the `mockTodos` array is correctly rendered by verifying if the corresponding item's `title` is found in the rendered component.

The third test, titled `'must change done state on todo clicked'`, ensures that the completion status of a todo item is updated correctly when it is clicked. It simulates a click on the label associated with the first `todo` item in the rendered component and checks if the done property of that todo item in the Redux store has been updated to `true` after the click.

Overall, these unit tests cover various aspects of the `TodoList` component, including rendering when there are no todos, rendering a list of todos, and verifying the behavior of updating the completion status of a todo item.

**Unit Tests for `CreateTodo` Component:**

```
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

```

The unit test titled `'must create new todo on form submit'` verifies that the `CreateTodo` component correctly creates a new todo item when the form is submitted. The test utilizes the `render` function from the `utils/testing/render` module to render the `CreateTodo` component with empty Redux data.

Inside the test, a mock todo title is defined as `'first todo'`. The test retrieves the form and input elements from the rendered component using the `getByTestId` method. The `userEvent` library is then used to simulate typing the `todoTitle` into the input field. The `act` function is wrapped around this action to ensure asynchronous behavior is handled correctly.

After typing the title into the input field, the test triggers the form submission by firing the `submit` event on the form element using the `fireEvent` function.

Finally, the test retrieves the `todoItems` from the Redux store using `testStore.getState().todo` and asserts that the `todoItems` array has a length of `1` (indicating the creation of a new todo) and that the `title` property of the first todo item matches the expected `todoTitle`.

Overall, this unit test validates that when the form is submitted in the `CreateTodo` component, a new todo item is created with the provided title and added to the Redux store.

## Author

- [@hajalizaa](https://www.github.com/hajalizaa)
