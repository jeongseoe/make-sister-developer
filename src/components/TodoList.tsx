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
  isDark: boolean;
}

function TodoList(props: Props) {
  const { isDark } = props;
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          isDark={isDark}
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isDone={todo.isDone}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
