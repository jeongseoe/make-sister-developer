import React, { useReducer, createContext, useContext, Dispatch } from "react";

// Todo 기본적인 부분도 타입 지정이 필요하다.
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// 투두들의 타입지정도 마찬가지로 지정하고
type TodosState = Todo[];
// createContext도 제네릭(함수에서 사용할 타입)을 지정하고 함수 인자를 넣어놔야한다.
const TodosStateContext = createContext<TodosState | undefined>(undefined);

// 액션의 타입도 지정해야한다.
type Action =
  | { type: "CREATE"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number };

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

// 리듀서의 인자인 state, action에서도 타입이 지정된 변수를 다시 지정해서 진행해야한다.
function todosReducer(state: TodosState, action: Action) {
  switch (action.type) {
    case "CREATE":
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      });
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo: any) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action`);
  }
}

interface Props {
  children: React.ReactNode;
}

export function TodoProvider({ children }: Props) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: "프로젝트 생성하기",
      done: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링하기",
      done: true,
    },
    {
      id: 3,
      text: "Context 만들기",
      done: false,
    },
    {
      id: 4,
      text: "기능 구현하기",
      done: false,
    },
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodosStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodosDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}