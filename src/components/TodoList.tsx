import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "./TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow: scroll;
`;

interface Props {
  dark: boolean;
}

function TodoList(props: Props) {
  const { dark } = props;
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.todoList.map((todo) => (
        <TodoItem
          dark={dark}
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
